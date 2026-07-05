/* =====================================================
   Charlotte Wilson for Princeton ISD — Campaign JS
   Firestore-backed with localStorage fallback
   ===================================================== */

// ── Random Hero Image Rotation ────────────────────────
(function () {
  const HEROES = [
    'hero-stadium.jpg',
    'hero-watertower.jpg',
    'hero-mainstreet.jpg',
    'hero-prairie.jpg',
    'hero-school.jpg',
    'hero-community.jpg',
  ];
  const pick = HEROES[Math.floor(Math.random() * HEROES.length)];
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.style.transition = 'opacity 0.5s ease';
    heroEl.style.opacity = '0';
    const img = new Image();
    img.onload = () => {
      heroEl.style.backgroundImage = `url('${pick}')`;
      heroEl.style.opacity = '1';
    };
    img.onerror = () => { heroEl.style.opacity = '1'; };
    img.src = pick;
  }
})();

// ── Hero Sparkle Engine ───────────────────────────────
(function () {
  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('hero-sparkle');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Colors: maroon, amber-light, white, gold, cream
  const COLORS = [
    'rgba(224,154,72,',   // amber
    'rgba(255,215,80,',   // gold
    'rgba(255,255,255,',  // white
    'rgba(196,124,42,',   // amber-dark
    'rgba(255,240,180,',  // cream-gold
    'rgba(200,160,90,',   // warm gold
  ];

  // Particle shapes
  const SHAPES = ['circle', 'star4', 'star6', 'diamond'];

  const N = 90; // number of particles
  let W, H, particles = [], raf;

  function resize() {
    const hero = document.getElementById('hero');
    W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticle() {
    return {
      x:      rand(0, W),
      y:      rand(0, H),
      r:      rand(1.2, 3.8),         // radius
      color:  COLORS[Math.floor(Math.random() * COLORS.length)],
      shape:  SHAPES[Math.floor(Math.random() * SHAPES.length)],
      alpha:  rand(0.15, 0.75),
      alphaDir: Math.random() > 0.5 ? 1 : -1,
      alphaSpeed: rand(0.003, 0.012),
      vx:     rand(-0.22, 0.22),      // horizontal drift
      vy:     rand(-0.55, -0.12),     // float upward
      rot:    rand(0, Math.PI * 2),
      rotV:   rand(-0.015, 0.015),
      pulseT: rand(0, Math.PI * 2),
    };
  }

  function drawStar(ctx, cx, cy, r, points) {
    const step = Math.PI / points;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? r : r * 0.42;
      const angle  = i * step - Math.PI / 2;
      i === 0
        ? ctx.moveTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle))
        : ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    }
    ctx.closePath();
  }

  function drawDiamond(ctx, cx, cy, r) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - r);
    ctx.lineTo(cx + r * 0.55, cy);
    ctx.lineTo(cx, cy + r);
    ctx.lineTo(cx - r * 0.55, cy);
    ctx.closePath();
  }

  function draw(p) {
    const r = p.r + Math.sin(p.pulseT) * 0.6;
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
    ctx.fillStyle   = p.color + p.alpha + ')';
    ctx.shadowColor = p.color + '0.9)';
    ctx.shadowBlur  = r * 3.5;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);

    switch (p.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'star4':
        drawStar(ctx, 0, 0, r, 4);
        ctx.fill();
        break;
      case 'star6':
        drawStar(ctx, 0, 0, r, 6);
        ctx.fill();
        break;
      case 'diamond':
        drawDiamond(ctx, 0, 0, r * 1.1);
        ctx.fill();
        break;
    }
    ctx.restore();
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      // Move
      p.x += p.vx;
      p.y += p.vy;
      p.rot   += p.rotV;
      p.pulseT += 0.04;

      // Twinkle alpha
      p.alpha += p.alphaSpeed * p.alphaDir;
      if (p.alpha > 0.78 || p.alpha < 0.05) {
        p.alphaDir *= -1;
      }

      // Wrap — when particle drifts off top, reset at bottom
      if (p.y < -10) {
        p.y = H + 10;
        p.x = rand(0, W);
      }
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;

      draw(p);
    });
    raf = requestAnimationFrame(tick);
  }

  function init() {
    resize();
    particles = Array.from({ length: N }, createParticle);
    // Scatter them across the full height initially
    particles.forEach(p => { p.y = rand(0, H); });
    if (raf) cancelAnimationFrame(raf);
    tick();
  }

  window.addEventListener('resize', () => { resize(); });
  // Start once hero is in view or immediately
  document.addEventListener('DOMContentLoaded', init);
  // Pause when tab hidden, resume when visible (perf)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      tick();
    }
  });
})();


