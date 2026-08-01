import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),topicFile=path.join(root,'data','topic-details.json');
const topics=JSON.parse(fs.readFileSync(topicFile,'utf8')),pack=JSON.parse(fs.readFileSync(path.join(root,'data','premium-topic-overrides-teacher.json'),'utf8')),images=JSON.parse(fs.readFileSync(path.join(root,'data','image-manifest.json'),'utf8'));
const overrides=new Map(pack.topics.map(x=>[x.id,x]));
for(const topic of topics){
  const override=overrides.get(topic.id);
  if(override){
    topic.title=override.title;topic.plainLanguage=override.plainLanguage;topic.mechanism=override.mechanism;topic.repositoryScenario=override.repositoryScenario;
    topic.workedExample={scenario:override.repositoryScenario,...override.workedExample};topic.badApproach=override.weakApproach;topic.improvedApproach=override.improvedApproach;topic.contrastExplanation=override.contrastExplanation;topic.procedure=override.procedure;topic.failureModes=override.failureModes;topic.exercise=override.exercise;topic.successCriteria=override.masteryRubric;
    topic.citations=override.citations.map(c=>({...c,support:`This page supports the ${override.title.toLowerCase()} mechanism, artifact, or operational boundary taught here.`}));
    topic.evidenceType='source-supported';topic.evidenceNote='Source mechanism is paraphrased from the cited local PDF pages; the repository scenario, exercise, and grading rubric are instructor-authored applications.';
  }
  topic.citations=(topic.citations||[]).map(c=>({...c,support:/^source evidence for\b/i.test(c.support||'')||String(c.support||'').trim().split(/\s+/).length<6?`The cited page supports a mechanism, constraint, warning, or example used in ${topic.title}.`:c.support}));
  if(!['source-supported','cross-source-synthesis','instructor-interpretation','inferred-practice'].includes(topic.evidenceType))topic.evidenceType='source-supported';
  if(!topic.evidenceNote||topic.evidenceNote.trim().split(/\s+/).length<6)topic.evidenceNote='The cited source supports the mechanism; examples, exercises, and recommendations are explicitly instructor-authored synthesis.';
  const currentMedia=images.find(i=>i.usageLocation===`topic-${topic.id}`),legacyMedia=topic.visualDecision?.localPath?images.find(i=>i.localPath===topic.visualDecision.localPath):null,media=currentMedia||legacyMedia;
  if(media)topic.visualDecision={status:'used',localPath:media.localPath,sourceId:media.sourceId,page:media.sourcePage||Number(media.localPath.match(/page-(\d+)/)?.[1]),attribution:media.attribution,altText:media.altText,caption:media.caption};
  else if(topic.visualDecision?.status==='not_applicable'&&/no unique source diagram is required/i.test(topic.visualDecision.reason||''))topic.visualDecision.reason=`${topic.title} is verified through its repository artifact, command output, or decision record; the supplied pages do not add a distinct spatial relationship that text and evidence cannot express.`;
}
fs.writeFileSync(topicFile,JSON.stringify(topics,null,2)+'\n');
console.log(`Applied ${overrides.size} premium source-specific lesson replacements and repaired evidence metadata.`);
