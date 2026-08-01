# Claude Code Mastery — Knowledge Architecture

## Audit conclusion

The current site is not yet a complete teaching system. It has 49 topic-coverage rows, but many rows only point to a broad lesson. A mapping is not evidence of instructional coverage. After reconciliation with all 166 forensic concept records, the canonical ontology in `research/topic-ontology.json` separates **95 teachable topics**: 57 shallow, 30 missing, and 8 source-only/time-sensitive. No current topic can yet be certified adequate by the depth contract.

The largest gaps are not obscure edge cases. They include TDD, interactive PR review, path-specific instructions, large-repository indexes, background-job control, Ralph autonomy levels, Ralph application patterns, screenshot-led design, conversation-history search, absolute paths, remote control, CLAUDE.md workflow definitions, session resumption, batch fan-out, graph-node enrichment, and reversible knowledge-vault import.

## Reconciliation with the 166-record forensic ledger

The forensic report says the corpus contains “more than 120 durable concepts,” while this architecture has 95 canonical topics. These numbers measure different layers:

- The forensic ledger contains **166 atomic evidence records**. It preserves each source’s named tip, claim, warning, workflow section, or pattern—even when several sources repeat the same mechanism.
- At least 120 records contain durable instructional substance, but they are not necessarily 120 non-overlapping curriculum units. For example, four separate records about fresh context support one canonical context-freshness topic; Ralph’s three maturity-level records support one comparative autonomy-level topic; the LinkedIn and YK aggregate records restate an already mapped tip family.
- The ontology merges only repeated mechanisms or concepts that must be taught together to make sense. It does not discard evidence. `evidenceRecordMappings` proves that all **166/166 records** are assigned to a canonical topic, assigned across multiple topics when the record is an aggregate, or retained as source-only evidence with a reason.
- Eight additional canonical topics were created during reconciliation because the old 87-topic model hid durable instruction: session naming/resumption, fan-out batch work, WHY/HOW/WHAT information architecture, CLAUDE.md creation, corpus acquisition, graph-node enrichment, common-failure recovery, and risky system-prompt slimming.

Therefore, “more than 120 durable concepts” is an evidence-granularity statement; **95 canonical topics** is the deduplicated teaching architecture. Neither number should be used as a lesson-depth claim.

## Architecture principles

1. **One lesson outcome, multiple atomic concepts.** A lesson may contain several topics, but each topic needs its own anchor, explanation, evidence, example, procedure, failure modes, exercise, and mastery check.
2. **Merge mechanisms, not slogans.** The repeated YK/LinkedIn/Reddit tips are one evidence cluster. General agent loops and Ralph loops are related but not interchangeable. Memory, context, state, and CLAUDE.md are connected but distinct.
3. **Preserve provenance.** Every source-backed claim maps to source ID and PDF page. Advice based on a single author's opinion is labeled `source_only` rather than promoted to universal guidance.
4. **Teach prerequisites explicitly.** For example, unattended Ralph comes after verification, isolation, stopping conditions, state, and attended-loop competence.
5. **Resolve disagreements conditionally.** Planning versus prototyping, fresh context versus durable Projects, and autonomy versus human approval become decision frameworks, not false consensus.

## Recommended beginner-to-expert curriculum

### Phase 1 — Orientation

- Persistent goals versus tasks
- Observe–decide–act–check
- Reflection rules and stopping conditions
- Claude Code’s tool-using harness
- Human authority and evidence as the finish line

### Phase 2 — Daily operation

- Executable prompt briefs and clarifying questions
- Repository mapping and dependency-aware decomposition
- Context selection, fresh sessions, compaction, and trajectory repair
- Terminal evidence, paths, input editing, aliases, status line, and slash commands
- Git checkpoints and claim-matched verification

### Phase 3 — Project systems

- CLAUDE.md purpose, hierarchy, modularity, workflows, conditional rules, and maintenance
- Test cycles, TDD, diff review, PR review, and CI investigation
- Skills, commands, plugins, hooks, subagents, and MCP selection
- Permission tiers, human gates, containers, and reversible change
- Memory versus state, and large-codebase navigation indexes

### Phase 4 — Advanced automation

- Tool interface design and structured non-interactive output
- Parallel sessions, worktrees, subagent boundaries, and background jobs
- Hooks and deterministic policy enforcement
- Ralph fit, core mechanism, PRD/tasks, memory, feedback, and autonomy levels
- Bounded polling, remote control, and operational abort paths

### Phase 5 — Expert governance

- Evals, tracing, observability, independent review, and regression sets
- Ralph feature/test/review/POC patterns
- Graphify/Obsidian knowledge graphs, reversible imports, provenance, and retrieval cadence
- Maintaining a personalized operating manual and measuring workflow value
- Explicit treatment of time-sensitive product, pricing, model, and privacy claims

## Gap matrix summary

