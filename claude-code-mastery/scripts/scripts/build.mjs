import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,'data',n),'utf8'));
const data={sources:read('source-manifest.json'),images:read('image-manifest.json'),insights:read('insights.json'),curriculum:read('curriculum.json'),reference:read('reference.json'),topics:read('topic-coverage.json'),pdfSources:read('pdf-source-manifest.json')};
const ids=new Set(data.sources.map(s=>s.id));
if(ids.size!==10)throw new Error(`Expected 10 sources, got ${ids.size}`);
for(const i of data.insights){if(!i.id||!i.sourceIds?.length||i.sourceIds.some(s=>!ids.has(s)))throw new Error(`Invalid insight ${i.id}`)}
for(const w of data.reference.workflows){if(!w.sourceIds?.length)throw new Error(`Workflow ${w.id} missing sources`)}
const out=path.join(root,'dist');fs.mkdirSync(out,{recursive:true});
for(const d of ['styles','scripts','assets'])fs.cpSync(path.join(root,d),path.join(out,d),{recursive:true,force:true});
const html=fs.readFileSync(path.join(root,'index.template.html'),'utf8').replace('__APP_DATA__',JSON.stringify(data).replaceAll('</script>','<\\/script>'));
fs.writeFileSync(path.join(root,'index.html'),html);
fs.writeFileSync(path.join(out,'index.html'),html);
fs.cpSync(path.join(root,'data'),path.join(out,'data'),{recursive:true,force:true});
console.log(`Built ${out} with ${data.insights.length} insights and ${data.curriculum.phases.flatMap(p=>p.levels.flatMap(l=>l.modules)).length} lessons.`);
