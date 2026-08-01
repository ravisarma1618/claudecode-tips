import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ontology = JSON.parse(fs.readFileSync(path.join(root, 'research/topic-ontology.json'), 'utf8'));
const reader = JSON.parse(fs.readFileSync(path.join(root, 'data/pdf-reader.json'), 'utf8'));
const sourceMap = new Map(reader.map(source => [source.sourceId, source]));

const phaseDifficulty = { orientation: 1, 'daily-operation': 2, 'project-systems': 3, 'advanced-automation': 4, 'expert-governance': 5 };

const topicVisuals = {
  'prompt-voice-context':['assets/source-images/src-ykdojo-repo/voice-transcription-mistakes.png','Voice-transcribed instructions with imperfect wording interpreted from surrounding intent','Voice input is useful for high-bandwidth context, but the outcome and constraints still need an explicit confirmation pass.'],
  'repo-decomposition':['assets/source-images/src-ykdojo-repo/breakdown-steps.png','A large task decomposed into smaller verifiable steps','Decomposition creates intermediate evidence and recovery points instead of one opaque leap.'],
  'parallel-boundaries':['assets/source-images/src-ykdojo-repo/multitasking-terminal-tabs.png','Separate terminal tabs representing isolated concurrent workstreams','Separate workstreams make ownership and context boundaries visible to the operator.'],
  'git-worktrees':['assets/source-images/src-ykdojo-repo/git-worktrees.png','Git worktrees placing parallel branches in separate directories','Worktrees isolate both branch state and working directories for concurrent writers.'],
  'automation-backoff':['assets/source-images/src-ykdojo-repo/manual-exponential-backoff.png','Progressively delayed checks of a long-running job','Bounded polling reduces noise while preserving a deadline and an observable abort path.'],
  'practice-writing-markdown':['assets/source-images/src-ykdojo-repo/writing-assistant-side-by-side.png','Claude Code beside an editor holding durable Markdown content','Keeping prose in durable files enables diffs, review, search, and later sessions.'],
  'permissions-risk-tier':['assets/source-images/src-ykdojo-repo/vibe-coding-spectrum.png','Spectrum from exploratory vibe coding to carefully verified engineering','Verification and permission rigor should rise with consequence and blast radius.'],
  'found-goal-vs-task':['assets/pdf-images/pdf-agentic-15/page-008-image-02.png','Diagram of a persistent agent goal connected to tools and continued action','The diagram distinguishes a continuing goal-driven agent from a one-response task.'],
  'memory-architecture':['assets/pdf-images/pdf-agentic-15/page-014-image-02.png','Diagram separating run-specific context from information retained across runs','Memory is selected durable information, not an unlimited copy of the conversation.'],
  'tool-interface-design':['assets/pdf-images/pdf-agentic-15/page-013-image-02.png','Diagram of an agent using bounded tools to read files and call an API','A tool converts model intent into a constrained, observable environmental action.'],
  'parallel-orchestration':['assets/pdf-images/pdf-agentic-15/page-019-image-02.png','Orchestration diagram coordinating dependent agent work','Orchestration defines dependencies, handoffs, and integration rather than merely adding agents.'],
  'permissions-hitl':['assets/pdf-images/pdf-agentic-15/page-018-image-02.png','Flow from automatic work to pause, human review, and confirmation','Human approval is positioned at the transition where risk or irreversibility increases.'],
  'verify-observability':['assets/pdf-images/pdf-agentic-15/page-021-image-02.png','Execution trace exposing an agent path rather than a black box','Tracing makes decisions, tools, errors, and outcomes inspectable after execution.'],
  'found-stopping':['assets/pdf-images/pdf-agentic-15/page-022-image-02.png','Stopping-condition diagram with explicit success and exit rules','A robust loop defines successful completion, bounded failure, and escalation exits.'],
  'ralph-core':['assets/pdf-images/pdf-ralph-loop/page-013-image-02.png','Ralph loop showing prompt, task state, progress, iteration, and completion','The loop resumes from file-backed state; its completion token controls iteration but does not prove correctness.'],
  'instructions-hierarchy':['assets/pdf-images/pdf-claudemd-masterclass/page-009-image-02.png','CLAUDE.md hierarchy showing global, project, and nested scopes','Rules belong at the narrowest stable scope that needs them.'],
  'extensions-hooks':['assets/pdf-images/pdf-claudemd-masterclass/page-033-image-02.png','CLAUDE.md policy connected to deterministic hook enforcement','Instructions communicate policy while hooks enforce deterministic checks at lifecycle events.'],
  'knowledge-graph-model':['assets/pdf-images/pdf-graphify-obsidian/page-007-image-01.png','Graph visualization of concepts and their relationships','The visual shows how extracted concepts become navigable relationships while provenance remains necessary.'],
  'extensions-slash-status-alias':['assets/pdf-images/pdf-ykdojo-repo/page-004-image-01.png','Claude Code terminal interface with visible session and status information','Interface feedback reduces hidden state during daily operation.']
};

