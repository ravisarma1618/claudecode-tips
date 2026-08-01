# Claude Code Mastery — Execution Plan

## Objective

Build a polished, self-contained learning and reference website that synthesizes all eight required sources into a traceable curriculum from beginner foundations through expert workflows.

## Architecture decision

- Static HTML, CSS, and vanilla JavaScript for durability and direct local use.
- Structured JSON is the source of truth; a small Node build script validates and embeds it into `dist/` so `dist/index.html` works over `file://` without fetch/CORS issues.
- Raw retrievals, normalized notes, lesson data, and presentation code remain separate.
- Playwright provides end-to-end, responsive, persistence, keyboard, link, console, and screenshot checks.

## Work plan

1. Inventory the environment and scaffold the project.
2. Retrieve every required source using the simplest reliable method; verify article-body presence rather than HTTP status alone.
3. Record raw and normalized artifacts, metadata, extraction limits, and meaningful image decisions.
4. Atomize and reconcile advice into cited insights; distinguish source guidance, synthesis, interpretation, and inference.
5. Design a progressive curriculum plus workflows, prompt library, decisions, anti-patterns, checklists, quizzes, glossary, and source explorer.
6. Implement an accessible responsive interface with search, filters, disclosures, persistence, themes, print styles, and deep links.
7. Validate structured data, build production output, run browser tests, inspect screenshots, and correct defects.
8. Complete `SOURCE_AUDIT.md`, `README.md`, manifests, test evidence, and final metrics.

## Quality gates

- All eight URLs have explicit, evidence-based extraction statuses.
- Every source-derived claim rendered by the site carries one or more source IDs.
- Required learning and reference interactions exist and are keyboard operable.
- Production output has no missing local assets, broken internal links, critical console errors, or obvious responsive overflow.
- Tests and limitations are documented honestly.

## Decision log

- 2026-07-31: Selected a no-framework static architecture to maximize maintainability and offline/direct-open reliability.
- 2026-07-31: Source images will be included only when they add instructional information unavailable from extracted text; decorative article art will be excluded and logged.
- 2026-08-01: After learner review found the topic treatment too shallow, replaced the earlier coverage-only gate with a staged forensic research -> knowledge architecture -> expert teaching -> skeptical review pipeline.

## Deep-teaching revision

1. Build a page-level evidence dossier across all ten supplied PDFs, including commands, examples, warnings, visuals, and extraction uncertainty.
2. Build an exhaustive concept ontology and trace every source concept to a teachable unit without hiding unique nuances inside broad topic labels.
3. Author layered topic dossiers containing intuition, mechanism, prerequisites, procedure, worked example, bad/good comparison, failure recovery, checklist, exercise, and mastery test.
4. Review each dossier from beginner and professional perspectives; rewrite anything vague, non-reproducible, unsupported, or insufficiently actionable.
5. Enforce the depth rubric in automated validation, rebuild the offline site, and repeat browser and visual testing.
