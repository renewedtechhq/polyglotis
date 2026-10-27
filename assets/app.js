(function(){
"use strict";
document.documentElement.classList.add("js");
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
let LANG=store.get("pg-lang")||"de";
const T=(de,en)=>LANG==="de"?de:en;
const B=(de,en)=>`<span class="de">${de}</span><span class="en">${en}</span>`;
const ICON={
 cert:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 4h20l8 8v32H10z"/><path d="M30 4v8h8M16 20h16M16 26h16M16 32h8"/><circle cx="34" cy="36" r="6"/><path d="M31 41l-1 5 4-2 4 2-1-5"/></svg>',
 civil:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="6"/><circle cx="32" cy="20" r="5"/><path d="M8 38c1-7 5-11 10-11s9 4 10 11M26 36c1-5 3-8 6-8s6 3 7 8"/></svg>',
 id:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="10" width="36" height="28" rx="3"/><circle cx="17" cy="23" r="5"/><path d="M10 33c1-4 4-5 7-5s6 1 7 5M28 20h9M28 26h9M28 32h6"/></svg>',
 edu:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 18l20-9 20 9-20 9z"/><path d="M12 22v10c4 4 20 4 24 0V22M44 18v12"/></svg>',
 legal:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 6v36M10 12h28M14 12l-6 14a6 6 0 0012 0zM34 12l-6 14a6 6 0 0012 0zM16 42h16"/></svg>',
 biz:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="14" width="36" height="26" rx="2"/><path d="M18 14V9h12v5M6 24h36M22 24v4h4v-4"/></svg>',
 interp:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 10h22v14H16l-6 5v-5H6z"/><path d="M32 18h10v14h-4v5l-6-5H20v-4"/></svg>',
 course:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 8h32v24H8zM16 40l8-8 8 8"/><path d="M14 16h12M14 22h20"/></svg>',
 office:'<svg class="ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 6h18l6 6v30H12z"/><path d="M30 6v6h6M18 22h12M18 28h12M18 34h7"/><path d="M36 26l6-6 3 3-6 6h-3z"/></svg>',
 arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
};

/* ================= CONTENT ================= */
const SERVICES=[
 {id:"certified",icon:"cert",de:["Beglaubigte Übersetzungen","Mit Stempel und Unterschrift bestätigt – anerkannt von deutschen Behörden, Gerichten und Hochschulen."],en:["Certified translations","Confirmed with stamp and signature, accepted by German authorities, courts and universities."]},
 {id:"civil",icon:"civil",de:["Personenstandsurkunden","Geburts-, Heirats- und Sterbeurkunden, Scheidungsurteile, Ehefähigkeitszeugnisse."],en:["Civil status documents","Birth, marriage and death certificates, divorce decrees, certificates of no impediment."]},
 {id:"legal",icon:"legal",de:["Recht & Gericht","Urteile, Beschlüsse, Verträge, Vollmachten, notarielle Urkunden, Polizeiberichte."],en:["Legal & court","Judgments, court orders, contracts, powers of attorney, notarial deeds, police reports."]},
 {id:"interp",icon:"interp",de:["Dolmetschen","Bei Gericht, Polizei, Behörden, Notar, Arzt und geschäftlichen Terminen."],en:["Interpreting","At court, police, public offices, notaries, doctors and business meetings."]},
 {id:"courses",icon:"course",de:["Sprachkurse","Einzel- und Gruppenunterricht, praxisnah und auf Ihr Ziel zugeschnitten."],en:["Language courses","One-to-one and group lessons, practical and tailored to your goal."]},
 {id:"office",icon:"office",de:["Büroservice","Behördenbriefe, Formulare, Anträge und Schreibarbeiten – sauber und fristgerecht."],en:["Office services","Letters to authorities, forms, applications and typing, neat and on time."]}
];
const BLOCKS=[
 {icon:"cert",de:["Beglaubigte Übersetzungen","Die beglaubigte Übersetzung bestätigt, dass Ihr Dokument vollständig und richtig übertragen wurde. Sie wird auf Papier ausgestellt, gestempelt und unterschrieben."],en:["Certified translations","A certified translation confirms that your document has been translated completely and correctly. It is issued on paper, stamped and signed."],
  cards:[
   {de:["Personenstand","Geburts-, Heirats-, Sterbeurkunden, Scheidungsurteile, Namensänderungen, Ehefähigkeitszeugnisse."],en:["Civil status","Birth, marriage and death certificates, divorce decrees, name changes, certificates of no impediment."],chips:["Standesamt","Registry office"]},
   {de:["Ausweis & Aufenthalt","Reisepässe, Personalausweise, Führerscheine, Meldebescheinigungen und Unterlagen für Ausländerbehörden."],en:["ID & residence","Passports, ID cards, driving licences, registration certificates and documents for immigration offices."],chips:["Bürgeramt","LEA"]},
   {de:["Schule & Studium","Zeugnisse, Diplome, Transcripts, Notenübersichten für Anerkennung und Bewerbung."],en:["School & university","Certificates, diplomas, transcripts and grade sheets for recognition and applications."],chips:["Anerkennung","Recognition"]},
   {de:["Beruf & Arbeit","Arbeitszeugnisse, Arbeitsverträge, Lebensläufe, Referenzen, Berufsnachweise."],en:["Work & career","Employment references, contracts, CVs, references and professional qualifications."],chips:["Jobcenter","Arbeitgeber"]},
   {de:["Recht & Gericht","Urteile, Beschlüsse, Klageschriften, Verträge, Vollmachten, notarielle Urkunden, Polizeiberichte."],en:["Legal & court","Judgments, orders, statements of claim, contracts, powers of attorney, notarial deeds, police reports."],chips:["Gericht","Notar"]},
   {de:["Medizin & Wirtschaft","Arztbriefe, Befunde, Handelsregisterauszüge, Gesellschaftsunterlagen, Geschäftskorrespondenz."],en:["Medical & business","Medical letters and reports, commercial register extracts, company documents, business letters."],chips:["Klinik","GmbH"]}
  ]},
 {icon:"interp",de:["Dolmetschen","Ich werde von Gerichten, der Polizei und Behörden hinzugezogen und begleite Privatpersonen und Unternehmen zu wichtigen Terminen."],en:["Interpreting","Courts, the police and public authorities call me in, and I accompany private clients and companies to important appointments."],
  cards:[
   {de:["Gerichtsverhandlungen","Straf-, Zivil- und Familiensachen, Anhörungen und Vernehmungen vor Gericht."],en:["Court proceedings","Criminal, civil and family cases, hearings and examinations in court."],chips:["Amtsgericht","Landgericht"]},
   {de:["Polizei","Vernehmungen von Beschuldigten und Zeugen, Anzeigenaufnahme, Belehrungen."],en:["Police","Interviews of suspects and witnesses, filing reports, cautions and instructions."],chips:["Vernehmung","Interview"]},
   {de:["Behörden & Ämter","Ausländerbehörde, Jobcenter, Bürgeramt, Jugendamt, Sozialamt."],en:["Public offices","Immigration office, job centre, citizens’ office, youth welfare and social services."],chips:["LEA","Jobcenter"]},
   {de:["Standesamt & Notar","Eheschließungen, Beurkundungen, Kauf- und Erbverträge."],en:["Registry office & notary","Weddings, notarisations, purchase and inheritance contracts."],chips:["Trauung","Beurkundung"]},
   {de:["Arzt & Klinik","Aufklärungsgespräche, Untersuchungen, Therapiegespräche."],en:["Doctor & hospital","Consent talks, examinations, treatment consultations."],chips:["Klinik","Praxis"]},
   {de:["Geschäftstermine","Verhandlungen, Meetings, Schulungen, Messen."],en:["Business meetings","Negotiations, meetings, training sessions, trade fairs."],chips:["Meeting","Messe"]}
  ]},
 {icon:"course",de:["Sprachkurse","Sprache lernt man am besten im echten Leben. Meine Kurse orientieren sich an Ihrem Alltag, Ihrem Beruf oder Ihrer Prüfung."],en:["Language courses","Languages are best learned for real life. My courses follow your everyday life, your job or your exam."],
  cards:[
   {de:["Einzelunterricht","Flexibel, in Ihrem Tempo, online oder in Berlin."],en:["One-to-one lessons","Flexible, at your own pace, online or in Berlin."],chips:["1:1"]},
   {de:["Kleingruppen","Gemeinsam lernen, für Familien, Teams oder Gemeinden."],en:["Small groups","Learn together, for families, teams or congregations."],chips:["2–8"]},
   {de:["Alltag & Behörden","Wortschatz für Termine, Formulare und Gespräche auf dem Amt."],en:["Everyday & offices","Vocabulary for appointments, forms and conversations at public offices."],chips:["A1–B2"]},
   {de:["Beruf & Bewerbung","Gespräche, E-Mails, Präsentationen und Vorstellungsgespräche."],en:["Work & job search","Conversations, emails, presentations and interviews."],chips:["Business"]}
  ]},
 {icon:"office",de:["Büroservice","Wenn Papierkram Sie aufhält, übernehme ich ihn: verständlich, korrekt und fristgerecht."],en:["Office services","When paperwork holds you back, I take it on: clear, correct and on time."],
  cards:[
   {de:["Formulare & Anträge","Ausfüllhilfe für Anträge bei Ämtern, Kassen und Versicherungen."],en:["Forms & applications","Help filling in applications for offices, health insurers and insurance companies."],chips:["Antrag","Form"]},
   {de:["Behördenkorrespondenz","Briefe verfassen, Schreiben erklären, Fristen im Blick behalten."],en:["Official correspondence","Writing letters, explaining letters you received, keeping track of deadlines."],chips:["Brief","Frist"]},
   {de:["Schreibarbeiten","Abschriften, Protokolle, Lebensläufe und Dokumentenaufbereitung."],en:["Typing & documents","Transcripts, minutes, CVs and document preparation."],chips:["Word","PDF"]},
   {de:["Begleitung zu Terminen","Vorbereitung und Begleitung, damit beim Termin nichts fehlt."],en:["Appointment support","Preparation and accompaniment, so nothing is missing on the day."],chips:["Termin"]}
  ]}
];
const FAQ=[
 [["Was ist eine beglaubigte Übersetzung?","Eine Übersetzung, deren Vollständigkeit und Richtigkeit eine ermächtigte Übersetzerin mit Stempel und Unterschrift bestätigt. Deutsche Behörden verlangen sie für amtliche Dokumente aus dem Ausland."],["What is a certified translation?","A translation whose completeness and accuracy an authorised translator confirms with stamp and signature. German authorities require it for official documents from abroad."]],
 [["Brauche ich das Original?","Für das Angebot genügt ein Scan oder Foto. Ob für die Beglaubigung das Original vorliegen muss, hängt von der Stelle ab, bei der Sie die Übersetzung einreichen. Ich berate Sie gern."],["Do I need the original?","A scan or photo is enough for the quote. Whether the original is needed for certification depends on the office you submit it to. I am happy to advise you."]],
 [["Was kostet eine Übersetzung?","Der Preis richtet sich nach Umfang, Sprache und Dringlichkeit. Standarddokumente wie Urkunden werden oft zum Pauschalpreis übersetzt. Sie erhalten vorab ein verbindliches Angebot."],["How much does a translation cost?","The price depends on length, language and urgency. Standard documents such as certificates are often translated at a flat rate. You receive a binding quote in advance."]],
 [["Wie lange dauert es?","Viele Urkunden sind innerhalb weniger Werktage fertig. Den genauen Liefertermin nenne ich Ihnen im Angebot. Eilaufträge sind nach Absprache möglich."],["How long does it take?","Many certificates are ready within a few working days. I give you the exact delivery date in the quote. Urgent jobs are possible by arrangement."]],
 [["Werden die Übersetzungen anerkannt?","Übersetzungen einer nach Landesrecht ermächtigten Übersetzerin werden von deutschen Behörden und Gerichten anerkannt. Für die Verwendung im Ausland kann zusätzlich eine Apostille oder Legalisation nötig sein."],["Are the translations accepted?","Translations by a translator authorised under German state law are accepted by German authorities and courts. For use abroad, an apostille or legalisation may also be required."]],
 [["Übersetzen Sie auch Französisch?","Ja. Französisch übersetze und dolmetsche ich ebenfalls. Beglaubigte Übersetzungen erstelle ich für Englisch, Igbo und Pidgin, für die ich ermächtigt bin."],["Do you also work with French?","Yes, I also translate and interpret French. Certified translations are available for English, Igbo and Pidgin, the languages I am authorised for."]],
 [["Können Sie kurzfristig dolmetschen?","Ja, wenn der Termin es zulässt. Schreiben Sie mir Datum, Uhrzeit und Ort über das Anfrageformular oder rufen Sie an."],["Can you interpret at short notice?","Yes, if my schedule allows. Send me the date, time and place through the request form or give me a call."]]
];
const LANGS=[["de","Deutsch","German"],["en","Englisch","English"],["fr","Französisch","French"],["ig","Igbo","Igbo"],["pcm","Pidgin (Nigeria)","Nigerian Pidgin"],["other","Andere","Other"]];
const langName=k=>{const l=LANGS.find(x=>x[0]===k);return l?T(l[1],l[2]):k||"–"};
const KINDS={translation:["Beglaubigte Übersetzung","Certified translation"],interpreting:["Dolmetschen","Interpreting"],course:["Sprachkurs","Language course"],office:["Büroservice","Office service"]};
const SETTINGS={court:["Gericht","Court"],police:["Polizei","Police"],authority:["Behörde / Amt","Public office"],registry:["Standesamt","Registry office"],notary:["Notar","Notary"],medical:["Arzt / Klinik","Doctor / hospital"],business:["Geschäftlich","Business"],other:["Sonstiges","Other"]};
const TYPES_EXTRA={deadline:["Abgabefrist Übersetzung","Translation deadline"]};
const DELIVERY={post:["Per Post","By post"],pickup:["Abholung in Berlin","Pick-up in Berlin"],pdf:["Vorab als PDF + Post","PDF in advance + post"]};
const STATUS={new:["Neu","New"],quoted:["Angebot gesendet","Quote sent"],accepted:["Angenommen","Accepted"],progress:["In Arbeit","In progress"],done:["Erledigt","Completed"],declined:["Abgelehnt","Declined"]};
const stName=s=>{const x=STATUS[s]||STATUS.new;return T(x[0],x[1])};
const stCls=s=>({new:"st-new",quoted:"st-quoted",accepted:"st-accepted",progress:"st-progress",done:"st-done",declined:"st-declined"}[s]||"st-new");
const lab=(m,k)=>m[k]?T(m[k][0],m[k][1]):(k||"–");

/* ================= LANGUAGE ================= */
function applyLang(){
  document.documentElement.setAttribute("data-lang",LANG);
  document.documentElement.lang=LANG;
  $$("[data-setlang]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.setlang===LANG)));
  $$("[data-ph-de]").forEach(el=>el.placeholder=LANG==="de"?el.dataset.phDe:el.dataset.phEn);
  $$("option[data-de]").forEach(o=>o.textContent=LANG==="de"?o.dataset.de:o.dataset.en);
  if(HQ.active) renderHQ();
  renderMyReqs();
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-setlang]");
  if(b){LANG=b.dataset.setlang;store.set("pg-lang",LANG);applyLang()}
  const c=e.target.closest("[data-copy]");
  if(c){copy(c.dataset.copy)}
});
function copy(txt){
  try{navigator.clipboard.writeText(txt).then(()=>toast(T("Kopiert","Copied")),()=>toast(T("Bitte manuell markieren und kopieren","Please select and copy manually")))}
  catch(e){toast(T("Bitte manuell markieren und kopieren","Please select and copy manually"))}
}
let toastT;
function toast(msg){const old=$(".toast");old&&old.remove();const t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);clearTimeout(toastT);toastT=setTimeout(()=>t.remove(),2600)}