// ── Firestore helpers ──────────────────────────────────
function fsAdd(collection, data) {
  if (typeof db !== 'undefined') {
    return db.collection(collection).add(data).catch(err => {
      console.warn('Firestore write failed, localStorage only:', err);
    });
  }
  return Promise.resolve();
}

// ── localStorage helpers ──────────────────────────────
function lsGet(key)    { return JSON.parse(localStorage.getItem(key) || '[]'); }
function lsPush(key, obj) {
  const arr = lsGet(key);
  arr.push(obj);
  localStorage.setItem(key, JSON.stringify(arr));
}

// ───────────────────────────────────────────────────────
// SCROLL: Nav + reveal animations
// ───────────────────────────────────────────────────────
const nav      = document.getElementById('main-nav');
const revealEls = document.querySelectorAll('.reveal');

const scrollHandler = () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', scrollHandler, { passive: true });
window.addEventListener('load', scrollHandler);

// ───────────────────────────────────────────────────────
// MOBILE NAV TOGGLE
// ───────────────────────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ───────────────────────────────────────────────────────
// ANIMATED COUNTERS
// ───────────────────────────────────────────────────────
const counters = document.querySelectorAll('.stat-num[data-target]');
let countersStarted = false;

const startCounters = () => {
  if (countersStarted || !counters.length) return;
  const rect = counters[0].getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    counters.forEach(counter => {
      const target   = parseInt(counter.dataset.target, 10);
      const duration = 1800;
      const step     = Math.ceil(target / (duration / 16));
      let current    = 0;
      const tick = () => {
        current = Math.min(current + step, target);
        counter.textContent = current.toLocaleString();
        if (current < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
};
window.addEventListener('scroll', startCounters, { passive: true });
window.addEventListener('load', startCounters);

// ───────────────────────────────────────────────────────
// ELECTION ALERT FORM
// ───────────────────────────────────────────────────────
const alertForm    = document.getElementById('alert-form');
const alertSuccess = document.getElementById('alert-success');

if (alertForm) {
  alertForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name  = document.getElementById('alert-name').value.trim();
    const email = document.getElementById('alert-email').value.trim();
    const zip   = document.getElementById('alert-zip').value.trim();
    if (!name || !email || !zip) return;

    const record = {
      name,
      email,
      phone: document.getElementById('alert-phone').value.trim(),
      zip,
      type:  'election_alert',
      ts:    new Date().toISOString()
    };

    // Write to Firestore + localStorage
    await fsAdd('cw_alert_signups', record);
    lsPush('cw_alert_signups', record);

    alertForm.style.display = 'none';
    alertSuccess.style.display = 'flex';
  });
}

// ───────────────────────────────────────────────────────
// VOLUNTEER FORM
// ───────────────────────────────────────────────────────
const volunteerForm    = document.getElementById('volunteer-signup-form');
const volunteerSuccess = document.getElementById('vform-success');

if (volunteerForm) {
  volunteerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name  = document.getElementById('v-name').value.trim();
    const email = document.getElementById('v-email').value.trim();
    if (!name || !email) return;

    const interests = [...document.querySelectorAll('[name="interest"]:checked')]
      .map(cb => cb.value);

    const record = {
      name,
      email,
      phone:     document.getElementById('v-phone').value.trim(),
      zip:       document.getElementById('v-zip').value.trim(),
      interests,
      type:      'volunteer',
      ts:        new Date().toISOString()
    };

    // Write to Firestore + localStorage
    await fsAdd('cw_volunteers', record);
    lsPush('cw_volunteers', record);

    volunteerForm.style.display = 'none';
    volunteerSuccess.style.display = 'block';
  });
}

// ───────────────────────────────────────────────────────
// COPY SHARE TEXT
// ───────────────────────────────────────────────────────
function copyShareText() {
  const text = document.getElementById('share-text').innerText;
  const btn  = document.getElementById('copy-share-btn');

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 Copy Text'; btn.classList.remove('copied'); }, 3000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = '📋 Copy Text'; btn.classList.remove('copied'); }, 3000);
  });
}

// ───────────────────────────────────────────────────────
// SMOOTH SCROLL
// ───────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ───────────────────────────────────────────────────────
// HERO REVEAL (staggered)
// ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#hero .reveal').forEach((el, i) =>
    setTimeout(() => el.classList.add('visible'), 200 + i * 150)
  );
});
