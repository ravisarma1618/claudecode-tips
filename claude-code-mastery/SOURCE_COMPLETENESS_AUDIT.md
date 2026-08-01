# Source-to-site completeness audit

Audit date: 2026-08-01 (Asia/Calcutta)

## Bottom line

The site has complete structural coverage, but it is not yet honest to call every source instructionally complete.

- All 10 exact supplied PDF files exist and match their recorded SHA-256 hashes.
- All 352 PDF pages are extracted, non-empty, and available in the page reader.
- All 166 forensic evidence records have an explicit ontology disposition.
- All 95 canonical topics appear exactly once in the five-phase curriculum.
- Every dossier has valid page-level evidence and passes the current depth schema.
- The audit found 12 evidence records whose mapped lesson lacked that supporting source citation; these citations were repaired.
- The audit added 13 meaningful source visuals. Decorative covers, avatars, repeated logos, social chrome, and exact duplicates remain excluded.

Structural mapping is not the same as source-specific teaching depth. Several dossiers remain too template-like and need richer examples that reproduce the source mechanism.

## Per-source verdict

| Source | Pages | Evidence records | Topic coverage | Semantic verdict | Main remaining limitation |
|---|---:|---:|---|---|---|
| 10 Agentic AI Concepts | 18 | 10/10 | All mapped | Substantially complete | Harness, orchestration, evaluation, and observability examples need more source-specific system detail. |
| 15 Agentic AI Concepts | 28 | 15/15 | All mapped | Substantially complete | Several lessons still use generic repository scenarios instead of the source's distinct loop, memory, and role artifacts. |
| Reddit: 25 Claude Code Tips | 38 | 26/26 plus 5 discussion dispositions | All mapped | Substantially complete | Comment pages are anecdotal and UI-interleaved; terminal-tab, worktree cleanup, voice-policy, and status-line details need strengthening. |
| Ruben: 27 tips after 1,800 hours | 33 | 27/27 | All mapped | Substantially complete | Creative/product opinions are compressed; model, pricing, privacy, and product claims require current verification. |
| LinkedIn: 32 Claude Code Tips | 48 | 8/8 grouped records | All mapped | Substantially complete | Verification-mode, research, DevOps, and abstraction examples need more concrete treatment. |
| Official Claude Code best practices | 29 | 21/21 | All mapped | Substantially complete | Explore-plan-implement-commit, interview/specification, investigation-subagent, and judgment workflows need stronger end-to-end examples. |
| Claude Code Ralph Loop | 56 | 20/20 | All mapped | Substantially complete | Twenty mechanisms are compressed into seven lessons; PRD/task schema, memory files, feedback prompt, maturity levels, and patterns need richer worked artifacts. |
| CLAUDE.md Masterclass | 43 | 14/14 | All mapped | Substantially complete | Progressive-disclosure pruning, complete WHY/HOW/WHAT example, scoped files, and subagent priming need fuller repository examples. |
| Graphify + Obsidian | 13 | 8/8 | All mapped | Partial | The workflow is screenshot-led; installation provenance is unreadable and cannot be claimed complete. |
| YKDOJO repository tips | 46 | 17/17 grouped records | All mapped | Partial | Tips 41–46 are named in the index, but their detailed bodies are absent from the supplied PDF. No missing commands were invented. |

## Media audit

The original manifest contained 20 selected records from 5 sources. All paths worked, but current-topic linkage and visible attribution were incomplete. Thirteen additional meaningful visuals were added for:

- agent loop, measurable reflection, context management, and multi-agent roles;
- Ralph feedback architecture, autonomy levels, overnight workflow, and multi-persona review;
- editable HTML and the dated Cowork task interface;
- reversible Obsidian import and provenance metadata;
- compact and scoped CLAUDE.md instructions.

All rendered visuals now resolve locally. The lesson renderer adds a visible source/page attribution where manifest metadata is available. Sources with no selected lesson visual are not necessarily missing media: Agentic-10 has a cover; Reddit images are mostly repeated social/page furniture; official best practices is text-only; LinkedIn visuals duplicate stronger YK assets. These exclusions are intentional.

## Remaining instructional work

Highest priority, in order:

1. Rewrite Ralph's seven dossiers with actual PRD, `prd.json`, `progress.txt`, `agents.md`, feedback, maturity, and pattern artifacts.
2. Add end-to-end official workflows, especially explore-plan-implement-commit and interview-to-specification.
3. Add a complete worked repository across the CLAUDE.md sequence.
4. Expand Reddit operational details and label comment-derived practices explicitly.
5. Split Ruben's compressed creative/product heuristics into clearly headed experiments.
6. Teach Graphify's reversible workflow through its page 3–11 screenshots.
7. Keep YK tips 41–46 marked index-only until a source with their detailed bodies is supplied.

No new canonical topic is currently required. The remaining problem is specificity and worked depth, not missing IDs.
