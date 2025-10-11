# DZAMUKOV.AI Landing Style Rules

## Цель
Создавать премиальные, адаптивные HTML-страницы уровня Lovable и Claude Opus.  
Минимум кода — максимум дизайна, чистоты и читаемости.

## Общие принципы
- Используй только **HTML5 + Tailwind CSS** через CDN:  
  `<script src="https://cdn.tailwindcss.com"></script>`
- Без JS и фреймворков (React, Vue и т.п.)
- Mobile-first подход (адаптивность обязательна)
- Структура строго семантическая: `<header>`, `<main>`, `<section>`, `<footer>`
- Код структурируй с комментариями по блокам (Hero, Features, CTA и т.д.)
- Вся страница должна быть **сбалансирована визуально**: воздух, выравнивание, визуальная иерархия
- Страницы должны быть seo-дружелюбными и детально проработанными под Google и LLM поиск

## Цветовая палитра
- Фон страницы: `bg-gradient-to-b from-[#1E1B4B] to-[#111827]`
- Акцентные цвета: `from-[#8B5CF6] to-[#EC4899]`
- Текст: `text-gray-100` (основной), `text-gray-400` (второстепенный)
- Белые блоки (на контрастных секциях) — `bg-white/5` с `backdrop-blur`

## Типографика
- Шрифт: **Inter, sans-serif**
- Крупные заголовки: `text-4xl md:text-6xl font-bold tracking-tight`
- Подзаголовки: `text-xl md:text-2xl text-gray-300 leading-relaxed`
- Обычный текст: `text-base md:text-lg leading-relaxed`
- Отступы секций: `py-20 md:py-28`
- Контейнер: `max-w-6xl mx-auto px-6 md:px-10`

## Дизайн и компоненты
- Кнопки CTA:
  ```html
  <a href="#" class="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white font-semibold shadow-lg hover:shadow-xl transition">Текст кнопки</a>
- Карточки: rounded-2xl shadow-xl bg-white/5 border border-white/10 p-8
- Изображения — с мягкими тенями и rounded-xl
- Обязательно добавлять плавные переходы (transition-all, duration-300)
- Уделять внимание ритму и “воздуху” (минимум визуального шума)
- Добавлять декоративные градиенты или свечения в hero-блоке (через bg-gradient-to-r или blur-3xl)

## Поведение Cursor
- Все новые страницы должны автоматически использовать этот визуальный стиль
- При редактировании существующих файлов — Cursor должен предлагать сохранить единый ритм и типографику
- Не добавлять lorem ipsum — использовать {{TEXT_HERE}} как placeholder
- Следить, чтобы секции выглядели “ровно”: одинаковые отступы, шрифты и расстояния между блоками