# PodExtract Reddit 推广

## 版块选择

- r/podcasts — 播客听众核心社区
- r/knowledge — 知识管理爱好者
- r/Zettelkasten — PKM 社区（最可能转化）
- r/Entrepreneur — 商业播客听众
- r/SideProject — 独立开发者/创作者

## 推广帖模板

### 版本 1：知识管理角度（推荐首发 r/Zettelkasten）

```
Title: I built a tool that extracts books & resources from podcast show notes

Body:

Hey everyone,

I listen to a lot of podcasts. The shows I like always mention books, tools, and interesting people - but finding them means going to YouTube/X/Google/Spotify one by one. That's too much friction.

So I built a tool that does it automatically.

Note: It extracts from show notes (the text summary hosts write), not audio. Most podcasts already list their books/links/guests in show notes - this just structures that info automatically.

**What it does:**
Paste a podcast link → Get structured extraction of:
- Books (with author & description)
- People/guests
- Resources & links
- Videos (with Bilibili/YouTube links)
- Music (with NetEase/Spotify info)

Currently supports Xiaoyuzhou, Apple Podcasts, Spotify (with show notes), and direct text input.

Each result comes with direct search links (Douban, NetEase, Spotify, Bilibili, YouTube, Google...) - no more searching manually.

**Why I built it:**
Every podcast mentions 5-20 books/people/resources. Without this tool, I'd have to search each one manually (Douban for books, NetEase for music, Google for people). Now one link gives me everything with direct search links ready to click.

**The stack:**
- Next.js + Tailwind
- Qwen (Alibaba's LLM) for extraction
- localStorage for saving favorites
- Session storage for keeping last extraction across page refreshes

It's a personal project, been using it for three days. Would love feedback from people who actually take notes from podcasts.

GitHub: https://github.com/jade-caiyu/PodExtract
Live demo: [REPLACE_WITH_YOUR_DEPLOYED_URL]

AMA about the build process or the product decisions.
```

### 版本 2：实用工具角度（首发 r/podcasts）

```
Title: Made a tool that extracts books & resources from podcast show notes

Body:

Problem: Podcasts always mention books and resources in show notes, but looking them up one by one (Douban, Google, Bilibili...) = I never do it. Too much friction.

Solution: Paste the podcast link, it extracts everything into structured format:

- Books (with descriptions)
- People mentioned
- Videos
- Links

Supports: Xiaoyuzhou, Apple Podcasts, Spotify (with show notes), or paste any text.

Example use cases:
- Get direct links to Douban/NetEase/YouTube instead of searching manually
- Build a reading list from your favorite podcasts
- Track which guests appear across multiple episodes
- Export to Notion/Obsidian for your PKM system

It's free, no account needed. All data stays local.

Demo: [REPLACE_WITH_YOUR_DEPLOYED_URL]
GitHub: https://github.com/jade-caiyu/PodExtract

Curious if this solves a real problem for people or if I'm just building for myself
```

### 版本 3：创作者角度（适合 r/SideProject）

```
Title: I spent 2 weeks building a tool to solve my "podcast resource" problem

Body:

TL;DR: Built a tool that extracts books/people/resources from podcast show notes → saves to your personal knowledge base. No more manual copying.

**The problem I had:**
- Listen to 3-4 podcasts per day
- Each episode mentions 5-20 books/people/resources
- Looking them up manually (Douban, Google, Bilibili) = I never do it
- Tried note-taking, gave up after a week

**What I built:**
Paste podcast link → LLM reads show notes → extracts structured data → saved to localStorage

Note: It works from show notes (the text summary hosts write), not audio. Most podcasts already list their books/links in show notes - this just automates extraction.

**Tech:**
- Next.js 15
- Alibaba Qwen API (way cheaper than OpenAI for this use case)
- Tailwind CSS v4
- localStorage for persistence (no backend needed)

**The collection feature:**
Extracted items are saved to browser localStorage. You can:
- Browse by podcast
- Search by book/people name
- Export to JSON (for Notion/Obsidian backup)
- Import when switching devices

No account, no cloud sync, all data stays local.

This is v1. Would love to hear:
1. Does this problem actually exist for others?
2. Would you actually use a localStorage-only approach?

GitHub: https://github.com/jade-caiyu/PodExtract
```

## 发布节奏建议

| 时间 | 动作 |
|------|------|
| Day 1 | 先在 r/Zettelkasten 发帖（社区更欢迎工具分享） |
| Day 3-5 | 如果有反馈，在 r/podcasts 发 |
| Day 7 | r/SideProject 发"我是怎么做的" |
| 持续 | 回答所有评论，保持活跃 |

## 版本 4：r/vibecoding（开发者社区）

```
Title: Built a tool that extracts books & resources from podcast show notes using Qwen API

Body:

Hey r/vibecoding,

I've been listening to a lot of developer podcasts (Ship It, Syntax, Changelog) and wanted an easier way to capture the resources hosts mention.

Most podcasts already list books/links/guests in show notes - I just wanted to structure that automatically.

**What it does:**
Paste podcast show notes → LLM extracts:
- Books (with author & description)
- People/guests
- Videos (Bilibili/YouTube)
- Music (Spotify/NetEase)
- All links mentioned

**Tech stack:**
- Next.js 15 (App Router)
- Qwen API from Alibaba (much cheaper than OpenAI for this use case)
- Tailwind CSS v4
- localStorage for personal collection (no backend needed)
- Session storage for keeping last extraction

**Why Qwen:**
Started with Claude, but Qwen is 10x cheaper for extraction tasks. The prompt is simple - just structured output from show notes.

**Why localStorage:**
v1 is local-first. No account, no cloud, all data stays in browser. Can export to JSON anytime.

Would love feedback from devs who actually take notes from podcasts.

Demo: [YOUR_URL]
GitHub: https://github.com/jade-caiyu/PodExtract
```

## 注意事项

- **不要**第一天就发所有版块
- **要**积极回复每条评论
- **避免** short URLs，用完整链接
- **不要**在标题用 emoji（Reddit 文化）
- **不要**说 "free tool" 之类的，太像营销
- Self-promo 限制：尽量参与其他讨论，不要只发自己的东西
