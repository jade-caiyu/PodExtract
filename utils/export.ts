export interface ResourceItem {
  name?: string;
  description?: string;
  author?: string;
  artist?: string;
  title?: string;
  url?: string;
  platform?: string;
  wikiUrl?: string;
  baikeUrl?: string;
  bilibiliUrl?: string;
  youtubeUrl?: string;
}

export interface ExtractedResources {
  podcastName?: string;
  episodeTitle?: string;
  hostName?: string;
  books: ResourceItem[];
  music: ResourceItem[];
  videos: ResourceItem[];
  people: ResourceItem[];
  links: ResourceItem[];
}

export function generateMarkdown(data: ExtractedResources): string {
  const lines: string[] = [];

  if (data.episodeTitle) {
    lines.push(`# ${data.episodeTitle}`);
    lines.push("");
  }

  if (data.podcastName || data.hostName) {
    const meta: string[] = [];
    if (data.podcastName) meta.push(`**${data.podcastName}**`);
    if (data.hostName) meta.push(`Host: ${data.hostName}`);
    lines.push(meta.join(" · "));
    lines.push("");
  }

  lines.push("---");
  lines.push("");

  if (data.books.length > 0) {
    lines.push("## Books");
    lines.push("");
    data.books.forEach((book) => {
      const name = book.name || book.title || "";
      const desc = book.description ? ` — ${book.description}` : "";
      const author = book.author ? ` *(by ${book.author})*` : "";
      const url = book.url ? ` [Search](${book.url})` : "";
      lines.push(`- 《${name}》${author}${desc}${url}`);
    });
    lines.push("");
  }

  if (data.music.length > 0) {
    lines.push("## Music");
    lines.push("");
    data.music.forEach((item) => {
      const name = item.name || item.title || "";
      const artist = item.artist ? ` — ${item.artist}` : "";
      const url = item.url ? ` [Search](${item.url})` : "";
      lines.push(`- ${name}${artist}${url}`);
    });
    lines.push("");
  }

  if (data.videos.length > 0) {
    lines.push("## Videos");
    lines.push("");
    data.videos.forEach((video) => {
      const name = video.name || video.title || "";
      const desc = video.description ? ` — ${video.description}` : "";
      const bilibili = video.bilibiliUrl ? ` [Bilibili](${video.bilibiliUrl})` : "";
      const youtube = video.youtubeUrl ? ` [YouTube](${video.youtubeUrl})` : "";
      lines.push(`- ${name}${desc}${bilibili}${youtube}`);
    });
    lines.push("");
  }

  if (data.people.length > 0) {
    lines.push("## People");
    lines.push("");
    data.people.forEach((person) => {
      const name = person.name || "";
      const desc = person.description ? ` — ${person.description}` : "";
      const google = person.wikiUrl ? ` [Google](${person.wikiUrl})` : "";
      const baidu = person.baikeUrl ? ` [Baidu](${person.baikeUrl})` : "";
      lines.push(`- ${name}${desc}${google}${baidu}`);
    });
    lines.push("");
  }

  if (data.links.length > 0) {
    lines.push("## Links");
    lines.push("");
    data.links.forEach((link) => {
      const title = link.title || link.url || "";
      const url = link.url || "";
      lines.push(`- [${title}](${url})`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

export function generateNotionBlocks(data: ExtractedResources): string {
  const blocks: string[] = [];

  if (data.episodeTitle) {
    blocks.push(`**${data.episodeTitle}**`);
    blocks.push("");
  }

  if (data.podcastName) {
    blocks.push(`${data.podcastName}`);
  }
  if (data.hostName) {
    blocks.push(`Host: ${data.hostName}`);
  }
  blocks.push("");
  blocks.push("---");
  blocks.push("");

  if (data.books.length > 0) {
    blocks.push("**Books**");
    data.books.forEach((book) => {
      const name = book.name || book.title || "";
      const desc = book.description ? ` — ${book.description}` : "";
      const author = book.author ? ` *(by ${book.author})*` : "";
      const url = book.url ? ` [Search](${book.url})` : "";
      blocks.push(`- 《${name}》${author}${desc}${url}`);
    });
    blocks.push("");
  }

  if (data.music.length > 0) {
    blocks.push("**Music**");
    data.music.forEach((item) => {
      const name = item.name || item.title || "";
      const artist = item.artist ? ` — ${item.artist}` : "";
      const url = item.url ? ` [Search](${item.url})` : "";
      blocks.push(`- ${name}${artist}${url}`);
    });
    blocks.push("");
  }

  if (data.videos.length > 0) {
    blocks.push("**Videos**");
    data.videos.forEach((video) => {
      const name = video.name || video.title || "";
      const desc = video.description ? ` — ${video.description}` : "";
      const bilibili = video.bilibiliUrl ? ` [Bilibili](${video.bilibiliUrl})` : "";
      const youtube = video.youtubeUrl ? ` [YouTube](${video.youtubeUrl})` : "";
      blocks.push(`- ${name}${desc}${bilibili}${youtube}`);
    });
    blocks.push("");
  }

  if (data.people.length > 0) {
    blocks.push("**People**");
    data.people.forEach((person) => {
      const name = person.name || "";
      const desc = person.description ? ` — ${person.description}` : "";
      const google = person.wikiUrl ? ` [Google](${person.wikiUrl})` : "";
      const baidu = person.baikeUrl ? ` [Baidu](${person.baikeUrl})` : "";
      blocks.push(`- ${name}${desc}${google}${baidu}`);
    });
    blocks.push("");
  }

  if (data.links.length > 0) {
    blocks.push("**Links**");
    data.links.forEach((link) => {
      const title = link.title || link.url || "";
      const url = link.url || "";
      blocks.push(`- [${title}](${url})`);
    });
    blocks.push("");
  }

  return blocks.join("\n");
}

export function downloadMarkdown(data: ExtractedResources) {
  const content = generateMarkdown(data);
  const episodeSlug = (data.episodeTitle || "podcast-notes")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-")
    .substring(0, 40);
  const filename = `podextract-${episodeSlug}.md`;

  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJSON(data: ExtractedResources) {
  const content = JSON.stringify(data, null, 2);
  const episodeSlug = (data.episodeTitle || "podcast-notes")
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "-")
    .substring(0, 40);
  const filename = `podextract-${episodeSlug}.json`;

  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  }
}
