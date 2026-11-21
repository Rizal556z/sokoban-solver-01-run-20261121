import f from'node:fs';
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env,C='udlr';
const S=L=>{
const r=L.split(/\r?\n/).filter(x=>x);let W=Math.max(...r.map(s=>s.length));
const A=r.map(s=>s.padEnd(W,'#')).join('');
const nb=(c,d)=>{const n=c+(d?d-1?d-2?1:-1:W:-W);return n<0|n>=A.length|d>1&(n/W|0)!=(c/W|0)?-1:n};
let P=0,Y=0;const B=[],G=new Set;
for(let c=0;c<A.length;c++){const k=A[c];if(k=='@'){P=c;Y=c/W|0};'$*'.includes(k)&&B.push(c),'.*'.includes(k)&&G.add(c)}
const BF=(s,ps)=>{const pr=new Int32Array(A.length).fill(-2);pr[s]=-1;const q=[s];
for(const n of q)for(let d=0;d<4;d++){const z=nb(n,d);if(pr[z]==-2&ps(z)){pr[z]=n*4+d;q.push(z)}}return pr};
const PT=(pr,t,s)=>{if(pr[t]==-2)return null;let o='',n=t;while(n!=s){o=C[pr[n]%4]+o;n=pr[n]/4|0}return o};
const R=[];
for(let c=0;c<A.length;c++){
if((c/W|0)==Y|A[c]=='#'|R.some(m=>m.c.has(c)))continue;
const q=[c],v=new Set([c]);let dr=-1;
while(q.length){const n=q.pop();for(let d=0;d<4;d++){const m=nb(n,d);
if(m>=0&A[m]!='#'){if((m/W|0)==Y)dr=n;else if(!v.has(m)){v.add(m);q.push(m)}}}}
if(dr<0)throw 0;const e=Y*W+dr%W;v.add(e);R.push({c:v,d:dr,e})}
let cur=P,out='';
for(const m of R){
for(;cur<m.e;cur++)out+='r';for(;cur>m.e;cur--)out+='l';
const s=Z(m);out+=s[0];
const ex=PT(BF(s[1],c=>m.c.has(c)&!s[2].includes(c)),m.d,s[1]);if(ex==null)throw 0;
out+=ex+C[m.d>m.e?0:1];cur=m.e}
return out;
function Z(m){
const i=c=>m.c.has(c);
const b0=B.filter(i).sort((a,b)=>a-b);
const ds=new Int32Array(A.length).fill(1e9),q=[];
for(const g of G)if(i(g))ds[g]=0,q.push(g);
for(const n of q)for(let d=0;d<4;d++){const p=nb(n,d^1);
if(ds[p]>1e8&i(p)&i(nb(p,d^1))){ds[p]=ds[n]+1;q.push(p)}}
const h=b=>b.reduce((s,x)=>s+ds[x],0);
const N=[[b0,m.e,-1,'',0]],K=[],t={};let f=0;
const h0=h(b0);if(h0>1e8)throw 0;
(K[h0]=K[h0]||[]).push(0);t[b0+'|'+m.e]=0;
for(;;){
while(!(K[f]||0).length){if(++f>=K.length)throw 0}
const j=K[f].pop(),D=N[j],e=new Set(D[0]);
if(D[4]>(t[D[0]+'|'+D[1]]??1e9))continue;
if(D[0].every(c=>G.has(c))){let v='',n=j;while(n>0){v=N[n][3]+v;n=N[n][2]}return[v,D[1],D[0]]}
const pr=BF(D[1],c=>i(c)&!e.has(c));
for(const b of D[0])for(let d=0;d<4;d++){
const u=nb(b,d);if(!i(u)|e.has(u)|ds[u]>1e8)continue;
const a=nb(b,d^1);if(!i(a)|e.has(a))continue;
const w=PT(pr,a,D[1]);if(w==null)continue;
const n=D[0].slice();n[n.indexOf(b)]=u;n.sort((a,b)=>a-b);
const H=h(n);if(H>1e8)continue;
const g=D[4]+1,y=n+'|'+b;
if(g>=(t[y]??1e9))continue;
t[y]=g;(K[g+H]=K[g+H]||[]).push(N.push([n,b,j,w+C[d],g])-1)}}
}}
f.readdirSync(I).sort().forEach(d=>{let m='';try{m=S(f.readFileSync(I+'/'+d+'/level.txt','utf8'))}catch{}f.mkdirSync(O+'/'+d,{recursive:!0});f.writeFileSync(O+'/'+d+'/solution.txt',m+'\n')});