| Status | Meaning | Representative topics |
|---|---|---|
| Shallow (57) | Present by name or broad grouping, but not taught independently | Agent loop, context engineering, CLAUDE.md hierarchy, verification targets, Git worktrees, Ralph core |
| Missing (30) | No distinct current treatment | TDD, interactive PR review, conditional instructions, Ralph levels, batch fan-out, node enrichment, remote control |
| Source-only (8) | Must remain attributed, dated, and qualified | Ruben’s model-routing, seat/pricing, Projects/creativity, Code-versus-Cowork opinions, system-prompt slimming |
| Adequate (0) | Distinct explanation plus procedure and practice | None can be certified from current structured lesson fields without a depth audit |

## Per-topic teaching contract

No topic should be marked complete unless it contains all of the following:

1. Plain-language definition and a concrete mental model.
2. Mechanism: why it works and which repository or agent state it changes.
3. Preconditions and dependency links.
4. A realistic worked example with inputs, actions, and expected evidence.
5. An incorrect approach and a corrected approach.
6. A repeatable procedure of at least four meaningful steps.
7. At least two failure modes, with diagnosis and recovery.
8. A “use when / avoid when” decision rule.
9. A persistent checklist and a practice exercise.
10. A measurable success criterion.
11. Page-level citations for source-derived claims.
12. A relevant source screenshot or diagram when the visual carries instructional information; otherwise an explicit `not_applicable` visual decision.

## Source-by-source completeness findings

### `pdf-agentic-10`

All ten named concepts map to canonical topics. They should become the architecture spine, not a standalone vocabulary list. Current treatment is uniformly shallow because mechanisms, tradeoffs, and examples are compressed.

### `pdf-agentic-15`

All fifteen concepts map individually. Current lessons improperly group reflection with stopping, state with memory, and orchestration with multi-agent roles. These connections should be taught, but the concepts need separate explanations.

### `pdf-reddit-25`

The core numbered tips are mapped. The discussion pages include tangential community systems and product opinions; only directly useful Claude Code practices should enter the curriculum. Comments may support a labeled “community variation,” never core fact.

### `pdf-ruben-27`

All 27 headings are represented either as durable concepts or grouped source-specific opinions. This source mixes Claude Code, Claude consumer products, pricing, privacy, creativity, and adoption advice. Model names, seat thresholds, product comparisons, and safety claims require dated attribution and current verification before action.

### `pdf-linkedin-32`

The 32 numbered tips mostly overlap the Reddit/YK lineage. Unique additions—interactive PR review, research, verification modes, DevOps, CLAUDE.md maintenance, universal interface, and abstraction level—remain distinct canonical topics.

### `pdf-official-best-practices`

The official explore–plan–implement–commit loop, instruction guidance, issue-to-PR workflow, permissions, non-interactive modes, structured output, streaming, and writer/reviewer separation are mapped. These should have the highest evidence priority where community advice conflicts.

### `pdf-ralph-loop`

The current single lesson hides at least seven lessons’ worth of material. Fit assessment, hook mechanism, PRD/task schema, two-layer memory, feedback channels, autonomy progression, and four application patterns need separate expandable topics. The completion promise must never be taught as proof of correctness.

### `pdf-claudemd-masterclass`

The current two CLAUDE.md lessons omit workflow definitions, conditional rules, large-codebase index design, and concrete maintenance practice. Hooks, subagents, and MCP must link to the extension-choice framework rather than being treated as interchangeable automation features.

### `pdf-graphify-obsidian`

Six canonical topics preserve corpus acquisition, graph construction, import choices, bare-node enrichment, provenance, and the commenter-raised retrieval problem. Quantitative experiment results are source observations, not general performance guarantees.

### `pdf-ykdojo-repo`

This is the broadest source. The PDF contains full detail through Tip 40 and an index naming Tips 41–46. The ontology preserves all named late tips, but “automation of automation,” sharing, continuing learning, dx plugin, setup script, and account switching cannot be presented as fully extracted when the saved PDF lacks their full bodies. The source manifest/audit should say so explicitly.

## Required synthesis decisions

- **Plan or prototype:** plan known dependencies; time-box a spike when uncertainty is feasibility. Turn spike findings into a reviewed plan.
- **Fresh session or durable context:** keep stable facts in external memory; use a small, clean working context for execution.
- **Skill or live prompt:** put repeatable procedure and tool knowledge in a skill; keep task-specific intent and creative judgment in the live brief.
- **Human gate or autonomy:** gate irreversible/external actions; automate reversible, isolated, observable work with explicit budgets and stops.
- **Parallel or sequential:** parallelize independent evidence or files only when merge and coordination costs are lower than saved time.

## Validation implication

The future depth validator must inspect topic-level records, not lesson-level word counts. A long lesson can still leave one embedded topic unexplained. “Covered” should be computed only when the topic teaching contract passes and every cited source/page resolves in the PDF reader.
