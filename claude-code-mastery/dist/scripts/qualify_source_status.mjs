import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..'),file=path.join(root,'data','source-manifest.json');
const sources=JSON.parse(fs.readFileSync(file,'utf8'));
const semantic={
  'pdf-agentic-10':'substantially_complete','pdf-agentic-15':'substantially_complete','pdf-reddit-25':'substantially_complete','pdf-ruben-27':'substantially_complete','pdf-linkedin-32':'substantially_complete','pdf-official-best-practices':'substantially_complete','pdf-ralph-loop':'substantially_complete','pdf-claudemd-masterclass':'substantially_complete','pdf-graphify-obsidian':'partial','pdf-ykdojo-repo':'partial'
};
for(const source of sources){source.pageExtractionStatus='complete';source.semanticCoverageStatus=semantic[source.id];source.status=semantic[source.id];}
fs.writeFileSync(file,JSON.stringify(sources,null,2)+'\n');
console.log('Separated complete page traversal from qualified semantic coverage.');
