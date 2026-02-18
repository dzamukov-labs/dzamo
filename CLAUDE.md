# CLAUDE.md — правила для работы с проектом dzamukov.com

## Структура проекта

- `index.html` — главная страница (RU)
- `en/index.html` — главная страница (EN)
- `index.ai.html` / `en/index.ai.html` — AI-версии для поисковых систем
- `images/photos/` — оптимизированные фото для сайта (WebP)
- `images/originals/` — исходные фото (не коммитятся, в .gitignore)
- `ai-systems/` — страницы AI-продуктов

## Двуязычность

Каждое изменение контента ОБЯЗАТЕЛЬНО дублировать в:
1. `index.html` (RU)
2. `en/index.html` (EN)
3. `index.ai.html` (RU AI-версия) — если затрагивает структурные данные
4. `en/index.ai.html` (EN AI-версия) — если затрагивает структурные данные

## Оптимизация фото

1. **Формат:** WebP
2. **Ширина:** 800px (высота пропорциональна)
3. **Качество:** 80%
4. **Инструмент:** Python Pillow (`Image.resize` с `LANCZOS`, `.save("WEBP", quality=80)`)
5. **Именование:** латиница, kebab-case, смысловые имена (напр. `expedition-arctic-selfie.webp`, `saunas-team.webp`)
6. **HTML-атрибуты:** `loading="lazy"`, `width`, `height` — всегда указывать
7. **CSS:** `object-fit: cover` для масштабирования в контейнерах
8. **Оригиналы:** после оптимизации перемещать в `images/originals/`

## Alt-тексты

- Описательные, на языке страницы (RU для index.html, EN для en/index.html)
- Включают контекст, локацию, действие
- Пример: «Георгий Дзамуков в 1200 км от Северного полюса — селфи в арктической экипировке»

## Галереи / карусели

- Используют атрибут `data-gallery` на контейнере
- Слайды: `.gallery-slide` (первый с классом `.active`)
- Навигация: `.gallery-dots` + `.gallery-arrow--prev` / `.gallery-arrow--next`
- Подписи: `.gallery-caption` (короткие, 3-7 слов)
- JS уже есть в конце страницы — автоплей, свайп, точки, стрелки

## Дизайн

- Тёмная тема: `--bg: #0c0b0a`, `--bg-card: #131211`
- Акцент: `--accent: #c8a96e` (золотой)
- Текст: `--text: #f0ece4`, `--text-dim: #7a746a`
- Шрифты: `Inter` (основной), `DM Serif Display` (заголовки/числа)
- Скруглённые углы карточек: `border-radius: 12px`
- Анимации: `.reveal` классы с IntersectionObserver
