// Kishor Kumar Portfolio — extracted inline scripts; original order preserved.
/* ===== Original inline script 1 ===== */
(()=>{
 const intro=document.getElementById('cyber-welcome'); if(!intro)return;
 const status=document.getElementById('welcomeStatus'); const enter=document.getElementById('welcomeEnter');
 document.body.classList.add('welcome-locked');
 const lines=['INITIALIZING SECURITY SYSTEM...','LOADING THREAT INTELLIGENCE...','ALL SYSTEMS READY.'];
 let i=0; const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(status&&!reduced){const interval=window.setInterval(()=>{i++;if(i<lines.length)status.textContent=lines[i];else window.clearInterval(interval)},850)} else if(status) status.textContent='ALL SYSTEMS READY.';
 let closed=false;function closeIntro(){if(closed)return;closed=true;intro.classList.add('is-leaving');document.body.classList.remove('welcome-locked');window.setTimeout(()=>{intro.remove();document.dispatchEvent(new Event('portfolio:welcome-closed'));window.scrollTo({top:0,behavior:'smooth'});},850)}
 // Keep the welcome screen visible until the visitor explicitly clicks ENTER PORTFOLIO.
 if(enter)enter.addEventListener('click',closeIntro);
})();

/* ===== Original inline script 2 ===== */
(()=>{
 const canvas=document.getElementById('binary-rain-background');
 if(!canvas)return;
 const ctx=canvas.getContext('2d'); if(!ctx)return;
 const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let width=0,height=0,dpr=1,columns=0,drops=[];
 const fontSize=14;
 function resize(){
  dpr=Math.min(window.devicePixelRatio||1,2);width=window.innerWidth;height=window.innerHeight;
  canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);
  canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
  columns=Math.ceil(width/fontSize);drops=Array.from({length:columns},()=>Math.random()*-height/fontSize);
 }
 function draw(){
  ctx.fillStyle='rgba(8,6,8,0.10)';ctx.fillRect(0,0,width,height);
  ctx.font=fontSize+'px monospace';
  for(let i=0;i<drops.length;i++){
   const bit=Math.random()>.5?'0':'1';
   const y=drops[i]*fontSize;
   ctx.fillStyle=Math.random()>.94?'rgba(255,95,115,0.82)':'rgba(255,42,70,0.48)';
   ctx.fillText(bit,i*fontSize,y);
   if(y>height && Math.random()>.975)drops[i]=Math.random()*-20;
   drops[i]+=reduce?0.12:0.42+Math.random()*0.42;
  }
  if(!reduce)requestAnimationFrame(draw);
 }
 resize();
 if(reduce){ctx.clearRect(0,0,width,height);for(let i=0;i<drops.length;i++){ctx.fillStyle='rgba(255,42,70,0.25)';ctx.font=fontSize+'px monospace';ctx.fillText(Math.random()>.5?'0':'1',i*fontSize,Math.random()*height)}}
 else draw();
 window.addEventListener('resize',resize,{passive:true});
 if(!reduce)window.addEventListener('resize',()=>{ctx.clearRect(0,0,width,height)},{passive:true});
})();

/* ===== Original inline script 3 ===== */
(() => {
  const cursor = document.getElementById('cyber-key-cursor');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nativeCursorTargets = 'input, textarea, select, button, [contenteditable="true"], .theme-swatch';
  if (!cursor || !finePointer.matches || reducedMotion.matches) return;

  document.body.classList.add('cyber-key-cursor');
  let currentX = -100, currentY = -100, targetX = -100, targetY = -100;
  let frame = 0;
  const move = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    const target = event.target instanceof Element ? event.target : null;
    const useNative = target && target.closest(nativeCursorTargets);
    cursor.classList.toggle('is-active', !useNative);
    cursor.style.opacity = useNative ? '0' : '';
    if (!frame) frame = requestAnimationFrame(animate);
  };
  const animate = () => {
    currentX += (targetX - currentX) * .34;
    currentY += (targetY - currentY) * .34;
    cursor.style.transform = `translate3d(${currentX - 8}px,${currentY - 8}px,0) rotate(-24deg)`;
    if (Math.abs(targetX-currentX) > .2 || Math.abs(targetY-currentY) > .2) frame = requestAnimationFrame(animate);
    else frame = 0;
  };
  document.addEventListener('pointermove', move, {passive:true});
  document.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'), {passive:true});
  document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), {passive:true});
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
  finePointer.addEventListener?.('change', e => { if (!e.matches) { cursor.style.display='none'; document.body.classList.remove('cyber-key-cursor'); } });

  // Smooth, restrained 3D tilt and pointer-following crimson glow for toolkit cards.
  const cards = document.querySelectorAll('#skills .tool-logo');
  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--tool-tilt-x', `${(0.5-y)*7}deg`);
      card.style.setProperty('--tool-tilt-y', `${(x-0.5)*8}deg`);
      card.style.setProperty('--tool-pointer-x', `${x*100}%`);
      card.style.setProperty('--tool-pointer-y', `${y*100}%`);
    });
    const reset = () => {
      card.style.setProperty('--tool-tilt-x','0deg');
      card.style.setProperty('--tool-tilt-y','0deg');
      card.style.setProperty('--tool-pointer-x','50%');
      card.style.setProperty('--tool-pointer-y','50%');
    };
    card.addEventListener('pointerleave', reset);
    card.addEventListener('blur', reset);
  });

  // About section shield: subtle pointer tilt on fine-pointer devices only.
  const aboutVisual = document.querySelector('.about-visual');
  const aboutShield = document.querySelector('.about-shield-stage');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (aboutVisual && aboutShield && hasFinePointer && !prefersReducedMotion) {
    aboutVisual.addEventListener('pointermove', (event) => {
      const rect = aboutVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      aboutShield.style.transform = `translateY(-3px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg)`;
    });
    aboutVisual.addEventListener('pointerleave', () => { aboutShield.style.transform = ''; });
  }

})();