/* ================= STATIC RENDER ================= */
$("#svcIndex").innerHTML=SERVICES.map(s=>`<a class="svc-item reveal" href="#services">${ICON[s.icon]}<h3>${B(s.de[0],s.en[0])}</h3><p>${B(s.de[1],s.en[1])}</p><span class="more">${B("Mehr erfahren","Learn more")}${ICON.arrow}</span></a>`).join("");
$("#svcBlocks").innerHTML=BLOCKS.map(b=>`<div class="svc-block"><div class="svc-side">${ICON[b.icon]}<h2>${B(b.de[0],b.en[0])}</h2><p>${B(b.de[1],b.en[1])}</p><div><a class="btn btn-seal btn-sm" href="#request">${B("Anfragen","Request")}</a></div></div><div class="svc-list">${b.cards.map(c=>`<div class="svc-card reveal"><h3>${B(c.de[0],c.en[0])}</h3><p>${B(c.de[1],c.en[1])}</p><div class="chips">${c.chips.map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div></div>`).join("")}</div></div>`).join("");
$("#faq").innerHTML=FAQ.map(f=>`<details><summary>${B(f[0][0],f[1][0])}</summary><p>${B(f[0][1],f[1][1])}</p></details>`).join("");
const MQ=["Geburtsurkunde","Birth certificate","Heiratsurkunde","Scheidungsurteil","Reisepass","Diploma","Arbeitszeugnis","Führerschein","Court judgment","Vollmacht","Transcript of records","Meldebescheinigung","Police report","Notarielle Urkunde"];
$("#marquee").innerHTML=[...MQ,...MQ].map(x=>`<span>${esc(x)}</span>`).join("");

/* hero language rotation + document flip */
const pairs=["English","Français","Igbo","Pidgin"];let pi=0;
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
if(!reduce){
  setInterval(()=>{const el=$("#pairLang");if(!el)return;el.classList.add("out");setTimeout(()=>{pi=(pi+1)%pairs.length;el.textContent=pairs[pi];el.classList.remove("out")},350)},2400);
  let flip=false;
  setInterval(()=>{flip=!flip;$$(".doc.front .swap").forEach((el,i)=>setTimeout(()=>{el.classList.add("fade");setTimeout(()=>{el.textContent=flip?el.dataset.b:el.dataset.a;el.classList.remove("fade")},400)},i*90))},4200);
}

/* ================= THEME ================= */
const savedTheme=store.get("pg-theme");if(savedTheme)document.documentElement.setAttribute("data-theme",savedTheme);
const isDark=()=>{const t=document.documentElement.getAttribute("data-theme");return t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches};
document.addEventListener("click",e=>{if(!e.target.closest("[data-theme-toggle]"))return;const t=isDark()?"light":"dark";document.documentElement.setAttribute("data-theme",t);store.set("pg-theme",t)});
$("#quick").innerHTML=[["cert","Beglaubigte Übersetzungen","Certified translations"],["interp","Dolmetschen","Interpreting"],["course","Sprachkurse","Language courses"],["office","Büroservice","Office services"]].map(q=>`<a href="#services">${ICON[q[0]].replace('class="ico"','')}${B(q[1],q[2])}</a>`).join("");

/* ================= ROUTER ================= */
const VIEWS=["home","services","about","request","contact","imprint","privacy"];
function route(){
  const h=(location.hash||"#home").slice(1);
  $("#nav").classList.remove("open");
  if(h==="hq"){ $("#site").hidden=true; $("#hqRoot").hidden=false; HQ.active=true; openHQ(); window.scrollTo(0,0); return; }
  HQ.active=false; $("#site").hidden=false; $("#hqRoot").hidden=true;
  const v=VIEWS.includes(h)?h:"home";
  $$(".view").forEach(x=>x.classList.toggle("active",x.id==="v-"+v));
  $$("#nav a").forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+v));
  window.scrollTo(0,0);
  requestAnimationFrame(setupReveal);
}
window.addEventListener("hashchange",route);
$("#menuBtn").addEventListener("click",()=>{const n=$("#nav");n.classList.toggle("open");$("#menuBtn").setAttribute("aria-expanded",n.classList.contains("open"))});
window.addEventListener("scroll",()=>$("#head").classList.toggle("scrolled",scrollY>8),{passive:true});

/* reveal on scroll (content is visible at rest; only off-screen items get the pre-state) */
let io;
function setupReveal(){
  if(reduce||!("IntersectionObserver" in window))return;
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.remove("pre");io.unobserve(e.target);
    if(e.target.id==="steps")$(".bar",e.target).style.width="100%";
    if(e.target.id==="bubbles")$$(".bub",e.target).forEach((b,i)=>setTimeout(()=>b.classList.remove("pre"),i*650));}}),{threshold:.15});
  const vh=innerHeight;
  $$(".view.active .reveal, .view.active #steps, .view.active #bubbles").forEach(el=>{
    const r=el.getBoundingClientRect();
    if(r.top<vh*0.95){el.classList.remove("pre");if(el.id==="steps")$(".bar",el).style.width="100%";if(el.id==="bubbles")$$(".bub",el).forEach((b,i)=>setTimeout(()=>b.classList.remove("pre"),300+i*650));return}
    if(el.classList.contains("reveal"))el.classList.add("pre");
    io.observe(el);
  });
}
// bubbles visible if JS observers never run
setTimeout(()=>$$(".bub.pre").forEach(b=>{const r=b.getBoundingClientRect();if(r.top<innerHeight)b.classList.remove("pre")}),4000);

/* ================= CANVAS ART ================= */
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
function drawGlyphs(cv){
  if(!cv)return;const p=cv.parentElement;const w=p.clientWidth,h=p.clientHeight;if(!w)return;
  const d=devicePixelRatio||1;cv.width=w*d;cv.height=h*d;const x=cv.getContext("2d");x.scale(d,d);
  const g=["Ä","ö","ß","ü","ị","ọ","ụ","ẹ","ṅ","Ọ","Ị","Ü","&","§","A","é","ñ","?","!","ū","ʼ","Ö","ə","Ə","„","“"];
  x.fillStyle=css("--sig-soft");x.fillRect(0,0,w,h);
  let seed=7;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  for(let i=0;i<120;i++){x.font=`${600+(i%2)*100} ${14+rnd()*56}px "Zilla Slab", Georgia, serif`;x.globalAlpha=.12+rnd()*.35;x.fillStyle=rnd()>.82?css("--seal"):css("--sig");x.fillText(g[Math.floor(rnd()*g.length)],rnd()*w,rnd()*h)}
  x.globalAlpha=1;
  // stamp ring
  const cx=w*.62,cy=h*.38,r=Math.min(w,h)*.26;x.strokeStyle=css("--seal");x.lineWidth=4;x.beginPath();x.arc(cx,cy,r,0,7);x.stroke();x.lineWidth=1.6;x.beginPath();x.arc(cx,cy,r*.72,0,7);x.stroke();
  x.fillStyle=css("--seal");x.font=`700 ${r*.36}px "Zilla Slab", Georgia, serif`;x.textAlign="center";x.textBaseline="middle";x.fillText("M.N.M",cx,cy);
}
function drawMap(){
  const cv=$("#mapCv");if(!cv)return;const w=cv.parentElement.clientWidth,h=280;if(!w)return;const d=devicePixelRatio||1;cv.width=w*d;cv.height=h*d;const x=cv.getContext("2d");x.scale(d,d);
  x.fillStyle=css("--sheet");x.fillRect(0,0,w,h);
  let seed=3;const rnd=()=>(seed=(seed*9301+49297)%233280)/233280;
  x.fillStyle=css("--ok-soft");for(let i=0;i<5;i++){x.beginPath();x.ellipse(rnd()*w,rnd()*h,40+rnd()*70,20+rnd()*40,rnd()*3,0,7);x.fill()}
  x.strokeStyle=css("--line");for(let i=0;i<26;i++){x.lineWidth=1+rnd()*3;x.beginPath();const y=rnd()*h;x.moveTo(0,y);x.bezierCurveTo(w*.3,y+(rnd()-.5)*80,w*.6,y+(rnd()-.5)*80,w,y+(rnd()-.5)*60);x.stroke()}
  for(let i=0;i<18;i++){x.lineWidth=1+rnd()*2;x.beginPath();const X=rnd()*w;x.moveTo(X,0);x.lineTo(X+(rnd()-.5)*120,h);x.stroke()}
  x.strokeStyle=css("--sig");x.globalAlpha=.4;x.lineWidth=5;x.beginPath();x.moveTo(0,h*.7);x.bezierCurveTo(w*.35,h*.55,w*.6,h*.85,w,h*.6);x.stroke();x.globalAlpha=1;
  x.fillStyle=css("--muted");x.font='500 11px "IBM Plex Mono", monospace';x.fillText("LICHTENBERG",18,24);x.fillText("Frankfurter Allee →",w-170,h*.62-10);
}
function art(){drawGlyphs($("#portraitCv"));drawGlyphs($("#portraitCv2"));drawMap()}
let artT;addEventListener("resize",()=>{clearTimeout(artT);artT=setTimeout(art,200)});
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change",art);
new MutationObserver(art).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});

