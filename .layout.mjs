import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const T={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain'};
const srv=http.createServer((rq,rs)=>{let f=path.join('dist',decodeURIComponent(rq.url.split('?')[0]));
  if(!fs.existsSync(f)||fs.statSync(f).isDirectory())f='dist/index.html';
  rs.writeHead(200,{'Content-Type':T[path.extname(f)]??'application/octet-stream'});rs.end(fs.readFileSync(f));});
await new Promise(r=>srv.listen(0,'127.0.0.1',r));
const o=`http://127.0.0.1:${srv.address().port}`;
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH});
const routes=['/','/projects','/projects/sraboni-court','/land-owners','/institutional','/about','/about/founder','/contact','/credits','/privacy','/thank-you','/nope'];
let bad=0,n=0;
for (const w of [390,768,1400]) {
  const ctx=await b.newContext({viewport:{width:w,height:900},isMobile:w<500});
  for (const r of routes) {
    const p=await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.goto(o+r,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(400); n++;
    const m=await p.evaluate(()=>{
      // A collapsed grid column: text far narrower than the box it sits in AND
      // too narrow to read. 34px in a 350px row was the real bug; a 313px
      // column in a 720px grid is a legitimate two-column layout.
      const sq=[];
      for(const el of document.querySelectorAll('p,span,dd,li,b,div')){
        if(el.children.length) continue;
        const t=(el.textContent||'').trim();
        if(t.split(/\s+/).length<8) continue;
        const rr=el.getBoundingClientRect(); if(!rr.width) continue;
        if(rr.width<200) sq.push(`${Math.round(rr.width)}px "${t.slice(0,24)}"`);
      }
      return {spill:document.documentElement.scrollWidth>window.innerWidth+1, sq};
    });
    if(m.spill||m.sq.length||errs.length){bad++;
      console.log(`FAIL ${w} ${r} spill=${m.spill} err=${errs.length}`, m.sq.slice(0,2), errs.slice(0,1));}
    await p.close();
  }
  await ctx.close();
}
console.log(bad?`${bad}/${n} views with problems`:`all ${n} views clean`);
await b.close(); srv.close();
