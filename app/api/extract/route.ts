import { NextRequest, NextResponse } from "next/server";

const PROMPT_TEMPLATE = `Extract structured resources from the text below.

Return JSON in this format:

{
  "podcastName": "",
  "episodeTitle": "",
  "hostName": "",
  "books": [{"name": "", "description": "", "author": ""}],
  "music": [{"name": "", "description": "", "artist": ""}],
  "videos": [{"name": "", "description": "", "type": ""}],
  "people": [{"name": "", "description": "", "role": ""}],
  "links": [{"title": "", "url": ""}]
}

Rules:
- Return ONLY JSON, no explanations
- IMPORTANT: Keep the full episode title including episode number (e.g., "E229", "第229期", "S2E5"). Do not strip or modify the episode identifier.
- Extract podcast name (the show/series name), episode title (this specific episode's title), and host name if identifiable from the content
- IMPORTANT: Separate 【entity name】 from 【context/description】 strictly. Name should be clean without书名号《》 or author mentions
- For "books": extract book name ONLY (remove《》brackets, remove "author of" etc). Put context in description field
- For "music": song/album name only, artist in artist field
- For "videos": movie/TV/documentary name only, type in type field
- For "people": ONLY extract guests, experts, authors, or notable people mentioned in the content. NEVER include the podcast host. IMPORTANT: You MUST fill in the description field with their role or most notable work/identity. Example: "CFA, FRM, 前媒体人" or "价值投资者，《与巴菲特共进午餐》作者". Do not leave description empty.
- For "links": ONLY extract actual URLs that start with http:// or https://. Each link must have a valid url field. Use the page title or anchor text as title if available. EXCLUDE: shopping sites (京东, 淘宝, 天猫), timestamps, and Baidu Wangpan links.
- If podcast/host/episode cannot be determined, use empty string ""
- If nothing found in a category, return empty array []

Text:
{{INPUT_TEXT}}`;

interface ResourceItem {
  name?: string;
  description?: string;
  author?: string;
  artist?: string;
  title?: string;
  url?: string;
  platform?: string;
  type?: string;
  role?: string;
  wikiUrl?: string;
  baikeUrl?: string;
  bilibiliUrl?: string;
  youtubeUrl?: string;
}

interface ExtractedResources {
  podcastName?: string;
  episodeTitle?: string;
  hostName?: string;
  books: ResourceItem[];
  music: ResourceItem[];
  videos: ResourceItem[];
  people: ResourceItem[];
  links: ResourceItem[];
}

function extractTextFromHTML(html: string): string {
  let text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  text = text.replace(/<[^>]+>/g, " ");
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/\s+/g, " ").trim();

  // Filter out timestamps like "04:38", "16:17", "00:00" etc.
  text = text.replace(/\b\d{1,2}:\d{2}(:\d{2})?\b/g, "");

  // Filter out comments section (评论区) and everything after it
  const commentIndex = text.indexOf("评论区");
  if (commentIndex !== -1) {
    text = text.substring(0, commentIndex);
  }

  // Filter out Baidu Wangpan links
  text = text.replace(/百度网盘[：:]?\s*[^\s]*/gi, "");
  text = text.replace(/链接[：:]?\s*[^\s]*/gi, "");

  // Filter out shopping sites
  text = text.replace(/京东[：:]?\s*[^\s]*/gi, "");
  text = text.replace(/淘宝[：:]?\s*[^\s]*/gi, "");
  text = text.replace(/天猫[：:]?\s*[^\s]*/gi, "");

  // Clean up multiple spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}

