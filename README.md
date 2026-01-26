# DZAMO

Репозиторий содержит лендинг AI-системы продаж DZAMO — одну из страниц личного домена dzamukov.com.

## Структура

```
/ai-systems/ai-enrollment-booster-new.html  — лендинг DZAMO (основная страница)
/ai-systems/images/                         — изображения для лендинга
/index.html                                 — главная страница портфолио
/privacy.html                               — политика конфиденциальности
```

## Деплой

Сайт хостится на **Vercel** с автодеплоем из ветки `main`.

- **Продакшн:** https://dzamukov.com
- **Preview:** автоматически создаётся для каждой ветки/PR

## Форма заявок → Telegram

Заявки с лендинга отправляются в Telegram через Cloudflare Worker.

### Как это работает

1. Пользователь заполняет форму на лендинге
2. Форма отправляет POST-запрос на Cloudflare Worker
3. Worker форматирует данные и отправляет сообщение в Telegram-бот

### Конфигурация

**Worker URL:**
`https://dzamo-lead-worker.georgij-dzamukov.workers.dev/api/lead`

**Где редактировать Worker:**
Cloudflare Dashboard → Workers & Pages → `dzamo-lead-worker` → Edit code

**Переменные окружения (секреты в Cloudflare):**
- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота
- `TELEGRAM_CHAT_ID` — ID чата/группы для уведомлений

**CORS:**
Worker принимает запросы с:
- `dzamukov.com` / `www.dzamukov.com`
- `*.vercel.app` (preview-деплои)
- `localhost:8788` (локальная разработка)

### Поля формы

| Поле | Описание |
|------|----------|
| `name` | Имя |
| `contact` | Контакт (телефон/email/username) |
| `contact_method` | Способ связи (telegram/whatsapp/email) |
| `leads` | Количество заявок в месяц |
| `mrr` | Ежемесячная выручка |
| `niche` | Ниша бизнеса |
| `pain` | Главная боль |
