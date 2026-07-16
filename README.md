# rnmr

Telegram bot that checks name availability across platforms — start with GitHub, more providers coming.

## Features

- 🔍 Check if a name is taken, similar, or available
- 📦 GitHub search provider (npm, PyPI, domains planned)
- ⚡ Parallel provider checks with isolated error handling

## Usage

Start a chat with the bot and run:
`/check myname`

Statuses:

- 🟢 `AVAILABLE` — free to use
- 🟡 `SIMILAR` — similar names exist
- 🔴 `TAKEN` — exact match found

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable       | Required | Description                                                            |
| -------------- | -------- | ---------------------------------------------------------------------- |
| `BOT_TOKEN`    | Yes      | Telegram bot token from [@BotFather](https://t.me/BotFather)           |
| `GITHUB_TOKEN` | No       | GitHub personal access token — raises rate limit from 10 to 30 req/min |

### 3. Run

```bash
npm run dev    # development
npm run build && npm start   # production
```

## License

MIT
