import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const ontology=JSON.parse(fs.readFileSync(path.join(root,'research/topic-ontology.json'),'utf8')).topics;
const details=JSON.parse(fs.readFileSync(path.join(root,'data/topic-details.json'),'utf8'));
const reader=JSON.parse(fs.readFileSync(path.join(root,'data/pdf-reader.json'),'utf8'));
const pages=new Map(reader.map(s=>[s.sourceId,new Set(s.pages.map(p=>p.page))]));
const byId=new Map(details.map(t=>[t.id,t]));
const allowedEvidence=new Set(['source-supported','source-only','cross-source-synthesis','instructor-interpretation','inferred-practice']);
const words=s=>(String(s??'').match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)||[]).length;
const allText=t=>[t.plainLanguage,t.mentalModel,t.whyItMatters,t.mechanism,...t.procedure,t.workedExample?.scenario,t.workedExample?.input,...(t.workedExample?.actions||[]),t.workedExample?.expectedEvidence,t.badApproach,t.improvedApproach,t.contrastExplanation,...t.failureModes.flatMap(f=>[f.symptom,f.cause,f.recovery]),t.reusableAid?.content,t.exercise,t.advancedNuance].join(' ');
const fingerprints=new Map();
for(const t of details) for(const field of ['workedExample.scenario','badApproach','exercise']) {
  const v=field.split('.').reduce((x,k)=>x?.[k],t)?.toLowerCase().replaceAll(t.title.toLowerCase(),'[topic]');
  if(v) fingerprints.set(`${field}:${v}`,(fingerprints.get(`${field}:${v}`)||0)+1);
}
const topics=ontology.map(o=>{
  const t=byId.get(o.id); const req=[];
  if(!t) return {id:o.id,title:o.title,pass:false,score:0,rewriteRequirements:['Create the missing dossier.']};
  const text=allText(t), title=t.title.toLowerCase(), nuance=o.nuance.replace(/[“”]/g,'').slice(0,45).toLowerCase();
  const checks={
    schema:Array.isArray(details)&&typeof t.contrastExplanation==='string'&&['used','not_applicable'].includes(t.visualDecision?.status),
    evidenceLabel:allowedEvidence.has(t.evidenceType),
    sourceEvidence:t.citations?.length>0&&t.citations.every(c=>pages.get(c.sourceId)?.has(c.page)),
    instructionalDepth:words(text)>=350,
    topicSpecificity:(text.toLowerCase().split(title).length-1)>=6&&text.toLowerCase().includes(nuance),
    workedTeaching:Boolean(t.workedExample?.scenario&&t.workedExample?.actions?.length>=4&&t.workedExample?.expectedEvidence),
    contrast:Boolean(t.badApproach&&t.improvedApproach&&words(t.contrastExplanation)>=18),
    recovery:t.failureModes?.length>=2&&t.failureModes.every(f=>words(f.symptom)>=8&&words(f.cause)>=8&&words(f.recovery)>=8),
    practice:Boolean(t.exercise&&t.successCriteria?.length>=3),
    cleanEvidence:!/[�]|(?:\b\d+\/\d+\b)|(?:\d{1,2}:\d{2}\s*(?:AM|PM))/i.test(t.workedExample?.input||''),
    nonDuplicateExample:(fingerprints.get(`workedExample.scenario:${t.workedExample.scenario.toLowerCase().replaceAll(title,'[topic]')}`)||0)===1
  };
  for(const [k,v] of Object.entries(checks)) if(!v) req.push({schema:'Correct root, contrastExplanation, evidenceType, or visualDecision schema.',sourceEvidence:'Replace invalid/general citations with page-level evidence.',instructionalDepth:'Add mechanism, worked reasoning, and recovery detail; do not pad.',topicSpecificity:'Rewrite the procedure and example around this concept’s actual mechanism.',workedTeaching:'Provide inputs, four actions, and independently inspectable output.',contrast:'Explain why the improved approach changes behavior.',recovery:'Add diagnostic symptoms, causes, and actionable recovery.',practice:'Add an executable exercise and observable mastery checks.',cleanEvidence:'Clean PDF header/date/page-number noise from the evidence excerpt.',nonDuplicateExample:'Replace the duplicated example with a topic-specific application.'}[k]);
  const score=Math.round(Object.values(checks).filter(Boolean).length/Object.keys(checks).length*100);
  return {id:o.id,title:t.title,domain:o.domain,pass:req.length===0,score,checks,rewriteRequirements:req};
});
const report={auditedAt:new Date().toISOString(),ontologyTopics:ontology.length,dossiers:details.length,passed:topics.filter(t=>t.pass).length,failed:topics.filter(t=>!t.pass).length,method:'Adversarial structural and editorial heuristics: schema, evidence labels, page validity, depth, topic-name/nuance specificity, worked teaching, contrast, recovery, practice, excerpt cleanliness, and duplicate scenarios.',limitations:['Automated checks cannot prove factual interpretation; page citations still require human comparison with source context.','Domain cases are intentionally shared scaffolds. The source nuance, boundary case, worksheet, and proof must remain topic-specific; future editorial passes should diversify examples further.','A visual marked not_applicable is a documented editorial decision, not proof that no useful screenshot exists.'],topics};
fs.writeFileSync(path.join(root,'data/editorial-audit.json'),JSON.stringify(report,null,2)+'\n');
const failures=topics.filter(t=>!t.pass);
const md=[`# Editorial audit`,``,`Audited ${report.dossiers} dossiers against ${report.ontologyTopics} canonical topics. **${report.passed} passed; ${report.failed} failed.**`,``,`## Method`,``,report.method,``,`## Global findings`,``,`- The previous generator was rejected because it used the same repository-change scenario, failure modes, prompt, and exercise across nearly every topic.`,`- The revised generator uses domain-appropriate artifacts and verification evidence, injects each topic's source qualification into the procedure, worked application, worksheet, and exercise, and uses the app's required schema.`,`- Word count remains only a floor; passing also requires concept-specific application, contrast, recovery, practice, and valid page evidence.`,``,`## Remaining limitations`,``,...report.limitations.map(x=>`- ${x}`),``,`## Per-topic results`,``,`| Topic | Score | Result | Rewrite requirement |`,`|---|---:|---|---|`,...topics.map(t=>`| ${t.title.replaceAll('|','/')} | ${t.score} | ${t.pass?'PASS':'FAIL'} | ${t.rewriteRequirements.join(' ')||'None'} |`)];
fs.writeFileSync(path.join(root,'research/EDITORIAL_AUDIT.md'),md.join('\n')+'\n');
console.log(JSON.stringify({ontologyTopics:report.ontologyTopics,dossiers:report.dossiers,passed:report.passed,failed:report.failed},null,2));
if(report.failed) process.exitCode=1;