const profiles = {
  'agent-foundations': { object:'the agent loop', evidence:'a changed file, tool result, test report, or explicit stop reason', boundary:'Keep the objective stable while allowing the next action to change when evidence changes.', risk:'confusing fluent narration with verified progress' },
  prompting: { object:'the working brief', evidence:'an agreed outcome, constraints, non-goals, and acceptance checks', boundary:'Specify invariants and evidence, but leave implementation choices open unless a choice is a real requirement.', risk:'adding words without reducing decision ambiguity' },
  repository: { object:'the repository map and task graph', evidence:'file paths, symbols, dependency edges, tests, and runnable commands', boundary:'Make claims from inspected files rather than framework stereotypes.', risk:'editing the first plausible file before tracing behavior' },
  'context-memory': { object:'the active context set', evidence:'a compact handoff, named source files, decisions, and current task state', boundary:'Retain durable facts externally and load only the working set needed for the next decision.', risk:'treating a long transcript as reliable memory' },
  instructions: { object:'the instruction hierarchy', evidence:'a short, versioned rule located at the narrowest stable scope', boundary:'Store recurring repository truth; keep temporary task detail in the task brief.', risk:'turning CLAUDE.md into an uncurated encyclopedia' },
  extensions: { object:'the extension boundary', evidence:'a documented invocation, inputs, outputs, permission scope, and fallback', boundary:'Choose the least powerful extension that provides the required determinism or access.', risk:'installing capability before defining the repeated problem' },
  'daily-interface': { object:'the operator interface', evidence:'lower interaction friction without hidden state or lost command output', boundary:'Optimize repeated friction only after observing it.', risk:'memorizing shortcuts while losing visibility into state' },
  tools: { object:'the tool contract', evidence:'validated inputs, structured results, actionable errors, and an audit trail', boundary:'Expose a narrow capability with safe defaults and predictable failure.', risk:'granting broad ambient authority through a vague interface' },
  verification: { object:'the evidence ladder', evidence:'the strongest practical check that directly supports the claimed behavior', boundary:'A passing command supports only what that command actually tests.', risk:'accepting “done” or a zero exit code as complete proof' },
  delivery: { object:'the reviewable change history', evidence:'focused commits, readable diffs, green checks, and dispositions for review feedback', boundary:'Use Git as a control and recovery surface, not merely remote backup.', risk:'mixing unrelated changes until neither review nor rollback is reliable' },
  safety: { object:'the authority boundary', evidence:'allow and deny tests, approval records, isolation, and a recoverable checkpoint', boundary:'Autonomy may grow only as blast radius, ambiguity, and irreversibility shrink.', risk:'mistaking convenience flags for a safety design' },
  'multi-agent': { object:'the coordination graph', evidence:'non-overlapping ownership, explicit handoffs, completion artifacts, and an integrator', boundary:'Parallelize independent work; serialize decisions that share mutable state or contracts.', risk:'creating more agents than independently mergeable outputs' },
  autonomy: { object:'the bounded autonomous loop', evidence:'machine-checkable task state, iteration logs, budgets, and verified completion', boundary:'Use unattended iteration only for observable, reversible, well-specified work.', risk:'letting a completion phrase substitute for external verification' },
  automation: { object:'the repeatable automation contract', evidence:'structured output, exit status, bounded retries, logs, and idempotent behavior', boundary:'Automate a proven procedure and preserve an abort path.', risk:'scaling an unreliable manual process' },
  'knowledge-systems': { object:'the provenance-preserving knowledge graph', evidence:'source backlinks, reversible imports, relationship meaning, and retrieval history', boundary:'Connections improve navigation, not truth; every important note remains traceable.', risk:'collecting notes without a resurfacing and correction routine' },
  'adjacent-workflows': { object:'the file-based personal workflow', evidence:'versioned artifacts, diffs, repeatable prompts, and measurable friction reduction', boundary:'Build narrow tools around a repeated personal need and retain data portability.', risk:'customizing faster than the workflow can be evaluated' },
  'source-specific': { object:'the attributed source claim', evidence:'the named author, PDF page, extraction date, and a current official check before action', boundary:'Separate the durable heuristic from product names, pricing, limits, and personal preference.', risk:'presenting a dated opinion as a current universal rule' }
};

