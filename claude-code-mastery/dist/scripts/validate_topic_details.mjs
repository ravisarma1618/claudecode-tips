import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const ontology = JSON.parse(fs.readFileSync(path.join(root, 'research/topic-ontology.json'), 'utf8'));
const details = JSON.parse(fs.readFileSync(path.join(root, 'data/topic-details.json'), 'utf8'));
const reader = JSON.parse(fs.readFileSync(path.join(root, 'data/pdf-reader.json'), 'utf8'));
const pages = new Map(reader.map(source => [source.sourceId, new Set(source.pages.map(page => page.page))]));
const fields = ['plainLanguage','mentalModel','whyItMatters','mechanism','prerequisites','useWhen','avoidWhen','procedure','workedExample','badApproach','improvedApproach','explanation','failureModes','reusableAid','checklist','exercise','successCriteria','advancedNuance','citations','visualDecision'];

function strings(value, key='') {
  if (key === 'citations' || key === 'visualDecision') return [];
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(item => strings(item, key));
  if (value && typeof value === 'object') return Object.entries(value).flatMap(([childKey, child]) => strings(child, childKey));
  return [];
}
function words(topic) { return strings(topic).join(' ').match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu)?.length ?? 0; }

const topicList = Array.isArray(details) ? details : details.topics;
const expected = new Set(ontology.topics.map(topic => topic.id));
const actual = new Set(topicList.map(topic => topic.id));
const audit = topicList.map(topic => {
  const missingFields = fields.filter(field => topic[field] === undefined || topic[field] === null || topic[field] === '' || (Array.isArray(topic[field]) && !topic[field].length));
  const badCitations = (topic.citations ?? []).filter(citation => !pages.get(citation.sourceId)?.has(citation.page));
  const checks = {
    canonicalTopic: expected.has(topic.id),
    requiredFields: missingFields.length === 0,
    minimumWords: words(topic) >= 350,
    procedure: topic.procedural !== true || topic.procedure?.length >= 4,
    failureRecovery: topic.failureModes?.length >= 2 && topic.failureModes.every(item => item.symptom && item.cause && item.recovery),
    workedApplication: Boolean(topic.workedExample?.scenario && topic.workedExample?.input && topic.workedExample?.actions?.length && topic.workedExample?.expectedEvidence),
    reusableAid: Boolean(topic.reusableAid?.type && topic.reusableAid?.content && topic.reusableAid?.usage),
    practiceAndMastery: Boolean(topic.exercise && topic.successCriteria?.length),
    validCitation: topic.citations?.length > 0 && badCitations.length === 0,
    visualDecision: topic.visualDecision?.status === 'used'
      ? Boolean(topic.visualDecision.localPath && topic.visualDecision.altText && topic.visualDecision.caption)
      : Boolean(topic.visualDecision?.status === 'not_applicable' && topic.visualDecision?.reason)
  };
  return { id:topic.id, instructionalWords:words(topic), pass:Object.values(checks).every(Boolean), checks, missingFields, badCitations };
});

const report = {
  auditedAt:new Date().toISOString(),
  expectedTopics:expected.size,
  actualTopics:actual.size,
  missingTopicIds:[...expected].filter(id => !actual.has(id)),
  extraTopicIds:[...actual].filter(id => !expected.has(id)),
  passed:audit.filter(item => item.pass).length,
  failed:audit.filter(item => !item.pass).length,
  minInstructionalWords:Math.min(...audit.map(item => item.instructionalWords)),
  averageInstructionalWords:Math.round(audit.reduce((sum,item)=>sum+item.instructionalWords,0)/audit.length),
  topics:audit
};
fs.writeFileSync(path.join(root, 'data/topic-depth-audit.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({...report,topics:undefined},null,2));
if (report.missingTopicIds.length || report.extraTopicIds.length || report.failed) process.exit(1);
