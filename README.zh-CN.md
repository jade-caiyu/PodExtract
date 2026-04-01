[English](README.md) | 中文

# PodExtract

从播客节目单（show notes）中提取结构化资源的工具。

输入播客链接或文本，自动提取：
- 📚 书籍
- 🎵 音乐  
- 🎬 视频
- 👤 人物
- 🔗 相关链接

## 功能特点

- **AI 智能提取** — 阿里千问驱动，精准解析节目内容
- **多平台跳转** — 豆瓣、网易云音乐、Spotify、Bilibili、YouTube、Google、百度百科直达链接
- **个人收藏夹** — 本地保存，支持撤销恢复
- **搜索过滤** — 按播客、书籍、人物名称快速查找
- **导出备份** — 下载 Markdown 或复制为 Notion 格式
- **双语支持** — 中文 & English
- **本地优先** — 所有数据存储在浏览器本地

## 支持的输入

- 🎙️ 小宇宙播客链接
- 🍎 苹果播客链接
- 📝 直接粘贴节目文本

## 技术栈

- Next.js 15 (App Router)
- 阿里云通义千问 API
- Tailwind CSS v4

## 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:3000

## 配置 API Key

1. 获取 API Key：https://dashscope.console.aliyun.com/
2. 创建 `.env.local`：
```
DASHSCOPE_API_KEY=你的密钥
```
3. 重启服务器

## 部署

推荐使用 [Vercel](https://vercel.com)：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 在项目设置中添加环境变量 `DASHSCOPE_API_KEY`
4. 部署完成

## 注意事项

- 需要自备千问 API Key
- API 调用按 token 计费，用量较小

## License

MIT