/* ================= API ================= */
async function API(path,opt={}){
  const isFD=opt.body instanceof FormData;
  const r=await fetch("/api/"+path,{method:opt.method||"GET",credentials:"same-origin",headers:opt.body&&!isFD?{"content-type":"application/json"}:{},body:opt.body?(isFD?opt.body:JSON.stringify(opt.body)):undefined});
  let j={};try{j=await r.json()}catch(e){}
  if(!r.ok)throw Object.assign(new Error(j.error||("HTTP "+r.status)),{status:r.status,code:j.error});
  return j;
}
const ERR={bad_login:["E-Mail oder Passwort ist falsch.","Email or password is incorrect."],email_taken:["Für diese E-Mail-Adresse gibt es bereits ein Konto.","An account already exists for this email address."],password_short:["Das Passwort muss mindestens 8 Zeichen haben.","The password must be at least 8 characters."],name_email:["Bitte Name und eine gültige E-Mail-Adresse angeben.","Please enter your name and a valid email address."],forbidden:["Dafür fehlen Ihnen die Rechte.","You don’t have permission for that."],too_large:["Die Datei ist zu groß (max. 4 MB).","The file is too large (max 4 MB)."],title_date:["Titel und Datum sind Pflichtfelder.","Title and date are required."]};
const errMsg=e=>ERR[e.code]?T(ERR[e.code][0],ERR[e.code][1]):(e.status===404&&!e.code?T("Server nicht erreichbar. Läuft die Seite auf Netlify?","Server not reachable. Is the site running on Netlify?"):(e.message||"Error"));

/* ================= REQUEST FORM ================= */
const opt=(m,sel)=>Object.entries(m).map(([k,v])=>`<option value="${k}" data-de="${esc(v[0])}" data-en="${esc(v[1])}"${k===sel?" selected":""}>${esc(T(v[0],v[1]))}</option>`).join("");
const langOpt=sel=>LANGS.map(l=>`<option value="${l[0]}" data-de="${l[1]}" data-en="${l[2]}"${l[0]===sel?" selected":""}>${T(l[1],l[2])}</option>`).join("");
const ph=(de,en)=>`data-ph-de="${esc(de)}" data-ph-en="${esc(en)}" placeholder="${esc(T(de,en))}"`;
function formHTML(){return `
<form class="form" id="reqForm" novalidate>
 <p hidden><label>Leave empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
 <fieldset class="fs"><legend><span class="n">1</span>${B("Was benötigen Sie?","What do you need?")}</legend>
  <div class="types">
   ${[["translation","cert","Beglaubigte Übersetzung","Certified translation","Urkunden, Zeugnisse, Urteile …","Certificates, diplomas, judgments …"],["interpreting","interp","Dolmetschen","Interpreting","Gericht, Polizei, Amt, Notar …","Court, police, office, notary …"],["course","course","Sprachkurs","Language course","Einzeln oder in der Gruppe","One-to-one or group"],["office","office","Büroservice","Office service","Formulare, Briefe, Anträge","Forms, letters, applications"]].map((t,i)=>`<label class="type"><input type="radio" name="kind" id="kind-${t[0]}" value="${t[0]}"${i===0?" checked":""}><div>${ICON[t[1]].replace('class="ico"','')}<b>${B(t[2],t[3])}</b><span>${B(t[4],t[5])}</span></div></label>`).join("")}
  </div>
 </fieldset>
 <fieldset class="fs"><legend><span class="n">2</span>${B("Details","Details")}</legend>
  <div class="row">
   <div class="fld"><label for="f-from">${B("Ausgangssprache","Source language")}</label><select class="inp" id="f-from" name="from">${langOpt("de")}</select></div>
   <div class="fld"><label for="f-to">${B("Zielsprache","Target language")}</label><select class="inp" id="f-to" name="to">${langOpt("en")}</select></div>
  </div>
  <div data-show="translation office" class="fs">
   <div class="fld"><label for="f-docs">${B("Welche Dokumente?","Which documents?")}</label><input class="inp" id="f-docs" name="docs" ${ph("z. B. Geburtsurkunde, Reisepass","e.g. birth certificate, passport")}></div>
   <div class="row3">
    <div class="fld"><label for="f-pages">${B("Seiten (ca.)","Pages (approx.)")}</label><input class="inp tnum" type="number" min="1" id="f-pages" name="pages" ${ph("z. B. 3","e.g. 3")}></div>
    <div class="fld"><label for="f-deadline">${B("Benötigt bis","Needed by")} <i>${B("(optional)","(optional)")}</i></label><input class="inp" type="date" id="f-deadline" name="deadline"></div>
    <div class="fld"><label for="f-delivery">${B("Zustellung","Delivery")}</label><select class="inp" id="f-delivery" name="delivery">${opt(DELIVERY,"post")}</select></div>
   </div>
   <div class="fld"><span class="lbl">${B("Dokumente hochladen","Upload documents")} <i>${B("(Scan oder Foto, optional)","(scan or photo, optional)")}</i></span>
    <div class="drop" id="drop"><input type="file" id="f-files" multiple accept="image/*,application/pdf">${B("Dateien hierher ziehen oder <u>auswählen</u> · PDF, JPG, PNG","Drag files here or <u>browse</u> · PDF, JPG, PNG")}</div>
    <div class="files" id="fileList"></div>
    <p class="small muted">${B("Bis zu 3 Dateien, zusammen max. 8 MB.","Up to 3 files, 8 MB in total.")}</p>
   </div>
  </div>
  <div data-show="interpreting" class="fs" hidden>
   <div class="row3">
    <div class="fld"><label for="f-setting">${B("Einsatzort","Setting")}</label><select class="inp" id="f-setting" name="setting">${opt(SETTINGS,"court")}</select></div>
    <div class="fld"><label for="f-date">${B("Datum","Date")}</label><input class="inp" type="date" id="f-date" name="date"></div>
    <div class="fld"><label for="f-time">${B("Uhrzeit","Time")}</label><input class="inp" type="time" id="f-time" name="time"></div>
   </div>
   <div class="row">
    <div class="fld"><label for="f-place">${B("Ort / Adresse","Place / address")}</label><input class="inp" id="f-place" name="place" ${ph("z. B. Amtsgericht Tiergarten, Turmstr. 91","e.g. Amtsgericht Tiergarten, Turmstr. 91")}></div>
    <div class="fld"><label for="f-duration">${B("Voraussichtliche Dauer","Expected duration")}</label><input class="inp" id="f-duration" name="duration" ${ph("z. B. 2 Stunden","e.g. 2 hours")}></div>
   </div>
   <div class="fld"><label for="f-caseno">${B("Aktenzeichen","Case number")} <i>${B("(falls vorhanden)","(if any)")}</i></label><input class="inp mono" id="f-caseno" name="caseno"></div>
  </div>
  <div data-show="course" class="fs" hidden>
   <div class="row">
    <div class="fld"><label for="f-level">${B("Ihr aktuelles Niveau","Your current level")}</label><input class="inp" id="f-level" name="level" ${ph("z. B. Anfänger, B1","e.g. beginner, B1")}></div>
    <div class="fld"><label for="f-group">${B("Teilnehmende","Participants")}</label><input class="inp tnum" type="number" min="1" id="f-group" name="group" ${ph("1","1")}></div>
   </div>
  </div>
  <div class="fld"><label for="f-msg">${B("Nachricht","Message")} <i>${B("(optional)","(optional)")}</i></label><textarea class="inp" id="f-msg" name="message" ${ph("Wofür benötigen Sie die Übersetzung? Gibt es Besonderheiten?","What do you need it for? Anything special we should know?")}></textarea></div>
 </fieldset>
 <fieldset class="fs"><legend><span class="n">3</span>${B("Ihre Kontaktdaten","Your contact details")}</legend>
  <div class="row">
   <div class="fld"><label for="f-name">${B("Name","Name")} *</label><input class="inp" id="f-name" name="name" autocomplete="name" required></div>
   <div class="fld"><label for="f-company">${B("Firma / Behörde","Company / authority")} <i>${B("(optional)","(optional)")}</i></label><input class="inp" id="f-company" name="company" autocomplete="organization"></div>
  </div>
  <div class="row">
   <div class="fld"><label for="f-email">E-Mail *</label><input class="inp" type="email" id="f-email" name="email" autocomplete="email" required></div>
   <div class="fld"><label for="f-phone">${B("Telefon","Phone")}</label><input class="inp" type="tel" id="f-phone" name="phone" autocomplete="tel"></div>
  </div>
  <div class="fld"><label for="f-address">${B("Postanschrift","Postal address")} <i>${B("(für den Versand)","(for delivery)")}</i></label><input class="inp" id="f-address" name="address" autocomplete="street-address"></div>
  <label class="check"><input type="checkbox" id="f-consent" name="consent" required><span>${B('Ich bin einverstanden, dass meine Angaben und Dokumente zur Bearbeitung meiner Anfrage verarbeitet werden (<a href="#privacy">Datenschutz</a>). *','I agree that my details and documents are processed to handle my request (<a href="#privacy">privacy policy</a>). *')}</span></label>
  <p class="err-msg" id="formErr" hidden></p>
 </fieldset>
 <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><button class="btn btn-seal" type="submit" id="sendBtn">${B("Anfrage senden","Send request")}${ICON.arrow}</button><span class="small muted">${B("Unverbindlich und kostenlos.","Free and without obligation.")}</span></div>
</form>`}
let FILES=[];
function mountForm(){
  $("#formHost").innerHTML=formHTML();
  const f=$("#reqForm");
  const kindSync=()=>{const k=f.kind.value;$$("[data-show]",f).forEach(el=>el.hidden=!el.dataset.show.split(" ").includes(k))};
  $$("input[name=kind]",f).forEach(r=>r.addEventListener("change",kindSync));kindSync();
  const fi=$("#f-files"),drop=$("#drop");
  const addFiles=list=>{for(const x of list){if(FILES.length>=3){toast(T("Maximal 3 Dateien","3 files at most"));break}const total=FILES.reduce((a,b)=>a+b.size,0)+x.size;if(total>8*1024*1024){toast(T("Zusammen max. 8 MB: ","8 MB in total at most: ")+x.name);continue}FILES.push(x)}renderFiles()};
  fi.addEventListener("change",()=>{addFiles(fi.files);fi.value=""});
  ["dragenter","dragover"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add("over")}));
  ["dragleave","drop"].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove("over")}));
  drop.addEventListener("drop",e=>addFiles(e.dataTransfer.files));
  f.addEventListener("submit",submit);
}
function renderFiles(){$("#fileList").innerHTML=FILES.map((x,i)=>`<div><span style="overflow-wrap:anywhere">${esc(x.name)} <span class="muted">· ${(x.size/1024/1024).toFixed(1)} MB</span></span><button type="button" class="fbtn" data-rm="${i}">${T("Entfernen","Remove")}</button></div>`).join("");
  $$("[data-rm]").forEach(b=>b.onclick=()=>{FILES.splice(+b.dataset.rm,1);renderFiles()})}
