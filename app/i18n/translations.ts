export const translations = {
  en: {
    // Header
    title: "PodExtract",
    subtitle: "Transform podcast show notes into structured resources",

    // Input
    placeholder: "📚Books 🎵Music 🎬Videos 👥People — Paste podcast show notes or episode descriptions, I'll extract everything for you...",
    inputHelper: "Supports direct URL parsing",
    extractButton: "Extract Resources",
    extracting: "Extracting...",

    // Empty/Error states
    errorTitle: "Error",
    noResourcesFound: "No resources found in the provided text.",
    noResourcesHint: "Try pasting show notes that mention books, music, or links.",

    // Sections
    books: "Books",
    music: "Music",
    videos: "Videos",
    people: "People",
    links: "Links",

    // Card
    searchOnDouban: "Search on Douban",
    searchOnNetease: "Search on NetEase",
    searchOnBilibili: "Search on Bilibili",
    searchOnYouTube: "Search on YouTube",
    searchOnGoogle: "Search on Google",
    searchOnBaidu: "Search on Baidu",
    visitLink: "Visit",

    // Podcast Header
    podcastLabel: "Podcast",
    hostLabel: "Host",

    // Export
    exportTitle: "Export",
    exportMarkdown: "Download Markdown",
    exportNotion: "Copy for Notion",
    copied: "Copied!",

    // Language
    language: "Language",
    chinese: "中文",
    english: "English",

    // Collection
    collectionTitle: "My Collection",
    collectionEmpty: "No items collected yet. Extract a podcast and click Collect to save.",
    collectionStorageTip: "Data stored locally in browser · Different browsers/devices will not share data",
    clickRowHint: "Click a row to view details",
    deletedToast: "Deleted 1 item",
    undo: "Undo",
    backToHome: "Back",
    searchPlaceholder: "Search by podcast, book, or person...",
    collectedAt: "Collected",
    items: "items",
    untitled: "Untitled",
    noResults: "No matching results",
    collect: "Collect",
    collected: "Collected",
    viewCollection: "Collection",

    // Table headers
    episodeTitle: "Episode",
    podcastName: "Podcast",
    hostName: "Host",
  },
  zh: {
    // Header
    title: "PodExtract",
    subtitle: "将播客笔记转化为结构化资源",

    // Input
    placeholder: "📚书籍 🎵音乐 🎬视频 👥人物 — 粘贴播客笔记或节目描述，我来帮你提取所有资源...",
    inputHelper: "支持直接解析 URL",
    extractButton: "提取资源",
    extracting: "提取中...",

    // Empty/Error states
    errorTitle: "错误",
    noResourcesFound: "未在提供的文本中找到资源。",
    noResourcesHint: "尝试粘贴包含书籍、音乐或链接的 show notes。",

    // Sections
    books: "书籍",
    music: "音乐",
    videos: "视频",
    people: "人物",
    links: "链接",

    // Card
    searchOnDouban: "豆瓣搜索",
    searchOnNetease: "网易云搜索",
    searchOnBilibili: "B站搜索",
    searchOnYouTube: "YouTube搜索",
    searchOnGoogle: "Google搜索",
    searchOnBaidu: "百度搜索",
    visitLink: "访问",

    // Podcast Header
    podcastLabel: "播客",
    hostLabel: "主播",

    // Export
    exportTitle: "导出",
    exportMarkdown: "下载 Markdown",
    exportNotion: "复制为 Notion 格式",
    copied: "已复制！",

    // Language
    language: "语言",
    chinese: "中文",
    english: "English",

    // Collection
    collectionTitle: "我的收藏",
    collectionEmpty: "还没有收藏内容。提取播客后点击收藏按钮保存。",
    collectionStorageTip: "数据存储在浏览器本地 · 切换浏览器或设备数据不互通",
    clickRowHint: "点击某行查看详情",
    deletedToast: "已删除 1 条收藏",
    undo: "撤销",
    backToHome: "返回",
    searchPlaceholder: "搜索播客、书籍或人物...",
    collectedAt: "收藏时间",
    items: "条",
    untitled: "无标题",
    noResults: "没有匹配结果",
    collect: "收藏",
    collected: "已收藏",
    viewCollection: "收藏夹",

    // Table headers
    episodeTitle: "节目标题",
    podcastName: "播客名称",
    hostName: "主播",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
