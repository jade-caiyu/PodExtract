"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/context";
import InputBox from "@/components/InputBox";
import ResultSection from "@/components/ResultSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ExportButtons from "@/components/ExportButtons";
import type { ExtractedResources } from "@/utils/export";
import { addCollection, isAlreadyCollected, getCollections } from "@/utils/collection";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ExtractedResources | null>(null);
  const [isCollected, setIsCollected] = useState(false);
  const [collectionCount, setCollectionCount] = useState(0);

  useEffect(() => {
    setCollectionCount(getCollections().length);
    // Restore results from sessionStorage
    const saved = sessionStorage.getItem("podextract-results");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ExtractedResources;
        setResults(parsed);
        setStatus("success");
        setIsCollected(isAlreadyCollected(parsed));
      } catch {
        sessionStorage.removeItem("podextract-results");
      }
    }
  }, []);

  const handleExtract = async (text: string) => {
    setStatus("loading");
    setError(null);
    setIsCollected(false);

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
      setIsCollected(isAlreadyCollected(data));
      sessionStorage.setItem("podextract-results", JSON.stringify(data));
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      // More friendly error message for common cases
      if (message.includes("Failed to parse") || message.includes("JSON")) {
        setError("Oops, this doesn't look like a podcast show note. Let's try another one?");
      } else if (message.includes("Failed to fetch") || message.includes("network")) {
        setError("Connection issue. Please check the URL and try again.");
      } else {
        setError(message);
      }
      setStatus("error");
    }
  };

  const handleCollect = () => {
    if (!results) return;
    addCollection(results);
    setIsCollected(true);
    setCollectionCount(getCollections().length);
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
        <div className="header-inner">
          <div className="header-left">
            <div className="logo">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="brand">
              <h1 className="title">{t("title")}</h1>
              <p className="subtitle">{t("subtitle")}</p>
            </div>
          </div>
          <div className="header-right">
            <Link href="/collection" className="nav-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>{t("viewCollection")}</span>
              {collectionCount > 0 && (
                <span className="collection-badge">{collectionCount}</span>
              )}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <InputBox onExtract={handleExtract} isLoading={status === "loading"} />
        </div>
      </section>

      {status === "error" && error && (
        <div className="error-message">
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
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
          <p>{t("noResourcesFound")}</p>
          <p className="empty-hint">{t("noResourcesHint")}</p>
        </div>
      )}

      {hasResults && (
        <section className="results-section">
          <div className="results-meta">
            <div className="podcast-waveform">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar"
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
            <div className="podcast-info">
              <h2 className="episode-title">{results.episodeTitle || t("untitled")}</h2>
              <div className="podcast-meta">
                {results.podcastName && (
                  <span className="podcast-name">{results.podcastName}</span>
                )}
                {results.podcastName && results.hostName && (
                  <span>·</span>
                )}
                {results.hostName && (
                  <span>{t("hostLabel")}: {results.hostName}</span>
                )}
              </div>
            </div>
            <div className="results-actions">
              <button
                className={`action-btn ${isCollected ? "collected" : ""}`}
                onClick={handleCollect}
                disabled={isCollected}
              >
                <svg viewBox="0 0 24 24" fill={isCollected ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>{isCollected ? t("collected") : t("collect")}</span>
              </button>
              <button className="action-btn ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{t("exportTitle")}</span>
              </button>
            </div>
          </div>

          <ResultSection type="books" items={results.books} />
          <ResultSection type="music" items={results.music} />
          <ResultSection type="videos" items={results.videos} />
          <ResultSection type="people" items={results.people} />
          <ResultSection type="links" items={results.links} />
        </section>
      )}

      <footer className="footer">
        <a href="https://github.com/jade-caiyu/PodExtract" target="_blank" rel="noopener noreferrer" className="footer-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </footer>
    </main>
  );
}