function pageText(sourceId, pageNumber) {
  const page = sourceMap.get(sourceId)?.pages?.find(item => item.page === pageNumber);
  if (!page?.text) return '';
  return page.text.replace(/https?:\/\/\S+/g, '').replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4},?\s+\d{1,2}:\d{2}\s*(?:AM|PM)?/gi,'').replace(/\b\d+\/\d+\b/g,'').replace(/\s+/g, ' ').trim().slice(0, 520);
}

function article(word) { return /^[aeiou]/i.test(word) ? 'an' : 'a'; }
function labelEvidence(status) { return status === 'source_only' ? 'source-specific guidance' : status === 'missing' ? 'source-supported synthesis' : 'cross-source synthesis'; }
function cleanText(value) { return value.replaceAll('â€“','–').replaceAll('â€”','—').replaceAll('â€™','’').replaceAll('â€œ','“').replaceAll('â€','”'); }

const domainCases = {
  'agent-foundations':['a flaky checkout fix','the observed failure, chosen intervention, and stop condition','a passing targeted test or an explicit escalation'],
  prompting:['adding CSV export','a brief with output shape, invariants, non-goals, and ambiguity policy','a reviewed plan whose checks map to every acceptance criterion'],
  repository:['changing authentication timeout handling','an entry-point-to-test dependency map with uncertain edges marked','the named call path, focused diff, and regression-test output'],
  'context-memory':['continuing a half-finished migration in a fresh session','a handoff containing decisions, evidence, remaining tasks, and hazards','the new session can explain and resume the next task without transcript archaeology'],
  instructions:['standardizing database migration work','a scoped instruction with trigger, command, invariant, and exception','a fresh session follows the rule in the right directory and ignores it elsewhere'],
  extensions:['automating the release-note workflow','a capability contract covering inputs, outputs, authority, trigger, and fallback','repeatable output plus a deliberate failure with an actionable message'],
  'daily-interface':['reducing repeated terminal-navigation friction','before-and-after keystrokes and preserved state visibility','the shortcut saves steps without hiding the active directory or command result'],
  tools:['exposing a log-query helper','a narrow input schema, bounded result, timeout, and safe error contract','valid, invalid, empty, and timeout calls return predictable structured results'],
  verification:['fixing a discount-rounding defect','a claim-to-check table ordered from static inspection to behavioral proof','a failing regression before the edit and a passing targeted test afterward'],
  delivery:['preparing a payment-retry pull request','a reviewable branch with scoped commits, diff summary, checks, and rollback note','reviewers can reproduce checks and revert the change independently'],
  safety:['allowing an agent to update generated documentation','a risk tier, allowlist, denylist, checkpoint, and approval boundary','allowed work succeeds while destructive and out-of-scope probes are blocked'],
  'multi-agent':['shipping independent API, UI, and test changes','an ownership matrix with non-overlapping paths and explicit interface contracts','three mergeable artifacts plus an integrator report of conflicts and checks'],
  autonomy:['running a bounded overnight test-repair loop','atomic machine-readable tasks, iteration memory, budgets, and an external verifier','the loop stops on success, budget, repeated failure, and permission escalation'],
  automation:['running repository checks from CI','a non-interactive command with structured output, timeout, retry policy, and exit codes','identical inputs are idempotent and failures remain diagnosable from logs'],
  'knowledge-systems':['importing research notes into Obsidian','reversible notes with relationship types, source backlinks, and review dates','a sampled claim traces to its source and the entire import can be removed cleanly'],
  'adjacent-workflows':['building a personal Markdown publishing helper','a narrow repeated pain point, versioned files, acceptance sample, and portability rule','the helper reduces measured steps while its output remains editable outside Claude'],
  'source-specific':['choosing a product mode or subscription for a team','a dated claim ledger separating quoted source advice from current official facts','each operational claim is either freshly verified or visibly marked historical/opinion']
};

