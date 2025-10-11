export default {
  async fetch(request, env, ctx) {
    const allowedOrigins = new Set([
      "https://dzamukov.com",
      "https://www.dzamukov.com",
      "http://localhost:8788",
      "http://127.0.0.1:8788"
    ]);

    // Preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request, allowedOrigins);
    }

    const url = new URL(request.url);
    if (url.pathname !== '/api/lead') {
      return new Response('Not found', { status: 404 });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, request, allowedOrigins);
    }

    try {
      const data = await request.json();

      // простая валидация ключевых полей
      const required = ['mrr','leads','platform','contact_method','contact'];
      for (const key of required) {
        if (!data[key]) {
          return json({ error: `Missing field: ${key}` }, 400, request, allowedOrigins);
        }
      }

      // Собираем понятное сообщение
      const lines = [
        `Новая заявка с dzamukov.com`,
        `Ежемесячная выручка: ${data.mrr}`,
        `Размер базы лидов: ${data.leads}`,
        `Платформа: ${data.platform}`,
        `Куда прислать расчёт: ${data.contact_method}`,
        `Контакт: ${data.contact}`,
        data.school ? `Ссылка на школу: ${data.school}` : null,
        data.pain ? `Сильная боль: ${data.pain}` : null,
        '',
        (data.utm_source || data.utm_medium || data.utm_campaign || data.utm_content || data.fbclid || data.gclid) ? 'UTM/Ads:' : null,
        data.utm_source ? `utm_source: ${data.utm_source}` : null,
        data.utm_medium ? `utm_medium: ${data.utm_medium}` : null,
        data.utm_campaign ? `utm_campaign: ${data.utm_campaign}` : null,
        data.utm_content ? `utm_content: ${data.utm_content}` : null,
        data.fbclid ? `fbclid: ${data.fbclid}` : null,
        data.gclid ? `gclid: ${data.gclid}` : null,
        '',
        data.referer ? `referer: ${data.referer}` : null,
        data.landing_url ? `landing_url: ${data.landing_url}` : null,
      ].filter(Boolean);

      const text = lines.join('\n');

      // Telegram sendMessage
      const token = env.TELEGRAM_BOT_TOKEN;
      const chatId = env.TELEGRAM_CHAT_ID; // для канала это может быть @channel_username или numeric id с -100
      if (!token || !chatId) {
        return json({ error: 'Server is not configured' }, 500, request, allowedOrigins);
      }

      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      const tgRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true })
      });

      if (!tgRes.ok) {
        const body = await tgRes.text();
        console.error('Telegram error:', tgRes.status, body);
        return json({ error: 'Failed to deliver' }, 502, request, allowedOrigins);
      }

      return json({ ok: true }, 200, request, allowedOrigins);
    } catch (err) {
      console.error(err);
      return json({ error: 'Bad request' }, 400, request, allowedOrigins);
    }
  }
}

function corsHeaders(request, allowedOrigins) {
  const origin = request.headers.get('Origin') || '';
  const isAllowed = allowedOrigins.has(origin);
  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'https://dzamukov.com',
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

function handleOptions(request, allowedOrigins) {
  // CORS preflight
  if (request.headers.get('Origin') !== null && request.headers.get('Access-Control-Request-Method') !== null) {
    return new Response(null, { headers: corsHeaders(request, allowedOrigins) });
  }
  // стандартный OPTIONS запрос
  return new Response(null, { headers: { 'Allow': 'POST, OPTIONS' } });
}

function json(obj, status, request, allowedOrigins) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(request, allowedOrigins)
    }
  });
}


