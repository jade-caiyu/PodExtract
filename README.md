# PodExtract

[English](#english) | [中文](#中文)

---

## 中文

从播客节目单（show notes）中提取结构化资源的工具。

输入播客链接或文本，自动提取：
- 📚 书籍
- 🎵 音乐  
- 🎬 视频
- 👤 人物
- 🔗 相关链接

### 支持的输入

- 🎙️ 小宇宙播客链接
- 🍎 苹果播客链接
- 📝 直接粘贴节目文本

### 技术栈

- Next.js 15 (App Router)
- 阿里云通义千问 API
- Tailwind CSS v4

### 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 配置 API Key

项目使用阿里云通义千问 API，需要配置环境变量：

1. 获取 API Key：https://dashscope.console.aliyun.com/
2. 创建 `.env.local` 文件：
```env
DASHSCOPE_API_KEY=你的密钥
```
3. 重启开发服务器

### 部署

推荐使用 [Vercel](https://vercel.com)：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 在项目设置中添加环境变量 `DASHSCOPE_API_KEY`
4. 部署完成

### 注意事项

- 需要自备千问 API Key
- API 调用按 token 计费，用量较小

### 联系我

- GitHub: https://github.com/jade-caiyu

---

## English {#english}

Extract structured resources from podcast show notes.

Input a podcast link or text, automatically extract:
- 📚 Books
- 🎵 Music
- 🎬 Videos
- 👤 People
- 🔗 Links

### Supported Input

- 🎙️ Xiaoyuzhou podcast links
- 🍎 Apple Podcasts links
- 📝 Direct text input

### Tech Stack

- Next.js 15 (App Router)
- Alibaba Cloud Qwen API
- Tailwind CSS v4

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000

### API Key Setup

This project uses Alibaba Cloud Qwen API. Configure environment variables:

1. Get API Key: https://dashscope.console.aliyun.com/
2. Create `.env.local`:
```env
DASHSCOPE_API_KEY=your_key
```
3. Restart the development server

### Deployment

Recommended: [Vercel](https://vercel.com)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable `DASHSCOPE_API_KEY` in project settings
4. Deploy

### Note

- You need your own Qwen API Key
- API calls are billed by token usage

### Contact

- GitHub: https://github.com/jade-caiyu

---

## License

MIT