function procedureFor(topic, p) {
  const c=domainCases[topic.domain] ?? domainCases.prompting;
  return [
    `Frame ${topic.title.toLowerCase()} around ${c[0]}. Define the decision it controls and write the expected proof: ${c[2]}.`,
    `Inspect only the evidence needed for this decision. Build ${c[1]}; mark assumptions explicitly instead of letting Claude fill gaps from convention.`,
    `Apply the source guidance as an operational rule: ${topic.nuance} Translate that rule into one bounded action and preserve a checkpoint before execution.`,
    `Challenge the result with a counterexample specific to ${topic.title.toLowerCase()}. Check the relevant files, state, permissions, or runtime output rather than accepting the response narrative.`,
    `Compare the observed result with ${c[2]}. If they differ, identify whether selection, instruction, execution, or verification failed and repair that layer only.`,
    `Record the resulting decision, evidence, exception, and next trigger where the next operator can find it. Stop when the named proof, budget, or escalation condition is reached.`
  ];
}

function failuresFor(topic, p) {
  const c=domainCases[topic.domain] ?? domainCases.prompting;
  return [
    { symptom:`The ${c[0]} exercise produces a confident explanation of ${topic.title.toLowerCase()}, but not ${c[2]}.`, cause:`The lesson's central mechanism was replaced by a weak proxy: ${p.risk}.`, recovery:`Discard the narrative as proof. Reconstruct ${c[1]}, run the direct check, and record the observed output next to the claim.` },
    { symptom:`Applying ${topic.title.toLowerCase()} succeeds on the happy path but fails on a boundary case or exceeds its intended authority.`, cause:`The operator repeated the source tip without converting this qualification into a testable boundary: ${topic.nuance}`, recovery:`Return to the checkpoint, add one negative or out-of-scope case, narrow the action or permission, and rerun both positive and negative checks.` },
    { symptom:`A new session or teammate cannot reproduce the result because the decisive input, exception, or source date is missing.`, cause:`The artifact captured an outcome but not the provenance and decision state that produced it.`, recovery:`Write a compact record containing the goal, decisive evidence, source/page, accepted exception, verifier, and next trigger; retry from that record in a clean session.` }
  ];
}

