"use client";

import { useTranslation } from "@/app/i18n/context";
import { TranslationKey } from "@/app/i18n/translations";
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

const SECTION_EMOJI = {
  books: "📚",
  music: "🎵",
  videos: "🎬",
  people: "👤",
  links: "🔗",
} as const;

const SECTION_KEYS = {
  books: "books",
  music: "music",
  videos: "videos",
  people: "people",
  links: "links",
} as const;

export default function ResultSection({ type, items }: ResultSectionProps) {
  const { t } = useTranslation();

  if (!items || items.length === 0) {
    return null;
  }

  const titleKey = SECTION_KEYS[type] as TranslationKey;
  const title = t(titleKey);

  return (
    <section className="result-section">
      <div className="section-header">
        <span className="section-emoji">{SECTION_EMOJI[type]}</span>
        <h2 className="section-title">{title}</h2>
        <span className="section-count">{items.length}</span>
      </div>
      <div className="resource-list">
        {items.map((item, index) => (
          <Card
            key={index}
            type={type === "links" ? "link" : type === "books" ? "book" : type === "videos" ? "video" : type}
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
