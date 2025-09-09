# 🚀 Инструкция по установке

## Предварительные требования

### 1. Установка Node.js

**macOS (через Homebrew):**
```bash
# Установите Homebrew, если не установлен
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Установите Node.js
brew install node
```

**macOS (официальный установщик):**
1. Перейдите на [nodejs.org](https://nodejs.org/)
2. Скачайте LTS версию для macOS
3. Запустите установщик и следуйте инструкциям

**Windows:**
1. Перейдите на [nodejs.org](https://nodejs.org/)
2. Скачайте LTS версию для Windows
3. Запустите установщик и следуйте инструкциям

**Linux (Ubuntu/Debian):**
```bash
# Обновите пакеты
sudo apt update

# Установите Node.js
sudo apt install nodejs npm

# Проверьте версии
node --version
npm --version
```

### 2. Проверка установки

После установки Node.js выполните:
```bash
node --version  # Должна быть версия 16+ 
npm --version   # Должна быть версия 8+
```

## Установка проекта

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd sunduchok-game
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск в режиме разработки
```bash
npm start
```

Приложение откроется в браузере по адресу [http://localhost:3000](http://localhost:3000)

### 4. Сборка для продакшена
```bash
npm run build
```

## Возможные проблемы

### Ошибка "command not found: npm"
- Убедитесь, что Node.js установлен корректно
- Перезапустите терминал
- Проверьте переменные окружения PATH

### Ошибки при установке зависимостей
```bash
# Очистите кэш npm
npm cache clean --force

# Удалите node_modules и package-lock.json
rm -rf node_modules package-lock.json

# Переустановите зависимости
npm install
```

### Проблемы с правами доступа (macOS/Linux)
```bash
# Установите npm глобально с правами пользователя
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

## Альтернативные способы запуска

### Через Yarn
```bash
# Установите Yarn
npm install -g yarn

# Установите зависимости
yarn install

# Запустите проект
yarn start
```

### Через pnpm
```bash
# Установите pnpm
npm install -g pnpm

# Установите зависимости
pnpm install

# Запустите проект
pnpm start
```

## Деплой

### Netlify
1. Подключите репозиторий к Netlify
2. Настройки сборки:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Деплой автоматически при пуше в main

### Vercel
```bash
npm install -g vercel
vercel
```

### GitHub Pages
```bash
npm install -g gh-pages
npm run build
npx gh-pages -d build
```

## Поддержка

Если у вас возникли проблемы:
1. Проверьте версии Node.js и npm
2. Убедитесь, что все зависимости установлены
3. Проверьте логи ошибок в консоли браузера
4. Создайте issue в репозитории
