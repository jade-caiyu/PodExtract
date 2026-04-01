"use client";

import { useState } from "react";
import { useTranslation } from "@/app/i18n/context";
import {
  downloadMarkdown,
  generateNotionBlocks,
  copyToClipboard,
} from "@/utils/export";
import type { ExtractedResources } from "@/utils/export";

interface ExportButtonsProps {
  data: ExtractedResources;
}

export default function ExportButtons({ data }: ExportButtonsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = async () => {
    const content = generateNotionBlocks(data);
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = (format: string) => {
    if (format === "markdown") {
      downloadMarkdown(data);
    }
  };

  return (
    <div className="action-btn-group" style={{ position: "relative" }}>
      <button
        className="action-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>{t("exportTitle")}</span>
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: "0.375rem",
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              padding: "0.25rem",
              minWidth: "180px",
              zIndex: 100,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.5rem 0.625rem",
                background: "none",
                border: "none",
                borderRadius: "6px",
                color: "var(--color-text-secondary)",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
              onClick={() => {
                handleDownload("markdown");
                setIsOpen(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>{t("exportMarkdown")}</span>
            </button>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.5rem 0.625rem",
                background: "none",
                border: "none",
                borderRadius: "6px",
                color: "var(--color-text-secondary)",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
              onClick={() => {
                handleCopy();
                setIsOpen(false);
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              <span>{copied ? t("copied") : t("exportNotion")}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