async function fetchShowNotesFromURL(url: string): Promise<string> {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Only HTTP/HTTPS URLs are supported");
  }

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PodExtract/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch URL: ${response.status}`);
  }

  const html = await response.text();
  const text = extractTextFromHTML(html);
  return text.slice(0, 8000);
}

function isURL(input: string): boolean {
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function detectPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) return "youtube";
    if (hostname.includes("bilibili.com") || hostname.includes("b23.tv")) return "bilibili";
    if (hostname.includes("xiaohongshu.com") || hostname.includes("xhslink.com")) return "xiaohongshu";
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) return "twitter";
    if (hostname.includes("github.com")) return "github";
    if (hostname.includes("douban.com")) return "douban";
    if (hostname.includes("music.163.com") || hostname.includes("y.music.163.com")) return "netease";
    if (hostname.includes("spotify.com")) return "spotify";
    if (hostname.includes("xiaoyuzhoufm.com") || hostname.includes("xiaoyuzhoufm")) return "xiaoyuzhou";
    if (hostname.includes("podcasts.apple.com") || hostname.includes("apple.co")) return "applepodcasts";
    if (hostname.includes("ximalaya.com")) return "ximalaya";
    if (hostname.includes("wikipedia.org")) return "wikipedia";
    if (hostname.includes("baike.baidu.com")) return "baidu";
    if (hostname.includes("instagram.com")) return "instagram";
    if (hostname.includes("weibo.com")) return "weibo";
    if (hostname.includes("zhihu.com")) return "zhihu";
    if (hostname.includes("mp.weixin.qq.com")) return "wechat";
    return "website";
  } catch {
    return "other";
  }
}

function cleanName(name: string): string {
  // Remove book title brackets 《》 and any trailing context like "author of..."
  return name.replace(/《|》/g, "").replace(/\s*author\s+of\s+.+$/i, "").trim();
}

function generateBookUrl(bookName: string): string {
  const nameEncoded = encodeURIComponent(cleanName(bookName));
  return `https://www.douban.com/search?q=${nameEncoded}`;
}

function generateMusicUrl(songName: string, artist?: string): string {
  const nameEncoded = encodeURIComponent(cleanName(songName));
  const artistEncoded = artist ? encodeURIComponent(cleanName(artist)) : "";
  return `https://music.163.com/#/search/m/?s=${nameEncoded}${artistEncoded ? `+${artistEncoded}` : ""}`;
}

function generateBilibiliVideoUrl(videoName: string): string {
  const nameEncoded = encodeURIComponent(cleanName(videoName));
  return `https://www.google.com/search?q=${nameEncoded}+site%3Abilibili.com`;
}

function generateYouTubeVideoUrl(videoName: string): string {
  const nameEncoded = encodeURIComponent(cleanName(videoName));
  return `https://www.google.com/search?q=${nameEncoded}+site%3Ayoutube.com`;
}

function generateWikiUrl(name: string): string {
  const nameEncoded = encodeURIComponent(cleanName(name));
  return `https://www.google.com/search?q=${nameEncoded}`;
}

function generateBaikeUrl(name: string): string {
  const nameEncoded = encodeURIComponent(cleanName(name));
  return `https://www.baidu.com/s?wd=${nameEncoded}`;
}

function generateSocialSearchUrl(platform: string, account: string): string {
  const accountEncoded = encodeURIComponent(account);
  switch (platform) {
    case "xiaohongshu":
      return `https://www.xiaohongshu.com/search_result?keyword=${accountEncoded}`;
    case "bilibili":
      return `https://search.bilibili.com/upuser?keyword=${accountEncoded}`;
    case "weibo":
      // Direct to Weibo user search
      return `https://weibo.com/u/${encodeURIComponent(account)}/info`;
    case "zhihu":
      return `https://www.zhihu.com/search?type=people&q=${accountEncoded}`;
    case "twitter":
      return `https://twitter.com/${account}`;
    case "instagram":
      return `https://www.instagram.com/${account}/`;
    case "wechat":
      // WeChat public accounts don't have public search, use Google
      return `https://www.google.com/search?q=${accountEncoded}+微信公众号`;
    default:
      return `https://www.google.com/search?q=${accountEncoded}`;
  }
}

async function enrichBooks(books: ResourceItem[]): Promise<ResourceItem[]> {
  return Promise.all(
    books.map(async (book) => {
      const searchUrl = generateBookUrl(book.name || "");
      return {
        ...book,
        url: searchUrl,
      };
    })
  );
}

async function enrichMusic(music: ResourceItem[]): Promise<ResourceItem[]> {
  return Promise.all(
    music.map(async (item) => {
      const searchUrl = generateMusicUrl(item.name || "", item.artist);
      return {
        ...item,
        url: searchUrl,
      };
    })
  );
}

