"use client";

import { useState } from "react";
import { useTranslation } from "@/app/i18n/context";

interface InputBoxProps {
  onExtract: (text: string) => Promise<void>;
  isLoading: boolean;
}

export default function InputBox({ onExtract, isLoading }: InputBoxProps) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      await onExtract(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-box">
      <div className="input-wrapper">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("placeholder")}
          className="text-input"
          rows={4}
          disabled={isLoading}
        />
      </div>
      <div className="input-footer">
        <span className="input-helper">{t("inputHelper")}</span>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || !text.trim()}
        >
          {isLoading ? (
            <>
              <svg className="icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              {t("extracting")}
            </>
          ) : (
            <>
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              {t("extractButton")}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
