import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface TelegramProxyPayload {
  name: string;
  phone: string;
  service?: string;
  area?: string;
  message?: string;
}

interface TelegramUpdate {
  message?: { chat?: { id?: number | string } };
  edited_message?: { chat?: { id?: number | string } };
  channel_post?: { chat?: { id?: number | string } };
  edited_channel_post?: { chat?: { id?: number | string } };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildTelegramMessage(data: TelegramProxyPayload): string {
  const lines = [
    '<b>Новая заявка с сайта</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
  ];

  if (data.service) lines.push(`<b>Услуга:</b> ${escapeHtml(data.service)}`);
  if (data.area) lines.push(`<b>Площадь:</b> ${escapeHtml(data.area)} м²`);
  if (data.message) lines.push(`<b>Сообщение:</b> ${escapeHtml(data.message)}`);

  return lines.join('\n');
}

async function getTelegramChatIds(token: string): Promise<string[]> {
  const res = await fetch(
    `https://api.telegram.org/bot${token}/getUpdates?limit=100`,
    {
      cache: 'no-store',
    }
  );
  const json = (await res.json()) as {
    ok: boolean;
    result?: TelegramUpdate[];
    description?: string;
  };

  if (!json.ok || !Array.isArray(json.result)) {
    console.error(
      '[Telegram Proxy] getUpdates failed:',
      json.description || json
    );
    return [];
  }

  const ids = json.result
    .map((update) =>
      String(
        update.message?.chat?.id ??
          update.edited_message?.chat?.id ??
          update.channel_post?.chat?.id ??
          update.edited_channel_post?.chat?.id ??
          ''
      )
    )
    .filter(Boolean);

  return Array.from(new Set(ids));
}

async function sendMessage(token: string, chatId: string, text: string) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    );

    if (res.ok) return { chatId, ok: true };

    const body = await res.text();
    console.error(
      `[Telegram Proxy] sendMessage failed for ${chatId}, attempt ${attempt}:`,
      body
    );
  }

  return { chatId, ok: false };
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.TELEGRAM_PROXY_SECRET;
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!expectedSecret || !token) {
    return NextResponse.json(
      { ok: false, error: 'Telegram proxy is not configured' },
      { status: 500 }
    );
  }

  const providedSecret = req.headers.get('x-telegram-proxy-secret');
  if (providedSecret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const data = (await req.json()) as TelegramProxyPayload;
  if (!data.name || !data.phone) {
    return NextResponse.json(
      { ok: false, error: 'Invalid payload' },
      { status: 400 }
    );
  }

  const chatIds = await getTelegramChatIds(token);
  if (chatIds.length === 0) {
    return NextResponse.json(
      { ok: false, error: 'No Telegram chat IDs found' },
      { status: 404 }
    );
  }

  const text = buildTelegramMessage(data);
  const results = await Promise.all(
    chatIds.map((chatId) => sendMessage(token, chatId, text))
  );
  const sent = results.filter((result) => result.ok).length;

  if (sent === 0) {
    return NextResponse.json(
      { ok: false, error: 'Telegram send failed', chatIds: chatIds.length },
      { status: 502 }
    );
  }
  return NextResponse.json({
    ok: true,
    chatIds: chatIds.length,
    sent,
    failed: chatIds.length - sent,
  });
}
