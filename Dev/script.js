/* ─────────────────────────────────────────
   ANTRIKSH CLOUD — script.js
   ───────────────────────────────────────── */

/* ── HERO NEURAL NETWORK CANVAS ── */
(function () {
  const c = document.getElementById('hero-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H, dots = [], mx = -999, my = -999;
  const GAP = 34, R = 1.4, REACH = 110;

  function resize() {
    const hero = document.getElementById('hero');
    W = c.width  = hero.offsetWidth;
    H = c.height = hero.offsetHeight;
    dots = [];
    for (let x = GAP; x < W; x += GAP)
      for (let y = GAP; y < H; y += GAP)
        dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      const dx = mx - d.x, dy = my - d.y;
      const dist = Math.hypot(dx, dy);
      if (dist < REACH) {
        const f = (REACH - dist) / REACH;
        d.vx -= dx * f * 0.04;
        d.vy -= dy * f * 0.04;
      }
      d.vx += (d.ox - d.x) * 0.08;
      d.vy += (d.oy - d.y) * 0.08;
      d.vx *= 0.82; d.vy *= 0.82;
      d.x  += d.vx; d.y  += d.vy;
      const dd = Math.hypot(d.x - d.ox, d.y - d.oy);
      ctx.beginPath();
      ctx.arc(d.x, d.y, R, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${0.14 + Math.min(dd / 8, 1) * 0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  hero.addEventListener('mouseleave', () => { mx = -999; my = -999; });
  resize();
  draw();
})();

/* ── GPU UTILISATION HEATMAP ── */
(function () {
  const c = document.getElementById('heatmap');
  if (!c) return;
  const ctx = c.getContext('2d');
  const COLS = 216, ROWS = 9;
  const cells = Array.from({ length: COLS * ROWS }, () => ({
    util:   Math.random() * 0.4 + 0.4,
    target: Math.random() * 0.4 + 0.4,
    speed:  Math.random() * 0.03 + 0.005,
  }));

  function getColor(u) {
    if (u < 0.3)  return `rgba(59,130,246,${0.3 + u})`;
    if (u < 0.6)  return `rgba(34,197,94,${0.4 + u * 0.5})`;
    if (u < 0.85) return `rgba(251,191,36,${0.5 + u * 0.4})`;
    return `rgba(239,68,68,${0.6 + u * 0.4})`;
  }

  function draw() {
    const W = c.offsetWidth;
    c.width  = W;
    c.height = c.offsetHeight || 72;
    const cw = W / COLS, rh = c.height / ROWS;
    cells.forEach((cell, i) => {
      if (Math.random() < 0.04) cell.target = Math.random() * 0.9 + 0.05;
      cell.util += (cell.target - cell.util) * cell.speed;
      const x = (i % COLS) * cw, y = Math.floor(i / COLS) * rh;
      ctx.fillStyle = getColor(cell.util);
      ctx.fillRect(x + 0.5, y + 0.5, cw - 0.5, rh - 0.5);
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── NAV: SCROLL HIDE / SHOW ── */
(function () {
  let last = 0, tick = false;
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (tick) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y > 80)             nav.classList.add('scrolled');
      else                    nav.classList.remove('scrolled');
      if (y > last + 6 && y > 120) nav.classList.add('hidden');
      else if (y < last - 4)       nav.classList.remove('hidden');
      last = y;
      tick = false;
    });
    tick = true;
  });
})();

/* ── CURSOR GLOW ── */
(function () {
  const g = document.getElementById('cursor-glow');
  if (!g) return;
  document.addEventListener('mousemove', e => {
    g.style.left = e.clientX + 'px';
    g.style.top  = e.clientY + 'px';
  });
})();

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.18;
    const y = (e.clientY - r.top  - r.height / 2) * 0.18;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ── COUNT-UP NUMBERS ── */
function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const target = parseFloat(el.dataset.count);
  const suffix  = el.dataset.suffix || '';
  const prefix  = el.dataset.prefix || '';
  const dur = 1600, start = performance.now();
  const isInt = Number.isInteger(target);

  function step(now) {
    const p    = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const v    = target * ease;
    el.textContent = prefix + (isInt ? Math.round(v) : v.toFixed(1)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ── SCROLL-TRIGGERED ANIMATIONS ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;

    // Fade / scale reveals
    if (el.classList.contains('fade-up') || el.classList.contains('scale-in')) {
      el.classList.add('visible');
    }

    // Timeline power bars
    if (el.classList.contains('tl-pw-fill') && !el.dataset.anim) {
      el.style.width = el.dataset.pw || '0%';
      el.dataset.anim = '1';
    }

    // Comparison bar fills
    if (el.classList.contains('bar-fill') && !el.dataset.anim) {
      setTimeout(() => { el.style.width = el.dataset.w || '0%'; }, 60);
      el.dataset.anim = '1';
    }

    // BW race bar fills
    if (el.classList.contains('bw-fill') && !el.dataset.anim) {
      setTimeout(() => { el.style.width = el.dataset.w || '0%'; }, 60);
      el.dataset.anim = '1';
    }

    // Count-up
    if (el.classList.contains('count-num')) countUp(el);

    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.fade-up, .scale-in, .tl-pw-fill, .bar-fill, .bw-fill, .count-num'
).forEach(el => io.observe(el));

/* Hero elements fire immediately (already in viewport) */
setTimeout(() => {
  document.querySelectorAll('#hero .fade-up, #hero .count-num').forEach(el => {
    el.classList.add('visible');
    if (el.classList.contains('count-num')) countUp(el);
  });
}, 120);

/* ── FAQ ACCORDION ── */
function faq(btn) {
  const a    = btn.nextElementSibling;
  const open = a.classList.contains('open');
  document.querySelectorAll('.faq-a.open').forEach(x => {
    x.classList.remove('open');
    x.previousElementSibling.classList.remove('open');
  });
  if (!open) { a.classList.add('open'); btn.classList.add('open'); }
}
// expose globally (called from onclick in HTML)
window.faq = faq;

/* ── MOBILE NAV: close on link click ── */
document.querySelectorAll('#navLinks a').forEach(a =>
  a.addEventListener('click', () =>
    document.getElementById('navLinks').classList.remove('open')
  )
);
