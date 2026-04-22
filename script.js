/* ═══════════════════════════════════════════════════════
   ULFA KHAIRINA — PORTFOLIO 
═══════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────
   1. LOADER
──────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initCounters();
  }, 1800);
});
document.body.style.overflow = 'hidden';


/* ────────────────────────────────────────────────────
   2. CUSTOM CURSOR
──────────────────────────────────────────────────── */
(function() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animTrail() {
    tx += (mx - tx) * 0.10;
    ty += (my - ty) * 0.10;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  const hoverSel = 'a, button, .sk-card, .flip-card, .soc-tile, .gal-slide, .sp-dot';
  document.querySelectorAll(hoverSel).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '18px';
      cursor.style.height = '18px';
      trail.style.transform = 'translate(-50%,-50%) scale(1.6)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '10px';
      cursor.style.height = '10px';
      trail.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });
})();


/* ────────────────────────────────────────────────────
   3. NAVBAR
──────────────────────────────────────────────────── */
(function() {
  const nav   = document.getElementById('navbar');
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    links.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      ham.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();


/* ────────────────────────────────────────────────────
   4. ACTIVE NAV + SCROLL PROGRESS DOTS
──────────────────────────────────────────────────── */
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const spDots   = document.querySelectorAll('.sp-dot');

  function update() {
    const sp = window.scrollY + 160;
    let current = '';
    sections.forEach(s => { if (sp >= s.offsetTop) current = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));
    spDots.forEach(d => d.classList.toggle('active', d.dataset.section === current));
  }

  window.addEventListener('scroll', update, { passive: true });

  spDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();



/* ────────────────────────────────────────────────────
   6. SCROLL REVEAL
──────────────────────────────────────────────────── */
(function() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.classList.contains('sk-card')) {
          const bar = e.target.querySelector('.sk-bar div');
          if (bar) {
            setTimeout(() => {
              const w = bar.style.getPropertyValue('--w') ||
                        getComputedStyle(bar).getPropertyValue('--w') || '60%';
              bar.style.width = w;
            }, 80);
          }
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal-fade,.reveal-left,.reveal-right,.reveal-stagger')
    .forEach(el => obs.observe(el));
})();


/* ────────────────────────────────────────────────────
   7. COUNTER ANIMATION
──────────────────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('.hstat-n[data-target]').forEach(el => {
    const target = +el.dataset.target;
    let current  = 0;
    const step   = target / 40;
    const timer  = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target; clearInterval(timer); return; }
      el.textContent = Math.floor(current);
    }, 35);
  });
}


/* ────────────────────────────────────────────────────
   8. SKILLS TABS
──────────────────────────────────────────────────── */
(function() {
  const tabs   = document.querySelectorAll('.stab');
  const panels = document.querySelectorAll('.skill-panel');
  const map    = { fe:'panel-fe', be:'panel-be', tl:'panel-tl' };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById(map[tab.dataset.target]);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.sk-card').forEach((card, i) => {
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 60 + i * 60);
        });
      }
    });
  });
})();


/* ────────────────────────────────────────────────────
   9. CANVAS PARTICLE — hero background
──────────────────────────────────────────────────── */
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 50; i++) {
    particles.push({
      x:  Math.random() * 1200,
      y:  Math.random() * 900,
      r:  Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o:  Math.random() * 0.25 + 0.05
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const col = '234,224,200';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${col},${p.o})`;
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${col},${(1-dist/120)*0.06})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();


/* ────────────────────────────────────────────────────
   10. MAGNETIC BUTTONS
──────────────────────────────────────────────────── */
(function() {
  if (window.matchMedia('(max-width:768px)').matches) return;
  document.querySelectorAll('.mag-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width  / 2) * 0.25;
      const y = (e.clientY - r.top  - r.height / 2) * 0.25;
      btn.style.transform = `translate(${x}px,${y}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();


/* ────────────────────────────────────────────────────
   11. FLIP PROJECT CARDS
──────────────────────────────────────────────────── */
(function() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
})();


/* ────────────────────────────────────────────────────
   12. GALLERY SLIDER
──────────────────────────────────────────────────── */
(function() {
  const slider   = document.getElementById('gallerySlider');
  const prevBtn  = document.getElementById('galPrev');
  const nextBtn  = document.getElementById('galNext');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.gal-slide'));
  const GAP    = 16;
  let current  = 0;

  function getW(idx) {
    const r = slides[idx].getBoundingClientRect();
    return r.width > 0 ? r.width : (slides[idx].classList.contains('landscape') ? 420 : 200);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, slides.length - 1));
    let offset = 0;
    for (let i = 0; i < current; i++) offset += getW(i) + GAP;
    slider.style.transform = `translateX(-${offset}px)`;
    dotsWrap.querySelectorAll('.gal-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch swipe
  let startX = 0;
  slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goTo(current + 1) : goTo(current - 1);
  });
})();


/* ────────────────────────────────────────────────────
   13. LIGHTBOX
──────────────────────────────────────────────────── */
(function() {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbBack    = document.getElementById('lbBackdrop');
  if (!lightbox) return;

  const slides = Array.from(document.querySelectorAll('.gal-slide'));
  let current  = 0;

  function open(idx) {
    current = ((idx % slides.length) + slides.length) % slides.length;
    const slide  = slides[current];
    const img    = slide.querySelector('img');
    if (!img) return;
    lbImg.src          = img.src;
    lbCaption.textContent = slide.dataset.caption || '';
    lbCounter.textContent = (current + 1) + ' / ' + slides.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  slides.forEach((s, i) => s.addEventListener('click', () => open(i)));
  lbClose.addEventListener('click', close);
  lbBack.addEventListener('click',  close);
  lbPrev.addEventListener('click',  e => { e.stopPropagation(); open(current - 1); });
  lbNext.addEventListener('click',  e => { e.stopPropagation(); open(current + 1); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   open(current - 1);
    if (e.key === 'ArrowRight')  open(current + 1);
  });
})();


/* ────────────────────────────────────────────────────
   CONTACT FORM (PHP SUBMIT)
──────────────────────────────────────────────────── */
(function() {
  const form    = document.getElementById('cform');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    const btn = form.querySelector('button[type="submit"]');

    btn.innerHTML = 'Sending...';
    btn.disabled = true;

    fetch('send.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(res => {
      if (res === "success") {
        form.reset();
        success.classList.add('show');
      }
      btn.innerHTML = 'Send Message';
      btn.disabled = false;
    });
  });
})();

setTimeout(() => {
  loadMessages(); // reload pesan setelah kirim
}, 500);

/* ────────────────────────────────────────────────────
   15. SMOOTH SCROLL
──────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ────────────────────────────────────────────────────
   GALLERY MARQUEE DUPLICATE
──────────────────────────────────────────────────── */
(function() {
  const slider = document.getElementById('gallerySlider');
  if (!slider) return;

  slider.innerHTML += slider.innerHTML;
})();

/* ────────────────────────────────────────────────────
   16. LOAD MESSAGES (REALTIME DISPLAY)
──────────────────────────────────────────────────── */
function loadMessages() {
  fetch('get_messages.php')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('messagesContainer');
      container.innerHTML = '';

      data.forEach(msg => {
        container.innerHTML += `
          <div class="msg-card">
            <h4>${msg.name}</h4>
            <p>${msg.message}</p>
            <small>${msg.created_at}</small>
          </div>
        `;
      });
    });
}

loadMessages();