# Claude Code Mastery: From Beginner to Expert

A self-contained interactive curriculum, searchable reference, workflow playbook, and personal operating manual synthesized from the ten supplied local PDFs. The application uses semantic HTML, modern CSS, and dependency-free browser JavaScript; structured JSON remains the source of truth.

The site now includes a 95-topic Deep Topic Handbook backed by a forensic ledger of 166 source-evidence records. Every dossier contains layered explanation, mechanism, use boundaries, a six-step procedure, worked application, weak/improved contrast, three failure-and-recovery paths, reusable prompt, checklist, exercise, mastery criteria, and page-level citations. It also preserves all 352 extracted PDF pages; the 268-entry automated heading/step index is correctly labeled as a navigation aid rather than a concept count.

The Professional Practicum turns that reference material into assessed practice: 8 cumulative projects, 25 guided labs, 8 independent assignments, 8 weighted rubrics, 8 model-solution outlines, and an 8-stage capstone. All 95 topics have one primary practicum assignment, so none are relegated to an optional appendix. The strict premium editorial audit currently passes 95/95 dossiers.

## Run

```powershell
npm install
npm run build
npm run serve
```

Open `http://127.0.0.1:4173`, or directly open root `index.html` via `file://`. Source data is embedded at build time into both root `index.html` and `dist/index.html` to avoid local CORS/fetch failures.

## Test

```powershell
npx playwright install chromium
npm test
```

Data-only validation: `npm run test:data`. Browser tests cover loading, console errors, navigation, mobile drawer, disclosures, expand/collapse, combined search filters, theme, persisted completion/bookmarks/checklists, copy, citations, quizzes, tabs, decision interactions, keyboard focus, internal links, local request failures, overflow, and representative screenshots.

## Project map

- `data/topic-details.json`: the 95 detailed teaching dossiers rendered by the handbook.
- `data/source-mechanisms.json`: source-specific mechanisms, boundaries, warnings, and page citations for every topic.
- `data/premium-practice.json`: cumulative projects, labs, assignments, rubrics, solution outlines, checklists, and capstone stages.
- `data/premium-audit.json` and `PREMIUM_QUALITY_RUBRIC.md`: the 95-topic rejection gate and its latest results.
- `data/topic-depth-audit.json` and `data/editorial-audit.json`: per-topic structural and editorial validation results.
- `research/forensic-evidence.json`: 166 page-cited evidence records recovered from all ten PDFs.
- `research/topic-ontology.json`: the deduplicated 95-topic ontology and evidence-record mappings.
- `data/`: source/image manifests plus atomic insights, curriculum, and reference assets.
- `content/pdf-extracted/`: page-by-page text extracted from every supplied PDF.
- `data/pdf-source-manifest.json`: page, word, heading, link, image, file, and checksum records.
- `CONTENT_DEPTH_RUBRIC.md`: the mandatory teaching-quality contract used by validation.
- `styles/` and `scripts/app.js`: accessible presentation and interactions.
- `tests/`: Playwright browser coverage.
- `screenshots/`: representative visual evidence created by the test suite.
- `dist/`: production-ready, directly openable build.

## Updating or adding a source

1. Add a unique entry to `data/source-manifest.json` and preserve the raw response under `content/raw/`.
2. Verify the actual body, record method/status/limitations, and write normalized notes.
3. Add atomic source-backed claims to `data/insights.json`; use only manifest source IDs.
4. Connect the insight to curriculum or reference content; merge duplicates rather than multiplying them.
5. Add any meaningful local image and full attribution to `data/image-manifest.json`.
6. Map every forensic evidence record to a canonical topic, update the matching practicum assignment, and ensure the topic passes the depth and premium editorial audits.
7. Run `npm run build` and `npm test`.

## Citations and images

Every rendered deep topic includes page-level links into the local PDF reader; broader badges open source records with extraction method, status, metrics, limitations, and canonical URL. `SOURCE_AUDIT.md` explains incomplete material. Thirty-three instructional media records are catalogued locally with usage locations, alt text, captions, and attribution. The site contains no hotlinked imagery.

## Known limitations

- PDF extraction may reorder multi-column material or misdecode decorative punctuation; normalized lessons use verified page context.
- Complete PDF processing does not prove a saved PDF contains every comment or the full original web article.
- Source material and Claude Code evolve; this is a dated 2026-08-01 PDF snapshot.
- YK tips 41–46 are named in the supplied PDF index but their full bodies are absent; the site does not pretend those missing bodies were extracted.
- Model, pricing, enterprise-seat, privacy, and product-comparison opinions are labeled source-specific/time-sensitive rather than universal guidance.
- Automated depth and editorial checks enforce structure, specificity signals, citations, and evidence mapping, but cannot replace human interpretation of every source claim.
- Browser tests use Chromium. Certification-level manual assistive-technology testing remains outside this build.

## Latest verification

On 2026-08-01, `npm test` passed all structured-data checks, the 95/95 premium editorial audit, the 95-topic practicum mapping, and 21/21 Playwright tests. The suite also regenerated desktop, tablet, mobile, light/dark, expanded-topic, search, curriculum, and source-explorer screenshots under `screenshots/`.
