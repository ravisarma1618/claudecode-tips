# Forensic PDF Evidence Report

## Result

All 10 supplied PDF paths were reviewed through the existing 352-page extraction. The structured ledger contains **166 evidence records**, **5 separately labeled Reddit discussion records**, **11 meaningful image groups**, and **12 coverage gaps**. It replaces the misleading `268 concepts` detector count, which mixes real topics with numbered substeps and misses unnumbered sections.

The machine-readable dossier is [`forensic-evidence.json`](./forensic-evidence.json).

## Source ledger

| Source ID | Pages | Evidence records | Extraction confidence | Important limitation |
|---|---:|---:|---|---|
| `pdf-agentic-10` | 18 | 10 | High | Ligature/punctuation damage; page 17 is resources, not a concept |
| `pdf-agentic-15` | 28 | 15 | Medium | Intra-word spacing damage; promotional pages |
| `pdf-reddit-25` | 38 | 26 + 5 discussion | Medium | Reddit chrome interleaves body; pages 23–38 are comments |
| `pdf-ruben-27` | 33 | 27 | Medium | Time-sensitive opinion, split words, unavailable video detail |
| `pdf-linkedin-32` | 48 | 8 grouped/unique | High | Tips 0–24 duplicate the detailed Reddit/YK material |
| `pdf-official-best-practices` | 29 | 21 | High | Mojibake; feature names reflect the saved 2026 document |
| `pdf-ralph-loop` | 56 | 20 | High | Copy-ready code must be checked across page breaks |
| `pdf-claudemd-masterclass` | 43 | 14 | High | Hooks/subagents are introductory; code indentation damaged |
| `pdf-graphify-obsidian` | 13 | 8 | Low–medium | Workflow evidence is primarily in screenshots |
| `pdf-ykdojo-repo` | 46 | 17 grouped/unique | High | Tips 41–46 appear in the index but their detailed bodies are absent |

## What the ledger preserves

- Every named Agentic AI concept from both concept PDFs.
- All 25/26 Reddit post tips, including commands, warnings and separately labeled discussion insights.
- All 27 Ruben tips, with weak or time-sensitive claims explicitly marked low confidence.
- The shared YK tips plus unique LinkedIn tips 25–31 and repository tips 31–46.
- Twenty-one major official best-practice sections that the old detector missed.
- Ralph's loop mechanism, state files, completion contract, maturity levels and four execution patterns.
- CLAUDE.md hierarchy, content architecture, progressive disclosure, creation, workflows, hooks, subagents and maintenance.
- The complete Graphify → isolated Obsidian vault → source provenance → safe merge workflow.
- Commands and near-verbatim prompts where extraction fidelity is adequate.
- Page ranges, extraction confidence, uncertainties and meaningful image-page groups.

## Critical coverage findings

1. The current 27-lesson curriculum cannot give adequate depth to more than 120 durable concepts; it needs topic-level dossiers or a larger module hierarchy.
2. `data/pdf-reader.json` is a reader index, not a completeness audit. Its 268 count includes substeps such as “start tmux” and misses Graphify entirely.
3. Official guidance was seriously undercounted: the detector found only eight numbered GitHub workflow steps, while the forensic ledger identifies 21 major sections.
4. Ralph Loop requires multiple modules: completion contracts, `prd.json`, `progress.txt`, `agents.md`, feedback gates, safety/cost controls, three maturity levels and four patterns.
5. Graphify cannot be taught well from extracted prose alone. Pages 3–11 need manually selected screenshots with explanatory captions and accessible text.
6. CLAUDE.md needs a worked repository example—not one generic paragraph—covering hierarchy, WHY/HOW/WHAT, scoped rules and progressive disclosure.
7. YK repository tips 41–46 are not fully present in the supplied local PDF. Plugin installation, setup script and account-switch instructions must remain partial unless another authoritative artifact is supplied.
8. System-prompt patching and `--dangerously-skip-permissions` are risky anecdotal practices. They require isolation, least-privilege alternatives and strong warning labels.

## Conflicts requiring explicit synthesis

- Ruben dismisses “loop engineering” as trend jargon; the engineering PDF and Ralph article treat enforced loops as necessary for unattended systems. Recommended synthesis: avoid unnecessary terminology for simple interactive tasks, but use bounded loops, cost ceilings, verification and tracing for autonomous execution.
- Ruben recommends fresh chats and avoiding overloaded Projects; official guidance agrees on fresh context but also explains when accumulated context is valuable. Teach task boundaries rather than an unconditional restart rule.
- Experiential sources encourage broad automation; official guidance prioritizes scoped permissions, sandboxing and deterministic verification. Safety controls should govern the synthesized recommendation.

## Required depth gate for the teaching rewrite

Each durable topic should fail validation unless it contains:

- a simple definition and underlying mechanism;
- why and when it matters, plus when not to use it;
- a page-cited evidence block;
- a realistic worked example or copy-safe prompt/command;
- a repeatable procedure with verification;
- at least two failure modes and a recovery path;
- a checklist or practice exercise with a measurable success criterion;
- a meaningful screenshot when the source is visually necessary, otherwise an explicit `not applicable` decision.

## Extraction uncertainty policy

The ledger uses page-level paraphrases. Text marked `medium` or `low` confidence must not be quoted without checking the PDF page image. Code split across pages must be reconstructed and tested before becoming a copy button. Reddit comments remain discussion evidence, and author experience or commercial/product claims must not be rewritten as official fact.
