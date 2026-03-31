**English** | [中文](README.zh-CN.md)

# PodExtract

Extract structured resources from podcast show notes.

Input a podcast link or text, automatically extract:
- 📚 Books
- 🎵 Music
- 🎬 Videos
- 👤 People
- 🔗 Links

## Supported Input

- 🎙️ Xiaoyuzhou podcast links
- 🍎 Apple Podcasts links
- 📝 Direct text input

## Tech Stack

- Next.js 15 (App Router)
- Alibaba Cloud Qwen API
- Tailwind CSS v4

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

## API Key Setup

This project uses Alibaba Cloud Qwen API. Configure environment variables:

1. Get API Key: https://dashscope.console.aliyun.com/
2. Create `.env.local`:
```env
DASHSCOPE_API_KEY=your_key
```
3. Restart the development server

## Deployment

Recommended: [Vercel](https://vercel.com)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable `DASHSCOPE_API_KEY` in project settings
4. Deploy

## Note

- You need your own Qwen API Key
- API calls are billed by token usage

## License

MIT