"use client";

import { useState } from "react";
import { useTranslation } from "@/app/i18n/context";

interface CardProps {
  type: "book" | "music" | "link" | "video" | "people";
  title: string;
  description?: string;
  url?: string;
  platform?: string;
  wikiUrl?: string;
  baikeUrl?: string;
  author?: string;
  artist?: string;
  bilibiliUrl?: string;
  youtubeUrl?: string;
}

const PlatformIcon = ({ platform, size = 14 }: { platform: string; size?: number }) => {
  const style = { width: size, height: size };

  switch (platform) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case "bilibili":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.574-.373.92-.373.347 0 .654.124.921.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.574-.373.92-.373.347 0 .662.151.929.4l.027.027c.249.248.373.551.373.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333z"/>
        </svg>
      );
    case "douban":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm7.5 14.5h-5v-1.25c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25V17zm1.25-5.5h-7.5v-4.5c0-.41.34-.75.75-.75h5.25c.41 0 .75.34.75.75v4.5z"/>
        </svg>
      );
    case "netease":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      );
    case "google":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      );
    case "baidu":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">百度</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      );
  }
};

export default function Card({
  type,
  title,
  description,
  url,
  wikiUrl,
  baikeUrl,
  author,
  artist,
  bilibiliUrl,
  youtubeUrl,
}: CardProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleOpen = (openUrl?: string) => {
    if (openUrl) {
      window.open(openUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = async () => {
    const textToCopy = url ? `${title}: ${url}` : title;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayAuthor = author || artist;
  const displaySubtitle = type === "people" ? description : displayAuthor;
  const hasValidUrl = url && url.startsWith("http");
  const hasVideoUrls = (bilibiliUrl && bilibiliUrl.startsWith("http")) || (youtubeUrl && youtubeUrl.startsWith("http"));

  return (
    <div className="resource-card">
      <div className="card-icon">
        {type === "people" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          </svg>
        ) : type === "video" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
          </svg>
        ) : type === "book" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        ) : type === "music" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="5.5" cy="4.5" r="2.5" />
            <circle cx="18.5" cy="16.5" r="2" />
            <path d="M9 18V5l12-2v13" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </div>

      <div className="card-info" data-title={description ? description.slice(0, 200) : undefined}>
        <h3 className="card-title">{title}</h3>
        {displaySubtitle && <span className="card-subtitle">{displaySubtitle}</span>}
      </div>

      <div className="card-actions">
        {type === "people" && (
          <>
            <button
              onClick={() => handleOpen(wikiUrl)}
              className="platform-btn primary"
              title={t("searchOnGoogle")}
            >
              <PlatformIcon platform="google" />
            </button>
            <button
              onClick={() => handleOpen(baikeUrl)}
              className="platform-btn secondary"
              title={t("searchOnBaidu")}
            >
              <PlatformIcon platform="baidu" />
            </button>
          </>
        )}

        {type === "book" && hasValidUrl && (
          <>
            <button
              onClick={() => handleOpen(url)}
              className="platform-btn primary"
              title={t("searchOnDouban")}
            >
              <PlatformIcon platform="douban" />
            </button>
            <button
              onClick={() => handleOpen(`https://www.goodreads.com/search?q=${encodeURIComponent(title)}`)}
              className="platform-btn secondary"
              title="Goodreads"
            >
              <PlatformIcon platform="google" />
            </button>
          </>
        )}

        {type === "music" && hasValidUrl && (
          <>
            <button
              onClick={() => handleOpen(url)}
              className="platform-btn primary"
              title={t("searchOnNetease")}
            >
              <PlatformIcon platform="netease" />
            </button>
            <button
              onClick={() => handleOpen(`https://open.spotify.com/search/${encodeURIComponent(title)}`)}
              className="platform-btn spotify"
              title="Spotify"
            >
              <PlatformIcon platform="spotify" />
            </button>
          </>
        )}

        {type === "video" && hasVideoUrls && (
          <>
            {bilibiliUrl && bilibiliUrl.startsWith("http") && (
              <button
                onClick={() => handleOpen(bilibiliUrl)}
                className="platform-btn primary"
                title={t("searchOnBilibili")}
              >
                <PlatformIcon platform="bilibili" />
              </button>
            )}
            {youtubeUrl && youtubeUrl.startsWith("http") && (
              <button
                onClick={() => handleOpen(youtubeUrl)}
                className="platform-btn secondary"
                title={t("searchOnYouTube")}
              >
                <PlatformIcon platform="youtube" />
              </button>
            )}
          </>
        )}

        {type === "link" && hasValidUrl && (
          <button
            onClick={() => handleOpen(url)}
            className="platform-btn primary"
            title={t("visitLink")}
          >
            <PlatformIcon platform="website" />
          </button>
        )}

        {!hasValidUrl && (
          <button onClick={handleCopy} className="platform-btn secondary">
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
