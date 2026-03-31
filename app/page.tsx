"use client";

import { useState } from "react";
import InputBox from "@/components/InputBox";
import ResultSection from "@/components/ResultSection";
import PodcastHeader from "@/components/PodcastHeader";

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

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ExtractedResources | null>(null);

  const handleExtract = async (text: string) => {
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to extract resources");
      }

      const data: ExtractedResources = await response.json();
      setResults(data);
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setStatus("error");
    }
  };

  const hasResults = results && (
    results.books.length > 0 ||
    results.music.length > 0 ||
    results.videos.length > 0 ||
    results.people.length > 0 ||
    results.links.length > 0
  );

  return (
    <main className="main">
      <header className="header">
        <div className="logo">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="title">PodExtract</h1>
        <p className="subtitle">Transform podcast show notes into structured resources</p>
      </header>

      <section className="input-section">
        <InputBox onExtract={handleExtract} isLoading={status === "loading"} />
      </section>

      {status === "error" && error && (
        <div className="error-message">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      {status === "success" && !hasResults && (
        <div className="empty-state">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M11 8v6" />
            <path d="M8 11h6" />
          </svg>
          <p>No resources found in the provided text.</p>
          <p className="empty-hint">Try pasting show notes that mention books, music, or links.</p>
        </div>
      )}

      {hasResults && (
        <section className="results-section">
          <PodcastHeader podcastName={results.podcastName || ""} episodeTitle={results.episodeTitle || ""} hostName={results.hostName || ""} />
          <ResultSection type="books" items={results.books} />
          <ResultSection type="music" items={results.music} />
          <ResultSection type="videos" items={results.videos} />
          <ResultSection type="people" items={results.people} />
          <ResultSection type="links" items={results.links} />
        </section>
      )}
    </main>
  );
}
