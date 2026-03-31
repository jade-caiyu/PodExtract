"use client";

import { useState, useRef, useEffect } from "react";

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

const PlatformIcon = ({ platform, size = 16 }: { platform: string; size?: number }) => {
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
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.574-.373.92-.373.347 0 .654.124.921.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.574-.373.92-.373.347 0 .662.151.929.4l.027.027c.249.248.373.551.373.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.38.569.393.96v1.173c-.013.391-.143.711-.393.96-.249.25-.56.38-.933.38s-.684-.124-.933-.38c-.25-.249-.38-.569-.393-.96V12.44c0-.373.124-.684.373-.933.25-.249.56-.373.933-.373zm8.027-.96c-.018-.355-.143-.657-.373-.907a1.234 1.234 0 0 0-.907-.373c-.356 0-.657.124-.907.373-.249.249-.373.551-.373.907s.124.657.373.906c.25.25.551.374.907.374.356 0 .658-.125.907-.374.249-.249.373-.551.373-.906z"/>
        </svg>
      );
    case "xiaohongshu":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <circle cx="12" cy="12" r="10" fill="#FF2442"/>
          <text x="12" y="16" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">小红书</text>
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
    case "xiaoyuzhou":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fillOpacity="0.3"/>
        </svg>
      );
    case "goodreads":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12.58 19.25c.52 0 .94-.43.94-.94V5.4c0-.52-.42-.94-.94-.94s-.94.42-.94.94v12.91c0 .52.42.94.94.94zm8.86-4.78c-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-.6 1.04-1.23 1.04H19.4c-.63 0-.93-.44-1.23-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-1.07 1.04-1.72 1.04h-.2c-.65 0-1.07-.44-1.35-1.04-.29-.6-.9-.9-1.47-.67-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.58-.24-1.18.07-1.47.67-.28.6-.7 1.04-1.35 1.04H4.92c-.65 0-1.42-.44-1.72-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-.6 1.04-1.23 1.04H.35c-.63 0-.93-.44-1.23-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35C-3.41 7.5-3.95 7.24-4.22 7.78c-.3.6-.6 1.04-1.23 1.04H-7.4c-.63 0-1.42-.44-1.72-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-1.07 1.04-1.72 1.04h-.2c-.65 0-1.07-.44-1.35-1.04-.29-.6-.9-.9-1.47-.67-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.58-.24-1.18.07-1.47.67-.28.6-.7 1.04-1.35 1.04H-19c-.63 0-.93-.44-1.23-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-.6 1.04-1.23 1.04H-24c-.63 0-.93-.44-1.23-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-1.07 1.04-1.72 1.04h-.2c-.65 0-1.07-.44-1.35-1.04-.29-.6-.9-.9-1.47-.67-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.58-.24-1.18.07-1.47.67-.28.6-.7 1.04-1.35 1.04H-35c-.63 0-.93-.44-1.23-1.04-.27-.54-.84-.78-1.37-.54-.18.08-.33.2-.44.35-.11-.15-.26-.27-.44-.35-.53-.24-1.1 0-1.37.54-.3.6-.6 1.04-1.23 1.04h-.13v15.44c0 .52.42.94.94.94h.93v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h5.57v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h5.57v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h5.57v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-7.26c0-.52.42-.94.94-.94s.94.42.94.94v7.26h.93c.52 0 .94-.43.94-.94v-15.44h-.13c-.63 0-1.42-.44-1.72-1.04z"/>
        </svg>
      );
    case "applepodcasts":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 3.6c1.89 0 3.63.745 4.923 1.905l.015.015 1.62 1.62-.015.015c1.16 1.29 1.905 3.033 1.905 4.923 0 4.96-4.04 9-9 9s-9-4.04-9-9 4.04-9 9-9zm0 16.2c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7 3.13 7 7 7z"/>
        </svg>
      );
    case "ximalaya":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-1v-6h1v6zm0-8h-1V7h1v2zm5 8h-1v-6h1v6zm0-8h-1V7h1v2z"/>
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
    case "wikipedia":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 15l-10-5v7l10 5 10-5v-7l-10 5zm0-8l-10-5v2l10 5 10-5v-2l-10 5z"/>
        </svg>
      );
    case "baidu":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <text x="12" y="16" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">百度</text>
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      );
    case "weibo":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443z"/>
        </svg>
      );
    case "zhihu":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
          <path d="M5.721 0C2.251 0 0 2.25 0 5.719V18.28C0 21.751 2.252 24 5.721 24h12.558C21.751 24 24 21.751 24 18.28V5.72C24 2.249 21.751 0 18.28 0zm1.666 16.752h-2.5l.521-3.104c-.687-.29-1.24-.76-1.687-1.378-.343-.469-.521-.9-.6-1.26-.02-.104-.03-.198-.03-.27 0-.35.105-.59.315-.71.2-.12.42-.17.68-.17.26 0 .48.05.67.16.19.11.34.26.44.44.11.18.17.39.18.63.01.23-.03.45-.11.65-.08.19-.19.36-.33.5-.14.13-.3.24-.48.33-.18.08-.36.15-.55.2-.09.03-.17.05-.25.06-.08.01-.14.02-.19.02-.2 0-.36-.06-.48-.18-.12-.12-.18-.31-.18-.56 0-.22.05-.47.15-.75.1-.28.24-.58.43-.9.19-.32.42-.67.69-1.04.27-.37.58-.76.92-1.16.02-.02.03-.03.05-.05l.38-.38c.03-.02.07-.05.11-.06.04-.01.08-.01.12-.01.08 0 .17.03.26.08l1.08.66c.04.03.08.04.12.04.06 0 .13-.02.2-.05.08-.04.12-.09.14-.17l.02-.08.4-2.28c.02-.11.01-.19-.03-.26-.04-.07-.11-.12-.2-.14-.09-.02-.22-.04-.4-.04H8.01c-.13 0-.22.03-.28.09-.06.06-.1.14-.1.24v2.18c0 .09.03.17.1.23.07.06.16.09.27.09h1.52c.07 0 .13-.01.17-.04.04-.03.07-.07.09-.13l.04-.13.49-2.52c.02-.11 0-.2-.05-.27-.05-.07-.13-.11-.25-.13-.12-.02-.28-.03-.48-.03H7.85c-.13 0-.22.03-.29.09-.07.06-.1.14-.1.24v2.18c0 .09.03.17.1.23.07.06.16.09.27.09h1.18c.08 0 .14-.01.19-.04.05-.03.08-.07.1-.13l.07-.24z"/>
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
  platform,
  wikiUrl,
  baikeUrl,
  author,
  artist,
  bilibiliUrl,
  youtubeUrl,
}: CardProps) {
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
  // For people, show description as subtitle; for others, show author/artist
  const displaySubtitle = type === "people" ? description : displayAuthor;
  const hasValidUrl = url && url.startsWith("http");
  const hasVideoUrls = (bilibiliUrl && bilibiliUrl.startsWith("http")) || (youtubeUrl && youtubeUrl.startsWith("http"));

  // Get primary platform for display
  const getPrimaryPlatform = () => {
    if (type === "people") return "wikipedia";
    if (type === "video") return "douban";
    if (type === "book") return "douban";
    if (type === "music") return "netease";
    if (type === "link") return platform || "website";
    return platform;
  };

  return (
    <div className="resource-card">
      {/* Icon placeholder */}
      <div className="card-thumb-placeholder">
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

      {/* Info */}
      <div className="card-info" data-title={description ? description.slice(0, 200) : undefined}>
        <h3 className="card-title">{title}</h3>
        {displaySubtitle && <span className="card-subtitle">{displaySubtitle}</span>}
      </div>

      {/* Actions */}
      <div className="card-actions">
        {/* People - always show Google and Baidu search */}
        {type === "people" && (
          <>
            <button
              onClick={() => handleOpen(wikiUrl)}
              className="action-btn action-primary"
              title="Google搜索"
            >
              <PlatformIcon platform="google" />
            </button>
            <button
              onClick={() => handleOpen(baikeUrl)}
              className="action-btn action-secondary"
              title="百度搜索"
            >
              <PlatformIcon platform="baidu" />
            </button>
          </>
        )}

        {/* Books */}
        {type === "book" && hasValidUrl && (
          <>
            <button
              onClick={() => handleOpen(url)}
              className="action-btn action-primary"
              title="豆瓣"
            >
              <PlatformIcon platform="douban" />
            </button>
            <button
              onClick={() => handleOpen(`https://www.goodreads.com/search?q=${encodeURIComponent(title)}`)}
              className="action-btn action-secondary"
              title="Goodreads"
            >
              <PlatformIcon platform="goodreads" />
            </button>
          </>
        )}

        {/* Music */}
        {type === "music" && hasValidUrl && (
          <>
            <button
              onClick={() => handleOpen(url)}
              className="action-btn action-primary"
              title="网易云"
            >
              <PlatformIcon platform="netease" />
            </button>
            <button
              onClick={() => handleOpen(`https://open.spotify.com/search/${encodeURIComponent(title)}`)}
              className="action-btn spotify-btn"
              title="Spotify"
            >
              <PlatformIcon platform="spotify" />
            </button>
          </>
        )}

        {/* Videos */}
        {type === "video" && hasVideoUrls && (
          <>
            {bilibiliUrl && bilibiliUrl.startsWith("http") && (
              <button
                onClick={() => handleOpen(bilibiliUrl)}
                className="action-btn action-primary"
                title="Bilibili"
              >
                <PlatformIcon platform="bilibili" />
              </button>
            )}
            {youtubeUrl && youtubeUrl.startsWith("http") && (
              <button
                onClick={() => handleOpen(youtubeUrl)}
                className="action-btn action-secondary"
                title="YouTube"
              >
                <PlatformIcon platform="youtube" />
              </button>
            )}
          </>
        )}

        {/* Links - simple link icon, no platform badge */}
        {type === "link" && hasValidUrl && (
          <button
            onClick={() => handleOpen(url)}
            className="action-btn action-primary"
            title="打开链接"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        )}

        {/* No valid URL - show copy */}
        {!hasValidUrl && (
          <button onClick={handleCopy} className={`action-btn ${copied ? "action-success" : "action-secondary"}`}>
            {copied ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
