"use client";

import { useState } from "react";
import { useTranslation } from "@/app/i18n/context";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        className="nav-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("language")}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span style={{ fontSize: "0.75rem" }}>{language === "zh" ? "中文" : "EN"}</span>
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
              minWidth: "100px",
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
                background: language === "en" ? "var(--color-accent-muted)" : "none",
                border: "none",
                borderRadius: "6px",
                color: language === "en" ? "var(--color-accent)" : "var(--color-text-secondary)",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
              onClick={() => {
                setLanguage("en");
                setIsOpen(false);
              }}
            >
              <span style={{ fontSize: "1rem" }}>🇺🇸</span>
              <span>{t("english")}</span>
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.5rem 0.625rem",
                background: language === "zh" ? "var(--color-accent-muted)" : "none",
                border: "none",
                borderRadius: "6px",
                color: language === "zh" ? "var(--color-accent)" : "var(--color-text-secondary)",
                fontSize: "0.8125rem",
                fontFamily: "inherit",
                cursor: "pointer",
              }}
              onClick={() => {
                setLanguage("zh");
                setIsOpen(false);
              }}
            >
              <span style={{ fontSize: "1rem" }}>🇨🇳</span>
              <span>{t("chinese")}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
