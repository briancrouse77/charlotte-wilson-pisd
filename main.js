/* =====================================================
   Charlotte Wilson for Princeton ISD — Campaign JS
   ===================================================== */

// -------------------------------------------------------
// SCROLL: Nav + reveal animations
// -------------------------------------------------------
const nav = document.getElementById('main-nav');
const revealEls = document.querySelectorAll('.reveal');

const scrollHandler = () => {
  // Sticky nav style
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Reveal on scroll
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', scrollHandler, { passive: true });
window.addEventListener('load', scrollHandler);

// -------------------------------------------------------
// MOBILE NAV TOGGLE
// -------------------------------------------------------
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// -------------------------------------------------------
// ANIMATED COUNTERS
// -------------------------------------------------------
const counters = document.querySelectorAll('.stat-num[data-target]');
let countersStarted = false;

const startCounters = () => {
  if (countersStarted) return;
  const firstCounter = counters[0];
  if (!firstCounter) return;
  const rect = firstCounter.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const duration = 1800;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
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

// -------------------------------------------------------
// ELECTION ALERT FORM
// -------------------------------------------------------
const alertForm    = document.getElementById('alert-form');
const alertSuccess = document.getElementById('alert-success');

if (alertForm) {
  alertForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('alert-name').value.trim();
    const email = document.getElementById('alert-email').value.trim();
    const zip   = document.getElementById('alert-zip').value.trim();

    if (!name || !email || !zip) return;

    // Save to localStorage as mock data store
    const supporters = JSON.parse(localStorage.getItem('cw_alert_signups') || '[]');
    supporters.push({
      name, email,
      phone: document.getElementById('alert-phone').value.trim(),
      zip,
      type: 'election_alert',
      ts: new Date().toISOString()
    });
    localStorage.setItem('cw_alert_signups', JSON.stringify(supporters));

    alertForm.style.display = 'none';
    alertSuccess.style.display = 'flex';
  });
}

// -------------------------------------------------------
// VOLUNTEER FORM
// -------------------------------------------------------
const volunteerForm    = document.getElementById('volunteer-signup-form');
const volunteerSuccess = document.getElementById('vform-success');

if (volunteerForm) {
  volunteerForm.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('v-name').value.trim();
    const email = document.getElementById('v-email').value.trim();
    if (!name || !email) return;

    const interests = [...document.querySelectorAll('[name="interest"]:checked')]
      .map(cb => cb.value);

    const volunteers = JSON.parse(localStorage.getItem('cw_volunteers') || '[]');
    volunteers.push({
      name, email,
      phone: document.getElementById('v-phone').value.trim(),
      zip:   document.getElementById('v-zip').value.trim(),
      interests,
      ts: new Date().toISOString()
    });
    localStorage.setItem('cw_volunteers', JSON.stringify(volunteers));

    volunteerForm.style.display = 'none';
    volunteerSuccess.style.display = 'block';
  });
}

// -------------------------------------------------------
// COPY SHARE TEXT
// -------------------------------------------------------
function copyShareText() {
  const text = document.getElementById('share-text').innerText;
  const btn  = document.getElementById('copy-share-btn');

  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy Text';
      btn.classList.remove('copied');
    }, 3000);
  }).catch(() => {
    // Fallback for browsers that block clipboard
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✅ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 Copy Text';
      btn.classList.remove('copied');
    }, 3000);
  });
}

// -------------------------------------------------------
// SMOOTH SCROLL FOR INTERNAL NAV LINKS
// -------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// -------------------------------------------------------
// REVEAL INITIAL (above-fold) ELEMENTS IMMEDIATELY
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Staggered reveal for hero elements
  const heroEls = document.querySelectorAll('#hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 150);
  });
});
