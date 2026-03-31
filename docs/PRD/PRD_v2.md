You are working on an AI-powered Next.js app called "PodExtract".

## Goal

Upgrade the extraction pipeline to:

1. Return REAL, actionable links (not fake or placeholder)
2. Support extracting show notes from a URL (not just pasted text)

---

## Part 1: Improve AI Output Quality (Real Links)

### Requirements:

Update the LLM prompt and post-processing logic so that:

### For books:

* Include a real searchable link (prefer Douban or Google)
* Format:
  {
  "name": "Atomic Habits",
  "description": "A book about building habits",
  "url": "https://www.douban.com/search?q=Atomic+Habits"
  }

### For music:

* Include a real searchable link (prefer NetEase Cloud Music or Spotify)
* Format:
  {
  "name": "Blinding Lights",
  "description": "A popular song by The Weeknd",
  "url": "https://music.163.com/#/search/m/?s=Blinding+Lights"
  }

### For links:

* Only include REAL URLs found in the text
* Do NOT hallucinate URLs

---

### Update Prompt:

Modify the LLM prompt to enforce:

* Return valid JSON only
* For books/music WITHOUT links → generate a search URL
* For links → only extract existing ones

Use this instruction style:

"Do not fabricate URLs. Only generate search URLs for books/music using known platforms."

---

## Part 2: Add URL Input (Fetch Show Notes Automatically)

### Requirements:

Allow user to input a podcast URL instead of raw text.

### Backend changes:

1. Detect input type:

   * If input starts with "http" → treat as URL
   * Else → treat as plain text

2. If URL:

   * Fetch HTML content using fetch()
   * Extract main text content (basic version is fine)

3. Strip HTML tags → convert to plain text

4. Pass extracted text into existing LLM pipeline

---

### Implementation hints:

* Use native fetch (no need for heavy scraping libs)
* Simple HTML parsing is OK (regex or basic DOM parsing)
* Limit content length (e.g. first 5000 chars)

---

## Part 3: UI Update

* Change input placeholder:
  "Paste podcast show notes OR a podcast URL"

* Add helper text:
  "Supports direct URL parsing (experimental)"

---

## Constraints

* Keep implementation simple
* Do not add new dependencies unless necessary
* Do not implement full scraping logic
* Focus on working MVP

---

## Output

Update:

* /api/extract/route.ts
* Prompt logic
* Input handling

Make sure:

* JSON structure stays consistent
* No breaking changes to frontend

---

## Success Criteria

* Book/music items include real clickable links
* User can paste a podcast URL and get parsed results
* No more fake or empty links
* App still runs without errors

---
