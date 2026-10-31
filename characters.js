(() => {
  const art = document.querySelector('.character-art');
  art.setAttribute('role','group');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const svgNS = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs) => {
    const el = document.createElementNS(svgNS, tag);
    for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
    return el;
  };
  art.querySelectorAll(':scope > :not(title)').forEach(el => el.remove());
  art.setAttribute('viewBox', '-8 0 466 410');
  const defs = make('defs', {});
  [['lavender','#b9a1fc','#a68de9'],['mint','#a0e8b2','#86d7a4'],['sun','#ffe766','#ffdb45'],['coral','#ff9474','#ff795b']].forEach(([id,a,b]) => {
    const gradient=make('linearGradient',{id,x1:'0%',y1:'0%',x2:'100%',y2:'100%'});
    gradient.append(make('stop',{offset:'0%','stop-color':a}),make('stop',{offset:'100%','stop-color':b}));
    defs.append(gradient);
  });
  art.append(defs);
  const specs = [
    {x:190,y:91,top:40,fill:'lavender',d:'M115 400 V116 A76 76 0 0 1 267 116 V400 Z',eye:'open'},
    {x:290,y:180,top:116,fill:'mint',d:'M220 400 V210 C220 158 253 116 297 116 C340 116 365 151 365 204 V400 Z',eye:'wink'},
    {x:365,y:270,top:212,fill:'sun',d:'M294 400 V291 C294 247 326 212 370 212 C414 212 450 246 450 291 V400 Z',eye:'dots'},
    {x:128,y:310,top:240,fill:'coral',d:'M0 400 C-2 311 66 240 146 240 C227 240 295 310 295 400 Z',eye:'closed'}
  ];
  const characters = specs.map((s,i) => {
    const group=make('g',{class:`friend friend-${i}`});
    const body=make('path',{d:s.d,fill:`url(#${s.fill})`});
    const ears=make('g',{class:i===0?'ears typing-accents':'ears'});
    if(i===0) {
      ears.append(make('path',{d:'M108 71 L90 72 M114 54 L99 43 M129 44 L124 26',stroke:'#b199f5','stroke-width':8,'stroke-linecap':'round'}));
    }
    group.append(ears,body);
    const face=make('g',{class:'face'});
    const eyes=make('g',{class:'shy-eye regular-eyes'});
    [-24,24].forEach((dx,j) => {
      const x=s.x+dx,y=s.y+(j? -5:0);
      if(s.eye==='closed') {
        eyes.append(make('path',{d:`M${x-10} ${y+3} Q${x} ${y-13} ${x+10} ${y+1}`,stroke:'#191e1c','stroke-width':6,'stroke-linecap':'round',fill:'none'}));
      } else if(s.eye==='dots') {
        eyes.append(make('circle',{cx:x,cy:y,r:6.5,fill:'#191e1c',class:'pupil'}));
      } else {
        const eye=make('g',{class:i===1&&j===1?'wink-open':'open-eye'});
        eye.append(make('circle',{cx:x,cy:y,r:10,fill:'white'}),make('ellipse',{cx:x+3,cy:y+2,rx:5.8,ry:7,fill:'#191e1c',class:'pupil'}));
        eyes.append(eye);
        if(i===1&&j===1) eyes.append(make('path',{d:`M${x-10} ${y+3} Q${x} ${y-13} ${x+10} ${y+1}`,stroke:'#191e1c','stroke-width':6,'stroke-linecap':'round',fill:'none',class:'wink-closed'}));
      }
    });
    face.append(eyes);
    const closedEyes=make('g',{class:'privacy-eyes'});
    [-24,24].forEach(dx=>closedEyes.append(make('path',{d:`M${s.x+dx-7} ${s.y} Q${s.x+dx} ${s.y+5} ${s.x+dx+7} ${s.y}`,stroke:'#191e1c','stroke-width':3.5,'stroke-linecap':'round',fill:'none'})));
    face.append(closedEyes);
    const my=s.y+20;
    face.append(make('path',{d:`M${s.x-7} ${my+3} Q${s.x} ${my+5} ${s.x+7} ${my+3}`,stroke:'#191e1c','stroke-width':3.5,'stroke-linecap':'round',fill:'none',class:'privacy-mouth'}));
    const mouth=make('g',{class:'rest-mouth'});
    if(i===1||i===3) {
      mouth.append(make('path',{d:`M${s.x-15} ${my-2} L${s.x+15} ${my-6} Q${s.x+16} ${my+22} ${s.x} ${my+23} Q${s.x-16} ${my+20} ${s.x-15} ${my-2}`,fill:'#181e1b'}));
      mouth.append(make('path',{d:`M${s.x-9} ${my+16} Q${s.x} ${my+6} ${s.x+11} ${my+15} Q${s.x} ${my+32} ${s.x-9} ${my+16}`,fill:'#f24b5b'}));
    } else mouth.append(make('path',{d:`M${s.x-8} ${my} Q${s.x} ${my+12} ${s.x+8} ${my-2}`,stroke:'#191e1c','stroke-width':4.5,'stroke-linecap':'round',fill:'none'}));
    face.append(mouth);
    face.append(make('path',{d:`M${s.x-9} ${my} Q${s.x} ${my+15} ${s.x+9} ${my}`,stroke:'#191e1c','stroke-width':4.5,'stroke-linecap':'round',fill:'none',class:'happy-mouth'}));
    face.append(make('path',{d:i===2?`M${s.x-10} ${my} Q${s.x-3} ${my+6} ${s.x+3} ${my} T${s.x+15} ${my}`:`M${s.x-8} ${my+4} Q${s.x} ${my-6} ${s.x+8} ${my+4}`,stroke:'#191e1c','stroke-width':3.5,'stroke-linecap':'round',fill:'none',class:'sad-mouth'}));
    const worried=make('g',{class:'error-eyes'});
    [-23,23].forEach(dx=>worried.append(make('circle',{cx:s.x+dx,cy:s.y,r:5,fill:'#191e1c'})));
    face.append(worried);
    if(i===0) face.append(make('ellipse',{cx:s.x,cy:my+2,rx:3,ry:9,fill:'#191e1c',class:'surprise-mouth'}));
    const jumpMouth=make('g',{class:'jump-mouth'});
    if(i===0) jumpMouth.append(make('ellipse',{cx:s.x,cy:my+3,rx:7,ry:10,fill:'#191e1c'}));
    if(i===1) jumpMouth.append(make('path',{d:`M${s.x-13} ${my} Q${s.x} ${my+22} ${s.x+13} ${my} Z`,fill:'#191e1c'}));
    if(i===2) jumpMouth.append(make('path',{d:`M${s.x-9} ${my} Q${s.x} ${my+13} ${s.x+9} ${my-2}`,stroke:'#191e1c','stroke-width':4,'stroke-linecap':'round',fill:'none'}));
    if(i<3) face.append(jumpMouth);
    const jumpBrows=make('g',{class:'jump-brows',stroke:'#191e1c','stroke-width':3.5,'stroke-linecap':'round',fill:'none'});
    if(i===0) jumpBrows.append(make('path',{d:`M${s.x-31} ${s.y-17} Q${s.x-24} ${s.y-24} ${s.x-17} ${s.y-18} M${s.x+17} ${s.y-22} Q${s.x+24} ${s.y-28} ${s.x+31} ${s.y-21}`}));
    if(i===2) jumpBrows.append(make('path',{d:`M${s.x-32} ${s.y-16} Q${s.x-24} ${s.y-23} ${s.x-17} ${s.y-17} M${s.x+17} ${s.y-18} Q${s.x+24} ${s.y-25} ${s.x+32} ${s.y-20}`}));
    if(i<3) face.append(jumpBrows);
    const mouths={};
    for(const name of ['rest','happy','sad','privacy','surprise','jump']) {
      const node=face.querySelector(`.${name}-mouth`);
      if(node) {node.setAttribute('data-mouth',name);mouths[name]=node;}
    }
    const faceFollow=make('g',{});
    faceFollow.append(face);
    group.append(faceFollow); art.append(group);
    const breathing=make('g',{class:'breathing'});
    breathing.style.transformOrigin=`${i===3?147.5:s.x}px 400px`;
    breathing.style.setProperty('--breath-duration',`${3.6+i*.45}s`);
    breathing.style.setProperty('--breath-delay',`${-i*.8}s`);
    [...group.children].forEach(child=>breathing.append(child));
    const entrance=make('g',{class:'entrance'});
    entrance.style.transformOrigin=`${i===3?147.5:s.x}px 400px`;
    entrance.style.setProperty('--entrance-delay',`${i===3?420:i*120}ms`);
    const roll=make('g',{class:i===3?'coral-roll':''});
    roll.style.transformOrigin='147.5px 252.5px';
    roll.append(breathing);
    entrance.append(roll);
    group.append(entrance);
    group.classList.add('arriving');
    if(reduced.matches) {
      group.classList.remove('arriving');
      entrance.classList.remove('entrance');
    }
    entrance.addEventListener('animationend',event=>{
      if(event.target!==entrance) return;
      group.classList.remove('arriving');
      entrance.classList.remove('entrance');
      roll.classList.remove('coral-roll');
      setMode(resting());
    });
    if(i===3) {
      if(reduced.matches) roll.classList.remove('coral-roll');
      else {
        const start=performance.now()+420;
        const ball='M0 252.5 C0 171 66 105 147.5 105 C229 105 295 171 295 252.5 C295 334 229 400 147.5 400 C66 400 0 334 0 252.5 Z';
        const rest='M0 400 C-2 311 66 240 146 240 C227 240 295 310 295 400 C221 400 74 400 0 400 C0 400 0 400 0 400 Z';
        const nums=d=>d.match(/-?\d*\.?\d+/g).map(Number);
        const from=nums(ball),to=nums(rest);
        function rolling(now) {
          const t=Math.max(0,Math.min(1,(now-start)/1900));
          if(t>=1||reduced.matches) {body.setAttribute('d',s.d);faceFollow.removeAttribute('transform');return;}
          const u=Math.max(0,Math.min(1,(t-.64)/.24));
          const ease=u*u*(3-2*u);
          let j=0;
          body.setAttribute('d',ball.replace(/-?\d*\.?\d+/g,()=>String(from[j]+(to[j]-from[j++])*ease)));
          faceFollow.setAttribute('transform',`translate(0 ${-57.5*(1-ease)})`);
          requestAnimationFrame(rolling);
        }
        requestAnimationFrame(rolling);
      }
    }
    if(i<3 && !reduced.matches) {
      const start=performance.now()+i*120;
      const samples=[[0,0],[.10,-22],[.24,12],[.43,-18],[.61,8],[.78,-14],[.89,5],[1,0]];
      const direction=i===0?1:-1;
      const left=[115,220,294][i],right=[267,365,450][i];
      const top=s.top, radius=(right-left)/2, center=(left+right)/2, cy=top+radius, knee=(cy+400)/2;
      function flex(now) {
        const t=Math.max(0,Math.min(1,(now-start)/1700));
        if(t>=1 || reduced.matches) {body.setAttribute('d',s.d);faceFollow.removeAttribute('transform');return;}
        let k=1;
        while(k<samples.length-1 && samples[k][0]<t) k++;
        const [ta,a]=samples[k-1], [tb,b]=samples[k];
        const u=(t-ta)/(tb-ta),ease=u*u*(3-2*u);
        const bend=(a+(b-a)*ease)*direction;
        // Curve both sides around a lagging middle, keeping the feet together.
        const shift=bend*1.2,mid=-bend*.55;
        body.setAttribute('d',`M${left} 400 C${left+mid} ${knee+40} ${left+mid} ${knee} ${left+shift} ${cy} C${left+shift} ${top-radius*.33} ${right+shift} ${top-radius*.33} ${right+shift} ${cy} C${right+mid} ${knee} ${right+mid} ${knee+40} ${right} 400 Z`);
        faceFollow.setAttribute('transform',`translate(${shift} 0) rotate(${bend*.12} ${center} ${cy})`);
        requestAnimationFrame(flex);
      }
      requestAnimationFrame(flex);
    }
    group.style.transformOrigin=`${i===3?147.5:s.x}px 400px`;
    ears.style.transformOrigin=`${s.x}px ${s.top}px`;
    return {...s,group,body,face,ears,mouths,pupils:[...face.querySelectorAll('.pupil')]};
  });
  let mode = 'idle', reactionTimer, peekTimer, peekEnd, frame;
  let pointer = {x:innerWidth/2, y:innerHeight/2};
  let watching=null, watchEnd, celebrationEnd;
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const visible = () => passwordInput.type === 'text';
  const clickReactions=['stretch','wink','wiggle','bounce'];
  const clickLabels=['Lavender: stretch','Mint: wink','Yellow: wiggle','Coral: bounce'];
  characters.forEach((character,index) => {
    const {group}=character;
    group.setAttribute('role','button');
    group.setAttribute('tabindex','0');
    group.setAttribute('aria-label',clickLabels[index]);
    let clickEnd;
    const play=() => {
      clearTimeout(clickEnd);
      group.removeAttribute('data-reaction');
      void group.getBoundingClientRect();
      group.setAttribute('data-reaction',clickReactions[index]);
      clearTimeout(watchEnd);
      watching=index;
      look();
      watchEnd=setTimeout(()=>{watching=null;look();},1200);
      clickEnd=setTimeout(() => group.removeAttribute('data-reaction'),index===3?1200:950);
    };
    group.addEventListener('click',play);
    group.addEventListener('keydown',event => {
      if(event.key==='Enter'||event.key===' ') {event.preventDefault();play();}
    });
    window.addEventListener('pagehide',() => clearTimeout(clickEnd));
  });
  for (const input of [emailInput,passwordInput]) {
    input.addEventListener('focus', () => art.classList.add('is-typing'));
    input.addEventListener('blur', () => art.classList.remove('is-typing'));
  }
  function look() {
    frame = null;
    const rect = art.getBoundingClientRect();
    characters.forEach((c, i) => {
      const cx = rect.left + (c.x+8) / 466 * rect.width;
      const cy = rect.top + c.y / 410 * rect.height;
      let dx = pointer?Math.max(-1, Math.min(1, (pointer.x-cx)/220)):0;
      let dy = pointer?Math.max(-1, Math.min(1, (pointer.y-cy)/180)):0;
      if(watching!==null && watching!==i) {
        dx=Math.max(-1,Math.min(1,(characters[watching].x-c.x)/100));
        dy=Math.max(-1,Math.min(1,(characters[watching].y-c.y)/140));
      }
      if (mode === 'away') { dx = -1; dy = -.7; }
      if (mode === 'peek' && i !== 1) { dx = -1; dy = -.7; }
      if (mode === 'peek' && i === 1) { dx = 1; dy = .25; }
      const unhappy = mode==='shake' || mode==='error';
      if (unhappy) { dx=.2; dy=.3; }
      c.face.style.transform = `translate(${dx*(i===3?22:16)}px, ${dy*9}px)`;
      if (unhappy) c.face.style.transform = i===0?'translate(18px, 8px)':'translate(0px, 4px)';
      c.pupils.forEach(p => p.style.transform = `translate(${dx*2.5}px, ${dy*1.5}px)`);
      c.ears.style.transform = `rotate(${dx*12}deg) scaleY(${1+dy*.15})`;
      c.group.style.setProperty('--lean', `${dx*1.5}deg`);
      c.group.style.setProperty('--bend', `${-dx*(i===0?10:i===1?7:i===2?6:2)}deg`);
      c.group.style.setProperty('--stretch', `${1-dy*(i===0?.045:.02)}`);
      if (i===0 && !c.group.classList.contains('arriving')) {
        c.body.setAttribute('d', unhappy
          ? 'M115 400 L94 210 L120 104 C131 62 177 32 219 48 C260 62 279 105 264 148 L251 210 L280 400 Z'
          : c.d);
      }
    });
  }
  function setMode(next) {
    if (visible() && next!=='peek') next='away';
    mode = next;
    art.dataset.mood = next;
    characters.forEach(c=>{
      let expression='rest';
      if(['away','peek'].includes(next)) expression='privacy';
      else if(['error','shake'].includes(next)) expression='sad';
      else if(['happy','nod','confident','success','shy'].includes(next)) expression='happy';
      if(c.mouths.jump && c.group.classList.contains('arriving') && !visible() && !hasError()) expression='jump';
      const y=c.y+20;
      // Change one opaque curve rather than layering two translucent mouths.
      const curve=next==='shy'?Math.min(passwordInput.value.length/6,1)*15:15;
      c.mouths.happy.setAttribute('d',`M${c.x-9} ${y} Q${c.x} ${y+curve} ${c.x+9} ${y}`);
      for(const [name,node] of Object.entries(c.mouths)) node.toggleAttribute('data-active',name===expression);
    });
    look();
  }
  function resting() {
    if (visible()) return 'away';
    if (hasError()) return 'error';
    return document.activeElement === passwordInput ? (passwordInput.value.length>=6?'confident':'shy') : document.activeElement === emailInput ? 'happy' : 'idle';
  }
  let agreementTimer;
  function scheduleAgreement() {
    clearTimeout(agreementTimer);
    agreementTimer=setTimeout(() => {
      if(document.activeElement!==emailInput) return;
      if(!document.hidden && !visible() && !hasError() && !reduced.matches && mode!=='nod') react('nod',850);
      scheduleAgreement();
    },3000+Math.random()*1800);
  }
  emailInput.addEventListener('focus',scheduleAgreement);
  emailInput.addEventListener('blur',() => clearTimeout(agreementTimer));
  window.addEventListener('pagehide',() => clearTimeout(agreementTimer));
  function hasError() {
    return [emailInput,passwordInput].some(input => input.getAttribute('aria-invalid')==='true');
  }
  function react(next, duration=800) {
    clearTimeout(reactionTimer);
    // Re-trigger the nod or shake on consecutive interactions.
    art.dataset.mood = '';
    void art.getBoundingClientRect();
    setMode(next);
    reactionTimer = setTimeout(() => setMode(resting()), duration);
  }
  document.addEventListener('pointermove', event => {
    pointer = {x:event.clientX, y:event.clientY};
    if (!frame && !reduced.matches) frame = requestAnimationFrame(look);
  }, {passive:true});
  document.addEventListener('pointerleave', () => {
    pointer = null;
    look();
  });
  function releaseTouch(event) {
    if(event.pointerType==='touch') { pointer=null; look(); }
  }
  document.addEventListener('pointerdown',event=>{
    if(event.pointerType==='touch') {pointer={x:event.clientX,y:event.clientY};look();}
  },{passive:true});
  document.addEventListener('pointerup',releaseTouch,{passive:true});
  document.addEventListener('pointercancel',releaseTouch,{passive:true});
  emailInput.addEventListener('focus', () => { if (hasError()) setMode('error'); else if (!visible()) setMode('happy'); });
  let emailTypingUntil=0;
  emailInput.addEventListener('input', () => {
    const now=performance.now();
    const startsNewBurst=now>=emailTypingUntil;
    emailTypingUntil=now+1100;
    if (hasError()) setMode('error');
    else if (!visible() && startsNewBurst) react('nod');
  });
  passwordInput.addEventListener('focus', () => setMode(resting()));
  const progress=document.createElement('p');
  progress.id='password-progress';
  progress.className='password-progress';
  progress.setAttribute('role','status');
  progress.hidden=true;
  passwordInput.closest('.field').after(progress);
  passwordInput.setAttribute('aria-describedby',`${passwordInput.getAttribute('aria-describedby')} password-progress`);
  function updateProgress() {
    const length=passwordInput.value.length;
    const focused=document.activeElement===passwordInput;
    progress.hidden=!focused || length===0;
    progress.textContent=length>=6?'Demo password requirement met.':`At least 6 characters · ${Math.min(length,6)}/6`;
    art.style.setProperty('--confidence',String(Math.min(length/6,1)));
  }
  passwordInput.addEventListener('focus',updateProgress);
  passwordInput.addEventListener('blur',updateProgress);
  passwordInput.addEventListener('input', () => {
    updateProgress();
    if (hasError()) setMode('error'); else setMode(resting());
  });
  for (const input of [emailInput, passwordInput]) input.addEventListener('blur', () => {
    if (!['shake','nod'].includes(mode)) setMode(resting());
  });
  function schedulePeek() {
    clearTimeout(peekTimer);
    peekTimer = setTimeout(() => {
      if (!visible() || document.hidden || reduced.matches) return;
      characters[1].group.classList.remove('winking','blinking');
      setMode('peek');
      peekEnd = setTimeout(() => { if (visible()) { setMode('away'); schedulePeek(); } }, 700);
    }, 2100 + Math.random()*1800);
  }
  document.querySelector('#toggle-password').addEventListener('click', () => {
    clearTimeout(reactionTimer); clearTimeout(peekTimer); clearTimeout(peekEnd);
    setMode(resting());
    if (visible()) schedulePeek();
  });
  document.querySelector('#signin-form').addEventListener('submit', () => {
    if (emailInput.getAttribute('aria-invalid') === 'true' || passwordInput.getAttribute('aria-invalid') === 'true') react('shake', 850);
    else if (!visible()) react('nod', 1100);
  });
  document.querySelector('#signin-form').addEventListener('demo-login-success',()=>{
    clearTimeout(reactionTimer);clearTimeout(celebrationEnd);
    characters.forEach(c=>c.group.removeAttribute('data-reaction'));
    art.classList.remove('celebrating');void art.getBoundingClientRect();
    art.classList.add('celebrating');
    setMode('success');updateProgress();
    celebrationEnd=setTimeout(()=>{art.classList.remove('celebrating');setMode(resting());},1400);
  });
  document.addEventListener('visibilitychange', () => {
    clearTimeout(peekTimer); clearTimeout(peekEnd);
    if (!document.hidden && visible()) { setMode('away'); schedulePeek(); }
  });
  reduced.addEventListener('change', () => { clearTimeout(peekTimer); if (!reduced.matches && visible()) schedulePeek(); setMode(resting()); });
  // Independent blinks make the group feel alive between interactions.
  let blinkTimer;
  function blink() {
    blinkTimer = setTimeout(() => {
      if (!document.hidden && !reduced.matches && !['away','peek','shake'].includes(mode)) {
        const friend = characters[Math.floor(Math.random()*characters.length)].group;
        friend.classList.add('blinking');
        setTimeout(() => friend.classList.remove('blinking'), 150);
      }
      blink();
    }, 1800 + Math.random()*2600);
  }
  blink();
  let winkTimer, winkEnd;
  function scheduleWink() {
    winkTimer=setTimeout(() => {
      if(!document.hidden && !reduced.matches && ['idle','happy','nod'].includes(mode)) {
        characters[1].group.classList.add('winking');
        winkEnd=setTimeout(() => characters[1].group.classList.remove('winking'),450);
      }
      scheduleWink();
    }, 3200+Math.random()*4000);
  }
  scheduleWink();
  window.addEventListener('pagehide', () => {clearTimeout(winkTimer);clearTimeout(winkEnd);});
  window.addEventListener('pagehide', () => {clearTimeout(blinkTimer);clearTimeout(peekTimer);clearTimeout(peekEnd);clearTimeout(reactionTimer);});
  window.addEventListener('pagehide',()=>{clearTimeout(watchEnd);clearTimeout(celebrationEnd);});
  setMode('idle');
})();



