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
Title: I built a tool to extract books/people/resources from podcast show notes automatically

Body:

Hey everyone,

I listen to a lot of podcasts (1500+ hours) and always forget which books were mentioned after listening. Last month I decided to actually do something about it.

**What it does:**
Paste a podcast link → Get structured extraction of:
- 📚 Books (with author & description)
- 👤 People/guests
- 🔗 Resources & links
- 🎬 Videos (with Bilibili/YouTube links)
- 🎵 Music (with artist info)

Currently supports Xiaoyuzhou, Apple Podcasts, and direct text input.

**Why I built it:**
Every podcast I listen to mentions 5-20 books. After the episode ends, I never remember them. Googling "which books were mentioned in episode X" doesn't work.

**The stack:**
- Next.js + Tailwind
- Qwen (Alibaba's LLM) for extraction
- localStorage for saving favorites
- Session storage for keeping last extraction across page refreshes

**New in v2:**
- Undo delete in collection (5-second window)
- Multi-platform search links (Douban, NetEase, Spotify, Bilibili, YouTube, Google, Baidu)
- Bilingual UI (EN/ZH)
- Export to Markdown or Notion format

It's a personal project, been using it for a month. Would love feedback from people who actually take notes from podcasts.

GitHub: https://github.com/jade-caiyu/PodExtract
Live demo: [deployed link]

AMA about the build process or the product decisions.
```

### 版本 2：实用工具角度（首发 r/podcasts）

```
Title: Made a tool that extracts books & resources from podcast show notes

Body:

Not sure if this is allowed here, but I've been working on this for a while.

Problem: I listen to a lot of business/podcast content and want to actually remember the books and resources mentioned. But the show notes are usually buried in links.

Solution: Paste the podcast link, it extracts everything into structured format:

- Books (with descriptions)
- People mentioned
- Videos
- Links

Supports: Xiaoyuzhou, Apple Podcasts, or paste any text

Example use case:
- "I heard this podcast mention a book, but I can't remember which one"
- "I want to build a reading list from my favorite podcasts"
- "I want to track which guests appear across multiple episodes"

It's free, no account needed.

Demo: [link]
GitHub: [link]

Curious if this solves a real problem for people or if I'm just building for myself 😅
```

### 版本 3：创作者角度（适合 r/SideProject）

```
Title: I spent 2 weeks building a tool to solve my "podcast memory" problem

Body:

TL;DR: Built a tool that extracts structured resources from podcast show notes → saved to personal knowledge base.

**The problem I had:**
- Listen to 3-4 podcasts per day
- Each episode mentions 5-20 books/people/resources
- After listening, I remember nothing
- Tried manual note-taking, gave up after a week

**What I built:**
Paste podcast link → LLM extracts structured data → save to localStorage collection

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

## 注意事项

- **不要**第一天就发所有版块
- **要**积极回复每条评论
- **避免** short URLs，用完整链接
- **不要**在标题用 emoji（Reddit 文化）
- **不要**说 "free tool" 之类的，太像营销
- Self-promo 限制：尽量参与其他讨论，不要只发自己的东西