/* ===== Original inline script 4 ===== */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Current year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Skill category filters
  const filterButtons = [...document.querySelectorAll('.skill-filter-btn')];
  const skillCards = [...document.querySelectorAll('.skill-card3d')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';
    filterButtons.forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    skillCards.forEach((card, index) => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-filtered-out', !show);
      if (show && !reduceMotion) {
        card.animate(
          [{opacity: 0, transform: 'translateY(14px) scale(.98)'}, {opacity: 1, transform: 'translateY(0) scale(1)'}],
          {duration: 320, delay: Math.min(index * 35, 180), easing: 'cubic-bezier(.2,.8,.2,1)'}
        );
      }
    });
  }));

  // Mouse-follow 3D tilt for skill and project cards; disable on touch/reduced motion
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.skill-card3d, .project-card, .project-card3d, .project').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 8}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`);
        card.style.setProperty('--pointer-x', `${x * 100}%`);
        card.style.setProperty('--pointer-y', `${y * 100}%`);
        card.classList.add('is-tilting');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
        card.classList.remove('is-tilting');
      });
    });
  }

  // Reveal sections as they enter the viewport
  const revealItems = document.querySelectorAll('.reveal, .section-head, .project-card, .project-card3d');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), {threshold: 0.12});
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('is-visible'));
  }

  // Project gallery category filters
  const projectFilterButtons = [...document.querySelectorAll('[data-project-filter]')];
  const projectCards = [...document.querySelectorAll('[data-project-category]')];
  projectFilterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.projectFilter || 'all';
    projectFilterButtons.forEach(b => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach((card, index) => {
      const show = filter === 'all' || card.dataset.projectCategory === filter;
      card.classList.toggle('is-hidden', !show);
      if (show && !reduceMotion) card.animate(
        [{opacity: 0, transform: 'translateY(16px) scale(.98)'}, {opacity: 1, transform: 'translateY(0) scale(1)'}],
        {duration: 380, delay: index * 55, easing: 'cubic-bezier(.2,.8,.2,1)'}
      );
    });
  }));

  // Theme dock
  const themes = {
    blue:   {blue:'#55c7ff', cyan:'#7df9e5', glow:'rgba(65,177,255,.22)'},
    purple: {blue:'#b59aff', cyan:'#e0b7ff', glow:'rgba(155,105,255,.23)'},
    red:    {blue:'#ff344f', cyan:'#ff8792', glow:'rgba(255,35,65,.24)'},
    green:  {blue:'#5ef0b2', cyan:'#b5ff79', glow:'rgba(55,240,170,.20)'}
  };
  document.querySelectorAll('.theme-swatch').forEach(button => button.addEventListener('click', () => {
    const theme = themes[button.dataset.theme];
    if (!theme) return;
    document.documentElement.style.setProperty('--blue', theme.blue);
    document.documentElement.style.setProperty('--cyan', theme.cyan);
    document.documentElement.style.setProperty('--glow', theme.glow);
    document.querySelectorAll('.theme-swatch').forEach(b => {
      const active = b === button;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('selected', active);
    });
  }));


  // Interactive sample SOC alert detail panel
  const incidentDetail = document.getElementById('incidentDetail');
  const alertDescriptions = {
    failed: {title:'Repeated login failures · Sample incident', body:'Evidence to check: Windows authentication events, username, source IP, timestamps and whether the activity is expected.', next:'NEXT ACTION: CORRELATE EVENTS AND VERIFY USER CONTEXT'},
    powershell: {title:'PowerShell process · Sample incident', body:'Review process command line, parent process, execution path, user context and related Sysmon Event ID 1 records. PowerShell use can be legitimate; validate context.', next:'NEXT ACTION: REVIEW PROCESS TREE AND COMMAND-LINE CONTEXT'},
    url: {title:'Suspicious URL · Sample incident', body:'Check the full URL, domain age or reputation where available, redirect behaviour and VirusTotal report context. Avoid opening unknown URLs directly.', next:'NEXT ACTION: VALIDATE INDICATORS AND DOCUMENT SOURCES'},
    sysmon: {title:'Process creation event · Sample incident', body:'Review the process image, parent image, timestamp, user and nearby events. A process-creation event alone is telemetry, not a confirmed threat.', next:'NEXT ACTION: CORRELATE WITH OTHER ENDPOINT EVENTS'}
  };
  document.querySelectorAll('[data-alert]').forEach(row => row.addEventListener('click', () => {
    document.querySelectorAll('[data-alert]').forEach(r => r.classList.toggle('selected', r === row));
    const item = alertDescriptions[row.dataset.alert];
    if (item && incidentDetail) incidentDetail.innerHTML = `<strong>${item.title}</strong><p>${item.body}</p><span class="soc-panel-sub">${item.next}</span>`;
  }));

  // Scroll progress bar
  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  // Animated cyber grid canvas with drag-to-rotate interaction
  const canvas = document.getElementById('scene');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let w=0,h=0,dpr=1, dragging=false, lastX=0,lastY=0, rotX=-0.18,rotY=0, velX=0,velY=0;
    const nodes=[];
    const resize=()=>{
      dpr=Math.min(window.devicePixelRatio||1,2); w=window.innerWidth; h=window.innerHeight;
      canvas.width=Math.round(w*dpr); canvas.height=Math.round(h*dpr);
      canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(dpr,0,0,dpr,0,0);
      nodes.length=0;
      const cols=Math.max(9,Math.floor(w/85)), rows=Math.max(6,Math.floor(h/80));
      for(let y=0;y<=rows;y++) for(let x=0;x<=cols;x++) nodes.push({x:(x/cols-.5)*2.4,y:(y/rows-.5)*1.7,z:Math.sin(x*.7+y*.4)*.18});
    };
    const render=()=>{
      ctx.clearRect(0,0,w,h);
      if(!dragging){rotY+=velY;rotX+=velX;velY*=.94;velX*=.94;if(Math.abs(velX)<.0001)velX=0;if(Math.abs(velY)<.0001)velY=0;}
      const cols=Math.max(9,Math.floor(w/85)), rows=Math.max(6,Math.floor(h/80));
      const points=nodes.map(n=>{
        let x=n.x*Math.cos(rotY)-n.z*Math.sin(rotY), z=n.x*Math.sin(rotY)+n.z*Math.cos(rotY);
        let y=n.y*Math.cos(rotX)-z*Math.sin(rotX); z=n.y*Math.sin(rotX)+z*Math.cos(rotX);
        const scale=380/(380+z*140);
        return {x:w/2+x* Math.min(w*.48,650)*scale,y:h/2+y*Math.min(h*.65,500)*scale,z};
      });
      ctx.lineWidth=.65;
      for(let r=0;r<=rows;r++) for(let c=0;c<=cols;c++){
        const i=r*(cols+1)+c, p=points[i];
        if(c<cols){const q=points[i+1];ctx.strokeStyle='rgba(75,190,255,.20)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        if(r<rows){const q=points[i+cols+1];ctx.strokeStyle='rgba(75,190,255,.16)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
        if((r+c)%4===0){ctx.fillStyle='rgba(125,249,229,.42)';ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill();}
      }
      if(!reduceMotion) requestAnimationFrame(render);
    };
    resize(); window.addEventListener('resize',resize);
    if(!reduceMotion) requestAnimationFrame(render); else render();
    canvas.style.pointerEvents='auto'; canvas.style.cursor='grab';
    canvas.addEventListener('pointerdown',e=>{dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture?.(e.pointerId);canvas.style.cursor='grabbing';});
    canvas.addEventListener('pointermove',e=>{if(!dragging)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;rotY+=dx*.006;rotX+=dy*.004;velY=dx*.0008;velX=dy*.0005;lastX=e.clientX;lastY=e.clientY;});
    const endDrag=()=>{dragging=false;canvas.style.cursor='grab';};
    canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
  }
})();

