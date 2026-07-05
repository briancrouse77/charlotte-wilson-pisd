/* =====================================================
   Charlotte Wilson for Princeton ISD — Campaign JS
   Firestore-backed with localStorage fallback
   ===================================================== */

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
