import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const sources=JSON.parse(fs.readFileSync(path.join(root,'data','source-manifest.json'),'utf8'));
const conceptPattern=/^(?:Tip\s+\d+[!:]?|#?\d+\.|\d+\.\s+(?:Agent|Harness|Loop|Context|Tool|Memory|Orchestration|Guardrails|Evals|Human|Observability|Multi-Agent|Planning|Reflection|State|Permissions|Stopping|Skills))\s*(.+)$/i;

const clean=s=>s.replace(/\r/g,'').replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
const reader=sources.map(source=>{
  const file=path.join(root,source.localNormalizedFile.replaceAll('/' ,path.sep));
  const raw=clean(fs.readFileSync(file,'utf8'));
  const chunks=raw.split(/^## Page (\d+)\s*$/gm);
  const pages=[];
  for(let i=1;i<chunks.length;i+=2) pages.push({page:Number(chunks[i]),text:clean(chunks[i+1])});
  const concepts=[];
  for(const page of pages){
    for(const line of page.text.split('\n').map(x=>x.trim()).filter(Boolean)){
      const match=line.match(conceptPattern);
      if(match){
        const title=line.replace(/^#+\s*/,'').replace(/\s+(Created Jan.*|Message Mods|Evasion Guard)$/,'').trim();
        if(!concepts.some(x=>x.title===title)) concepts.push({title,page:page.page});
      }
    }
  }
  return {sourceId:source.id,title:source.title,pages,concepts};
});

fs.writeFileSync(path.join(root,'data','pdf-reader.json'),JSON.stringify(reader,null,2));
console.log(`Built complete reader: ${reader.length} PDFs, ${reader.reduce((n,s)=>n+s.pages.length,0)} pages, ${reader.reduce((n,s)=>n+s.concepts.length,0)} named concepts.`);