function makeRef(){const d=new Date();const a="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";for(let i=0;i<4;i++)r+=a[Math.floor(Math.random()*a.length)];return `PG-${String(d.getFullYear()).slice(2)}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${r}`}
function summaryText(r){
  const L=[`${T("Anfrage","Request")} ${r.ref}`,`${T("Leistung","Service")}: ${lab(KINDS,r.kind)}`,`${T("Sprachen","Languages")}: ${langName(r.from)} → ${langName(r.to)}`];
  if(r.kind==="translation"||r.kind==="office"){L.push(`${T("Dokumente","Documents")}: ${r.docs||"–"}`,`${T("Seiten","Pages")}: ${r.pages||"–"}`,`${T("Benötigt bis","Needed by")}: ${r.deadline||"–"}`,`${T("Zustellung","Delivery")}: ${lab(DELIVERY,r.delivery)}`)}
  if(r.kind==="interpreting"){L.push(`${T("Einsatzort","Setting")}: ${lab(SETTINGS,r.setting)}`,`${T("Termin","Date")}: ${r.date||"–"} ${r.time||""}`,`${T("Ort","Place")}: ${r.place||"–"}`,`${T("Dauer","Duration")}: ${r.duration||"–"}`,`${T("Aktenzeichen","Case no.")}: ${r.caseno||"–"}`)}
  if(r.kind==="course"){L.push(`${T("Niveau","Level")}: ${r.level||"–"}`,`${T("Teilnehmende","Participants")}: ${r.group||"–"}`)}
  L.push("",`${r.name}${r.company?" · "+r.company:""}`,r.email,r.phone||"",r.address||"","",r.message||"");
  return L.filter((x,i,a)=>!(x===""&&a[i-1]==="")).join("\n").trim();
}
async function submit(e){
  e.preventDefault();
  const f=e.target,err=$("#formErr");err.hidden=true;$$(".inp.err",f).forEach(x=>x.classList.remove("err"));
  const fd=Object.fromEntries(new FormData(f).entries());
  const bad=[];
  if(!fd.name?.trim())bad.push("f-name");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fd.email||""))bad.push("f-email");
  if(!f.consent.checked)bad.push("f-consent");
  if(fd["bot-field"])return;
  if(bad.length){bad.forEach(id=>$("#"+id).classList.add("err"));err.textContent=T("Bitte Name, eine gültige E-Mail-Adresse und die Einwilligung angeben.","Please enter your name, a valid email address and tick the consent box.");err.hidden=false;$("#"+bad[0]).focus();return}
  const btn=$("#sendBtn");btn.disabled=true;btn.style.opacity=.6;
  const r={ref:makeRef(),kind:fd.kind,from:fd.from,to:fd.to,docs:fd.docs||"",pages:fd.pages||"",deadline:fd.deadline||"",delivery:fd.delivery||"",setting:fd.setting||"",date:fd.date||"",time:fd.time||"",place:fd.place||"",duration:fd.duration||"",caseno:fd.caseno||"",level:fd.level||"",group:fd.group||"",message:fd.message||"",name:fd.name.trim(),company:fd.company||"",email:fd.email.trim(),phone:fd.phone||"",address:fd.address||"",lang:LANG,status:"new",createdAt:new Date().toISOString(),files:[],history:[]};
  if(r.kind!=="translation"&&r.kind!=="office"){["docs","pages","deadline","delivery"].forEach(k=>r[k]="")}
  if(r.kind!=="interpreting"){["setting","date","time","place","duration","caseno"].forEach(k=>r[k]="")}
  let saved=false;
  try{
    const body=new FormData();
    body.append("form-name","request");body.append("bot-field",fd["bot-field"]||"");
    ["ref","kind","from","to","docs","pages","deadline","delivery","setting","date","time","place","duration","caseno","level","group","message","name","company","email","phone","address","lang"].forEach(k=>body.append(k,r[k]??""));
    FILES.slice(0,3).forEach((file,i)=>body.append("attachment"+(i+1),file,file.name));
    const res=await fetch("/",{method:"POST",body});
    saved=res.ok;
  }catch(x){saved=false}
  showDone(r,saved);
  FILES=[];
}
function showDone(r,saved){
  const sum=summaryText(r);
  $("#formHost").innerHTML=`<div class="form"><div class="success">
   <svg class="seal-ok" viewBox="0 0 200 200" fill="none"><circle cx="100" cy="100" r="92" stroke="currentColor" stroke-width="6"/><circle cx="100" cy="100" r="70" stroke="currentColor" stroke-width="2"/><path d="M66 102l22 22 46-50" stroke="currentColor" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>
   ${saved?`<h2 style="font-size:2rem">${B("Anfrage erhalten","Request received")}</h2><p class="lead">${B("Vielen Dank! Maureen meldet sich mit einem Angebot per E-Mail oder Telefon bei Ihnen.","Thank you! Maureen will get back to you with a quote by email or phone.")}</p>`
   :`<h2 style="font-size:2rem">${B("Fast geschafft","Almost done")}</h2><p class="lead">${B("Ihre Anfrage konnte in dieser Ansicht nicht automatisch übermittelt werden. Bitte kopieren Sie die Zusammenfassung und senden Sie sie an info.polyglotis@gmail.com.","Your request could not be sent automatically from this view. Please copy the summary and send it to info.polyglotis@gmail.com.")}</p>`}
   <span class="small muted">${B("Ihre Anfragenummer","Your request number")}</span><span class="refbox">${esc(r.ref)}</span>
   ${r.uploadFailed?`<p class="notice warn">${B("Mindestens eine Datei konnte nicht hochgeladen werden. Bitte per E-Mail nachreichen.","At least one file could not be uploaded. Please send it by email.")}</p>`:""}
   ${saved?"":`<pre class="summary">${esc(sum)}</pre><div class="copyline"><button class="btn btn-seal btn-sm" id="cpSum">${B("Zusammenfassung kopieren","Copy summary")}</button><a class="btn btn-ghost btn-sm" href="mailto:info.polyglotis@gmail.com?subject=${encodeURIComponent((LANG==="de"?"Anfrage ":"Request ")+r.ref)}&body=${encodeURIComponent(sum)}">${B("E-Mail öffnen","Open email")}</a></div><p class="small muted mono" style="user-select:all">info.polyglotis@gmail.com</p>`}
   <button class="btn btn-ghost btn-sm" id="newReq">${B("Weitere Anfrage","New request")}</button>
  </div></div>`;
  $("#cpSum")&&($("#cpSum").onclick=()=>copy(sum));
  $("#newReq").onclick=()=>{mountForm();applyLang()};
  window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});
}
function renderMyReqs(){}

