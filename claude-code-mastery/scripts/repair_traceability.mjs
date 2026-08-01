import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const file=path.join(root,'data','topic-details.json');
const topics=JSON.parse(fs.readFileSync(file,'utf8'));
const additions={
  'parallel-boundaries':[['pdf-reddit-25',14]],
  'prompt-edit-before-bad-answer':[['pdf-reddit-25',19],['pdf-reddit-25',20],['pdf-official-best-practices',18],['pdf-official-best-practices',20]],
  'tool-interface-design':[['pdf-official-best-practices',11],['pdf-official-best-practices',12]],
  'extensions-skills':[['pdf-official-best-practices',12],['pdf-official-best-practices',13]],
  'parallel-multi-agent-roles':[['pdf-official-best-practices',14],['pdf-official-best-practices',16],['pdf-official-best-practices',20],['pdf-official-best-practices',21],['pdf-claudemd-masterclass',34],['pdf-claudemd-masterclass',36]],
  'prompt-clarifying-questions':[['pdf-official-best-practices',16],['pdf-official-best-practices',18]],
  'context-compact-handoff':[['pdf-official-best-practices',19],['pdf-official-best-practices',20]],
  'practice-personal-workflow':[['pdf-official-best-practices',28],['pdf-official-best-practices',29]],
  'extensions-taxonomy':[['pdf-claudemd-masterclass',39],['pdf-claudemd-masterclass',40]]
};
for(const [id,records] of Object.entries(additions)){
  const topic=topics.find(t=>t.id===id);
  if(!topic)throw new Error(`Unknown topic ${id}`);
  topic.citations??=[];
  for(const [sourceId,page] of records)if(!topic.citations.some(c=>c.sourceId===sourceId&&c.page===page))topic.citations.push({sourceId,page,support:'Additional page-level support identified by the source-completeness audit.'});
}
fs.writeFileSync(file,JSON.stringify(topics,null,2)+'\n');
console.log(`Repaired page-level traceability for ${Object.keys(additions).length} lessons.`);
