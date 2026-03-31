# 🧾 PRD: Podcast Resource Extractor (MVP)

## 1. Product Overview

Build a web application that takes podcast show notes (unstructured text) as input and outputs structured resources (books, music, links) using an LLM.

The output should be displayed in a clean, card-based UI and allow users to quickly consume and act on extracted information.

---

## 2. Goals (MVP Scope)

* Convert unstructured podcast show notes into structured data
* Provide a clean, readable UI for extracted resources
* Enable basic user actions (copy, open links)

---

## 3. Non-Goals (IMPORTANT)

DO NOT implement the following in MVP:

* Authentication / login
* Database / persistence
* RSS fetching
* Podcast platform integrations
* Background jobs
* Payments / subscriptions

---

## 4. User Flow

1. User pastes podcast show notes into a textarea
2. User clicks "Extract Resources"
3. Frontend sends request to backend API
4. Backend calls LLM to parse content
5. Backend returns structured JSON
6. Frontend renders categorized resource cards

---

## 5. Functional Requirements

### 5.1 Input Module

* Textarea input
* Placeholder: "Paste podcast show notes here..."
* Button: "Extract Resources"

---

### 5.2 API Endpoint

POST /api/extract

#### Request Body:

```json
{
  "text": "string"
}
```

#### Response Body:

```json
{
  "books": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "music": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "links": [
    {
      "title": "string",
      "url": "string"
    }
  ]
}
```

---

### 5.3 LLM Parsing Logic

The LLM should:

* Extract:

  * Books
  * Music
  * Links
* Ignore irrelevant content
* Return valid JSON ONLY (no markdown, no explanation)

---

### 5.4 Prompt Template

Use the following prompt:

```
Extract structured resources from the text below.

Return JSON in this format:

{
  "books": [{"name": "", "description": ""}],
  "music": [{"name": "", "description": ""}],
  "links": [{"title": "", "url": ""}]
}

Rules:
- Only return JSON
- Do not include explanations
- If none found, return empty arrays

Text:
{{INPUT_TEXT}}
```

---

### 5.5 UI Requirements

#### Layout:

* Centered container (max-width: 800px)
* Top: Title + description
* Middle: Input textarea + button
* Bottom: Results section

---

#### Result Sections:

Each category should be displayed only if not empty:

* 📚 Books
* 🎵 Music
* 🔗 Links

---

#### Card Design:

Each item should be a card with:

* Title (bold)
* Description (small text)
* Action buttons:

Books:

* "Copy"

Music:

* "Copy"

Links:

* "Open" (opens in new tab)

---

### 5.6 States

* Loading state (button disabled + spinner)
* Error state (show message)
* Empty state (no results)

---

### 5.7 Utility Features

* Copy to clipboard (books/music list)
* Open links in new tab

---

## 6. Tech Stack

Frontend:

* Next.js (App Router)
* React
* Tailwind CSS

Backend:

* Next.js API routes

LLM:

* Any (DeepSeek / OpenAI / MiniMax)

---

## 7. File Structure (Suggested)

* /app/page.tsx
* /app/api/extract/route.ts
* /components/InputBox.tsx
* /components/ResultSection.tsx
* /components/Card.tsx

---

## 8. Acceptance Criteria

* User can paste text and get structured output
* JSON parsing works reliably
* UI is clean and readable
* No crashes on invalid input
* Response time < 5s

---

## 9. Nice-to-Have (ONLY if time allows)

* Better formatting of descriptions
* Highlight keywords
* Improved UI polish

---

## 10. Development Constraints

* Keep implementation simple
* Avoid over-engineering
* Focus on working end-to-end flow

---

## 11. Output Quality Requirement (IMPORTANT)

* JSON must be valid and parseable
* No hallucinated URLs
* Descriptions should be concise (1 sentence)

---