/* ================= HQ ================= */
const HQ={me:null,authChecked:false,authMode:"login",accounts:[],tab:"overview",sel:null,filter:"open",reqs:{},appts:[],docs:[],month:null,docQ:"",confirm:null,loaded:false,timer:null};
async function openHQ(){
  if(!HQ.month){const d=new Date();HQ.month=new Date(d.getFullYear(),d.getMonth(),1)}
  renderHQ();
  if(!HQ.authChecked){try{HQ.me=(await API("me")).user}catch(e){HQ.me=null;HQ.apiDown=e.status===404&&!e.code}HQ.authChecked=true;
    if(!HQ.me){try{HQ.slotsLeft=(await API("status")).ownerSlotsLeft;if(HQ.slotsLeft===2)HQ.authMode="signup"}catch(e){}}}
  if(HQ.me&&HQ.me.role!=="pending")await loadHQ();
  renderHQ();
  clearInterval(HQ.timer);HQ.timer=setInterval(()=>{if(!HQ.active){clearInterval(HQ.timer);return}refreshMe().then(()=>HQ.me&&HQ.me.role!=="pending"?loadHQ():null).then(renderHQ)},30000);
}
async function refreshMe(){try{HQ.me=(await API("me")).user}catch(e){if(e.status===401)HQ.me=null}}
async function loadHQ(){
  try{
    const [r,a,d]=await Promise.all([API("requests"),API("appointments"),API("documents")]);
    HQ.reqs={};r.items.forEach(x=>HQ.reqs[x.ref]={...x,_key:x.ref,_id:x.ref});
    HQ.appts=a.items.map(x=>({...x,_id:x.id}));HQ.docs=d.items.map(x=>({...x,_id:x.id}));
    if(HQ.me.role==="owner"){HQ.accounts=(await API("accounts")).items.map(x=>({...x,_id:x.id}))}
    HQ.loaded=true;HQ.err=null;
  }catch(e){if(e.status===401){HQ.me=null}else HQ.err=errMsg(e)}
}
const ROLES={owner:["Inhaber/in","Owner"],staff:["Mitarbeiter/in","Staff"],viewer:["Nur lesen","Read only"],pending:["Wartet auf Freigabe","Awaiting approval"]};
const myAcct=()=>HQ.me;
const role=()=>myAcct()?.role||"";
const canW=()=>["owner","staff"].includes(role());
const isOwner=()=>role()==="owner";
const by=()=>myAcct()?.name||"";
const reqList=()=>Object.values(HQ.reqs).sort((a,b)=>(b.createdAt||"").localeCompare(a.createdAt||""));
const fmtDate=iso=>{if(!iso)return"–";const d=new Date(iso.length<=10?iso+"T00:00":iso);if(isNaN(d))return iso;return d.toLocaleDateString(LANG==="de"?"de-DE":"en-GB",{day:"2-digit",month:"short",year:"numeric"})};
const fmtDT=iso=>{if(!iso)return"–";const d=new Date(iso);return d.toLocaleString(LANG==="de"?"de-DE":"en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})};
const todayStr=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const money=n=>n===""||n==null||isNaN(+n)?"–":(+n).toLocaleString(LANG==="de"?"de-DE":"en-GB",{style:"currency",currency:"EUR"});
const EMPTY_ICO='<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 28l6-18h24l6 18v10H6zM6 28h10l2 4h12l2-4h10"/></svg>';

function hqShell(inner){
  const nNew=reqList().filter(r=>r.status==="new").length;
  const nPend=HQ.accounts.filter(a=>a.role==="pending").length;
  const tabs=[["overview","Übersicht","Overview"],["requests","Anfragen","Requests",nNew],["calendar","Termine","Appointments"],["documents","Dokumente","Documents"],isOwner()?["team","Team & Konten","Team & accounts",nPend]:["team","Mein Konto","My account"]];
  return `<div class="hq-top"><div class="wrap head-row">
    <a class="brand" href="#hq"><span class="mark" aria-hidden="true"><i></i><i></i><i></i></span><span class="brand-name">POLYGLOTIS HQ<small>${T("Arbeitsbereich","Workspace")}</small></span></a>
    <div class="head-tools">${myAcct()&&myAcct().role!=="pending"?`<span class="me-chip"><span class="av">${esc((myAcct().name||"?").trim().charAt(0).toUpperCase())}</span><span>${esc(myAcct().name)} · ${esc(lab(ROLES,myAcct().role))}</span></span>`:""}<button class="theme-btn" data-theme-toggle aria-label="Light/Dark"><svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/></svg><svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button><div class="lang" role="group" aria-label="Language"><button data-setlang="de" aria-pressed="${LANG==="de"}">DE</button><button data-setlang="en" aria-pressed="${LANG==="en"}">EN</button></div><a class="btn btn-ghost btn-sm" href="#home">${T("Zur Website","Website")}</a>${HQ.me?`<button class="btn btn-ghost btn-sm" data-act="logout">${T("Abmelden","Sign out")}</button>`:""}</div>
  </div></div>
  ${myAcct()&&myAcct().role!=="pending"?`<div class="hq-tabs" role="tablist"><div class="wrap" style="display:flex;gap:2px">${tabs.map(t=>`<button role="tab" data-tab="${t[0]}" aria-selected="${HQ.tab===t[0]}">${T(t[1],t[2])}${t[3]?`<span class="count">${t[3]}</span>`:""}</button>`).join("")}</div></div>`:""}
  <div class="wrap hq-body">${inner}</div>`;
}
function renderHQ(){
  const root=$("#hqRoot");if(!root)return;
  root.classList.toggle("ro",false);root.classList.toggle("nodel",false);
  if(!HQ.authChecked){root.innerHTML=hqShell(`<div class="empty">${T("Wird geladen …","Loading …")}</div>`);return}
  const me=HQ.me;
  if(!me){root.innerHTML=hqShell(authHTML());bindAuth();bindLogout();return}
  if(me.role==="pending"){root.innerHTML=hqShell(`<div class="acct"><span class="badge-owner" style="color:var(--warn);border-color:var(--warn)">${T("Wartet auf Freigabe","Awaiting approval")}</span><h2>${T("Hallo","Hi")} ${esc(me.name)}</h2><p class="muted">${T("Ihr Konto wurde erstellt. Eine Inhaberin oder ein Inhaber muss es freigeben, bevor Sie HQ nutzen können. Diese Seite aktualisiert sich automatisch.","Your account has been created. An owner needs to approve it before you can use HQ. This page updates automatically.")}</p><a class="btn btn-ghost btn-sm" href="#home" style="width:max-content">${T("Zur Website","Website")}</a></div>`);bindLogout();return}
  const errBar=HQ.err?`<p class="notice warn" style="margin-bottom:14px">${esc(HQ.err)}</p>`:"";
  root.classList.toggle("ro",!canW());root.classList.toggle("nodel",!isOwner());
  const keep={};const prevSel=HQ._renderedSel;
  ["rp-body","rp-subj","q-amt","q-due","q-note"].forEach(id=>{const el=document.getElementById(id);if(el)keep[id]=el.value});
  const tplNow=$("#rp-body")?.dataset.tpl;const focusId=document.activeElement?.id;
  const v={overview:vOverview,requests:vRequests,calendar:vCalendar,documents:vDocuments,team:vTeam}[HQ.tab]||vOverview;
  root.innerHTML=hqShell(errBar+v());
  if(HQ.tab==="requests"&&prevSel&&prevSel===HQ.sel){Object.entries(keep).forEach(([id,val])=>{const el=document.getElementById(id);if(el)el.value=val});if(tplNow&&$("#rp-body"))$("#rp-body").dataset.tpl=tplNow}
  HQ._renderedSel=HQ.tab==="requests"?HQ.sel:null;
  bindHQ();
  if(focusId&&focusId!=="docQ"){const f=document.getElementById(focusId);if(f&&f.closest("#hqRoot"))f.focus()}
}
function vOverview(){
  const R=reqList(),now=todayStr(),in7=new Date(Date.now()+7*864e5).toISOString().slice(0,10);
  const nNew=R.filter(r=>r.status==="new").length;
  const open=R.filter(r=>["accepted","progress"].includes(r.status));
  const pipeline=R.filter(r=>["quoted","accepted","progress"].includes(r.status)).reduce((s,r)=>s+(+r.quote||0),0);
  const up=HQ.appts.filter(a=>a.date>=now&&a.status!=="cancelled").sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));
  const week=up.filter(a=>a.date<=in7).length;
  const due=R.filter(r=>r.deadline&&!["done","declined"].includes(r.status)).sort((a,b)=>a.deadline.localeCompare(b.deadline)).slice(0,5);
  const greet=(()=>{const h=new Date().getHours();return h<12?T("Guten Morgen","Good morning"):h<18?T("Guten Tag","Good afternoon"):T("Guten Abend","Good evening")})();
  return `<div style="display:flex;justify-content:space-between;align-items:end;gap:12px;flex-wrap:wrap;margin-bottom:18px"><div><p class="eyebrow">${fmtDate(new Date().toISOString())}</p><h2 style="font-size:2rem;margin-top:6px">${greet}, ${esc((myAcct()?.name||"").split(" ")[0])}</h2></div><div class="actions"><button class="btn btn-ghost btn-sm w" data-act="newAppt">+ ${T("Termin","Appointment")}</button><button class="btn btn-seal btn-sm" data-tab="requests">${T("Anfragen öffnen","Open requests")}</button></div></div>
  <div class="kpis">
   <div class="kpi ${nNew?"hot":""}"><span>${T("Neue Anfragen","New requests")}</span><b class="tnum">${nNew}</b></div>
   <div class="kpi"><span>${T("Laufende Aufträge","Jobs in progress")}</span><b class="tnum">${open.length}</b></div>
   <div class="kpi"><span>${T("Termine in 7 Tagen","Appointments next 7 days")}</span><b class="tnum">${week}</b></div>
   <div class="kpi"><span>${T("Offenes Auftragsvolumen","Open job value")}</span><b class="tnum" style="font-size:1.6rem">${money(pipeline)}</b></div>
  </div>
  <div class="two">
   <div class="panel"><div class="panel-h"><h3>${T("Braucht eine Antwort","Needs a reply")}</h3><button class="fbtn" data-tab="requests">${T("Alle","All")}</button></div>
    ${R.filter(r=>r.status==="new").slice(0,6).map(liHTML).join("")||`<div class="empty">${EMPTY_ICO}<b>${T("Alles beantwortet","All caught up")}</b><span class="small">${T("Neue Anfragen von der Website erscheinen hier automatisch.","New requests from the website appear here automatically.")}</span></div>`}
   </div>
   <div style="display:grid;gap:14px;align-content:start">
    <div class="panel"><div class="panel-h"><h3>${T("Nächste Termine","Upcoming appointments")}</h3><button class="fbtn" data-tab="calendar">${T("Kalender","Calendar")}</button></div><div class="panel-b agenda">${up.slice(0,5).map(agHTML).join("")||`<p class="muted small">${T("Keine anstehenden Termine.","No upcoming appointments.")}</p>`}</div></div>
    <div class="panel"><div class="panel-h"><h3>${T("Fristen","Deadlines")}</h3></div><div class="panel-b agenda">${due.map(r=>`<div class="ag" style="grid-template-columns:70px 1fr auto"><div class="when">${fmtDate(r.deadline)}</div><div class="what"><b>${esc(r.name)}</b><span class="mono">${esc(r.ref)}</span></div><span class="pill ${stCls(r.status)}">${esc(stName(r.status))}</span></div>`).join("")||`<p class="muted small">${T("Keine offenen Fristen.","No open deadlines.")}</p>`}</div></div>
   </div>
  </div>`;
}
function liHTML(r){return `<button class="li ${HQ.sel===r._key?"sel":""}" data-open="${esc(r._key)}"><span class="t"><span style="overflow-wrap:anywhere">${esc(r.name)}${r.company?` <span class="muted" style="font-weight:400">· ${esc(r.company)}</span>`:""}</span><span class="pill ${stCls(r.status)}">${esc(stName(r.status))}</span></span><span class="s"><span>${esc(lab(KINDS,r.kind))} · ${esc(langName(r.from))} → ${esc(langName(r.to))}</span><span class="mono">${fmtDate(r.createdAt)}</span></span></button>`}
function agHTML(a){const d=new Date(a.date+"T00:00");return `<div class="ag"><div class="when"><b>${d.getDate()}</b>${d.toLocaleDateString(LANG==="de"?"de-DE":"en-GB",{month:"short",weekday:"short"})}</div><div class="what"><b>${esc(a.title)}</b><span>${esc(a.start||"")}${a.end?"–"+esc(a.end):""} · ${esc(lab({...SETTINGS,...TYPES_EXTRA},a.type))}${a.location?" · "+esc(a.location):""}</span></div><button class="fbtn" data-appt="${esc(a._id)}">${T("Öffnen","Open")}</button></div>`}

