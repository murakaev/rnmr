<h1>
  <img src="./assets/logo.png" width="40" height="40" align="center">
  rnmr
</h1>

[![TypeScript](https://img.shields.io/badge/TypeScript-7.0%2B-blue)](https://www.typescriptlang.org/)
[![Telegraf](https://img.shields.io/badge/Telegraf-4.16%2B-blue)](https://telegraf.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1%2B-green)](https://vitest.dev/)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-red)](LICENSE)

Telegram bot that checks name availability across platforms — GitHub, npm, PyPI, and more.

Try it out: [@rnmr_search_bot](https://t.me/rnmr_search_bot)

## Features

- 🔍 Check if a name is taken, similar, or available
- 📦 Supported Providers: GitHub, npm, PyPI, domains (RDAP)
- ⚡ Parallel checks, per-name caching (10 min TTL)
- 🚦 Per-user rate limiting
- ✅ Unit tested (Vitest)

## Preview

<img height="400" src="https://github.com/user-attachments/assets/e28dbf9b-f003-4813-ba39-9a1106bd0a2b" />

## Usage

Start a chat with the bot and run:
```text
/check myname
```

### Statuses

- ✅ `AVAILABLE` — free to use
- ⚠️ `SIMILAR` — similar names exist
- ❌ `TAKEN` — exact match found

## Setup

### Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable       | Required | Description                                                            |
| -------------- | -------- | ---------------------------------------------------------------------- |
| `BOT_TOKEN`    | Yes      | Telegram bot token from [@BotFather](https://t.me/BotFather)           |
| `GITHUB_TOKEN` | No       | GitHub personal access token — raises rate limit from 10 to 30 req/min |

### Run with Docker

#### 1. Build the image

```bash
docker build -t rnmr-bot .
```

#### 2. Run the container

```bash
docker run -d --name rnmr-bot --env-file .env --restart unless-stopped rnmr-bot
```

### Run with npm

#### 1. Install dependencies

```bash
npm install
```

#### 2. Run

```bash
npm run dev    # development
npm run build && npm start   # production
```

### Test

```bash
npm test
```

## License

MIT
