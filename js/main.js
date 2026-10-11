/* Soares Embalagens — interações do site */
(function(){
"use strict";
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ARROW='<svg><use href="#i-arrow"/></svg>';

/* ---------------- Ilustrações técnicas (SVG) ---------------- */
function loop(cx,cy,h=30){const d=`M${cx-6},${cy+3} C${cx-11},${cy-h} ${cx+11},${cy-h} ${cx+6},${cy+3}`;return `<path class="i-strap" d="${d}"/><path class="i-strap2" d="${d}"/>`}
function bag(o){
  const w=o.w||118,h=o.h||128,dx=50,dy=-28,b=7;
  const x0=Math.round((280-(w+dx))/2), yb=o.lift?208:222, yt=yb-h, ym=(yt+yb)/2, xr=x0+w;
  const cx=x0+w/2+dx/2, cy=yt+dy/2+2;
  let s=`<ellipse class="i-shadow" cx="${x0+(w+dx)/2}" cy="${222+dy/2+8}" rx="${(w+dx)/2+8}" ry="15"/>`;
  const loops=!o.flap;
  if(loops)s+=loop(x0+dx,yt+dy)+loop(xr+dx,yt+dy);
  s+=`<path class="i-side" d="M${xr},${yt} L${xr+dx},${yt+dy} Q${xr+dx+b*.6},${ym+dy} ${xr+dx},${yb+dy} L${xr},${yb} Q${xr+b},${ym} ${xr},${yt}Z"/>`;
  s+=`<path class="i-top" d="M${x0},${yt} L${x0+dx},${yt+dy} L${xr+dx},${yt+dy} L${xr},${yt} Q${x0+w/2},${yt+5} ${x0},${yt}Z"/>`;
  if(o.spout==='top')s+=`<ellipse class="i-top" cx="${cx}" cy="${cy}" rx="17" ry="7"/><path class="i-front" d="M${cx-12},${cy} L${cx-10},${cy-20} L${cx+10},${cy-20} L${cx+12},${cy}Z"/><ellipse class="i-top" cx="${cx}" cy="${cy-20}" rx="10" ry="4"/><path class="i-ln" d="M${cx-11},${cy-9} Q${cx},${cy-6} ${cx+11},${cy-9}"/>`;
  if(o.spout==='skirt')s+=`<path class="i-front" d="M${x0+14},${yt-2} C${x0+20},${yt-40} ${x0+40},${yt-34} ${cx-6},${yt-46} C${cx+20},${yt-52} ${xr+10},${yt-44} ${xr+dx-14},${yt+dy+2} L${xr-6},${yt+1} Q${x0+w/2},${yt+6} ${x0+14},${yt-2}Z"/><path class="i-ln" d="M${cx-24},${yt-30} q10,6 20,-2 M${cx+4},${yt-36} q8,8 18,0"/>`;
  if(o.flap)[.28,.72].forEach(f=>{const fx=x0+w*f;s+=`<path class="i-top" d="M${fx-12},${yt-13} L${fx-12+dx},${yt+dy-13} L${fx+12+dx},${yt+dy-13} L${fx+12},${yt-13}Z"/><path class="i-front" d="M${fx-12},${yt+2} L${fx-12},${yt-13} L${fx+12},${yt-13} L${fx+12},${yt+3}Z"/><ellipse class="i-dark" cx="${fx}" cy="${yt-4}" rx="7" ry="4.5"/>`});
  s+=`<path class="i-front" d="M${x0},${yt} Q${x0+w/2},${yt+5} ${xr},${yt} Q${xr+b},${ym} ${xr},${yb} Q${x0+w/2},${yb+5} ${x0},${yb} Q${x0-b},${ym} ${x0},${yt}Z"/>`;
  s+=`<path class="i-stitch" d="M${x0+10},${yt+4} Q${x0+4},${ym} ${x0+10},${yb+1} M${xr-10},${yt+4} Q${xr-4},${ym} ${xr-10},${yb+1} M${xr+dx-9},${yt+dy+5} Q${xr+dx-5},${ym+dy+3} ${xr+dx-9},${yb+dy+3}"/>`;
  if(o.bands)for(let i=1;i<=o.bands;i++){const y=yt+h*i/(o.bands+1);s+=`<path class="i-thin" d="M${x0-1},${y} Q${x0+w/2},${y+4} ${xr+1},${y} L${xr+dx},${y+dy}"/>`}
  s+=`<use href="#lg-icon" class="i-logo" x="${x0+w/2-14}" y="${ym-16}" width="28" height="28"/>`;
  s+=`<path class="i-side" d="M${xr+16},${ym-6} l18,-10 l0,18 l-18,10z"/><path class="i-thin" d="M${xr+20},${ym-2} l10,-5 M${xr+20},${ym+3} l10,-5"/>`;
  if(o.discharge)s+=`<path class="i-front" d="M${x0+w/2-10},${yb+3} L${x0+w/2-8},${yb+22} L${x0+w/2+8},${yb+22} L${x0+w/2+10},${yb+3}Z"/><path class="i-ln" d="M${x0+w/2-9},${yb+14} h18"/>`;
  if(loops)s+=loop(x0,yt)+loop(xr,yt);
  return s;
}
function liner(){
  const x0=22,yb=200,L=176,H=92,dx=56,dy=-32,p=7;
  let s=`<ellipse class="i-shadow" cx="${x0+(L+dx)/2}" cy="${yb+dy/2+12}" rx="${(L+dx)/2+6}" ry="14"/>`;
  s+=`<path class="i-side" style="opacity:.55" d="M${x0+dx},${yb-H+dy} h${L} v${H} h-${L}z"/>`;
  s+=`<path class="i-top" style="opacity:.8" d="M${x0},${yb} l${dx},${dy} h${L} l-${dx},${-dy}z"/>`;
  for(let i=1;i<12;i++){const x=x0+dx+L*i/12;s+=`<path class="i-thin" d="M${x},${yb-H+dy} v${H}"/>`}
  s+=`<path class="i-front" d="M${x0+p},${yb-H+12} Q${x0+L/2},${yb-H+2} ${x0+L-p},${yb-H+12} L${x0+L-p+dx-10},${yb-H+dy+14} Q${x0+L/2+dx},${yb-H+dy+4} ${x0+p+dx-6},${yb-H+dy+14}Z"/>`;
  s+=`<path class="i-front" d="M${x0+p},${yb-H+12} Q${x0+L/2},${yb-H+2} ${x0+L-p},${yb-H+12} Q${x0+L+3},${yb-H/2} ${x0+L-p},${yb-2} L${x0+p},${yb-2} Q${x0-3},${yb-H/2} ${x0+p},${yb-H+12}Z"/>`;
  s+=`<path class="i-stitch" d="M${x0+p+14},${yb-H+12} Q${x0+L/2},${yb-H+20} ${x0+L-p-14},${yb-H+12}"/>`;
  s+=`<ellipse class="i-top" cx="${x0+L-30}" cy="${yb-H+8}" rx="12" ry="5"/><path class="i-front" d="M${x0+L-39},${yb-H+8} L${x0+L-36},${yb-H-12} L${x0+L-24},${yb-H-12} L${x0+L-21},${yb-H+8}Z"/>`;
  [0.3,0.6,0.85].forEach(f=>{s+=`<path class="i-ln" d="M${x0+L+dx*f},${yb+dy*f-H+6} v${H-10}" style="stroke-width:2.4"/>`});
  s+=`<path class="i-ln" d="M${x0},${yb} h${L} l${dx},${dy} M${x0},${yb} l${dx},${dy}"/><path class="i-dash" d="M${x0},${yb} v-${H} h${L} v${H} M${x0},${yb-H} l${dx},${dy} h${L} l-${dx},${-dy} M${x0+L+dx},${yb+dy} v-${H}"/>`;
  s+=`<use href="#lg-icon" class="i-logo" x="${x0+L/2-13}" y="${yb-H/2-12}" width="26" height="26"/>`;
  return s;
}
function bulksheet(){
  let s=`<ellipse class="i-shadow" cx="140" cy="226" rx="104" ry="10"/><rect class="i-side" x="44" y="24" width="192" height="200" rx="4"/>`;
  for(let i=0;i<9;i++)s+=`<path class="i-thin" d="M${58+i*21},30 v188"/>`;
  for(let i=0;i<46;i++){const x=58+((i*37)%166),y=58+((i*23)%18);s+=`<circle class="i-dark" cx="${x}" cy="${y}" r="2.2" style="opacity:.3"/>`}
  s+=`<path class="i-front" d="M56,70 Q140,58 224,70 L224,220 L56,220Z"/>`;
  [96,126,156,186].forEach(y=>{s+=`<path class="i-strap" d="M50,${y} Q140,${y-6} 230,${y}"/><path class="i-strap2" d="M50,${y} Q140,${y-6} 230,${y}"/>`});
  [98,182].forEach(x=>{s+=`<rect class="i-dark" x="${x-3}" y="62" width="6" height="160" rx="2" style="opacity:.85"/>`});
  s+=`<rect class="i-ln" x="44" y="24" width="192" height="200" rx="4" style="stroke-width:2"/><use href="#lg-icon" class="i-logo" x="130" y="196" width="20" height="20"/>`;
  return s;
}
function sling(){
  let s=`<ellipse class="i-shadow" cx="140" cy="228" rx="100" ry="10"/><path class="i-ln" d="M140,8 v14" style="stroke-width:3"/><path class="i-ln" d="M140,22 c-14,0 -14,22 0,22 c8,0 10,-8 6,-12" style="stroke-width:3.4"/>`;
  s+=`<path class="i-strap" d="M138,44 L52,214 M142,44 L228,214"/><path class="i-strap2" d="M138,44 L52,214 M142,44 L228,214"/>`;
  [[64,176,'i-front'],[74,140,'i-top']].forEach(([x0,y,c])=>{for(let k=0;k<3;k++){const ww=c==='i-top'?44:50,x=x0+k*(c==='i-top'?44:52);s+=`<rect class="${c}" x="${x}" y="${y}" width="${ww}" height="34" rx="14"/><path class="i-stitch" d="M${x+10},${y+17} h${ww-20}"/>`}});
  s+=`<rect class="i-front" x="110" y="104" width="60" height="34" rx="14"/><path class="i-stitch" d="M120,121 h40"/>`;
  s+=`<path class="i-strap" d="M44,214 Q140,232 236,214"/><path class="i-strap2" d="M44,214 Q140,232 236,214"/><rect class="i-accent" x="128" y="206" width="24" height="10" rx="5"/>`;
  return s;
}
function ill(p){
  const k=p.ill.kind;
  const inner=k==='bag'?bag(p.ill):k==='liner'?liner():k==='sheet'?bulksheet():sling();
  return `<svg viewBox="0 0 280 245" role="img" aria-label="Ilustração: ${p.name}">${inner}</svg>`;
}

/* ---------------- Dados (etiquetas de produção) ---------------- */
const CATS={bag:'Big bags',liner:'Containers',move:'Içamento'};
const NBR=['Norma','NBR 16.029:2012'];
const PRODUCTS=[
 {id:'alpha',name:'Big Bag Alpha',cat:'bag',short:'Exportação em container, sem paletes.',chips:['1.000 kg','FS 5:1'],
  desc:'Feito para exportar café e grãos em container sem paletes, aproveitando todo o espaço interno.',
  specs:[['Capacidade (SWL)','1.000 a 1.350 kg'],['Medida de referência','0,90 × 1,10 × 1,60 m'],['Fator de segurança','5:1'],['Empilhamento','4 unidades (1 + 3)'],['Versões','Fundo fechado ou com válvula'],NBR],ill:{kind:'bag',spout:'top'}},
 {id:'alpha-grinder',name:'Big Bag Alpha Grinder',cat:'bag',short:'Com descarga inferior para moagem e torrefação.',chips:['1.000 kg','FS 5:1'],
  desc:'A base do Alpha com válvula de descarga no fundo, para abastecer moinhos e torrefadoras.',
  specs:[['Capacidade (SWL)','1.000 kg'],['Medida de referência','1,10 × 1,10 × 1,25 m'],['Fator de segurança','5:1'],['Empilhamento','4 unidades (1 + 3)'],['Descarga','Válvula inferior'],NBR],ill:{kind:'bag',spout:'top',discharge:true,lift:true,h:118}},
 {id:'super-sack',name:'Big Bag Super Sack',cat:'bag',short:'Exportação em container com paletes.',chips:['1.000 kg','20′ e 40′'],
  desc:'Para operações paletizadas em container de 20′ ou 40′.',
  specs:[['Capacidade (SWL)','1.000 kg'],['Medida de referência','1,10 × 1,10 × 1,15 m'],['Fator de segurança','5:1'],['Empilhamento','4 unidades (1 + 3)'],['Container','20′ ou 40′'],NBR],ill:{kind:'bag',spout:'skirt',h:118,w:124}},
 {id:'transporte',name:'Big Bag de Transporte',cat:'bag',short:'Multiuso, para transporte rodoviário de granéis.',chips:['Até 1.500 kg','FS 6:1'],
  desc:'Big bag reutilizável para levar granéis entre fazendas, armazéns e indústrias.',
  specs:[['Capacidade (SWL)','1.200 a 1.500 kg'],['Medidas de referência','0,90 × 0,90 × 1,95 m<br>1,05 × 1,05 × 1,90 m'],['Fator de segurança','6:1'],['Uso','Multiuso'],NBR],ill:{kind:'bag',spout:'top',h:146,w:104}},
 {id:'aba-alcadora',name:'Big Bag de Armazém Aba Alçadora',cat:'bag',short:'Movimente pilhas com empilhadeira.',chips:['1.100 kg','FS 6:1'],
  desc:'A aba recebe os garfos da empilhadeira e dispensa mão de obra avulsa. Adequação aprovada pelo Ministério do Trabalho.',
  specs:[['Capacidade (SWL)','1.100 kg'],['Fator de segurança','6:1'],['Empilhamento','4 unidades (1 + 3)'],['Uso','Multiuso'],['Movimentação','Aba para garfos de empilhadeira'],NBR],ill:{kind:'bag',flap:true,h:122,w:124}},
 {id:'armazem-bolsao',name:'Big Bag de Armazém Bolsão',cat:'bag',short:'Armazenagem com pilha de até 4 unidades.',chips:['1.200 a 1.500 kg','Pilha de 4'],
  desc:'Bolsão reforçado para armazéns, travado ou sem travas, com vida útil maior.',
  specs:[['Capacidade','1.200 a 1.500 kg'],['Empilhamento','Até 4 unidades'],['Versões','Travado ou sem travas'],NBR],ill:{kind:'bag',spout:'skirt',h:112,w:132,bands:2}},
 {id:'bulk-liner',name:'Bulk Liner',cat:'liner',short:'Forração de container para granéis sólidos.',chips:['28.000 kg','Patenteado'],
  desc:'Revestimento interno do container que reduz o custo de embalagem e de frete por tonelada. Modelo exclusivo Soares.',
  specs:[['Capacidade','28.000 kg (container 40′)'],['Containers','20′ e 40′'],['Patente','MU8501368-4'],['Conformidade','Regulamento (UE) 2025/40 (PPWR)'],NBR],ill:{kind:'liner'}},
 {id:'bulk-sheet',name:'Bulk Sheet',cat:'liner',short:'Contenção na porta do container, sem madeira.',chips:['28.000 kg','Sem madeira'],
  desc:'Frente de contenção para estufagem de soja e grãos. Operação limpa e rápida. Modelo exclusivo Soares.',
  specs:[['Capacidade','28.000 kg no container<br>1.000 kg no bulk sheet'],['Modelo','Porta de container'],['Montagem','Sem madeira'],NBR],ill:{kind:'sheet'}},
 {id:'sling',name:'Sling',cat:'move',short:'Lingas para içar sacaria em portos.',chips:['Marine sling'],
  desc:'Unitiza a sacaria para embarque e desembarque seguro em navios.',
  specs:[['Uso','Içamento de sacaria'],['Operação','Portos e terminais'],['Configuração','Conforme peso e número de sacas']],ill:{kind:'sling'}},
];
const FEATURED=['alpha','bulk-liner','aba-alcadora'];
const JOBS=[
 {id:'costura-mg',title:'Costureiro(a)',unit:'Machado/MG',area:'Produção',text:'Costura de painéis, alças e válvulas de big bags.'},
 {id:'ajudante-mg',title:'Ajudante geral',unit:'Machado/MG',area:'Produção',text:'Apoio à produção, organização de materiais e movimentação de fardos.'},
 {id:'banco-sp',title:'Banco de talentos',unit:'Santos/SP',area:'Todas as áreas',text:'Cadastre seu currículo para futuras oportunidades na matriz.',talent:true},
 {id:'banco-mg',title:'Banco de talentos',unit:'Machado/MG',area:'Todas as áreas',text:'Cadastre seu currículo para futuras oportunidades na filial.',talent:true},
];

/* ---------------- Cards ---------------- */
function card(p){
  return `<article class="pcard" data-cat="${p.cat}">
    <button class="ill" type="button" data-open="${p.id}" aria-label="Ver detalhes de ${p.name}"><span class="cat">${CATS[p.cat]}</span>${ill(p)}</button>
    <div class="body"><h3>${p.name}</h3><p>${p.short}</p>
      <div class="chips">${p.chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div>
      <div class="acts"><button class="link" type="button" data-open="${p.id}">Detalhes</button><button class="btn btn-soft btn-sm" type="button" data-quote="${p.id}">Cotar</button></div>
    </div></article>`;
}
$('#homeProducts').innerHTML=FEATURED.map(id=>card(PRODUCTS.find(p=>p.id===id))).join('');
$('#catalog').innerHTML=PRODUCTS.map(card).join('');
$('#filters').innerHTML=[['all','Todos'],...Object.entries(CATS)].map(([k,l],i)=>`<button type="button" data-f="${k}" aria-pressed="${i===0}">${l}</button>`).join('');
$('#filters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  $$('#catalog .pcard').forEach(c=>{const show=b.dataset.f==='all'||c.dataset.cat===b.dataset.f;c.hidden=!show;if(show){c.style.animation='none';c.offsetHeight;c.style.animation='rise .5s both'}})});
const goods=['Café','Soja','Açúcar','Milho','Sementes','Fertilizantes','Minérios','Polímeros'];
$('#ticker').innerHTML=[...goods,...goods].map(g=>`<span>${g}</span>`).join('');

/* ---------------- Detalhe do produto ---------------- */
let lastFocus=null;
function openSheet(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;lastFocus=document.activeElement;
  const el=document.createElement('div');el.className='sheet-bg';el.id='sheetBg';
  el.innerHTML=`<div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
    <div class="ill"><button class="close" type="button" aria-label="Fechar"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3l10 10M13 3L3 13"/></svg></button>${ill(p)}</div>
    <div class="in"><span class="label">${CATS[p.cat]}</span><h2 id="sheetTitle">${p.name}</h2><p class="desc">${p.desc}</p>
    <table class="spec"><tbody>${p.specs.map(([k,v])=>`<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>
    <p class="note">Medidas e capacidades sob medida conforme a carga.</p>
    <div class="acts"><button class="btn btn-primary" type="button" data-quote="${p.id}">Cotar este produto ${ARROW}</button></div></div></div>`;
  document.body.appendChild(el);document.body.style.overflow='hidden';$('.close',el).focus();
  el.addEventListener('click',e=>{if(e.target===el||e.target.closest('.close'))closeSheet()});
}
function closeSheet(){const el=$('#sheetBg');if(!el)return;el.remove();document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSheet();setMenu(false)}});
document.addEventListener('click',e=>{
  const o=e.target.closest('[data-open]');if(o){openSheet(o.dataset.open);return}
  const q=e.target.closest('[data-quote]');if(q){closeSheet();setQuoteProduct(q.dataset.quote);location.hash='cotacao';return}
  const a=e.target.closest('[data-apply]');if(a){$('#v-vaga').value=a.dataset.apply;syncAll();$('#apply').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});setTimeout(()=>$('#v-nome').focus({preventScroll:true}),450);return}
  const c=e.target.closest('[data-copy]');if(c){const t=c.dataset.copy;try{navigator.clipboard.writeText(t).then(()=>toast('Copiado: '+t),()=>selectText(c))}catch(_){selectText(c)}}
});
function selectText(btn){const el=btn.closest('.ch').querySelector('.val');const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);toast('Texto selecionado. Use Ctrl+C para copiar.')}
function toast(msg){$$('.toast').forEach(t=>t.remove());const t=document.createElement('div');t.className='toast';t.setAttribute('role','status');t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}

/* ---------------- Tema claro/escuro ---------------- */
(function(){
  const root=document.documentElement,sw=$('#themeSw'),mq=matchMedia('(prefers-color-scheme: dark)');
  const isDark=()=>{const t=root.getAttribute('data-theme');return t?t==='dark':mq.matches};
  const paint=()=>{const d=isDark();sw.setAttribute('aria-checked',String(d));sw.setAttribute('aria-label',d?'Modo escuro ativo. Mudar para modo claro':'Modo claro ativo. Mudar para modo escuro')};
  try{const s=localStorage.getItem('soares-theme');if(s==='light'||s==='dark')root.setAttribute('data-theme',s)}catch(_){}
  sw.addEventListener('click',()=>{
    const next=isDark()?'light':'dark';
    root.classList.add('theme-anim');root.setAttribute('data-theme',next);
    try{localStorage.setItem('soares-theme',next)}catch(_){}
    paint();setTimeout(()=>root.classList.remove('theme-anim'),400);
  });
  if(mq.addEventListener)mq.addEventListener('change',paint);
  new MutationObserver(paint).observe(root,{attributes:true,attributeFilter:['data-theme']});
  paint();
})();

/* ---------------- Rotas ---------------- */
const ROUTES=['inicio','empresa','produtos','cotacao','contato','vagas'];
let current='';
function setMenu(open){document.body.classList.toggle('menu-open',open);$('#menuBtn').setAttribute('aria-expanded',open)}
function go(){
  let r=location.hash.replace('#','');if(!ROUTES.includes(r))r='inicio';
  setMenu(false);
  if(r===current)return;current=r;
  $$('[data-page]').forEach(p=>{const on=p.dataset.page===r;p.hidden=!on;if(on){p.style.animation='none';p.offsetHeight;p.style.animation=''}});
  $$('#nav a').forEach(a=>a.getAttribute('href')==='#'+r?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  window.scrollTo(0,0);
  if(window.__bag)window.__bag.active(r==='inicio');
}
addEventListener('hashchange',go);
$('#menuBtn').addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
addEventListener('scroll',()=>$('#top').classList.toggle('scrolled',scrollY>8),{passive:true});

/* ---------------- Cotação ---------------- */
const qSel=$('#q-produto');
qSel.innerHTML='<option value="">Selecione</option>'+Object.entries(CATS).map(([k,l])=>`<optgroup label="${l}">${PRODUCTS.filter(p=>p.cat===k).map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</optgroup>`).join('')+'<option value="sob-medida">Sob medida / outro</option>';
qSel.value='alpha';
function setQuoteProduct(id){qSel.value=id;if(qSel._dd)qSel._dd.sync();updateSummary()}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function updateSummary(){
  const p=PRODUCTS.find(x=>x.id===qSel.value);
  $('#sumItem').innerHTML=p?`${ill(p)}<div><b>${p.name}</b><span>${p.chips.join(' · ')}</span></div>`
    :`<svg viewBox="0 0 280 245"><rect x="60" y="50" width="160" height="150" rx="28" fill="none" stroke="#3d876d" stroke-width="6" stroke-dasharray="14 10"/><path d="M140 95v60M110 125h60" stroke="#3d876d" stroke-width="8" stroke-linecap="round"/></svg><div><b>${qSel.value==='sob-medida'?'Sob medida':'Escolha um produto'}</b><span>${qSel.value==='sob-medida'?'Conforme sua carga':'—'}</span></div>`;
  const q=$('#q-qtd').value;
  $('#sumList').innerHTML=[['Quantidade',q?Number(q).toLocaleString('pt-BR')+' un.':'—'],['Carga',$('#q-carga').value],['Empresa',$('#q-empresa').value||'—']].map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
}
$('#quoteForm').addEventListener('input',updateSummary);$('#quoteForm').addEventListener('change',updateSummary);updateSummary();

function maskPhone(v){v=v.replace(/\D/g,'').slice(0,11);if(v.length>10)return v.replace(/(\d{2})(\d{5})(\d{0,4})/,'($1) $2-$3');if(v.length>6)return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3');if(v.length>2)return v.replace(/(\d{2})(\d+)/,'($1) $2');return v}
$$('input[type="tel"]').forEach(i=>i.addEventListener('input',()=>{i.value=maskPhone(i.value)}));

function validate(form){
  let first=null;
  $$('.field',form).forEach(f=>{const i=$('input,select,textarea',f);if(!i||!i.required||i.type==='file')return;
    let ok=i.value.trim()!=='';
    if(ok&&i.type==='email')ok=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(i.value.trim());
    if(ok&&i.type==='tel')ok=i.value.replace(/\D/g,'').length>=10;
    if(ok&&i.type==='number')ok=Number(i.value)>0;
    f.classList.toggle('bad',!ok);if(!ok&&!first)first=i._dd?i._dd.btn:i;});
  return first;
}
$$('form').forEach(f=>f.addEventListener('input',e=>{const fl=e.target.closest('.field.bad');if(fl)fl.classList.remove('bad')}));
function success(wrap,form,title,text,again){
  form.hidden=true;const s=document.createElement('div');s.className='success';s.setAttribute('role','status');
  s.innerHTML=`<span class="ok"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 8.5l3 3 7-7"/></svg></span><h3>${title}</h3><p>${text}</p><div><button class="link" type="button">${again}</button></div>`;
  wrap.appendChild(s);s.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
  $('button',s).addEventListener('click',()=>{s.remove();form.reset();form.hidden=false;if(form.id==='quoteForm'){qSel.value='alpha';updateSummary()}if(form.id==='applyForm'){$('#cvName').hidden=true;cvFile=null}syncAll()});
}

/* Envio pelo FormSubmit (formsubmit.co). Cada endereço precisa ser ativado uma vez pelo e-mail de confirmação. */
const FS={quoteForm:'comercial@soaresemb.com.br',contactForm:'contato@soaresemb.com.br',applyForm:'recrutamento@soaresemb.com.br'};
function setSending(form,on){const b=$('button[type="submit"]',form);if(!b._t)b._t=b.innerHTML;b.disabled=on;b.innerHTML=on?'Enviando…':b._t;const er=$('.send-err',form);if(er)er.remove()}
function sendErr(form){const p=document.createElement('p');p.className='send-err';p.setAttribute('role','alert');p.textContent=`Não foi possível enviar agora. Tente de novo ou escreva para ${FS[form.id]}.`;$('.form-foot',form).appendChild(p)}
async function sendAjax(form,subject){
  const fd=new FormData(form);
  $$('select',form).forEach(s=>{if(s.name)fd.set(s.name,s.selectedOptions[0]?s.selectedOptions[0].textContent:'')});
  fd.set('_subject',subject);fd.set('_template','table');fd.set('_captcha','false');
  const r=await fetch('https://formsubmit.co/ajax/'+FS[form.id],{method:'POST',headers:{Accept:'application/json'},body:fd});
  const j=await r.json().catch(()=>({}));
  if(!r.ok||String(j.success)==='false')throw new Error(j.message||'Falha no envio');
}
async function handleAjax(e,wrap,subject,title,text,again){
  e.preventDefault();const form=e.target;const bad=validate(form);if(bad){bad.focus();return}
  setSending(form,true);
  try{await sendAjax(form,subject);setSending(form,false);success(wrap,form,title(),text,again)}
  catch(err){setSending(form,false);sendErr(form)}
}
$('#quoteForm').addEventListener('submit',e=>handleAjax(e,$('#quoteWrap'),'Nova cotação pelo site',()=>`Cotação enviada, ${esc($('#q-nome').value.trim().split(' ')[0])}.`,'Nossa equipe comercial retorna o mais breve possível.','Fazer nova cotação'));
$('#contactForm').addEventListener('submit',e=>handleAjax(e,$('#contactWrap'),'Nova mensagem pelo Fale conosco',()=>'Mensagem enviada.','Respondemos o mais breve possível.','Escrever outra mensagem'));

/* ---------------- Vagas ---------------- */
function renderJobs(unit){
  $('#jobs').innerHTML=JOBS.filter(j=>unit==='all'||j.unit===unit).map(j=>`<article class="job${j.talent?' talent':''}"><div>
    <h3>${j.title}</h3>
    <div class="meta"><span>${j.unit}</span><span>${j.area}</span></div><p>${j.text}</p></div>
    <button class="btn ${j.talent?'btn-primary':'btn-soft'} btn-sm" type="button" data-apply="${j.id}">${j.talent?'Cadastrar currículo':'Candidatar-se'}</button></article>`).join('');
}
$('#jobFilters').innerHTML=[['all','Todas'],['Santos/SP','Santos/SP'],['Machado/MG','Machado/MG']].map(([k,l],i)=>`<button type="button" data-u="${k}" aria-pressed="${i===0}">${l}</button>`).join('');
$('#jobFilters').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#jobFilters button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderJobs(b.dataset.u)});
renderJobs('all');
$('#v-vaga').innerHTML='<option value="">Selecione</option>'+JOBS.map(j=>`<option value="${j.id}">${j.title} · ${j.unit}</option>`).join('');

let cvFile=null;
const drop=$('#drop'),cvIn=$('#v-cv');
function setCv(f){const ok=/\.(pdf|docx?)$/i.test(f.name)&&f.size<=5*1024*1024;
  $('#cvField').classList.toggle('bad',!ok);if(!ok){cvFile=null;$('#cvName').hidden=true;return}
  cvFile=f;if(cvIn.files[0]!==f){try{const dt=new DataTransfer();dt.items.add(f);cvIn.files=dt.files}catch(_){}}
  $('#cvName').textContent=`${f.name} · ${(f.size/1048576).toFixed(2).replace('.',',')} MB`;$('#cvName').hidden=false}
cvIn.addEventListener('change',()=>{if(cvIn.files[0])setCv(cvIn.files[0])});
['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over')}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over')}));
drop.addEventListener('drop',e=>{const f=e.dataTransfer.files[0];if(f)setCv(f)});
$('#applyForm').addEventListener('submit',e=>{e.preventDefault();let bad=validate(e.target);
  $('#cvField').classList.toggle('bad',!cvFile);if(!cvFile&&!bad)bad=drop;
  const lg=$('#v-lgpd').checked;$('#lgpdErr').hidden=lg;if(!lg&&!bad)bad=$('#v-lgpd');
  if(bad){bad.focus();return}
  // Envio com anexo: formulário normal (multipart). O FormSubmit redireciona de volta com ?enviado=rh.
  $('#v-vaga-txt').value=$('#v-vaga').selectedOptions[0].textContent;
  $('#v-next').value=location.href.split('#')[0].split('?')[0]+'?enviado=rh#vagas';
  const vs=$('#v-vaga');vs.removeAttribute('name');
  setSending(e.target,true);
  try{HTMLFormElement.prototype.submit.call(e.target)}catch(err){vs.name='vaga';setSending(e.target,false);sendErr(e.target)}
});
if(new URLSearchParams(location.search).get('enviado')==='rh'){
  location.hash='vagas';
  success($('#applyWrap'),$('#applyForm'),'Candidatura enviada.','Recebemos seu currículo. Se o seu perfil avançar, o RH entra em contato.','Enviar outra candidatura');
}

/* ---------------- Seletores personalizados ---------------- */
function optHTML(sel,opt){
  if(sel.id==='q-produto'){
    const p=PRODUCTS.find(x=>x.id===opt.value);
    if(p)return `<span class="dd-thumb">${ill(p)}</span><span class="dd-txt"><b>${p.name}</b><small>${p.chips.join(' · ')}</small></span>`;
    return `<span class="dd-thumb"><svg viewBox="0 0 280 245"><rect x="70" y="60" width="140" height="130" rx="26" fill="none" stroke="#3d876d" stroke-width="10" stroke-dasharray="16 12"/><path d="M140 100v50M115 125h50" stroke="#3d876d" stroke-width="12" stroke-linecap="round"/></svg></span><span class="dd-txt"><b>Sob medida / outro</b><small>Projeto conforme sua carga</small></span>`;
  }
  const [a,b]=opt.textContent.split(' · ');
  return `<span class="dd-txt"><b>${a}</b>${b?`<small>${b}</small>`:''}</span>`;
}
function enhance(sel){
  const wrap=document.createElement('div');wrap.className='dd';
  sel.before(wrap);wrap.appendChild(sel);
  sel.classList.add('native');sel.tabIndex=-1;sel.setAttribute('aria-hidden','true');
  const btn=document.createElement('button');btn.type='button';btn.className='dd-btn';btn.id=sel.id+'-dd';
  btn.setAttribute('role','combobox');btn.setAttribute('aria-haspopup','listbox');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls',sel.id+'-list');
  const list=document.createElement('div');list.className='dd-list';list.id=sel.id+'-list';list.setAttribute('role','listbox');list.hidden=true;
  wrap.append(btn,list);
  const lbl=document.querySelector(`label[for="${sel.id}"]`);if(lbl){lbl.htmlFor=btn.id;list.setAttribute('aria-label',lbl.textContent)}
  let opts=[],active=-1;
  function build(){
    list.innerHTML='';opts=[];
    [...sel.children].forEach(ch=>{
      const add=o=>{if(!o.value)return;const d=document.createElement('div');d.className='dd-opt';d.setAttribute('role','option');d.id=`${sel.id}-o${opts.length}`;d.dataset.v=o.value;d.innerHTML=optHTML(sel,o);list.appendChild(d);opts.push(d)};
      if(ch.tagName==='OPTGROUP'){const g=document.createElement('div');g.className='dd-group';g.textContent=ch.label;list.appendChild(g);[...ch.children].forEach(add)}else add(ch);
    });
  }
  function sync(){
    const o=sel.selectedOptions[0];
    btn.innerHTML=o&&o.value?optHTML(sel,o):`<span class="ph">${o?o.textContent:'Selecione'}</span>`;
    opts.forEach(d=>d.setAttribute('aria-selected',d.dataset.v===sel.value));
  }
  function setActive(i){opts.forEach(d=>d.classList.remove('active'));active=Math.max(0,Math.min(opts.length-1,i));const d=opts[active];if(d){d.classList.add('active');btn.setAttribute('aria-activedescendant',d.id);d.scrollIntoView({block:'nearest'})}}
  function open(){if(!list.hidden)return;$$('.dd-list').forEach(l=>{if(l!==list&&!l.hidden)l._close()});list.hidden=false;btn.setAttribute('aria-expanded','true');setActive(Math.max(0,opts.findIndex(d=>d.dataset.v===sel.value)))}
  function close(){list.hidden=true;btn.setAttribute('aria-expanded','false');btn.removeAttribute('aria-activedescendant')}
  list._close=close;
  function choose(v){sel.value=v;sel.dispatchEvent(new Event('change',{bubbles:true}));const f=sel.closest('.field.bad');if(f)f.classList.remove('bad');sync();close();btn.focus()}
  btn.addEventListener('click',()=>list.hidden?open():close());
  btn.addEventListener('keydown',e=>{
    if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();if(list.hidden)open();else setActive(active+(e.key==='ArrowDown'?1:-1))}
    else if(e.key==='Enter'||e.key===' '){if(!list.hidden&&opts[active]){e.preventDefault();choose(opts[active].dataset.v)}}
    else if(e.key==='Escape'&&!list.hidden){e.stopPropagation();close()}
    else if(e.key==='Tab')close();
  });
  list.addEventListener('mousedown',e=>e.preventDefault());
  list.addEventListener('click',e=>{const d=e.target.closest('.dd-opt');if(d)choose(d.dataset.v)});
  document.addEventListener('click',e=>{if(!wrap.contains(e.target))close()});
  build();sync();
  sel._dd={sync,btn};
}
$$('select').forEach(enhance);
const syncAll=()=>$$('select').forEach(s=>s._dd&&s._dd.sync());

/* ---------------- Big bag 3D ---------------- */
function fallback(){$('#stage').insertAdjacentHTML('beforeend',`<div class="fallback">${ill(PRODUCTS[0])}</div>`)}
function initBag(){
  if(!window.THREE){fallback();return}
  const T=THREE,stage=$('#stage');
  let renderer;
  try{renderer=new T.WebGLRenderer({antialias:true,alpha:true})}catch(e){fallback();return}
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.outputEncoding=T.sRGBEncoding;
  stage.prepend(renderer.domElement);
  renderer.domElement.setAttribute('role','img');
  renderer.domElement.setAttribute('aria-label','Big bag Soares em 3D. Arraste para girar.');
  const scene=new T.Scene();
  const cam=new T.PerspectiveCamera(30,1,.1,60);cam.position.set(0,1.15,7.6);cam.lookAt(0,.15,0);

  function weave(w,h,withLogo,pocket){
    const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
    x.fillStyle='#f4f0e9';x.fillRect(0,0,w,h);
    for(let i=0;i<w;i+=4){x.fillStyle=`rgba(120,110,95,${.045+Math.random()*.035})`;x.fillRect(i,0,1.6,h)}
    for(let j=0;j<h;j+=4){x.fillStyle=`rgba(120,110,95,${.04+Math.random()*.035})`;x.fillRect(0,j,w,1.4)}
    x.fillStyle='rgba(255,255,255,.6)';x.fillRect(0,0,w*.07,h);x.fillRect(w*.93,0,w*.07,h);
    x.strokeStyle='rgba(1,57,61,.25)';x.setLineDash([10,9]);x.lineWidth=3;
    [w*.075,w*.925].forEach(px=>{x.beginPath();x.moveTo(px,0);x.lineTo(px,h);x.stroke()});x.setLineDash([]);
    if(withLogo){
      const paths=$$('#lg-full path').map(p=>new Path2D(p.getAttribute('d')));
      const lw=w*.66,s=lw/595.28,ox=(w-lw)/2,oy=h*.4-61.5*s;
      x.save();x.setTransform(s,0,0,s,ox,oy);x.fillStyle='#01393d';paths.forEach(p=>x.fill(p));x.restore();
      x.fillStyle='#3d876d';x.font=`600 ${Math.round(w*.03)}px "Plus Jakarta Sans", sans-serif`;x.textAlign='center';
      x.fillText('QUALIDADE  ·  CONFIANÇA  ·  DESDE 1971',w/2,h*.62);
    }
    if(pocket){x.fillStyle='rgba(255,255,255,.95)';x.fillRect(w*.3,h*.3,w*.4,h*.28);x.strokeStyle='rgba(1,57,61,.3)';x.lineWidth=3;x.strokeRect(w*.3,h*.3,w*.4,h*.28);
      x.fillStyle='rgba(1,57,61,.22)';for(let k=0;k<4;k++)x.fillRect(w*.34,h*(.36+k*.05),w*.32*(k%2?.7:1),h*.012)}
    const t=new T.CanvasTexture(c);t.encoding=T.sRGBEncoding;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;
  }
  const mat=map=>new T.MeshStandardMaterial({map,roughness:.92,metalness:0});
  const Wd=1.5,Hd=1.6,Dd=1.5;
  const geo=new T.BoxGeometry(Wd,Hd,Dd,24,24,24);
  const pos=geo.attributes.position;
  for(let i=0;i<pos.count;i++){
    let x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i);
    const nx=x/(Wd/2),ny=y/(Hd/2),nz=z/(Dd/2),belly=1-ny*ny*.85;
    x*=1+.085*belly*(1-nz*nz*.55);z*=1+.085*belly*(1-nx*nx*.55);
    if(ny>.999)y-=.07*(1-nx*nx)*(1-nz*nz);
    if(ny<-.999)y+=.02*(1-nx*nx)*(1-nz*nz);
    pos.setXYZ(i,x,y,z);
  }
  geo.computeVertexNormals();
  const plain=weave(512,512,false),front=weave(1024,1092,true),pocket=weave(512,512,false,true);
  const group=new T.Group();
  group.add(new T.Mesh(geo,[mat(pocket),mat(plain),mat(plain),mat(plain),mat(front),mat(front)]));
  const strapMat=new T.MeshStandardMaterial({color:0xf7f4ee,roughness:.8});
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(([sx,sz])=>{
    const m=new T.Mesh(new T.TorusGeometry(.2,.032,10,32,Math.PI),strapMat);
    m.position.set(sx*(Wd/2)*.94,Hd/2-.05,sz*(Dd/2)*.94);m.rotation.y=Math.atan2(sx,sz)+Math.PI/2;group.add(m);
    const belt=new T.Mesh(new T.BoxGeometry(.11,Hd*.98,.025),strapMat);
    belt.position.set(sx*(Wd/2+.075),0,sz*(Dd/2+.075));belt.rotation.y=Math.atan2(sx,sz)+Math.PI/2;group.add(belt);
  });
  const sp=new T.Mesh(new T.CylinderGeometry(.2,.28,.34,32,1,true),mat(plain));sp.position.y=Hd/2+.1;group.add(sp);
  const tie=new T.Mesh(new T.TorusGeometry(.205,.022,8,32),new T.MeshStandardMaterial({color:0x3d876d,roughness:.6}));tie.rotation.x=Math.PI/2;tie.position.y=Hd/2+.2;group.add(tie);
  const cap=new T.Mesh(new T.SphereGeometry(.2,24,12,0,Math.PI*2,0,Math.PI/2),mat(plain));cap.scale.y=.45;cap.position.y=Hd/2+.27;group.add(cap);
  scene.add(group);
  const sc=document.createElement('canvas');sc.width=sc.height=256;const sx=sc.getContext('2d');const g=sx.createRadialGradient(128,128,10,128,128,128);g.addColorStop(0,'rgba(0,0,0,.45)');g.addColorStop(1,'rgba(0,0,0,0)');sx.fillStyle=g;sx.fillRect(0,0,256,256);
  const shadow=new T.Mesh(new T.PlaneGeometry(3.4,3.4),new T.MeshBasicMaterial({map:new T.CanvasTexture(sc),transparent:true,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.y=-Hd/2-.12;scene.add(shadow);
  scene.add(new T.HemisphereLight(0xfffaf0,0x1d5a55,.95));
  const key=new T.DirectionalLight(0xffffff,.95);key.position.set(3,5,5);scene.add(key);
  const rim=new T.DirectionalLight(0x8fd3b6,.55);rim.position.set(-4,2,-4);scene.add(rim);

  function size(){const r=stage.getBoundingClientRect();if(!r.width)return;renderer.setSize(r.width,r.height,false);cam.aspect=r.width/r.height;cam.updateProjectionMatrix()}
  new ResizeObserver(size).observe(stage);size();

  let rotY=-.55,vel=reduce?0:.0035,drag=false,lastX=0,tiltX=0,targetTilt=0,active=true,intro=reduce?1:0;
  const cv=renderer.domElement,t0=performance.now();
  cv.addEventListener('pointerdown',e=>{drag=true;lastX=e.clientX;cv.setPointerCapture(e.pointerId)});
  cv.addEventListener('pointermove',e=>{if(drag){const d=e.clientX-lastX;lastX=e.clientX;rotY+=d*.01;vel=d*.0008}
    const r=cv.getBoundingClientRect();targetTilt=((e.clientY-r.top)/r.height-.5)*.22});
  const end=()=>{drag=false};cv.addEventListener('pointerup',end);cv.addEventListener('pointercancel',end);cv.addEventListener('pointerleave',()=>{targetTilt=0});
  function frame(now){
    requestAnimationFrame(frame);
    if(!active)return;
    const t=(now-t0)/1000;
    if(intro<1)intro=Math.min(1,intro+.018);
    const e=1-Math.pow(1-intro,3);
    if(!drag){rotY+=vel;vel+=((reduce?0:.0035)-vel)*.02}
    tiltX+=(targetTilt-tiltX)*.06;
    group.rotation.y=rotY;group.rotation.x=tiltX;
    group.position.y=(1-e)*1.6+(reduce?0:Math.sin(t*1.3)*.035);
    shadow.material.opacity=.3+.7*e;
    renderer.render(scene,cam);
  }
  requestAnimationFrame(frame);
  window.__bag={active(on){active=on;if(on)size()}};
  document.addEventListener('visibilitychange',()=>{active=!document.hidden&&current==='inicio'});
}

go();
(document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>{try{initBag()}catch(e){console.error(e);fallback()}if(window.__bag)window.__bag.active(current==='inicio')});
})();