function vRequests(){
  const F=[["open",T("Offen","Open")],["new",stName("new")],["quoted",stName("quoted")],["progress",T("In Arbeit","In progress")],["done",stName("done")],["all",T("Alle","All")]];
  const R=reqList().filter(r=>HQ.filter==="all"?true:HQ.filter==="open"?!["done","declined"].includes(r.status):HQ.filter==="progress"?["accepted","progress"].includes(r.status):r.status===HQ.filter);
  if(!HQ.sel&&R[0])HQ.sel=R[0]._key;
  const sel=HQ.reqs[HQ.sel];
  return `<div class="inbox">
   <div class="panel"><div class="filters">${F.map(f=>`<button class="fbtn" data-filter="${f[0]}" aria-pressed="${HQ.filter===f[0]}">${esc(f[1])}</button>`).join("")}</div>
    <div class="list">${R.map(liHTML).join("")||`<div class="empty">${EMPTY_ICO}<b>${HQ.loaded?T("Keine Anfragen in dieser Ansicht","No requests in this view"):T("Wird geladen …","Loading …")}</b><span class="small">${T("Anfragen aus dem Formular auf der Website landen hier.","Requests from the website form land here.")}</span></div>`}</div></div>
   <div class="panel">${sel?detailHTML(sel):`<div class="empty">${EMPTY_ICO}<b>${T("Anfrage auswählen","Select a request")}</b></div>`}</div>
  </div>`;
}
function row(k,v){return v?`<dt>${k}</dt><dd>${v}</dd>`:""}
function detailHTML(r){
  const files=(r.files||[]).map(f=>`<a class="chip" style="text-decoration:none" href="${esc(f.url||"")}" target="_blank" rel="noopener">${esc(f.name)}</a>`).join(" ");
  const confirmDel=HQ.confirm==="del:"+r._key;
  return `<div class="panel-h"><div class="det-h" style="width:100%"><div><p class="mono small muted">${esc(r.ref)} · ${fmtDT(r.createdAt)}</p><h3>${esc(r.name)}</h3><p class="small muted">${esc(lab(KINDS,r.kind))} · ${esc(langName(r.from))} → ${esc(langName(r.to))}</p></div>
   <div class="fld" style="min-width:180px"><label for="st-sel">${T("Status","Status")}</label><select class="inp" id="st-sel">${Object.keys(STATUS).map(k=>`<option value="${k}"${r.status===k?" selected":""}>${esc(stName(k))}</option>`).join("")}</select></div></div></div>
  <div class="panel-b" style="display:grid;gap:22px">
   <dl class="dl">
    ${row("E-Mail",`<span class="mono" style="user-select:all">${esc(r.email)}</span> <button class="fbtn" data-copy="${esc(r.email)}">${T("Kopieren","Copy")}</button>`)}
    ${row(T("Telefon","Phone"),r.phone?`<span class="mono" style="user-select:all">${esc(r.phone)}</span>`:"")}
    ${row(T("Firma / Behörde","Company / authority"),esc(r.company))}
    ${row(T("Anschrift","Address"),esc(r.address))}
    ${row(T("Dokumente","Documents"),esc(r.docs))}
    ${row(T("Seiten","Pages"),esc(r.pages))}
    ${row(T("Benötigt bis","Needed by"),r.deadline?fmtDate(r.deadline):"")}
    ${row(T("Zustellung","Delivery"),r.delivery?esc(lab(DELIVERY,r.delivery)):"")}
    ${row(T("Einsatzort","Setting"),r.setting?esc(lab(SETTINGS,r.setting)):"")}
    ${row(T("Termin","Date"),r.date?`${fmtDate(r.date)} ${esc(r.time||"")}`:"")}
    ${row(T("Ort","Place"),esc(r.place))}
    ${row(T("Dauer","Duration"),esc(r.duration))}
    ${row(T("Aktenzeichen","Case no."),r.caseno?`<span class="mono">${esc(r.caseno)}</span>`:"")}
    ${row(T("Niveau","Level"),esc(r.level))}
    ${row(T("Teilnehmende","Participants"),esc(r.group))}
    ${row(T("Nachricht","Message"),r.message?`<span style="white-space:pre-wrap">${esc(r.message)}</span>`:"")}
    ${row(T("Anhänge","Attachments"),files)}
    ${row(T("Antwortsprache","Reply language"),r.lang==="en"?"English":"Deutsch")}
   </dl>
   <div class="row">
    <div class="fld"><label for="q-amt">${T("Angebotspreis (€)","Quoted price (€)")}</label><input class="inp tnum" type="number" step="0.01" min="0" id="q-amt" value="${esc(r.quote??"")}"></div>
    <div class="fld"><label for="q-due">${T("Liefertermin","Delivery date")}</label><input class="inp" type="date" id="q-due" value="${esc(r.dueDate||"")}"></div>
   </div>
   <div class="fld"><label for="q-note">${T("Interne Notiz","Internal note")}</label><textarea class="inp" id="q-note" style="min-height:70px">${esc(r.note||"")}</textarea></div>
   <div class="actions"><button class="btn btn-ghost btn-sm w" data-act="saveMeta">${T("Speichern","Save")}</button><button class="btn btn-ghost btn-sm w" data-act="apptFromReq">+ ${T("Termin anlegen","Add appointment")}</button>
    ${confirmDel?`<span class="small" style="color:var(--seal)">${T("Wirklich löschen?","Delete for good?")}</span><button class="btn btn-seal btn-sm" data-act="delReq">${T("Ja, löschen","Yes, delete")}</button><button class="btn btn-ghost btn-sm" data-act="cancelConfirm">${T("Abbrechen","Cancel")}</button>`:`<button class="btn btn-ghost btn-sm del" data-act="askDel" style="color:var(--seal)">${T("Löschen","Delete")}</button>`}</div>
   <div class="panel" style="border-style:dashed"><div class="panel-h"><h3>${T("Antworten","Reply")}</h3><div class="tpl">${[["quote","Angebot","Quote"],["question","Rückfrage","Question"],["appt","Termin bestätigen","Confirm date"],["ready","Fertig","Ready"],["decline","Absage","Decline"]].map(t=>`<button class="fbtn" data-tpl="${t[0]}">${T(t[1],t[2])}</button>`).join("")}</div></div>
    <div class="panel-b" style="display:grid;gap:10px">
     <div class="fld"><label for="rp-subj">${T("Betreff","Subject")}</label><input class="inp" id="rp-subj" value="${esc((r.lang==="en"?"Your request ":"Ihre Anfrage ")+r.ref)}"></div>
     <div class="fld"><label for="rp-body">${T("Nachricht","Message")}</label><textarea class="inp" id="rp-body" style="min-height:170px"></textarea></div>
     <div class="actions"><button class="btn btn-ghost btn-sm" data-act="copyReply">${T("Text kopieren","Copy text")}</button><a class="btn btn-ghost btn-sm" id="mailLink" href="#">${T("In E-Mail öffnen","Open in email")}</a><button class="btn btn-seal btn-sm w" data-act="logReply">${T("Als gesendet vermerken","Mark as sent")}</button></div>
     <p class="small muted">${T("Senden Sie die Antwort aus Ihrem E-Mail-Postfach an","Send the reply from your mailbox to")} <span class="mono" style="user-select:all">${esc(r.email)}</span> ${T("und vermerken Sie sie hier.","and log it here.")}</p>
    </div></div>
   <div><h3 style="font-size:1.1rem">${T("Verlauf","History")}</h3><div class="timeline">
    <div class="tl"><i></i><div><b>${T("Anfrage eingegangen","Request received")}</b> <small>${fmtDT(r.createdAt)}</small></div></div>
    ${(r.history||[]).map(h=>`<div class="tl mine"><i></i><div><b>${esc(h.title)}</b> <small>${fmtDT(h.at)}${h.by?" · "+esc(h.by):""}</small>${h.text?`<pre>${esc(h.text)}</pre>`:""}</div></div>`).join("")}
   </div></div>
  </div>`;
}
function template(kind,r){
  const en=r.lang==="en";const q=$("#q-amt")?.value||r.quote;const due=$("#q-due")?.value||r.dueDate;
  const svc=en?KINDS[r.kind]?.[1]:KINDS[r.kind]?.[0];
  const sig=`\n\n${en?"Kind regards":"Mit freundlichen Grüßen"}\nMaureen Mpieri\nRomans 8:28 – Polyglotis\n+49 177 1948068 · info.polyglotis@gmail.com`;
  const hi=en?`Dear ${r.name},\n\n`:`Guten Tag ${r.name},\n\n`;
  const D=x=>x?fmtDateL(x,en):(en?"[date]":"[Datum]");
  const M=x=>x?(+x).toLocaleString(en?"en-GB":"de-DE",{style:"currency",currency:"EUR"}):(en?"[price]":"[Preis]");
  const t={
   quote:en?`thank you for your request ${r.ref}. For the ${(svc||"").toLowerCase()} (${langName2(r.from,en)} → ${langName2(r.to,en)}${r.docs?`: ${r.docs}`:""}) I can offer you a fixed price of ${M(q)}. As a small business under § 19 UStG, no VAT is charged.\n\nDelivery: ${D(due)}.\n\nPlease confirm by replying to this email and I will get started straight away.`
    :`vielen Dank für Ihre Anfrage ${r.ref}. Für die ${svc||"Leistung"} (${langName2(r.from,en)} → ${langName2(r.to,en)}${r.docs?`: ${r.docs}`:""}) biete ich Ihnen einen Festpreis von ${M(q)} an. Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.\n\nLiefertermin: ${D(due)}.\n\nBitte bestätigen Sie den Auftrag kurz per Antwort auf diese E-Mail, dann lege ich direkt los.`,
   question:en?`thank you for your request ${r.ref}. To prepare an exact quote, I need a little more information:\n\n- \n\nA clearly readable scan or photo of each page is enough.`:`vielen Dank für Ihre Anfrage ${r.ref}. Für ein genaues Angebot benötige ich noch folgende Angaben:\n\n- \n\nEin gut lesbarer Scan oder ein Foto jeder Seite genügt.`,
   appt:en?`I confirm the interpreting appointment for ${r.ref}:\n\nDate: ${D(r.date)}${r.time?`, ${r.time}`:""}\nPlace: ${r.place||"[place]"}\n\nI will be there 15 minutes early.`:`hiermit bestätige ich den Dolmetschtermin zu ${r.ref}:\n\nDatum: ${D(r.date)}${r.time?`, ${r.time} Uhr`:""}\nOrt: ${r.place||"[Ort]"}\n\nIch bin 15 Minuten vorher vor Ort.`,
   ready:en?`good news: your translation for ${r.ref} is ready. ${r.delivery==="pickup"?"You can pick it up in Berlin by appointment.":"It is on its way to you by post."}\n\nThe invoice is attached.`:`gute Nachrichten: Ihre Übersetzung zu ${r.ref} ist fertig. ${r.delivery==="pickup"?"Sie können sie nach Absprache in Berlin abholen.":"Sie ist per Post auf dem Weg zu Ihnen."}\n\nDie Rechnung finden Sie im Anhang.`,
   decline:en?`thank you for your request ${r.ref}. Unfortunately I am unable to take on this job. I wish you every success in finding the right support.`:`vielen Dank für Ihre Anfrage ${r.ref}. Leider kann ich diesen Auftrag nicht übernehmen. Ich wünsche Ihnen viel Erfolg bei der weiteren Suche.`
  }[kind];
  return hi+t+sig;
}
const langName2=(k,en)=>{const l=LANGS.find(x=>x[0]===k);return l?(en?l[2]:l[1]):k};
const fmtDateL=(iso,en)=>{const d=new Date(iso+"T00:00");return isNaN(d)?iso:d.toLocaleDateString(en?"en-GB":"de-DE",{day:"numeric",month:"long",year:"numeric"})};

async function updReq(r,patch){
  try{const {item}=await API("requests/"+encodeURIComponent(r.ref),{method:"PATCH",body:patch});HQ.reqs[item.ref]={...item,_key:item.ref,_id:item.ref};renderHQ();return true}
  catch(e){toast(T("Speichern fehlgeschlagen: ","Save failed: ")+errMsg(e));return false}
}

function vCalendar(){
  const m=HQ.month,y=m.getFullYear(),mo=m.getMonth();
  const first=new Date(y,mo,1),start=new Date(first);start.setDate(1-((first.getDay()+6)%7));
  const days=[];for(let i=0;i<42;i++){const d=new Date(start);d.setDate(start.getDate()+i);days.push(d)}
  const ds=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const wd=LANG==="de"?["Mo","Di","Mi","Do","Fr","Sa","So"]:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const now=todayStr();
  const up=HQ.appts.filter(a=>a.date>=now&&a.status!=="cancelled").sort((a,b)=>(a.date+(a.start||"")).localeCompare(b.date+(b.start||"")));
  const lastRow=days.slice(35).every(d=>d.getMonth()!==mo)?35:42;
  return `<div class="two" style="margin-top:0;grid-template-columns:1.6fr 1fr">
  <div class="panel"><div class="panel-h"><h3>${m.toLocaleDateString(LANG==="de"?"de-DE":"en-GB",{month:"long",year:"numeric"})}</h3><div class="actions"><button class="fbtn" data-month="-1">←</button><button class="fbtn" data-month="0">${T("Heute","Today")}</button><button class="fbtn" data-month="1">→</button><button class="btn btn-seal btn-sm w" data-act="newAppt">+ ${T("Termin","Appointment")}</button></div></div>
   <div class="panel-b"><div class="cal">${wd.map(w=>`<div class="dn">${w}</div>`).join("")}${days.slice(0,lastRow).map(d=>{const k=ds(d);const ev=HQ.appts.filter(a=>a.date===k&&a.status!=="cancelled").sort((a,b)=>(a.start||"").localeCompare(b.start||""));return `<div class="d ${d.getMonth()!==mo?"other":""} ${k===now?"today":""}" data-day="${k}"><span class="num">${d.getDate()}</span>${ev.slice(0,3).map(a=>`<span class="ev ${a.type==="court"||a.type==="police"?"court":""}" data-appt="${esc(a._id)}">${esc(a.start||"")} ${esc(a.title)}</span>`).join("")}${ev.length>3?`<span class="small muted">+${ev.length-3}</span>`:""}</div>`}).join("")}</div></div></div>
  <div class="panel"><div class="panel-h"><h3>${T("Anstehend","Upcoming")}</h3></div><div class="panel-b agenda">${up.slice(0,12).map(agHTML).join("")||`<div class="empty">${EMPTY_ICO}<b>${T("Noch keine Termine","No appointments yet")}</b><span class="small">${T("Klicken Sie auf einen Tag oder auf „+ Termin“.","Click a day or “+ Appointment”.")}</span></div>`}</div></div>
  </div>`;
}
function apptModal(a){
  a=a||{};const isNew=!a._id;
  const ST={planned:["Geplant","Planned"],confirmed:["Bestätigt","Confirmed"],done:["Erledigt","Done"],cancelled:["Abgesagt","Cancelled"]};
  $("#modalHost").innerHTML=`<div class="modal-bg" id="mbg"><form class="modal" id="apptForm">
   <h3>${isNew?T("Neuer Termin","New appointment"):T("Termin bearbeiten","Edit appointment")}</h3>
   <div class="fld"><label for="a-title">${T("Titel","Title")} *</label><input class="inp" id="a-title" required value="${esc(a.title||"")}" placeholder="${T("z. B. Hauptverhandlung, Vernehmung","e.g. main hearing, police interview")}"></div>
   <div class="row"><div class="fld"><label for="a-type">${T("Art","Type")}</label><select class="inp" id="a-type">${opt({...SETTINGS,...TYPES_EXTRA},a.type||"court")}</select></div>
    <div class="fld"><label for="a-status">Status</label><select class="inp" id="a-status">${opt(ST,a.status||"planned")}</select></div></div>
   <div class="row3"><div class="fld"><label for="a-date">${T("Datum","Date")} *</label><input class="inp" type="date" id="a-date" required value="${esc(a.date||"")}"></div>
    <div class="fld"><label for="a-start">${T("Beginn","Start")}</label><input class="inp" type="time" id="a-start" value="${esc(a.start||"")}"></div>
    <div class="fld"><label for="a-end">${T("Ende","End")}</label><input class="inp" type="time" id="a-end" value="${esc(a.end||"")}"></div></div>
   <div class="fld"><label for="a-loc">${T("Ort","Location")}</label><input class="inp" id="a-loc" value="${esc(a.location||"")}"></div>
   <div class="row"><div class="fld"><label for="a-client">${T("Auftraggeber / Kontakt","Client / contact")}</label><input class="inp" id="a-client" value="${esc(a.client||"")}"></div>
    <div class="fld"><label for="a-ref">${T("Anfrage / Aktenzeichen","Request / case no.")}</label><input class="inp mono" id="a-ref" value="${esc(a.ref||"")}"></div></div>
   <div class="fld"><label for="a-notes">${T("Notizen","Notes")}</label><textarea class="inp" id="a-notes" style="min-height:70px">${esc(a.notes||"")}</textarea></div>
   <div class="actions" style="justify-content:space-between"><div class="actions">${isNew?"":(HQ.confirm==="appt:"+a._id?`<button type="button" class="btn btn-seal btn-sm" id="aDelYes">${T("Ja, löschen","Yes, delete")}</button>`:`<button type="button" class="btn btn-ghost btn-sm del" id="aDel" style="color:var(--seal)">${T("Löschen","Delete")}</button>`)}</div>
    <div class="actions"><button type="button" class="btn btn-ghost btn-sm" id="aCancel">${T("Abbrechen","Cancel")}</button><button class="btn btn-seal btn-sm w" type="submit">${T("Speichern","Save")}</button></div></div>
  </form></div>`;
  if(!canW())$$("#apptForm .w, #apptForm .inp").forEach(el=>el.tagName==="BUTTON"?el.remove():el.disabled=true);
  if(!isOwner())$$("#apptForm .del").forEach(el=>el.remove());
  const close=()=>{$("#modalHost").innerHTML="";HQ.confirm=null};
  $("#aCancel").onclick=close;$("#mbg").addEventListener("click",e=>{if(e.target.id==="mbg")close()});
  $("#aDel")&&($("#aDel").onclick=()=>{HQ.confirm="appt:"+a._id;apptModal(a)});
  $("#aDelYes")&&($("#aDelYes").onclick=async()=>{try{await API("appointments/"+a._id,{method:"DELETE"});HQ.appts=HQ.appts.filter(x=>x._id!==a._id);toast(T("Termin gelöscht","Appointment deleted"))}catch(e){toast(errMsg(e))}close();renderHQ()});
  $("#apptForm").onsubmit=async e=>{e.preventDefault();
    const d={title:$("#a-title").value.trim(),type:$("#a-type").value,status:$("#a-status").value,date:$("#a-date").value,start:$("#a-start").value,end:$("#a-end").value,location:$("#a-loc").value.trim(),client:$("#a-client").value.trim(),ref:$("#a-ref").value.trim(),notes:$("#a-notes").value,updatedAt:new Date().toISOString(),createdAt:a.createdAt||new Date().toISOString()};
    if(!d.title||!d.date){toast(T("Titel und Datum sind Pflichtfelder","Title and date are required"));return}
    try{const {item}=await API("appointments"+(a._id?"/"+a._id:""),{method:a._id?"PUT":"POST",body:d});HQ.appts=[...HQ.appts.filter(x=>x._id!==item.id),{...item,_id:item.id}];toast(T("Termin gespeichert","Appointment saved"));close();renderHQ()}catch(err){toast(errMsg(err))}
  };
  setTimeout(()=>$("#a-title").focus(),50);
}