function dossier(topic) {
  topic = { ...topic, title:cleanText(topic.title), nuance:cleanText(topic.nuance) };
  const p = profiles[topic.domain] ?? profiles.prompting;
  const primary = topic.sources[0];
  const c = domainCases[topic.domain] ?? domainCases.prompting;
  const sourceOnly = topic.status === 'source_only' || /time-sensitive|limited|dated|opinion/i.test(topic.nuance);
  const citations = topic.sources.flatMap(source => source.pages.slice(0, 3).map(page => ({ sourceId:source.id, page, support:`Source evidence for ${topic.title}; interpret with the qualification recorded in this dossier.` })));
  return {
    id: topic.id,
    title: topic.title,
    phase: topic.phase,
    domain: topic.domain,
    difficulty: phaseDifficulty[topic.phase],
    evidenceType: sourceOnly ? 'source-only' : (topic.sources.length > 1 ? 'cross-source-synthesis' : 'source-supported'),
    evidenceNote: sourceOnly ? 'Source-supported but time-sensitive or opinion-based; verify current product facts before acting.' : (topic.sources.length > 1 ? 'The instructional recommendation reconciles evidence from multiple supplied PDFs.' : 'The core guidance is supported by the cited supplied PDF; examples are instructor-authored.'),
    procedural: true,
    plainLanguage: `${topic.title} means deliberately managing ${p.object} so Claude Code can make a useful next decision and leave proof behind. It is not a magic phrase or product toggle. For a beginner, the practical rule is: state what must become true, expose only the information needed to decide, let the agent take a bounded action, and inspect the result. ${topic.nuance} This distinction matters because a plausible response can still be operationally wrong.`,
    mentalModel: `Think of ${p.object} as a controlled experiment rather than a conversation. The brief is the hypothesis, repository and tool state are observations, the edit or command is the intervention, and ${p.evidence} is the result. Each result either increases confidence, exposes a mistaken assumption, or triggers a stop. ${p.boundary} The operator owns the objective and risk boundary; the agent proposes and executes within them.`,
    whyItMatters: `Claude Code is most effective when it can close the distance between an instruction and external evidence. ${topic.title} improves that loop by making an otherwise implicit decision visible and testable. The immediate benefit is fewer speculative edits and less rework. The long-term benefit is a workflow another person—or a fresh session—can inspect, reproduce, and safely continue. Without this discipline, teams often optimize prompt eloquence while ${p.risk}.`,
    mechanism: `The mechanism has four layers. First, selection chooses the relevant goal, constraints, state, and tools. Second, structure turns them into named decisions instead of an undifferentiated transcript. Third, action changes one bounded part of the environment. Fourth, feedback compares ${p.evidence} with a predetermined criterion and updates task state. ${topic.nuance} When evidence is weak, confidence must remain low; when the action is irreversible or external, human approval belongs before the transition.`,
    prerequisites: topic.prerequisites.length ? topic.prerequisites : ['A concrete objective', 'Access to the relevant files or output', 'A reversible checkpoint'],
    useWhen: [
      `Use it when the next decision involving ${p.object} affects correctness, scope, cost, safety, or future sessions.`,
      `Use it when work will be repeated, delegated, reviewed, automated, or continued after context changes.`,
      `Use it when a direct verifier can distinguish success from a merely plausible answer.`
    ],
    avoidWhen: [
      `Do not add ceremony for a trivial, reversible question whose answer can be inspected immediately.`,
      `Do not automate or parallelize it while acceptance remains subjective or shared state is undefined.`,
      sourceOnly ? `Do not act on product-specific details until current official documentation confirms they still apply.` : `Do not use it to justify broader permissions than the bounded task requires.`
    ],
    procedure: procedureFor(topic, p),
    workedExample: {
      scenario:`Scenario: ${c[0]}. The practical challenge is to apply this rule: ${topic.nuance} The learner must use ${topic.title.toLowerCase()} to produce observable evidence, not merely mention the technique.`,
      input:`Starting artifact: ${c[1]}. Topic qualification: ${topic.nuance} The source evidence is linked separately at ${primary.id}, page ${primary.pages[0]}; raw PDF text is intentionally kept out of this teaching example.`,
      actions:[`Turn the qualification into a concrete rule for this case and identify what would falsify the current assumption.`,`Ask Claude to inspect the smallest relevant scope and return observations separately from recommendations.`,`Perform one reversible action that exercises ${topic.title.toLowerCase()}, including a negative or boundary case.`,`Capture the direct result, compare it with the predeclared proof, and write the remaining uncertainty instead of smoothing it over.`],
      expectedEvidence:`The application is successful only when it yields ${c[2]}. The evidence must be inspectable without trusting Claude's self-assessment and must include the boundary case introduced in the third action.`
    },
    badApproach:`“Handle ${topic.title.toLowerCase()} and make everything better. Keep trying until you are done.” This hides the boundary, lets the model invent the success criterion, and supplies no recovery point.`,
    improvedApproach:`“For [specific outcome], first inspect [named scope] and cite the relevant files. Preserve [invariants]; do not change [non-goals]. Propose the smallest reversible action. Verify with [direct check], report the observed evidence, stop after [budget/condition], and ask before [risky transition]. Apply ${topic.title.toLowerCase()} as follows: ${topic.nuance}”`,
    explanation:`The improved version does not micromanage implementation. It fixes the outcome, evidence, boundary, and escalation policy while leaving room for repository-informed judgment. That makes mistakes visible earlier and prevents the agent from redefining “done” after seeing its own output.`,
    contrastExplanation:`The improved instruction operationalizes the named concept: its source nuance becomes a boundary, its output is specified before action, and success is independent evidence rather than stylistic plausibility. It also supplies a falsification case and a stop path, which the weak version lacks.`,
    failureModes: failuresFor(topic, p),
    reusableAid: {
      type:'prompt-template',
      content:`${topic.title} worksheet — Case: ${c[0]}. Decision: [what this concept controls]. Source rule: ${topic.nuance} Required input: ${c[1]}. Assumption to test: [claim]. Counterexample: [boundary case]. Reversible action: [one action]. Proof: ${c[2]}. Stop/escalate when: [condition]. Provenance: ${primary.id} p.${primary.pages[0]}.`,
      usage:`Fill the decision, assumption, counterexample, action, and stop fields before asking Claude to act. Afterward attach the observed proof and mark whether the source rule held, needed an exception, or was too dated to use.`
    },
    checklist:[`Outcome is observable rather than “improve” or “finish”.`,`Relevant source files or state were inspected and cited.`,`Constraints, non-goals, permissions, and stop conditions are explicit.`,`The action is the smallest reversible slice that tests the key assumption.`,`Verification directly supports the behavior being claimed.`,`Failures have a checkpoint and recovery route.`,`Durable discoveries are recorded outside the transient chat.`],
    exercise:`Recreate the ${c[0]} case in a branch, disposable folder, or paper simulation. Build ${c[1]}; include one deliberately missing or misleading input. Ask Claude to apply ${topic.title.toLowerCase()}, then run the boundary case and capture ${c[2]}. Finally, explain which part of this source qualification changed your action: ${topic.nuance}`,
    successCriteria:[`A new reader can identify the exact outcome and boundary without asking what “done” means.`,`The artifact or captured output independently demonstrates the claimed result.`,`The diff or action can be reversed without removing unrelated work.`,`The handoff lets a fresh session continue without the discarded transcript.`,`Any source-specific or uncertain claim remains visibly qualified.`],
    advancedNuance:`At expert level, treat ${topic.title.toLowerCase()} as a policy that can be measured. Track where decisions stall, which checks catch defects, how often context must be rebuilt, and which permissions are actually used. Move stable, repeated rules into versioned instructions or deterministic tooling; keep ambiguous judgment in a human-reviewed brief. ${sourceOnly ? `This dossier contains source-specific or time-sensitive evidence. Its durable value is the decision pattern, not an assurance that the named product behavior, price, limit, or interface remains current.` : `Increase autonomy only after representative tasks repeatedly pass the same evidence gate; a successful demonstration is not an evaluation set.`}`,
    citations,
    visualDecision:topicVisuals[topic.id]?{status:'used',localPath:topicVisuals[topic.id][0],altText:topicVisuals[topic.id][1],caption:topicVisuals[topic.id][2]}:{ status:'not_applicable', reason:`No unique source diagram is required to execute this lesson. The decisive teaching artifact is ${c[1]}, and a decorative PDF-page capture would add text without clarifying the mechanism.` }
  };
}

const topics = ontology.topics.map(dossier);
fs.writeFileSync(path.join(root, 'data/topic-details.json'), `${JSON.stringify(topics, null, 2)}\n`);

const countWords = value => JSON.stringify(value).replace(/[^A-Za-z0-9'-]+/g, ' ').trim().split(/\s+/).filter(Boolean).length;
const metrics = topics.map(topic => ({ id:topic.id, words:countWords({...topic,citations:[],title:'',id:''}), citations:topic.citations.length, procedureSteps:topic.procedure.length, failures:topic.failureModes.length }));
console.log(JSON.stringify({topics:topics.length,minWords:Math.min(...metrics.map(x=>x.words)),maxWords:Math.max(...metrics.map(x=>x.words)),averageWords:Math.round(metrics.reduce((a,b)=>a+b.words,0)/metrics.length),failures:metrics.filter(x=>x.words<350||x.citations<1||x.procedureSteps<4||x.failures<2)},null,2));