async function enrichVideos(videos: ResourceItem[]): Promise<ResourceItem[]> {
  return Promise.all(
    videos.map(async (video) => {
      return {
        ...video,
        bilibiliUrl: generateBilibiliVideoUrl(video.name || ""),
        youtubeUrl: generateYouTubeVideoUrl(video.name || ""),
      };
    })
  );
}

async function enrichPeople(people: ResourceItem[]): Promise<ResourceItem[]> {
  return Promise.all(
    people.map(async (person) => {
      // Combine name and description for more precise search
      const searchTerm = [person.name, person.description]
        .filter(Boolean)
        .join(" ");
      return {
        ...person,
        wikiUrl: generateWikiUrl(searchTerm),
        baikeUrl: generateBaikeUrl(searchTerm),
      };
    })
  );
}

async function enrichLinks(links: ResourceItem[]): Promise<ResourceItem[]> {
  return Promise.all(
    links.map(async (link) => {
      let url = link.url || "";
      // Only keep valid http/https URLs
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return null;
      }

      // Use title if provided, otherwise use URL
      let title = link.title || url;
      // Truncate long URLs for display
      if (title.length > 60) {
        title = title.substring(0, 57) + "...";
      }

      return {
        title,
        url,
      };
    })
  ).then(results => results.filter((r): r is NonNullable<typeof r> => r !== null));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let inputText = text.trim();

    if (isURL(inputText)) {
      try {
        inputText = await fetchShowNotesFromURL(inputText);
      } catch (urlError) {
        return NextResponse.json(
          { error: urlError instanceof Error ? urlError.message : "Failed to fetch URL" },
          { status: 400 }
        );
      }
    }

    const prompt = PROMPT_TEMPLATE.replace("{{INPUT_TEXT}}", inputText);
    const apiKey = process.env.DASHSCOPE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "DASHSCOPE_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "qwen-plus",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 4096,
          temperature: 0.1,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DashScope API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to call LLM API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const responseText = data.choices?.[0]?.message?.content;

    if (!responseText) {
      return NextResponse.json({ error: "Invalid response from LLM" }, { status: 500 });
    }

    let extractedData: ExtractedResources;
    try {
      let jsonStr = responseText.trim();
      const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonStr = jsonMatch[1];
      }
      extractedData = JSON.parse(jsonStr);
    } catch {
      return NextResponse.json({ error: "Failed to parse LLM response as JSON" }, { status: 500 });
    }

    if (!extractedData || typeof extractedData !== "object") {
      return NextResponse.json({ error: "Invalid response structure" }, { status: 500 });
    }

    const podcastName = typeof extractedData.podcastName === "string" ? extractedData.podcastName : "";
    const episodeTitle = typeof extractedData.episodeTitle === "string" ? extractedData.episodeTitle : "";
    const hostName = typeof extractedData.hostName === "string" ? extractedData.hostName : "";
    const books = Array.isArray(extractedData.books) ? extractedData.books : [];
    const music = Array.isArray(extractedData.music) ? extractedData.music : [];
    const videos = Array.isArray(extractedData.videos) ? extractedData.videos : [];
    const people = Array.isArray(extractedData.people) ? extractedData.people : [];
    const links = Array.isArray(extractedData.links) ? extractedData.links : [];

    const [enrichedBooks, enrichedMusic, enrichedVideos, enrichedPeople, enrichedLinks] = await Promise.all([
      enrichBooks(books),
      enrichMusic(music),
      enrichVideos(videos),
      enrichPeople(people),
      enrichLinks(links),
    ]);

    // Filter out the host from people list (case-insensitive match)
    const filteredPeople = enrichedPeople.filter(person => {
      const name = person.name || "";
      // Case-insensitive partial match
      if (hostName && hostName.length >= 2) {
        const lowerName = name.toLowerCase();
        const lowerHost = hostName.toLowerCase();
        if (lowerName.includes(lowerHost) || lowerHost.includes(lowerName)) {
          return false;
        }
      }
      return true;
    });

    return NextResponse.json({
      podcastName,
      episodeTitle,
      hostName,
      books: enrichedBooks,
      music: enrichedMusic,
      videos: enrichedVideos,
      people: filteredPeople,
      links: enrichedLinks,
    });
  } catch (error) {
    console.error("Error in /api/extract:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