function vDocuments(){
  const q=HQ.docQ.toLowerCase();
  const fromReq=reqList().flatMap(r=>(r.files||[]).map(f=>({name:f.name,size:f.size,href:f.url,category:"request",client:r.name,ref:r.ref,uploadedAt:r.createdAt,_src:"req"})));
  const all=[...HQ.docs.map(d=>({...d,_src:"hq"})),...fromReq].filter(d=>!q||[d.name,d.client,d.ref,d.category].join(" ").toLowerCase().includes(q)).sort((a,b)=>(b.uploadedAt||"").localeCompare(a.uploadedAt||""));
  const CAT={source:["Original / Vorlage","Source document"],translation:["Übersetzung","Translation"],invoice:["Rechnung","Invoice"],court:["Gericht / Ladung","Court / summons"],other:["Sonstiges","Other"],request:["Aus Anfrage","From request"]};
  return `<div class="panel"><div class="panel-h"><h3>${T("Dokumente","Documents")} <span class="muted small tnum">(${all.length})</span></h3>
   <div class="actions"><input class="inp" id="docQ" style="width:220px;padding:.45em .7em" placeholder="${T("Suchen: Name, Kunde, Nr.","Search: name, client, no.")}" value="${esc(HQ.docQ)}">
   ${true?`<label class="btn btn-seal btn-sm w" style="position:relative">+ ${T("Hochladen","Upload")}<input type="file" id="docUp" multiple style="position:absolute;inset:0;opacity:0;cursor:pointer"></label>`:""}</div></div>
   <div class="panel-b" id="upMeta" hidden></div>
   ${all.length?`<div class="table-wrap"><table class="tbl"><thead><tr><th>${T("Datei","File")}</th><th>${T("Kategorie","Category")}</th><th>${T("Kunde","Client")}</th><th>${T("Nr.","Ref")}</th><th>${T("Datum","Date")}</th><th class="right">${T("Größe","Size")}</th><th></th></tr></thead><tbody>
   ${all.map(d=>`<tr><td><a href="${esc(d.href||("/api/files/"+d._id))}" target="_blank" rel="noopener" style="font-weight:600;overflow-wrap:anywhere">${esc(d.name)}</a></td><td><span class="pill ${d._src==="req"?"st-quoted":"st-declined"}">${esc(lab(CAT,d.category))}</span></td><td>${esc(d.client||"–")}</td><td class="mono small">${esc(d.ref||"–")}</td><td class="small">${fmtDate(d.uploadedAt)}</td><td class="right small tnum">${d.size?(d.size/1024/1024).toFixed(1)+" MB":"–"}</td>
    <td class="right">${d._src==="hq"?(HQ.confirm==="doc:"+d._id?`<button class="fbtn" style="color:var(--seal)" data-deldoc="${esc(d._id)}">${T("Endgültig löschen","Delete for good")}</button>`:`<button class="fbtn del" data-askdoc="${esc(d._id)}">${T("Löschen","Delete")}</button>`):""}</td></tr>`).join("")}
   </tbody></table></div>`:`<div class="empty">${EMPTY_ICO}<b>${T("Noch keine Dokumente","No documents yet")}</b><span class="small">${T("Laden Sie Originale, Übersetzungen, Rechnungen oder Ladungen hoch. Anhänge aus Anfragen erscheinen hier automatisch.","Upload originals, translations, invoices or summonses. Attachments from requests appear here automatically.")}</span></div>`}
  </div>`;
}
function uploadMeta(files){
  const box=$("#upMeta");box.hidden=false;
  box.innerHTML=`<div style="display:grid;gap:12px"><b>${files.length} ${T("Datei(en) ausgewählt","file(s) selected")}</b>
   <div class="row3"><div class="fld"><label for="u-cat">${T("Kategorie","Category")}</label><select class="inp" id="u-cat">${opt({source:["Original / Vorlage","Source document"],translation:["Übersetzung","Translation"],invoice:["Rechnung","Invoice"],court:["Gericht / Ladung","Court / summons"],other:["Sonstiges","Other"]},"source")}</select></div>
   <div class="fld"><label for="u-client">${T("Kunde","Client")}</label><input class="inp" id="u-client"></div>
   <div class="fld"><label for="u-ref">${T("Nr. / Aktenzeichen","Ref / case no.")}</label><input class="inp mono" id="u-ref"></div></div>
   <div class="actions"><button class="btn btn-seal btn-sm" id="u-go">${T("Hochladen","Upload")}</button><button class="btn btn-ghost btn-sm" id="u-x">${T("Abbrechen","Cancel")}</button></div></div>`;
  $("#u-x").onclick=()=>{box.hidden=true};
  $("#u-go").onclick=async()=>{
    const btn=$("#u-go");btn.disabled=true;btn.textContent=T("Lädt hoch …","Uploading …");
    const meta={category:$("#u-cat").value,client:$("#u-client").value.trim(),ref:$("#u-ref").value.trim()};
    let ok=0;for(const f of files){try{const fd=new FormData();fd.append("file",f,f.name);fd.append("category",meta.category);fd.append("client",meta.client);fd.append("ref",meta.ref);const {item}=await API("documents",{method:"POST",body:fd});HQ.docs.push({...item,_id:item.id});ok++}catch(e){toast(errMsg(e)+" – "+f.name)}}
    if(ok)toast(T("Hochgeladen","Uploaded"));renderHQ();
  };
}

function bindHQ(){
  const root=$("#hqRoot");
  bindTeam();
  if(!canW()){$$("#st-sel, #q-amt, #q-due, #q-note",root).forEach(el=>el.disabled=true)}
  $$("[data-tab]",root).forEach(b=>b.onclick=()=>{HQ.tab=b.dataset.tab;HQ.confirm=null;renderHQ();window.scrollTo(0,0)});
  $$("[data-filter]",root).forEach(b=>b.onclick=()=>{HQ.filter=b.dataset.filter;HQ.sel=null;renderHQ()});
  $$("[data-open]",root).forEach(b=>b.onclick=()=>{HQ.sel=b.dataset.open;HQ.tab="requests";HQ.confirm=null;renderHQ();if(innerWidth<960)$(".inbox .panel:last-child")?.scrollIntoView({behavior:"smooth"})});
  $$("[data-appt]",root).forEach(b=>b.onclick=e=>{e.stopPropagation();apptModal(HQ.appts.find(a=>a._id===b.dataset.appt))});
  $$("[data-day]",root).forEach(d=>d.onclick=()=>{if(canW())apptModal({date:d.dataset.day})});
  $$("[data-month]",root).forEach(b=>b.onclick=()=>{const n=+b.dataset.month;HQ.month=n===0?new Date(new Date().getFullYear(),new Date().getMonth(),1):new Date(HQ.month.getFullYear(),HQ.month.getMonth()+n,1);renderHQ()});
  $$("[data-act=newAppt]",root).forEach(b=>b.onclick=()=>apptModal({date:todayStr()}));
  const dq=$("#docQ");if(dq){dq.oninput=()=>{HQ.docQ=dq.value;const pos=dq.selectionStart;renderHQ();const n=$("#docQ");n.focus();n.setSelectionRange(pos,pos)}}
  const du=$("#docUp");if(du)du.onchange=()=>{const fs=[...du.files];if(fs.length)uploadMeta(fs)};
  $$("[data-askdoc]",root).forEach(b=>b.onclick=()=>{HQ.confirm="doc:"+b.dataset.askdoc;renderHQ()});
  $$("[data-deldoc]",root).forEach(b=>b.onclick=async()=>{const d=HQ.docs.find(x=>x._id===b.dataset.deldoc);if(!d)return;try{await API("documents/"+d._id,{method:"DELETE"});HQ.docs=HQ.docs.filter(x=>x._id!==d._id);toast(T("Dokument gelöscht","Document deleted"))}catch(e){toast(errMsg(e))}HQ.confirm=null;renderHQ()});
  const r=HQ.reqs[HQ.sel];
  if(HQ.tab==="requests"&&r){
    const body=$("#rp-body"),subj=$("#rp-subj"),ml=$("#mailLink");
    const syncMail=()=>{ml.href=`mailto:${encodeURIComponent(r.email)}?subject=${encodeURIComponent(subj.value)}&body=${encodeURIComponent(body.value)}`};
    if(!body.value){body.value=template(r.status==="new"?"quote":r.kind==="interpreting"&&r.status==="accepted"?"appt":"quote",r)}
    syncMail();body.oninput=syncMail;subj.oninput=syncMail;
    $$("[data-tpl]",root).forEach(b=>b.onclick=()=>{body.value=template(b.dataset.tpl,r);body.dataset.tpl=b.dataset.tpl;syncMail()});
    $("#st-sel").onchange=async e=>{const s=e.target.value;await updReq(r,{status:s,log:{title:T("Status: ","Status: ")+stName(s)}});toast(T("Status aktualisiert","Status updated"))};
    $("[data-act=saveMeta]").onclick=async()=>{const ok=await updReq(r,{quote:$("#q-amt").value,dueDate:$("#q-due").value,note:$("#q-note").value});ok&&toast(T("Gespeichert","Saved"))};
    $("[data-act=copyReply]").onclick=()=>copy(body.value);
    $("[data-act=logReply]").onclick=async()=>{const tpl=body.dataset.tpl||"";const next=tpl==="quote"&&r.status==="new"?"quoted":tpl==="decline"?"declined":tpl==="ready"?"done":r.status;
      const ok=await updReq(r,{status:next,log:{title:T("Antwort gesendet: ","Reply sent: ")+subj.value,text:body.value}});ok&&toast(T("Antwort vermerkt","Reply logged"))};
    $("[data-act=apptFromReq]").onclick=()=>apptModal({title:`${lab(KINDS,r.kind)} – ${r.name}`,type:r.setting||(r.kind==="translation"?"deadline":"other"),date:r.date||r.dueDate||r.deadline||todayStr(),start:r.time||"",location:r.place||"",client:[r.name,r.company].filter(Boolean).join(" · "),ref:r.caseno||r.ref});
    $("[data-act=askDel]")&&($("[data-act=askDel]").onclick=()=>{HQ.confirm="del:"+r._key;renderHQ()});
    $("[data-act=cancelConfirm]")&&($("[data-act=cancelConfirm]").onclick=()=>{HQ.confirm=null;renderHQ()});
    $("[data-act=delReq]")&&($("[data-act=delReq]").onclick=async()=>{try{await API("requests/"+encodeURIComponent(r.ref),{method:"DELETE"});delete HQ.reqs[r.ref];HQ.sel=null;HQ.confirm=null;toast(T("Anfrage gelöscht","Request deleted"));renderHQ()}catch(e){toast(errMsg(e))}});
  }
}