/* ===== Original inline script 5 ===== */
(() => {
  const tools = [...document.querySelectorAll('#skills .tool-logo[role="button"]')];
  const toggleTool = (tool) => {
    const opening = !tool.classList.contains('is-unlocked');
    tools.forEach(item => {
      item.classList.toggle('is-unlocked', item === tool && opening);
      item.setAttribute('aria-expanded', String(item === tool && opening));
    });
  };
  tools.forEach(tool => {
    tool.addEventListener('click', () => toggleTool(tool));
    tool.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleTool(tool);
      }
    });
  });
})();

/* ===== Original inline script 6 ===== */
(()=>{const card=document.getElementById('heroProfileCard');if(!card)return;
 if(!matchMedia('(hover: hover) and (pointer: fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const host=card.parentElement;
 host.addEventListener('pointermove',e=>{const r=host.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--ry',(x*22).toFixed(1)+'deg');card.style.setProperty('--rx',(-y*16).toFixed(1)+'deg')});
 host.addEventListener('pointerleave',()=>{card.style.setProperty('--ry','-8deg');card.style.setProperty('--rx','0deg')});
})();

/* ===== Original inline script 7 ===== */
(() => {
 const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

 /* ================= PROJECT CASE FILES ================= */
 const PROJECTS = [
  {file:'case_01_phishing_url_detection', cls:'CASE FILE 01 / THREAT INTELLIGENCE',
   mission:'A Streamlit tool that helps an analyst review suspicious URLs quickly: it checks URL indicators and looks up existing VirusTotal reports, with bulk CSV support for larger batches.',
   steps:['Enter a single URL or upload a CSV of URLs for bulk review.','Check URL indicators such as HTTPS use, domain details and URL length.','Look up the existing VirusTotal report for reputation context.','Review the results in the app and download them for the investigation notes.'],
   skills:['Python scripting','API integration','Threat-intelligence lookups','Bulk CSV processing','Result export'],
   note:'Indicators and reputation data speed up triage, but a score is a lead to validate, not a final verdict.'},
  {file:'case_02_windows_process_detector', cls:'CASE FILE 02 / ENDPOINT SECURITY',
   mission:'A Python investigation helper that reviews running Windows processes, their file paths and parent-process details, then flags items worth a closer look using a simple risk classification.',
   steps:['List running processes with their PID and executable path.','Review the parent process to understand how each one was started.','Apply a simple risk classification to highlight unusual items.','Flag results for further analysis by the analyst.'],
   skills:['Process analysis','Parent / child process review','File path checks','Risk classification','Investigation mindset'],
   note:'A flag means "investigate", not "malicious". Legitimate software can look unusual, so context decides the outcome.'},
  {file:'case_03_endpoint_monitoring_lab', cls:'CASE FILE 03 / BLUE TEAM LAB',
   mission:'A practice lab for collecting and reviewing Windows telemetry with Sysmon and Wazuh, exploring process-creation events and learning how alerts support an investigation.',
   steps:['Collect Windows endpoint telemetry with Sysmon.','Review events and alerts in the Wazuh SIEM.','Explore process-creation events and the context around them.','Relate observed behaviour to MITRE ATT&CK to practise triage.'],
   skills:['Windows telemetry','Log and event review','Alert triage','Process-creation events','MITRE ATT&CK mapping'],
   note:'This is a learning lab. The dashboard figures drawn in the project illustration are mock-up values, not real incident data.'}
 ];
 const cards = [...document.querySelectorAll('.project[data-project-category]')];
 const ov = document.getElementById('caseFile');
 if (ov && cards.length) {
  const win = ov.querySelector('.cf-window');
  const el = id => document.getElementById(id);
  const uid = () => 'x' + Math.random().toString(36).slice(2, 7);
  let current = -1, opener = null, typeTimer = 0, readyTimer = 0;
  const visibleIdx = () => cards.map((c, i) => c.classList.contains('is-hidden') ? -1 : i).filter(i => i >= 0);

  cards.forEach((card, i) => {
   const title = card.querySelector('h3').textContent.trim();
   const githubByProjectIndex = {
    0: 'https://github.com/kishorsharan895-hash/Automatic-Phising-url-Detection',
    2: 'https://github.com/kishorsharan895-hash/Mini-SOC-Lab-Wazuh-Sysmon'
   };
   const githubUrl = githubByProjectIndex[i];
   card.setAttribute('role', githubUrl ? 'link' : 'button');
   card.setAttribute('tabindex', '0');
   card.setAttribute('aria-label', githubUrl ? 'Open ' + title + ' source code on GitHub in a new tab' : 'Open case file: ' + title);
   const hint = document.createElement('div'); hint.className = 'project-open-hint';
   hint.innerHTML = githubUrl ? '<i></i>OPEN ON GITHUB ↗' : '<i></i>OPEN CASE FILE';
   const tagsEl = card.querySelector('.tags'); if (tagsEl) tagsEl.after(hint);
   card.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    if (githubUrl) { window.open(githubUrl, '_blank', 'noopener,noreferrer'); return; }
    open(i, card);
   });
   card.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === card) {
     e.preventDefault();
     if (githubUrl) { window.open(githubUrl, '_blank', 'noopener,noreferrer'); return; }
     open(i, card);
    }
   });
   if (githubUrl) {
    const projectLink = card.querySelector('.project-link');
    if (projectLink) { projectLink.href = githubUrl; projectLink.textContent = 'Open project source code ↗'; }
   }
  });

  function typeInto(node, text, done) {
   clearInterval(typeTimer);
   if (reduce) { node.textContent = text; done && done(); return; }
   let n = 0; node.textContent = '';
   typeTimer = setInterval(() => { n++; node.textContent = text.slice(0, n); if (n >= text.length) { clearInterval(typeTimer); done && done(); } }, 22);
  }
  function fill(i) {
   const d = PROJECTS[i], card = cards[i];
   el('cfClass').textContent = d.cls;
   el('cfTitle').textContent = card.querySelector('h3').textContent.trim();
   el('cfMission').textContent = d.mission;
   el('cfSteps').innerHTML = d.steps.map(s => '<li><span>' + s + '</span></li>').join('');
   el('cfSkills').innerHTML = d.skills.map(s => '<span>' + s + '</span>').join('');
   el('cfTools').innerHTML = [...card.querySelectorAll('.tags .tag')].map(t => '<span>' + t.textContent + '</span>').join('');
   el('cfNote').textContent = d.note;
   const link = card.querySelector('.project-link'); el('cfLink').href = link ? link.href : '#';
   el('cfPath').textContent = '~/projects/' + d.file;
   const svg = card.querySelector('.project-art svg');
   if (svg) {
    let html = svg.outerHTML; const ids = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
    ids.forEach(id => { const nid = id + '-' + uid(); html = html.split('id="' + id + '"').join('id="' + nid + '"').split('url(#' + id + ')').join('url(#' + nid + ')'); });
    el('cfArt').innerHTML = html;
   }
   const vis = visibleIdx(), pos = vis.indexOf(i);
   el('cfPrev').disabled = pos <= 0; el('cfNext').disabled = pos === vis.length - 1;
   el('cfCounter').textContent = 'FILE ' + String(pos + 1).padStart(2, '0') + ' / ' + String(vis.length).padStart(2, '0');
   ov.classList.remove('is-ready'); void ov.offsetWidth;
   const boot = el('cfBoot'); clearTimeout(readyTimer);
   typeInto(boot, '$ open ' + d.file + ' --decrypt', () => {
    boot.innerHTML = '$ open ' + d.file + ' --decrypt &nbsp; <b>[ ACCESS GRANTED ]</b>';
    ov.classList.add('is-ready');
   });
   if (reduce) ov.classList.add('is-ready');
   ov.querySelector('.cf-scroll').scrollTop = 0;
  }
  function open(i, from) {
   opener = from || opener; current = i;
   ov.hidden = false; document.body.classList.add('cf-lock');
   fill(i);
   requestAnimationFrame(() => requestAnimationFrame(() => { ov.classList.add('is-open'); win.focus({preventScroll: true}); }));
  }
  function close() {
   if (ov.hidden) return;
   clearInterval(typeTimer);
   ov.classList.remove('is-open', 'is-ready');
   setTimeout(() => { ov.hidden = true; document.body.classList.remove('cf-lock'); opener && opener.focus({preventScroll: true}); }, reduce ? 0 : 320);
  }
  function step(dir) {
   const vis = visibleIdx(), pos = vis.indexOf(current), next = vis[pos + dir];
   if (next === undefined) return; current = next; opener = cards[next]; fill(next);
  }
  ov.addEventListener('click', e => { if (e.target.closest('[data-cf-close]')) close(); });
  el('cfPrev').addEventListener('click', () => step(-1));
  el('cfNext').addEventListener('click', () => step(1));
  document.addEventListener('keydown', e => {
   if (ov.hidden) return;
   if (e.key === 'Escape') { e.preventDefault(); close(); }
   else if (e.key === 'ArrowRight') step(1);
   else if (e.key === 'ArrowLeft') step(-1);
   else if (e.key === 'Tab') {
    const f = [...ov.querySelectorAll('a[href],button:not([disabled])')].filter(n => n.offsetParent !== null);
    if (!f.length) return; const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === win)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
   }
  });
 }

 /* ================= SKILL SPHERE ================= */
 const SKILLS = [{"id": "wazuh", "name": "Wazuh", "sub": "SIEM · Alert Monitoring", "detail": "Used in my lab to review security alerts and monitor endpoint events.", "cat": "monitor", "status": "LAB PRACTICE", "rel": ["Endpoint Monitoring Lab"], "svg": "<path d=\"M32 5 53 13v16c0 14-9 23-21 30C20 52 11 43 11 29V13Z\"/><path d=\"m21 31 7 7 15-17\"/>"}, {"id": "sysmon", "name": "Sysmon", "sub": "Windows Telemetry", "detail": "Windows process and event telemetry used during endpoint investigations.", "cat": "monitor", "status": "LAB PRACTICE", "rel": ["Endpoint Monitoring Lab"], "svg": "<rect x=\"7\" y=\"10\" width=\"50\" height=\"42\" rx=\"5\"/><path d=\"m17 25 8 7-8 7M31 39h14\"/>"}, {"id": "virustotal", "name": "VirusTotal", "sub": "Threat Intelligence", "detail": "Checks URL reputation and supports threat-intelligence context in my phishing detection project.", "cat": "intel", "status": "USED IN PROJECT", "rel": ["Automated Phishing URL Detection"], "svg": "<circle cx=\"27\" cy=\"27\" r=\"17\"/><path d=\"m40 40 14 14M19 27h16M27 19v16\"/>"}, {"id": "splunk", "name": "Splunk", "sub": "Log Search", "detail": "A tool I am exploring for searching and reviewing machine-generated logs.", "cat": "monitor", "status": "EXPLORING", "rel": [], "svg": "<path d=\"M10 17h44M10 32h44M10 47h44\"/><circle cx=\"21\" cy=\"17\" r=\"4\"/><circle cx=\"42\" cy=\"32\" r=\"4\"/><circle cx=\"29\" cy=\"47\" r=\"4\"/>"}, {"id": "wireshark", "name": "Wireshark", "sub": "Packet Inspection", "detail": "Used for learning packet capture and network-traffic inspection.", "cat": "network", "status": "LEARNING", "rel": [], "svg": "<path d=\"M32 7c-8 13-18 20-18 32a18 18 0 0 0 36 0C50 27 40 20 32 7Z\"/><path d=\"M19 39h10l5-9 5 15 5-6h3\"/>"}, {"id": "nmap", "name": "Nmap", "sub": "Network Discovery", "detail": "Used for host discovery and port-scanning practice in authorised lab environments.", "cat": "network", "status": "LAB PRACTICE", "rel": [], "svg": "<circle cx=\"32\" cy=\"32\" r=\"23\"/><circle cx=\"32\" cy=\"32\" r=\"13\"/><path d=\"M32 9v46M9 32h46M32 32l16-15\"/>"}, {"id": "python", "name": "Python", "sub": "Scripting · Project Work", "detail": "Used in my URL-detection and Windows suspicious-process projects.", "cat": "build", "status": "USED IN PROJECTS", "rel": ["Automated Phishing URL Detection", "Windows Suspicious Process Detector"], "svg": "<path d=\"m23 17-16 15 16 15M41 17l16 15-16 15M36 9 28 55\"/>"}, {"id": "endpoint", "name": "Endpoint Monitoring", "sub": "Windows · Event Review", "detail": "Reviewing endpoint events, process activity and Windows telemetry in lab scenarios.", "cat": "monitor", "status": "LAB PRACTICE", "rel": ["Endpoint Monitoring Lab", "Windows Suspicious Process Detector"], "svg": "<rect x=\"8\" y=\"9\" width=\"48\" height=\"34\" rx=\"4\"/><path d=\"M22 54h20M32 43v11M17 19h10v9H17zM34 20h13M34 27h13M17 35h30\"/>"}, {"id": "threat", "name": "Threat Investigation", "sub": "Indicators · Evidence", "detail": "Correlating available indicators and event context before documenting a finding.", "cat": "intel", "status": "PRACTICE", "rel": [], "svg": "<circle cx=\"28\" cy=\"27\" r=\"17\"/><path d=\"m41 40 14 14M20 27h16M28 19v16M20 19l16 16M36 19 20 35\"/>"}, {"id": "cloud", "name": "Cloud Security", "sub": "Security Fundamentals", "detail": "An area of focus: understanding cloud access, configuration and security fundamentals.", "cat": "build", "status": "LEARNING FOCUS", "rel": [], "svg": "<path d=\"M18 47h30a11 11 0 0 0 1-22 17 17 0 0 0-32-3A13 13 0 0 0 18 47Z\"/><path d=\"M32 29v20m-8-12 8-8 8 8\"/>"}];
 const CATS = {monitor:'MONITOR & DETECT', intel:'INTEL & INVESTIGATE', network:'NETWORK', build:'BUILD & CLOUD'};
 const sphere = document.getElementById('skSphere');
 if (!sphere) return;
 const nodesBox = document.getElementById('skNodes'), linksSvg = document.getElementById('skLinks');
 const quick = document.getElementById('skQuick');
 const $ = id => document.getElementById(id);
 const N = SKILLS.length;
 // Fibonacci sphere points
 const pts = SKILLS.map((s, i) => { const y = 1 - (i + .5) / N * 2, r = Math.sqrt(1 - y * y), a = i * 2.399963; return {x: Math.cos(a) * r, y, z: Math.sin(a) * r}; });
 const nodes = SKILLS.map((s, i) => {
  const b = document.createElement('button'); b.type = 'button'; b.className = 'sk-node'; b.dataset.id = s.id; b.dataset.cat = s.cat;
  b.setAttribute('aria-label', s.name + ' - ' + s.sub);
  b.innerHTML = '<span class="sk-ico"><svg viewBox="0 0 64 64" aria-hidden="true">' + s.svg + '</svg></span><span class="sk-name">' + s.name + '</span>';
  nodesBox.appendChild(b); return b;
 });
 SKILLS.forEach(s => { const q = document.createElement('button'); q.type = 'button'; q.textContent = s.name; q.dataset.id = s.id; q.dataset.cat = s.cat; quick.appendChild(q); });
 // each point links to its 2 nearest neighbours
 const edges = new Set();
 pts.forEach((p, i) => {
  pts.map((q, j) => ({j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2})).filter(o => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 2).forEach(o => edges.add(Math.min(i, o.j) + '-' + Math.max(i, o.j)));
 });
 const edgeList = [...edges].map(k => k.split('-').map(Number));
 const NS = 'http://www.w3.org/2000/svg';
 const lines = edgeList.map(() => { const l = document.createElementNS(NS, 'line'); linksSvg.appendChild(l); return l; });

 let W = 0, H = 0, R = 150, rotY = .6, rotX = -.28, vY = 0, vX = 0, dragging = false, hover = false, visible = true;
 let target = null, filter = 'all', active = -1;
 const size = () => { const r = sphere.getBoundingClientRect(); W = r.width; H = r.height; R = Math.min(W, H) * (W < 420 ? .36 : .37); linksSvg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); };
 const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
 const proj = new Array(N);
 function render() {
  const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
  for (let i = 0; i < N; i++) {
   const p = pts[i], x = p.x * R, y = p.y * R, z = p.z * R;
   const x1 = x * cy + z * sy, z1 = -x * sy + z * cy, y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
   const t = (z2 / R + 1) / 2, sc = .62 + .5 * t, dim = nodes[i].dataset.dim === '1';
   const px = W / 2 + x1, py = H / 2 + y2; proj[i] = {px, py, t, dim};
   const n = nodes[i];
   n.style.transform = 'translate3d(' + (px) + 'px,' + (py) + 'px,0) translate(-50%,-50%) scale(' + sc.toFixed(3) + ')';
   n.style.opacity = ((.32 + .68 * t) * (dim ? .16 : 1)).toFixed(3);
   n.style.zIndex = Math.round(t * 100) + 2;
   n.style.pointerEvents = dim || t < .18 ? 'none' : 'auto';
  }
  edgeList.forEach(([a, b], k) => { const A = proj[a], B = proj[b], l = lines[k]; l.setAttribute('x1', A.px); l.setAttribute('y1', A.py); l.setAttribute('x2', B.px); l.setAttribute('y2', B.py); l.style.opacity = ((A.dim || B.dim) ? .03 : (.12 + .4 * Math.min(A.t, B.t))).toFixed(3); });
 }
 function tick() {
  if (visible) {
   if (target) {
    const dy = angDiff(rotY, target.y), dx = angDiff(rotX, target.x);
    rotY += dy * .14; rotX += dx * .14;
    if (Math.abs(dy) < .002 && Math.abs(dx) < .002) target = null;
   } else if (!dragging) {
    rotY += vY; rotX += vX; vY *= .94; vX *= .94;
    if (!hover && !reduce && !active_lock) rotY += .0032;
    if (!active_lock) rotX += (-.28 - rotX) * .01;
   }
   render();
  }
  requestAnimationFrame(tick);
 }
 let active_lock = false, lockT = 0;
 // drag
 let sx0 = 0, sy0 = 0, lx = 0, ly = 0, moved = false, justDragged = false;
 sphere.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse' && e.button !== 0) return; dragging = true; moved = false; sx0 = lx = e.clientX; sy0 = ly = e.clientY; target = null; });
 window.addEventListener('pointermove', e => {
  if (!dragging) return;
  const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
  if (Math.hypot(e.clientX - sx0, e.clientY - sy0) > 5) moved = true;
  rotY += dx * .008; rotX = Math.max(-1.1, Math.min(1.1, rotX + dy * .006)); vY = dx * .0009; vX = dy * .0006;
 });
 const endDrag = () => { if (!dragging) return; dragging = false; if (moved) { justDragged = true; setTimeout(() => justDragged = false, 60); } };
 window.addEventListener('pointerup', endDrag); window.addEventListener('pointercancel', endDrag);
 sphere.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
 sphere.addEventListener('pointerleave', () => { hover = false; });

 // terminal
 let typeT = 0;
 function typeCmd(text) {
  const out = $('skCmdText'); clearInterval(typeT);
  if (reduce) { out.textContent = text; return; }
  let n = 0; out.textContent = ''; typeT = setInterval(() => { n++; out.textContent = text.slice(0, n); if (n >= text.length) clearInterval(typeT); }, 26);
 }
 function select(i, rotate = true) {
  active = i; const s = SKILLS[i];
  nodes.forEach((n, k) => n.classList.toggle('is-active', k === i));
  [...quick.children].forEach((q, k) => q.classList.toggle('is-active', k === i));
  typeCmd('inspect --node ' + s.id);
  const box = $('skOut'); box.classList.add('is-swapping');
  setTimeout(() => {
   $('skIcon').innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true">' + s.svg + '</svg>';
   $('skName').textContent = s.name;
   $('skCat').textContent = CATS[s.cat]; $('skStatus').textContent = s.status;
   $('skDesc').textContent = s.detail;
   const rel = $('skRelated');
   rel.innerHTML = s.rel.length ? '<span class="sk-rel-label">SEEN IN</span>' + s.rel.map(r => '<a href="#projects">' + r + '</a>').join('') : '';
   box.classList.remove('is-swapping');
  }, reduce ? 0 : 160);
  if (rotate) {
   // render() rotates about Y then X; solve the angles that bring this node to the front.
   const p = pts[i], rho = Math.hypot(p.x, p.z) || 1e-6;
   target = {y: Math.atan2(-p.x, p.z), x: Math.atan2(p.y, rho)};
   active_lock = true; clearTimeout(lockT); lockT = setTimeout(() => { active_lock = false; }, 7000);
   if (reduce) { rotY = target.y; rotX = target.x; target = null; render(); }
  }
 }
 nodes.forEach((n, i) => n.addEventListener('click', () => { if (justDragged) return; select(i); }));
 [...quick.children].forEach((q, i) => q.addEventListener('click', () => select(i)));

 // filters
 const fBtns = [...document.querySelectorAll('[data-sk-filter]')];
 fBtns.forEach(b => b.addEventListener('click', () => {
  filter = b.dataset.skFilter;
  fBtns.forEach(x => { const on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
  let count = 0;
  nodes.forEach(n => { const show = filter === 'all' || n.dataset.cat === filter; n.dataset.dim = show ? '0' : '1'; if (show) count++; });
  [...quick.children].forEach(q => q.classList.toggle('is-dim', !(filter === 'all' || q.dataset.cat === filter)));
  $('skCount').textContent = count + (count === 1 ? ' NODE' : ' NODES');
  const first = SKILLS.findIndex(s => filter === 'all' || s.cat === filter);
  if (filter !== 'all' && first >= 0) select(first);
 }));

 size(); render();
 addEventListener('resize', () => { size(); render(); }, {passive: true});
 if ('IntersectionObserver' in window) new IntersectionObserver(es => { visible = es[0].isIntersecting; }, {threshold: 0}).observe(sphere);
 requestAnimationFrame(tick);
})();

