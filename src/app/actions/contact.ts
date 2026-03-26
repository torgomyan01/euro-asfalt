'use server';

import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';

async function getTelegramChatIds(token: string): Promise<string[]> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates?limit=100`);
    const json = await res.json() as {
      ok: boolean;
      result: Array<{ message?: { chat: { id: number } }; channel_post?: { chat: { id: number } } }>;
    };

    if (json.ok && Array.isArray(json.result)) {
      const ids = json.result
        .map((u) => String(u.message?.chat?.id ?? u.channel_post?.chat?.id ?? ''))
        .filter(Boolean);

      return Array.from(new Set(ids));
    }
  } catch (err) {
    console.error('[Telegram] getUpdates failed:', err);
  }

  return [];
}

async function sendTelegramNotification(data: ContactFormData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return;

  const chatIds = await getTelegramChatIds(token);
  if (chatIds.length === 0) {
    console.warn('[Telegram] No chat IDs found');
    return;
  }

  const lines = [
    '📋 *Новая заявка с сайта*',
    '',
    `👤 *Имя:* ${data.name}`,
    `📞 *Телефон:* ${data.phone}`,
  ];
  if (data.service) lines.push(`🔧 *Услуга:* ${data.service}`);
  if (data.area) lines.push(`📐 *Площадь:* ${data.area} м²`);
  if (data.message) lines.push(`💬 *Сообщение:* ${data.message}`);

  const text = lines.join('\n');

  await Promise.all(
    chatIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
      }).catch((err) => console.error(`[Telegram] Failed to send to ${chatId}:`, err))
    )
  );
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