/* ================= ACCOUNTS ================= */
function authHTML(){
  if(HQ.apiDown)return `<div class="acct"><h2>${T("HQ ist offline","HQ is offline")}</h2><p class="muted">${T("Der HQ-Server antwortet nicht. HQ funktioniert nur, wenn die Seite auf Netlify läuft.","The HQ server isn’t responding. HQ only works when the site runs on Netlify.")}</p></div>`;
  const signup=HQ.authMode==="signup";const left=HQ.slotsLeft??0;
  return `<form class="acct" id="authForm" novalidate>
   <div class="filters" style="padding:0;border:0"><button type="button" class="fbtn" data-mode="login" aria-pressed="${!signup}">${T("Anmelden","Sign in")}</button><button type="button" class="fbtn" data-mode="signup" aria-pressed="${signup}">${T("Konto erstellen","Create account")}</button></div>
   ${signup&&left>0?`<span class="badge-owner">${T("Inhaber-Konto","Owner account")} ${3-left}/2</span>`:""}
   <h2>${signup?T("Konto erstellen","Create your account"):T("Willkommen zurück","Welcome back")}</h2>
   ${signup?`<p class="muted">${left>0?T("Die ersten zwei Konten in Polyglotis HQ werden Inhaber-Konten mit allen Rechten. Alle weiteren Konten gibt eine Inhaberin oder ein Inhaber frei.","The first two accounts in Polyglotis HQ become owner accounts with full rights. Every account after that is approved by an owner."):T("Nach dem Erstellen gibt eine Inhaberin oder ein Inhaber Ihr Konto frei.","After you create it, an owner approves your account.")}</p>
   <div class="fld"><label for="s-name">${T("Vollständiger Name","Full name")} *</label><input class="inp" id="s-name" autocomplete="name" required></div>`:""}
   <div class="fld"><label for="s-email">E-Mail *</label><input class="inp" type="email" id="s-email" autocomplete="email" required></div>
   ${signup?`<div class="fld"><label for="s-phone">${T("Telefon","Phone")} <i>${T("(optional)","(optional)")}</i></label><input class="inp" type="tel" id="s-phone" autocomplete="tel"></div>`:""}
   <div class="fld"><label for="s-pw">${T("Passwort","Password")} *${signup?` <i>${T("(mind. 8 Zeichen)","(min. 8 characters)")}</i>`:""}</label><input class="inp" type="password" id="s-pw" autocomplete="${signup?"new-password":"current-password"}" required></div>
   <p class="err-msg" id="s-err" hidden></p>
   <button class="btn btn-seal" type="submit" id="s-go" style="justify-self:start">${signup?T("Konto erstellen","Create account"):T("Anmelden","Sign in")}${ICON.arrow}</button>
   ${signup?"":`<p class="small muted">${T("Passwort vergessen? Eine Inhaberin oder ein Inhaber kann es unter „Team & Konten“ zurücksetzen.","Forgot your password? An owner can reset it under “Team & accounts”.")}</p>`}
  </form>`;
}
function bindAuth(){
  $$("[data-mode]").forEach(b=>b.onclick=()=>{HQ.authMode=b.dataset.mode;renderHQ()});
  const f=$("#authForm");if(!f)return;
  f.onsubmit=async e=>{e.preventDefault();
    const signup=HQ.authMode==="signup",err=$("#s-err"),btn=$("#s-go");err.hidden=true;
    const body={email:$("#s-email").value.trim(),password:$("#s-pw").value};
    if(signup){body.name=$("#s-name").value.trim();body.phone=$("#s-phone").value.trim()}
    btn.disabled=true;btn.style.opacity=.6;
    try{const {user}=await API(signup?"signup":"login",{method:"POST",body});HQ.me=user;
      if(signup)toast(user.role==="owner"?T("Inhaber-Konto erstellt","Owner account created"):T("Konto erstellt – wartet auf Freigabe","Account created, awaiting approval"));
      if(user.role!=="pending")await loadHQ();renderHQ();
    }catch(x){err.textContent=errMsg(x);err.hidden=false;btn.disabled=false;btn.style.opacity=1}
  };
}
function bindLogout(){$$("[data-act=logout]").forEach(b=>b.onclick=async()=>{try{await API("logout",{method:"POST"})}catch(e){}HQ.me=null;HQ.reqs={};HQ.appts=[];HQ.docs=[];HQ.accounts=[];HQ.authMode="login";renderHQ()})}
function vTeam(){
  if(!isOwner())return `<div style="max-width:520px">`+pwPanel()+`</div>`;
  const A=HQ.accounts.slice().sort((a,b)=>(a.role==="owner"?0:a.role==="pending"?1:2)-(b.role==="owner"?0:b.role==="pending"?1:2)||(a.createdAt||"").localeCompare(b.createdAt||""));
  return `<div class="panel"><div class="panel-h"><h3>${T("Team & Konten","Team & accounts")}</h3><span class="small muted">${T("Neue Personen erstellen ihr Konto selbst unter Polyglotis HQ. Sie geben es hier frei.","New people create their own account under Polyglotis HQ. You approve them here.")}</span></div>
   ${HQ.tempPw?`<div class="panel-b"><p class="notice info">${T("Temporäres Passwort für","Temporary password for")} <b>${esc(HQ.tempPw.name)}</b>: <span class="mono" style="user-select:all">${esc(HQ.tempPw.pw)}</span> – ${T("bitte sicher weitergeben. Es wird nur jetzt angezeigt.","share it securely. It is shown only now.")}</p></div>`:""}
   <div class="table-wrap"><table class="tbl"><thead><tr><th>${T("Name","Name")}</th><th>E-Mail</th><th>${T("Rolle","Role")}</th><th>${T("Seit","Since")}</th><th></th></tr></thead><tbody>
   ${A.map(a=>{const self=a._id===HQ.me.id;const locked=a.role==="owner";return `<tr><td><b>${esc(a.name)}</b>${self?` <span class="small muted">(${T("Sie","you")})</span>`:""}${a.phone?`<br><span class="small muted mono">${esc(a.phone)}</span>`:""}</td><td class="mono small" style="overflow-wrap:anywhere">${esc(a.email)}</td>
    <td>${locked?`<span class="pill st-owner">${esc(lab(ROLES,"owner"))}</span>`:`<select class="inp" style="padding:.35em .5em;width:auto" data-role="${esc(a._id)}">${["pending","staff","viewer"].map(r=>`<option value="${r}"${a.role===r?" selected":""}>${esc(lab(ROLES,r))}</option>`).join("")}</select>`}</td>
    <td class="small">${fmtDate(a.createdAt)}</td>
    <td class="right" style="white-space:nowrap">${locked?"":`<button class="fbtn" data-resetpw="${esc(a._id)}">${T("Passwort zurücksetzen","Reset password")}</button> `+(HQ.confirm==="acct:"+a._id?`<button class="fbtn" style="color:var(--seal)" data-rmacct="${esc(a._id)}">${T("Endgültig entfernen","Remove for good")}</button>`:`<button class="fbtn" data-askacct="${esc(a._id)}">${T("Entfernen","Remove")}</button>`)}</td></tr>`}).join("")}
   </tbody></table></div>
   <div class="panel-b" style="display:grid;gap:14px"><p class="small muted"><b>${T("Rollen","Roles")}:</b> ${T("Inhaber/in – alle Rechte, inkl. Löschen und Team. Mitarbeiter/in – Anfragen, Termine und Dokumente bearbeiten. Nur lesen – alles sehen, nichts ändern.","Owner: full rights, including deleting and team. Staff: work on requests, appointments and documents. Read only: see everything, change nothing.")}</p></div></div>
   <div style="max-width:520px;margin-top:14px">${pwPanel()}</div>`;
}
function pwPanel(){return `<div class="panel"><div class="panel-h"><h3>${T("Mein Passwort ändern","Change my password")}</h3></div><form class="panel-b" id="pwForm" style="display:grid;gap:10px">
    <div class="fld"><label for="pw-cur">${T("Aktuelles Passwort","Current password")}</label><input class="inp" type="password" id="pw-cur" autocomplete="current-password"></div>
    <div class="fld"><label for="pw-new">${T("Neues Passwort (mind. 8 Zeichen)","New password (min. 8 characters)")}</label><input class="inp" type="password" id="pw-new" autocomplete="new-password"></div>
    <button class="btn btn-ghost btn-sm" style="justify-self:start">${T("Passwort ändern","Change password")}</button></form></div>`}
function bindTeam(){
  bindLogout();
  $$("[data-role]").forEach(sel=>sel.onchange=async()=>{try{await API("accounts/"+sel.dataset.role,{method:"PATCH",body:{role:sel.value}});const a=HQ.accounts.find(x=>x._id===sel.dataset.role);if(a)a.role=sel.value;toast(T("Rolle aktualisiert","Role updated"));renderHQ()}catch(e){toast(errMsg(e))}});
  $$("[data-askacct]").forEach(b=>b.onclick=()=>{HQ.confirm="acct:"+b.dataset.askacct;renderHQ()});
  $$("[data-rmacct]").forEach(b=>b.onclick=async()=>{try{await API("accounts/"+b.dataset.rmacct,{method:"DELETE"});HQ.accounts=HQ.accounts.filter(x=>x._id!==b.dataset.rmacct);toast(T("Konto entfernt","Account removed"))}catch(e){toast(errMsg(e))}HQ.confirm=null;renderHQ()});
  $$("[data-resetpw]").forEach(b=>b.onclick=async()=>{try{const {tempPassword}=await API("accounts/"+b.dataset.resetpw+"/reset",{method:"POST"});HQ.tempPw={name:HQ.accounts.find(x=>x._id===b.dataset.resetpw)?.name||"",pw:tempPassword};renderHQ()}catch(e){toast(errMsg(e))}});
  const pf=$("#pwForm");if(pf)pf.onsubmit=async e=>{e.preventDefault();try{await API("password",{method:"POST",body:{current:$("#pw-cur").value,next:$("#pw-new").value}});toast(T("Passwort geändert","Password changed"));pf.reset()}catch(x){toast(errMsg(x))}};
}

/* ================= BOOT ================= */
mountForm();
applyLang();
route();
art();
document.fonts&&document.fonts.ready.then(art);
})();
