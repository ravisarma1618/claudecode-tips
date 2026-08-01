# Supplied PDF source audit

Extraction date: 2026-08-01 (Asia/Calcutta).

All ten paths explicitly supplied by the user were opened and processed page by page. Text, metadata, headings, outbound links, SHA-256 checksums, and candidate embedded images are recorded in `data/pdf-source-manifest.json`. Page text is preserved under `content/pdf-extracted/`.

| PDF ID | Supplied document | Pages | Words | Candidate images | Status |
|---|---|---:|---:|---:|---|
| `pdf-agentic-10` | 10 Agentic AI Concepts You Need to Master Before 2027 | 18 | 4,197 | 1 | complete |
| `pdf-agentic-15` | 15 Agentic AI Concepts Everyone Needs | 28 | 3,457 | 47 | complete |
| `pdf-reddit-25` | 25 Claude Code Tips from 11 Months of Intense Use | 38 | 11,696 | 48 | complete |
| `pdf-ruben-27` | 27 Claude tips after 1,800 hours | 33 | 4,494 | 29 | complete |
| `pdf-linkedin-32` | 32 Claude Code Tips: From Basics to Advanced | 48 | 9,234 | 11 | complete |
| `pdf-official-best-practices` | Best practices for Claude Code | 29 | 6,006 | 0 | complete |
| `pdf-ralph-loop` | Claude Code Ralph Loop | 56 | 6,191 | 82 | complete |
| `pdf-claudemd-masterclass` | CLAUDE.md Masterclass | 43 | 4,652 | 57 | complete |
| `pdf-graphify-obsidian` | Graphify + Obsidian + Claude Code | 13 | 861 | 11 | complete |
| `pdf-ykdojo-repo` | YKDOJO~1.PDF / repository tips | 46 | 13,607 | 12 | complete |

Total: 352 pages and approximately 64,395 extracted words.

## Duplicate-file verification

The explicitly supplied `C:\mycode\CLAUDE~2\MANUAL~2\YKDOJO~1.PDF` has SHA-256:

`37F353E3AB26F6B6CB4ECF682FE6C3E594D2FC2DE4A2F8E90A625FFF40D4D7BC`

It is byte-identical to the long-named ykdojo repository PDF found in `manual pdf`. It is counted once and the explicitly supplied path is the authoritative record.

## Topic completeness

`data/topic-coverage.json` contains 49 substantive topic families mapped to a concrete lesson and one or more PDF source IDs. The website renders this matrix under **PDF topic coverage**. Coverage includes:

- agent goals, loops, harnesses, context, state, memory, tools, planning, reflection, orchestration, multi-agent systems, guardrails, permissions, human review, evals, observability, tracing, stopping, and skills;
- all major Claude Code daily workflow topics from the tips collections;
- official explore → plan → implement → commit and automation practices;
- Ralph loop mechanism, PRD/task state, memory files, completion checks, safety boundaries, and when not to use it;
- CLAUDE.md hierarchy, monorepos, progressive disclosure, hooks, subagents, skills, and MCP;
- Graphify/Obsidian ingestion, graph construction, isolated vault import, enrichment, provenance, and retrieval limitations.

## Image audit

298 candidate images were extracted. Many are repeated publication marks, covers, avatars, or page furniture. Contact sheets were generated for visual review. Twenty instructional images are recorded in `data/image-manifest.json`; nineteen are rendered beside relevant lessons and one direct-versus-decomposed companion diagram is retained for comparison. Visible images have local paths, alt text, captions, page/source attribution, and no hotlinks.

## Limitations

- PDF extraction can produce mojibake for decorative punctuation and can reorder multi-column layouts. Teaching text was normalized from page context rather than copied blindly.
- `codeBlocksFound` is not inferred from PDF typography; commands are captured in page text and normalized lessons.
- “Complete” means every page of the supplied local file was processed, not that a PDF necessarily contains the full original web discussion or paywalled article.
- Candidate-image counts include repeated graphics; rendered-image counts include only visuals that materially support instruction.
