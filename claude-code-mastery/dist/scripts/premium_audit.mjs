import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const topics=read('data/topic-details.json');
const ontology=read('research/topic-ontology.json').topics;
const reader=read('data/pdf-reader.json');
const images=read('data/image-manifest.json');
const byOntology=new Map(ontology.map(t=>[t.id,t]));
const pageMap=new Map(reader.map(s=>[s.sourceId,new Set(s.pages.map(p=>p.page))]));
const imageMap=new Map(images.map(i=>[i.localPath,i]));
const stop=new Set('a an and are as at be before but by can code concept concrete current deliberately direct does evidence explicit for from has have how if in into is it its keep lesson make may must named not of on one only or output page practical relevant result rule source specific state that the their then this to topic use used using when where while with work'.split(' '));
const clean=s=>String(s??'').toLowerCase().replace(/[^a-z0-9_.\/-]+/g,' ').trim();
const tokens=s=>clean(s).split(/\s+/).filter(x=>x.length>3&&!stop.has(x));
const wordCount=s=>clean(s).split(/\s+/).filter(Boolean).length;
const sentences=s=>String(s??'').split(/(?<=[.!?])\s+/).map(x=>clean(x)).filter(x=>wordCount(x)>=8);
const flatten=t=>[t.plainLanguage,t.mentalModel,t.whyItMatters,t.mechanism,...(t.useWhen||[]),...(t.avoidWhen||[]),...(t.procedure||[]),t.workedExample?.scenario,t.workedExample?.input,...(t.workedExample?.actions||[]),t.workedExample?.expectedEvidence,t.badApproach,t.improvedApproach,t.contrastExplanation||t.explanation,...(t.failureModes||[]).flatMap(f=>[f.symptom,f.cause,f.recovery]),t.reusableAid?.content,t.reusableAid?.usage,...(t.checklist||[]),t.exercise,...(t.successCriteria||[]),t.advancedNuance].join(' ');
const normalize=(s,t,o)=>clean(s).replaceAll(clean(t.title),' topic ').replaceAll(clean(o?.nuance),' nuance ').replace(/\b(pdf-[a-z0-9-]+|page \d+)\b/g,' source ');
const sentenceFrequency=new Map();
for(const t of topics){const o=byOntology.get(t.id);for(const s of new Set(sentences(normalize(flatten(t),t,o))))sentenceFrequency.set(s,(sentenceFrequency.get(s)||0)+1);}
const criterionFrequency=new Map();
for(const t of topics){const key=(t.successCriteria||[]).map(clean).sort().join('|');criterionFrequency.set(key,(criterionFrequency.get(key)||0)+1);}
const proceduralDomains=new Set(['repository','instructions','extensions','daily-interface','tools','verification','delivery','safety','multi-agent','autonomy','automation','knowledge-systems']);
const artifactRx=/(?:\bgit\b|\bgh\b|\bnpm\b|\bpytest\b|\bclaude\b|\/\w+|--[a-z-]+|[\w/-]+\.(?:md|json|ya?ml|toml|js|ts|py|sh|txt)|\b(?:file|path|branch|worktree|hook|command|config(?:uration)? key|environment variable|api endpoint)\b)/i;
const domainArtifactRx={
  repository:/(?:[\w/-]+\.(?:js|ts|py|go|rs|java)|\brg\b|\bfind\b|symbol|call graph|entry point|test command)/i,
  instructions:/(?:CLAUDE\.md|\.claude\/|@[^\s]+|path-specific|frontmatter|instruction file)/i,
  extensions:/(?:settings\.json|\.claude\/|\/\w[\w-]+|hook event|MCP server|skill folder|plugin manifest)/i,
  'daily-interface':/(?:\/\w[\w-]+|statusline|terminal tab|alias\s+\w|keyboard|shell)/i,
  tools:/(?:JSON schema|API|stdout|stderr|exit code|timeout|parameter|response field|tool result)/i,
  verification:/(?:npm test|pytest|cargo test|go test|typecheck|lint|exit code|failing test|diff|trace)/i,
  delivery:/(?:git (?:status|diff|add|commit|worktree|switch)|gh (?:pr|run)|branch|commit hash|CI log)/i,
  safety:/(?:allowlist|denylist|permission|container|sandbox|secret|network|approval gate|read-only)/i,
  'multi-agent':/(?:ownership matrix|file boundary|worktree|handoff artifact|agent role|integrator|branch)/i,
  autonomy:/(?:prd\.json|progress\.txt|agents\.md|stop hook|completion token|max iterations|iteration log)/i,
  automation:/(?:--output-format|JSON output|exit code|timeout|retry|backoff|idempotent|stdout|stderr|cron|CI)/i,
  'knowledge-systems':/(?:\.md\b|vault|note path|backlink|source_file|frontmatter|import manifest|graph edge|archive)/i
};
const outputRx=/(?:pass|fail|exit (?:code|status)|diff|log|trace|report|generated file|test output|denied|blocked|stdout|stderr|status|commit|artifact|backlink|checksum|latency|coverage)/i;
const vagueExampleRx=/(?:a practitioner|one named behavior|one reversible action|make everything better|\[specific outcome\]|\[named scope\])/i;
const placeholderRx=/\[[^\]]+\]/;
const supportRx=/^source evidence for\b/i;
const observableRx=/(?:file|command|output|pass|fail|diff|log|trace|count|status|branch|test|denied|blocked|link|page|time|percent|exit|reproduce|without asking|independently)/i;