/* ===== Original inline script 8 ===== */
(() => {
 const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const $ = id => document.getElementById(id);
 const photo = $('wmPhoto'), heroImg = document.querySelector('.hp-photo img');
 if (photo && heroImg) photo.src = heroImg.src;

 // portrait details panel
 const fig = $('abFig'), tg = $('abToggle'), tgLab = $('abToggleLabel');
 if (fig && tg) {
  const setOpen = o => { fig.classList.toggle('is-open', o); tg.setAttribute('aria-expanded', String(o)); tgLab.textContent = o ? 'Close' : 'Profile details'; };
  tg.addEventListener('click', () => setOpen(!fig.classList.contains('is-open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && fig.classList.contains('is-open')) { setOpen(false); tg.focus(); } });
 }

 // heading typing
 const typed = $('wmTyped');
 function typeHeading() {
  if (!typed) return; const txt = 'whoami';
  if (reduce) { typed.textContent = txt; return; }
  typed.textContent = ''; let n = 0; const t = setInterval(() => { n++; typed.textContent = txt.slice(0, n); if (n >= txt.length) clearInterval(t); }, 140);
 }

 // terminal
 const CMDS = {
  whoami: {cmd: 'whoami', lines: [
   ['kv', 'USER', 'kishor_kumar_k'], ['kv', 'ROLE', 'Cybersecurity student - Aspiring SOC L1'],
   ['kv', 'BASE', 'Coimbatore, Tamil Nadu, India'], ['kv', 'FOCUS', 'Security monitoring, endpoint investigation, cloud security'],
   ['kv', 'STATUS', 'Open to entry-level cybersecurity roles']]},
  about: {cmd: 'cat about.txt', lines: [
   ['para', 'I am Kishor Kumar K, a cybersecurity engineering student from Coimbatore. My learning combines security operations fundamentals with practical projects using endpoint telemetry, threat-intelligence lookups and cloud security concepts.'],
   ['ok', '[ EOF ]']]},
  strengths: {cmd: 'ls strengths/', lines: [
   ['dir', 'hands-on-approach/', 'Build and test small tools instead of learning theory alone.'],
   ['dir', 'investigation-mindset/', 'Review evidence, validate indicators and avoid jumping to conclusions.'],
   ['dir', 'continuous-learning/', 'Developing knowledge across SOC workflows and cloud security.']]},
  education: {cmd: 'cat education.txt', lines: [
   ['kv', 'DEGREE', 'B.E. - Cybersecurity'], ['kv', 'COLLEGE', 'EASA College of Engineering and Technology'],
   ['para', 'Building foundational knowledge in cybersecurity, networking and computing.'],
   ['kv', 'PRACTISING', 'Endpoint log analysis, SIEM concepts, phishing URL investigation, process analysis, cloud access-control fundamentals']]},
  goal: {cmd: 'cat goal.txt', lines: [
   ['para', 'My current goal is to grow into a cybersecurity role where I can keep learning, investigate alerts methodically and contribute to protecting systems and users.'],
   ['ok', '[ EOF ]']]},
  status: {cmd: 'status --now', lines: [
   ['ok', '[ OK ] Open to entry-level cybersecurity opportunities'], ['ok', '[ OK ] Open to internships'],
   ['ok', '[ OK ] Keen to learn from security teams'], ['link', 'Connect with me', '#contact']]}
 };
 const out = $('wmOut'), cmdEl = $('wmCmd'), btns = [...document.querySelectorAll('[data-wm]')];
 let token = 0;
 const esc = s => s.replace(/[&<>]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'}[c]));
 function lineHTML(l) {
  const [t, a, b] = l;
  if (t === 'kv') return '<div class="wm-line kv"><b>' + esc(a) + '</b><span>' + esc(b) + '</span></div>';
  if (t === 'dir') return '<div class="wm-line dir"><b>' + esc(a) + '</b><span>' + esc(b) + '</span></div>';
  if (t === 'link') return '<div class="wm-line"><span class="dim">&rarr;</span> <a href="' + b + '">' + esc(a) + '</a></div>';
  if (t === 'ok') return '<div class="wm-line ok">' + esc(a) + '</div>';
  return '<div class="wm-line para">' + esc(a) + '</div>';
 }
 function run(key) {
  const c = CMDS[key]; if (!c || !out) return; const my = ++token;
  btns.forEach(b => b.classList.toggle('is-active', b.dataset.wm === key));
  out.innerHTML = '';
  const show = () => {
   if (reduce) { out.innerHTML = c.lines.map(lineHTML).join(''); return; }
   c.lines.forEach((l, i) => setTimeout(() => { if (my === token) out.insertAdjacentHTML('beforeend', lineHTML(l)); }, 130 * i + 80));
  };
  if (reduce) { cmdEl.textContent = c.cmd; show(); return; }
  cmdEl.textContent = ''; let n = 0;
  const t = setInterval(() => { if (my !== token) { clearInterval(t); return; } n++; cmdEl.textContent = c.cmd.slice(0, n); if (n >= c.cmd.length) { clearInterval(t); show(); } }, 38);
 }
 btns.forEach(b => b.addEventListener('click', () => run(b.dataset.wm)));
 const sec = $('about');
 let started = false;
 const start = () => { if (started) return; started = true; typeHeading(); setTimeout(() => run('whoami'), reduce ? 0 : 900); };
 if ('IntersectionObserver' in window && sec) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { start(); o.disconnect(); } }, {threshold: .25}).observe(sec);
 else start();
})();

/* ===== Particle Identity Reveal — both original portraits ===== */
(()=>{
 const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const heroPhoto=document.querySelector('.hp-photo');
 const aboutPhoto=document.querySelector('.ab-photo');
 const photos=[heroPhoto,aboutPhoto].filter(Boolean);
 if(!photos.length)return;
 const intro=document.getElementById('cyber-welcome');
 let heroStarted=false;
 function revealCopy(){
   document.body.classList.remove('identity-pending');
   document.body.classList.add('identity-ready');
 }
 document.body.classList.add('identity-pending');
 function animatePhoto(photo,isHero){
   if(!photo||photo.dataset.particleStarted==='yes')return;
   photo.dataset.particleStarted='yes';
   const img=photo.querySelector('img');
   const canvas=photo.querySelector('.portrait-particle-canvas');
   if(!img||!canvas){if(isHero)revealCopy();return;}
   photo.classList.add('particle-intro');
   if(reduce){photo.classList.add('portrait-revealed');if(isHero)revealCopy();return;}
   const ctx=canvas.getContext('2d',{alpha:true});
   if(!ctx){photo.classList.add('portrait-revealed');if(isHero)revealCopy();return;}
   let raf=0,particles=[],w=0,h=0,start=0,done=false;
   const rand=(a,b)=>a+Math.random()*(b-a);
   function build(){
     const rect=photo.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
     w=Math.max(1,Math.round(rect.width));h=Math.max(1,Math.round(rect.height));
     canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
     canvas.style.width='100%';canvas.style.height='100%';ctx.setTransform(dpr,0,0,dpr,0,0);
     const sample=document.createElement('canvas');sample.width=w;sample.height=h;
     const sc=sample.getContext('2d',{willReadFrequently:true});
     const iw=img.naturalWidth||w,ih=img.naturalHeight||h;
     const scale=Math.max(w/iw,h/ih),sw=iw*scale,sh=ih*scale;
     const objectPos=isHero?.04:0;
     sc.drawImage(img,(w-sw)/2,(h-sh)*objectPos,sw,sh);
     let data;try{data=sc.getImageData(0,0,w,h).data;}catch(e){photo.classList.add('portrait-revealed');if(isHero)revealCopy();return;}
     const targets=[],step=Math.max(4,Math.round(Math.min(w,h)/78));
     for(let y=3;y<h-2;y+=step)for(let x=3;x<w-2;x+=step){
       const i=(y*w+x)*4,r=data[i],g=data[i+1],b=data[i+2],a=data[i+3],lum=.2126*r+.7152*g+.0722*b;
       if(a>30&&(lum>27||Math.random()<.1)&&Math.random()>(lum<42?.42:0))targets.push({x,y,r,g,b,lum});
     }
     for(let i=targets.length-1;i>0;i--){const k=Math.floor(Math.random()*(i+1));[targets[i],targets[k]]=[targets[k],targets[i]];}
     particles=targets.slice(0,Math.min(900,targets.length)).map(p=>({tx:p.x,ty:p.y,x:rand(-w*.2,w*1.2),y:rand(-h*.18,h*1.18),r:p.r,g:p.g,b:p.b,lum:p.lum,size:rand(.8,1.8),phase:rand(0,Math.PI*2)}));
     start=performance.now();done=false;photo.classList.add('particle-running');cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);
   }
   function draw(now){
     if(!photo.isConnected||done)return;
     const elapsed=now-start,progress=Math.min(1,elapsed/2850),ease=1-Math.pow(1-progress,3),t=now*.001;
     ctx.clearRect(0,0,w,h);
     for(const p of particles){const jitter=(1-ease)*16,tx=p.tx+Math.sin(t*2+p.phase)*jitter,ty=p.ty+Math.cos(t*1.7+p.phase)*jitter;p.x+=(tx-p.x)*(.025+ease*.11);p.y+=(ty-p.y)*(.025+ease*.11);}
     const linkDist=Math.max(16,Math.min(w,h)*.082);
     for(let i=0;i<particles.length;i++)for(let k=i+1;k<Math.min(i+11,particles.length);k++){
       const p=particles[i],q=particles[k],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
       if(d<linkDist){ctx.strokeStyle='rgba(255,42,75,'+((1-d/linkDist)*(.1+.3*ease))+')';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
     }
     for(const p of particles){const glow=(.35+.65*Math.sin(t*3+p.phase)**2)*(.5+ease*.5);ctx.beginPath();ctx.fillStyle=`rgba(255,${Math.round(35+p.g*.12)},${Math.round(65+p.b*.2)},${.42+glow*.55})`;ctx.arc(p.x,p.y,p.size*(.75+glow*.45),0,Math.PI*2);ctx.fill();if(glow>.78){ctx.beginPath();ctx.fillStyle='rgba(255,65,95,.18)';ctx.arc(p.x,p.y,p.size*3.5,0,Math.PI*2);ctx.fill();}}
     if(progress>.67){const sy=(progress-.67)/.33*h,grad=ctx.createLinearGradient(0,sy-18,0,sy+18);grad.addColorStop(0,'rgba(255,30,65,0)');grad.addColorStop(.5,'rgba(255,45,75,.4)');grad.addColorStop(1,'rgba(255,30,65,0)');ctx.fillStyle=grad;ctx.fillRect(0,sy-18,w,36);}
     if(progress>=1){done=true;photo.classList.add('portrait-revealed');window.setTimeout(()=>{ctx.clearRect(0,0,w,h);photo.classList.remove('particle-running');if(isHero)revealCopy();},720);return;}
     raf=requestAnimationFrame(draw);
   }
   function begin(){if(img.complete&&img.naturalWidth)build();else img.addEventListener('load',build,{once:true});}
   begin();
   window.addEventListener('resize',()=>{if(!done&&photo.dataset.particleStarted==='yes'){cancelAnimationFrame(raf);build();}},{passive:true});
 }
 function beginHero(){if(heroStarted)return;heroStarted=true;if(heroPhoto)animatePhoto(heroPhoto,true);else revealCopy();}
 if(!intro)beginHero();else document.addEventListener('portfolio:welcome-closed',beginHero,{once:true});
 // The second portrait runs the same effect when it enters view, so both pictures receive the reveal.
 if(aboutPhoto){
   if(reduce)animatePhoto(aboutPhoto,false);
   else if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){animatePhoto(aboutPhoto,false);observer.disconnect();}},{threshold:.25});observer.observe(aboutPhoto);}
   else animatePhoto(aboutPhoto,false);
 }
})();
