import f from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,C='udlr';
const S=L=>{
const r=L.split(/\r?\n/).filter(x=>x);let W=Math.max(...r.map(s=>s.length));
const A=r.map(s=>s.padEnd(W,'#')).join('');
const nb=(c,d)=>{const n=c+[0,0,-1,1][d]+[-1,1,0,0][d]*W;return n<0||n>=A.length||(d>1&&(n/W|0)!==(c/W|0))?-1:n};
let pp=0,py=0;const B=[],G=new Set;
for(let c=0;c<A.length;c++){const k=A[c];if(k==='@'){pp=c;py=c/W|0};'$*'.includes(k)&&B.push(c),'.*'.includes(k)&&G.add(c)}
const BF=(s,ps)=>{const pr=new Int32Array(A.length).fill(-2);pr[s]=-1;const q=[s];
for(const n of q){for(let d=0;d<4;d++){const z=nb(n,d);if(pr[z]===-2&&ps(z)){pr[z]=n*4+d;q.push(z)}}}return pr};
const PT=(pr,t,s)=>{if(pr[t]===-2)return null;let o='',n=t;while(n!==s){o=C[pr[n]%4]+o;n=pr[n]/4|0}return o};
const RM=[];
for(let c=0;c<A.length;c++){
if((c/W|0)===py||A[c]==='#'||RM.some(m=>m.c.has(c)))continue;
const q=[c],cl=new Set([c]);let dr=-1;
while(q.length){const n=q.pop();for(let d=0;d<4;d++){const m=nb(n,d);
if(m>=0&&A[m]!=='#'){if((m/W|0)===py)dr=n;else if(!cl.has(m)){cl.add(m);q.push(m)}}}}
if(dr<0)throw 0;const e=py*W+dr%W;cl.add(e);RM.push({c:cl,d:dr,e})}
let cur=pp,out='';
for(const m of RM){
for(;cur<m.e;cur++)out+='r';for(;cur>m.e;cur--)out+='l';
const s=Z(m);out+=s[0];
const ex=PT(BF(s[1],c=>m.c.has(c)&&!s[2].includes(c)),m.d,s[1]);if(ex===null)throw 0;
out+=ex+C[m.d>m.e?0:1];cur=m.e}
return out;
function Z(m){
const inR=c=>m.c.has(c);
const b0=B.filter(inR).sort((a,b)=>a-b);
const ds=new Int32Array(A.length).fill(1e9),q=[];
for(const g of G)if(inR(g)){ds[g]=0;q.push(g)}
for(const n of q){for(let d=0;d<4;d++){const p=nb(n,d^1);
if(ds[p]>1e8&&inR(p)&&inR(nb(p,d^1))){ds[p]=ds[n]+1;q.push(p)}}}
const hf=b=>b.reduce((s,x)=>s+ds[x],0);
const N=[[b0,m.e,-1,'',0]],Bk=[],bt={};let mf=0;
const h0=hf(b0);if(h0>1e8)throw 0;
(Bk[h0]=Bk[h0]||[]).push(0);bt[b0+'|'+m.e]=0;
for(;;){
while(!(Bk[mf]||0).length){if(++mf>=Bk.length)throw 0}
const ni=Bk[mf].pop(),nd=N[ni],bs=new Set(nd[0]);
if(nd[4]>(bt[nd[0]+'|'+nd[1]]??1e9))continue;
if(nd[0].every(c=>G.has(c))){let mv='',n=ni;while(n>0){mv=N[n][3]+mv;n=N[n][2]}return[mv,nd[1],nd[0]]}
const pr=BF(nd[1],c=>inR(c)&&!bs.has(c));
for(const bc of nd[0]){for(let d=0;d<4;d++){
const de=nb(bc,d);if(!inR(de)||bs.has(de)||ds[de]>1e8)continue;
const be=nb(bc,d^1);if(!inR(be)||bs.has(be))continue;
const w=PT(pr,be,nd[1]);if(w===null)continue;
const nb2=nd[0].slice();nb2[nb2.indexOf(bc)]=de;nb2.sort((a,b)=>a-b);
const hh=hf(nb2);if(hh>1e8)continue;
const g2=nd[4]+1,k2=nb2+'|'+bc;
if(g2>=(bt[k2]??1e9))continue;
bt[k2]=g2;(Bk[g2+hh]=Bk[g2+hh]||[]).push(N.push([nb2,bc,ni,w+C[d],g2])-1)}}}
}}
f.readdirSync(I).sort().forEach(d=>{let m='';try{m=S(f.readFileSync(I+'/'+d+'/level.txt','utf8'))}catch{}f.mkdirSync(O+'/'+d,{recursive:!0});f.writeFileSync(O+'/'+d+'/solution.txt',m+'\n')});