const audit=topics.map(t=>{
  const o=byOntology.get(t.id); const text=flatten(t); const example=[t.workedExample?.scenario,t.workedExample?.input,...(t.workedExample?.actions||[]),t.workedExample?.expectedEvidence].join(' '); const mechanism=[t.mechanism,example].join(' ');
  const distinctive=[...new Set(tokens(`${o?.title||''} ${o?.nuance||''}`))].filter(x=>!tokens(t.title).includes(x));
  const covered=distinctive.filter(x=>clean(text).includes(x)); const mechanismCovered=distinctive.filter(x=>clean(mechanism).includes(x));
  const sharedSentences=[...new Set(sentences(normalize(text,t,o)))].filter(s=>(sentenceFrequency.get(s)||0)>=10);
  const criterionKey=(t.successCriteria||[]).map(clean).sort().join('|');
  const procedural=proceduralDomains.has(o?.domain);
  const citations=t.citations||[]; const badCitations=citations.filter(c=>!pageMap.get(c.sourceId)?.has(c.page)||wordCount(c.support)<6||supportRx.test(c.support));
  const visual=t.visualDecision||{}; const manifest=visual.localPath?imageMap.get(visual.localPath):null;
  const visualOkay=visual.status==='not_applicable' ? wordCount(visual.reason)>=8&&!/no unique source diagram is required to execute this lesson/i.test(visual.reason) : visual.status==='used'&&manifest&&fs.existsSync(path.join(root,visual.localPath))&&visual.sourceId&&Number.isInteger(visual.page)&&visual.attribution&&wordCount(visual.altText)>=8&&wordCount(visual.caption)>=8;
  const checks={
    distinctiveVocabulary:covered.length>=Math.min(4,distinctive.length)&&mechanismCovered.length>=Math.min(2,distinctive.length),
    boilerplate:sharedSentences.length<6,
    realisticExample:wordCount(example)>=80&&!vagueExampleRx.test(example)&&!placeholderRx.test(example),
    executableArtifact:!procedural||(artifactRx.test(example+' '+(t.procedure||[]).join(' '))&&(domainArtifactRx[o?.domain]?.test(example+' '+(t.procedure||[]).join(' ')+' '+(t.reusableAid?.content||''))??true)),
    observableOutput:outputRx.test(t.workedExample?.expectedEvidence+' '+(t.successCriteria||[]).join(' ')),
    practicalRubric:(criterionFrequency.get(criterionKey)||0)<5&&(t.successCriteria||[]).length>=3&&(t.successCriteria||[]).filter(x=>observableRx.test(x)).length>=2,
    sourceSpecificRecovery:(t.failureModes||[]).length>=2&&(t.failureModes||[]).every(f=>clean(f.symptom+' '+f.cause+' '+f.recovery).includes(clean(t.title).split(' ')[0]))&&new Set((t.failureModes||[]).map(f=>clean(f.recovery))).size===(t.failureModes||[]).length,
    validSpecificCitations:citations.length>0&&badCitations.length===0,
    evidenceBoundary:['source-supported','cross-source-synthesis','instructor-interpretation','inferred-practice'].includes(t.evidenceType)&&wordCount(t.evidenceNote)>=6,
    visualAttribution:visualOkay
  };
  const failures=Object.entries(checks).filter(([,v])=>!v).map(([k])=>k);
  return {id:t.id,title:t.title,domain:o?.domain,pass:failures.length===0,score:Math.round(Object.values(checks).filter(Boolean).length/Object.keys(checks).length*100),failures,diagnostics:{distinctiveTerms:distinctive,coveredTerms:covered,mechanismTerms:mechanismCovered,sharedBoilerplateSentences:sharedSentences.slice(0,8),identicalRubricReuse:criterionFrequency.get(criterionKey)||0,badCitations,procedural,hasArtifact:checks.executableArtifact,visualStatus:visual.status,manifestMatch:Boolean(manifest)}};
});
const priorityIds=['found-agent-loop','prompt-executable-brief','repo-map','context-engineering','instructions-mental-model','extensions-taxonomy','tool-interface-design','verify-targets','verify-write-test-cycle','git-gh-workflow','permissions-risk-tier','parallel-boundaries','ralph-core','ralph-feedback','knowledge-provenance'];
const highPriority=priorityIds.map(id=>audit.find(x=>x.id===id)).filter(x=>x&&!x.pass);
const report={auditedAt:new Date().toISOString(),rubric:'PREMIUM_QUALITY_RUBRIC.md',topics:topics.length,passed:audit.filter(x=>x.pass).length,failed:audit.filter(x=>!x.pass).length,highPriorityFailures:highPriority.map(x=>({id:x.id,title:x.title,failures:x.failures})),failureCounts:Object.fromEntries([...new Set(audit.flatMap(x=>x.failures))].sort().map(k=>[k,audit.filter(x=>x.failures.includes(k)).length])),limitations:['Similarity and vocabulary checks are editorial rejection heuristics, not semantic proof.','Commands are required only for procedural domains; a human must still judge whether the chosen artifact is the right one.','Valid page numbers prove traceability, not faithful interpretation of the source.'],results:audit};
fs.writeFileSync(path.join(root,'data/premium-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,results:undefined},null,2));
if(report.failed)process.exitCode=1;
