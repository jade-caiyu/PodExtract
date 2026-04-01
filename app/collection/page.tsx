"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "@/app/i18n/context";
import type { CollectedItem } from "@/utils/collection";
import { getCollections, removeCollection } from "@/utils/collection";

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="highlight">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function PlatformBtn({ url, title }: { url?: string; title: string }) {
  if (!url || !url.startsWith("http")) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="detail-platform-btn" title={title}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

export default function CollectionPage() {
  const { t } = useTranslation();
  const [collections, setCollections] = useState<CollectedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CollectedItem | null>(null);

  useEffect(() => {
    setCollections(getCollections());
  }, []);

  const filteredCollections = collections.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.podcastName?.toLowerCase().includes(query) ||
      item.episodeTitle?.toLowerCase().includes(query) ||
      item.hostName?.toLowerCase().includes(query) ||
      item.books.some((b) => b.name?.toLowerCase().includes(query)) ||
      item.people.some((p) => p.name?.toLowerCase().includes(query))
    );
  });

  const selectedItem = selectedId
    ? collections.find((item) => item.id === selectedId)
    : null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemToDelete = collections.find((item) => item.id === id);
    if (!itemToDelete) return;

    // Optimistic delete - remove from UI immediately
    setCollections((prev) => prev.filter((item) => item.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }

    // Show toast with undo option
    setPendingDelete(itemToDelete);

    // Auto-hide toast after 5 seconds - actually delete from localStorage
    setTimeout(() => {
      setPendingDelete((current) => {
        if (current && current.id === id) {
          removeCollection(id);
          setPendingDelete(null);
        }
        return null;
      });
    }, 5000);
  };

  const handleUndoDelete = () => {
    if (!pendingDelete) return;

    // Restore: add the pending item back to current collections and save
    const restored = [pendingDelete, ...collections];
    localStorage.setItem("podcast-collections", JSON.stringify(restored));
    setCollections(restored);
    setPendingDelete(null);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  if (collections.length === 0) {
    return (
      <div className="collection-page">
        <header className="collection-header">
          <div className="collection-header-inner">
            <Link href="/" className="back-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>{t("backToHome")}</span>
            </Link>
            <h1 className="collection-title">{t("collectionTitle")}</h1>
          </div>
        </header>
        <div className="collection-content">
          <p className="storage-tip">{t("collectionStorageTip")}</p>
          <div className="empty-collection">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <p>{t("collectionEmpty")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <header className="collection-header">
        <div className="collection-header-inner">
          <Link href="/" className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>{t("backToHome")}</span>
          </Link>
          <h1 className="collection-title">{t("collectionTitle")}</h1>
          <span className="collection-count-badge">{collections.length} {t("items")}</span>
        </div>
      </header>

      <div className="collection-content">
        <div className="collection-layout">
          <div className="collection-list-panel">
            <div className="collection-toolbar">
              <div className="search-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="collection-table-container">
              <table className="collection-table">
                <thead>
                  <tr>
                    <th>{t("episodeTitle")}</th>
                    <th>{t("podcastName")}</th>
                    <th>{t("collectedAt")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCollections.map((item) => (
                    <tr
                      key={item.id}
                      className={selectedId === item.id ? "selected" : ""}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <td className="episode-cell">{item.episodeTitle || t("untitled")}</td>
                      <td className="podcast-cell">{item.podcastName || "-"}</td>
                      <td className="date-cell">{formatDate(item.collectedAt)}</td>
                      <td className="delete-cell">
                        <button
                          className="delete-btn"
                          onClick={(e) => handleDelete(item.id, e)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCollections.length === 0 && searchQuery && (
                <div className="no-results">
                  <p>{t("noResults")}</p>
                </div>
              )}
            </div>
            <p className="storage-tip">{t("collectionStorageTip")}</p>
          </div>

          <div className="detail-panel">
            {selectedItem ? (
              <>
                <div className="detail-header">
                  <h3 className="detail-title">
                    <HighlightText text={selectedItem.episodeTitle || t("untitled")} query={searchQuery} />
                  </h3>
                  <button className="detail-close" onClick={() => setSelectedId(null)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="detail-meta">
                  {selectedItem.podcastName && (
                    <span className="detail-meta-item">
                      <HighlightText text={selectedItem.podcastName} query={searchQuery} />
                    </span>
                  )}
                  {selectedItem.hostName && (
                    <span className="detail-meta-item">
                      {t("hostLabel")}: <HighlightText text={selectedItem.hostName} query={searchQuery} />
                    </span>
                  )}
                  <span className="detail-meta-item">{formatDate(selectedItem.collectedAt)}</span>
                </div>

                {selectedItem.books.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-section-title">{t("books")} ({selectedItem.books.length})</h4>
                    <ul className="detail-section-list">
                      {selectedItem.books.map((book, i) => (
                        <li key={i}>
                          <span className="item-name">《<HighlightText text={book.name} query={searchQuery} />》</span>
                          {book.author && <span className="item-author"> <HighlightText text={book.author} query={searchQuery} /></span>}
                          {book.description && <span className="item-desc"> — <HighlightText text={book.description} query={searchQuery} /></span>}
                          <span className="item-actions">
                            <PlatformBtn url={book.url} title={t("searchOnDouban")} />
                            {book.url && <a href={`https://www.goodreads.com/search?q=${encodeURIComponent(book.name)}`} target="_blank" rel="noopener noreferrer" className="detail-platform-btn" title="Goodreads">G</a>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.music.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-section-title">{t("music")} ({selectedItem.music.length})</h4>
                    <ul className="detail-section-list">
                      {selectedItem.music.map((item, i) => (
                        <li key={i}>
                          <span className="item-name"><HighlightText text={item.name || item.title || ""} query={searchQuery} /></span>
                          {item.artist && <span className="item-author"> <HighlightText text={item.artist} query={searchQuery} /></span>}
                          {item.description && <span className="item-desc"> — <HighlightText text={item.description} query={searchQuery} /></span>}
                          <span className="item-actions">
                            <PlatformBtn url={item.url} title={t("searchOnNetease")} />
                            {item.url && <a href={`https://open.spotify.com/search/${encodeURIComponent(item.name || item.title || "")}`} target="_blank" rel="noopener noreferrer" className="detail-platform-btn" title="Spotify">S</a>}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.videos.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-section-title">{t("videos")} ({selectedItem.videos.length})</h4>
                    <ul className="detail-section-list">
                      {selectedItem.videos.map((item, i) => (
                        <li key={i}>
                          <span className="item-name"><HighlightText text={item.name || item.title || ""} query={searchQuery} /></span>
                          {item.description && <span className="item-desc"> — <HighlightText text={item.description} query={searchQuery} /></span>}
                          <span className="item-actions">
                            <PlatformBtn url={item.bilibiliUrl} title={t("searchOnBilibili")} />
                            <PlatformBtn url={item.youtubeUrl} title={t("searchOnYouTube")} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.people.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-section-title">{t("people")} ({selectedItem.people.length})</h4>
                    <ul className="detail-section-list">
                      {selectedItem.people.map((person, i) => (
                        <li key={i}>
                          <span className="item-name"><HighlightText text={person.name} query={searchQuery} /></span>
                          {person.description && <span className="item-desc"> — <HighlightText text={person.description} query={searchQuery} /></span>}
                          <span className="item-actions">
                            <PlatformBtn url={person.wikiUrl} title={t("searchOnGoogle")} />
                            <PlatformBtn url={person.baikeUrl} title={t("searchOnBaidu")} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedItem.links.length > 0 && (
                  <div className="detail-section">
                    <h4 className="detail-section-title">{t("links")} ({selectedItem.links.length})</h4>
                    <ul className="detail-section-list">
                      {selectedItem.links.map((link, i) => (
                        <li key={i}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <HighlightText text={link.title || link.url} query={searchQuery} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-detail">
                <p>{t("clickRowHint")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {pendingDelete && (
        <div className="toast">
          <span>{t("deletedToast")}</span>
          <button className="toast-undo" onClick={handleUndoDelete}>{t("undo")}</button>
        </div>
      )}

      <footer className="footer">
        <a href="https://github.com/jade-caiyu/PodExtract" target="_blank" rel="noopener noreferrer" className="footer-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>GitHub</span>
        </a>
      </footer>
    </div>
  );
}
