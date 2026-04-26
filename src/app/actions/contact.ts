'use server';

import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';

async function sendTelegramNotification(data: ContactFormData) {
  const proxyUrl = process.env.TELEGRAM_PROXY_API_URL || 'https://asfalt-e.vercel.app/api/telegram/notify';
  const secret = process.env.TELEGRAM_PROXY_SECRET;
  if (!secret) {
    console.warn('[Telegram Proxy] TELEGRAM_PROXY_SECRET is not configured');
    return;
  }

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-Proxy-Secret': secret,
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) return;

      console.error(`[Telegram Proxy] Attempt ${attempt} failed with status ${res.status}`);
    } catch (err) {
      clearTimeout(timeout);
      console.error(`[Telegram Proxy] Attempt ${attempt} failed:`, err);
    }
  }
}

export interface ContactFormData {
  name: string;
  phone: string;
  service?: string;
  area?: string;
  message?: string;
}

export interface ContactRequest extends ContactFormData {
  id: string;
  createdAt: string;
  isRead: boolean;
}

const REQUESTS_FILE = path.join(process.cwd(), 'data', 'requests.json');

async function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  await mkdir(dir, { recursive: true });
}

async function getRequests(): Promise<ContactRequest[]> {
  try {
    const content = await readFile(REQUESTS_FILE, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function saveRequests(requests: ContactRequest[]) {
  await ensureDataDir();
  await writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2), 'utf-8');
}

export async function submitContactForm(data: ContactFormData) {
  try {
    if (!data.name || !data.phone) {
      return { success: false, error: 'Укажите имя и телефон' };
    }

    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneRegex.test(data.phone)) {
      return { success: false, error: 'Укажите корректный номер телефона' };
    }

    const requests = await getRequests();
    const newRequest: ContactRequest = {
      id: `req_${Date.now()}`,
      name: data.name.trim(),
      phone: data.phone.trim(),
      service: data.service?.trim() || '',
      area: data.area?.trim() || '',
      message: data.message?.trim() || '',
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    requests.unshift(newRequest);
    await saveRequests(requests);
    await sendTelegramNotification(data);

    return {
      success: true,
      message: 'Заявка принята! Мы свяжемся с вами в ближайшее время.',
    };
  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return { success: false, error: 'Произошла ошибка. Попробуйте ещё раз.' };
  }
}

export async function getContactRequests(): Promise<ContactRequest[]> {
  return getRequests();
}

export async function markRequestAsRead(id: string) {
  try {
    const requests = await getRequests();
    const updated = requests.map((r) => (r.id === id ? { ...r, isRead: true } : r));
    await saveRequests(updated);
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteRequest(id: string) {
  try {
    const requests = await getRequests();
    const updated = requests.filter((r) => r.id !== id);
    await saveRequests(updated);
    return { success: true };
  } catch {
    return { success: false };
  }
}
