# EazyCRM Landing

Одностраничный лендинг SaaS‑продукта EazyCRM (CRM‑бот для экспертов). Построен на React + Vite + Tailwind CSS. Готов к деплою на Netlify.

## Запуск локально

1. Установите зависимости:
```bash
npm i
```
2. Запустите дев‑сервер:
```bash
npm run dev
```

## Билд
```bash
npm run build
```

## Деплой на Netlify
- Подключите репозиторий к Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Файлы `netlify.toml` и `public/_redirects` уже добавлены

## Цвета и типографика
- Базовые нейтрали: белый, светло‑серый, тёмный (без использования синего)
- Акценты: зелёный, оранжевый, жёлтый
- Шрифт: Inter (системные fallback)
