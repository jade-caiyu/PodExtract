"use client";

import Card from "./Card";

interface ResourceItem {
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

interface ResultSectionProps {
  type: "books" | "music" | "videos" | "people" | "links";
  items: ResourceItem[];
}

const SECTION_CONFIG = {
  books: {
    emoji: "📚",
    title: "Books",
    cardType: "book" as const,
  },
  music: {
    emoji: "🎵",
    title: "Music",
    cardType: "music" as const,
  },
  videos: {
    emoji: "🎬",
    title: "Videos",
    cardType: "video" as const,
  },
  people: {
    emoji: "👤",
    title: "People",
    cardType: "people" as const,
  },
  links: {
    emoji: "🔗",
    title: "Links",
    cardType: "link" as const,
  },
};

export default function ResultSection({ type, items }: ResultSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const config = SECTION_CONFIG[type];

  return (
    <section className="result-section">
      <div className="section-header">
        <span className="section-emoji">{config.emoji}</span>
        <h2 className="section-title">{config.title}</h2>
        <span className="section-count">{items.length}</span>
      </div>
      <div className="resource-list">
        {items.map((item, index) => (
          <Card
            key={index}
            type={config.cardType}
            title={item.name || item.title || ""}
            description={item.description}
            url={item.url}
            platform={item.platform}
            wikiUrl={item.wikiUrl}
            baikeUrl={item.baikeUrl}
            author={item.author}
            artist={item.artist}
            bilibiliUrl={item.bilibiliUrl}
            youtubeUrl={item.youtubeUrl}
          />
        ))}
      </div>
    </section>
  );
}
