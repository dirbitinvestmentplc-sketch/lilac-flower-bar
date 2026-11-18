// Lilac Flower Bar — interactions (the page still works without JS)
(() => {
  const root = document.documentElement;
  root.classList.remove('no-js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Nav: shadow, hide on scroll down, progress bar ---------- */
  const nav = $('.nav');
  const bar = $('.progress span');
  const quick = $('.quickbar');
  let lastY = 0, ticking = false;
  const onScroll = () => {
    const y = scrollY;
    const max = document.body.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    nav.classList.toggle('is-scrolled', y > 8);
    const menuOpen = toggle.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-hidden', !menuOpen && y > 500 && y > lastY + 4);
    if (y < lastY - 4) nav.classList.remove('is-hidden');
    if (quick) quick.classList.toggle('is-shown', y > innerHeight * 0.7 && y < max - 300);
    lastY = y;
    parallax();
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $('.nav__toggle');
  const links = $('#nav-links');
  const setMenu = (open) => {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Split headline into animated words ---------- */
  $$('.split').forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const w = document.createElement('span'); w.className = 'w';
            const inner = document.createElement('span'); inner.textContent = part; inner.style.setProperty('--i', i++);
            w.append(inner); frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          const w = document.createElement('span'); w.className = 'w';
          const inner = n.cloneNode(true); inner.style.setProperty('--i', i++);
          inner.style.display = 'inline-block';
          w.append(inner); n.replaceWith(w);
        }
      });
    };
    walk(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
  });

  /* ---------- Reveal on scroll + nav scroll-spy + video autoplay ---------- */
  const navLinks = $$('a[href^="#"]', links);
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); obs.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach((el) => reveal.observe(el));

    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean).forEach((s) => spy.observe(s));

    const vids = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting && !reduce) { v.play().catch(() => {}); } else { v.pause(); }
      });
    }, { threshold: 0.35 });
    $$('video[data-autoplay]').forEach((v) => vids.observe(v));

    // count-up numbers
    const counter = new IntersectionObserver((entries, obs) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        obs.unobserve(en.target);
        const el = en.target, to = +el.dataset.to;
        if (reduce) return;
        const t0 = performance.now(), dur = 1600;
        const step = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    $$('.count').forEach((el) => counter.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Hero slideshow ---------- */
  const frame = $('.hero__frame');
  const slides = $$('img', frame);
  const dots = $('.hero__dots');
  let cur = 0, timer;
  const show = (n) => {
    slides[cur].classList.remove('is-active');
    dots.children[cur].setAttribute('aria-selected', 'false');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('is-active');
    dots.children[cur].setAttribute('aria-selected', 'true');
  };
  slides.forEach((img, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', 'Show photo ' + (i + 1));
    b.setAttribute('aria-selected', String(i === 0));
    b.addEventListener('click', () => { show(i); restart(); });
    dots.append(b);
  });
  const restart = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(cur + 1), 4500); };
  restart();

  /* ---------- Falling petals ---------- */
  const petals = $('.petals');
  if (petals && !reduce) {
    const n = innerWidth < 640 ? 7 : 14;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      const s = 0.6 + Math.random() * 0.8;
      p.style.cssText = `left:${Math.random() * 100}%;width:${14 * s}px;height:${18 * s}px;` +
        `animation-duration:${12 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s;` +
        `--drift:${(Math.random() - 0.5) * 240}px;opacity:${0.35 + Math.random() * 0.45}`;
      petals.append(p);
    }
  }

  /* ---------- Parallax (hero floating cards) ---------- */
  const pItems = $$('[data-parallax]');
  function parallax() {
    if (reduce || scrollY > innerHeight * 1.2) return;
    pItems.forEach((el) => { el.style.translate = `0 ${scrollY * +el.dataset.parallax}px`; });
  }

  /* ---------- Card tilt + magnetic buttons (mouse only) ---------- */
  if (finePointer && !reduce) {
    $$('.tilt').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        card.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    });
    $$('.magnetic').forEach((btn) => {
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.18}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.translate = ''; });
    });
  }

  /* ---------- Collection filter + show more ---------- */
  const items = $$('.shop__item');
  const chips = $$('.chip');
  const moreBtn = $('#show-more');
  const PAGE = innerWidth < 640 ? 8 : 12;
  let filter = 'all', limit = PAGE;
  chips.forEach((c) => {
    const f = c.dataset.filter;
    $('.chip__n', c).textContent = f === 'all' ? items.length : items.filter((i) => i.dataset.cat === f).length;
  });
  const render = (animate) => {
    const matches = items.filter((i) => filter === 'all' || i.dataset.cat === filter);
    const apply = () => {
      items.forEach((i) => { i.hidden = true; });
      matches.slice(0, limit).forEach((i, k) => {
        i.hidden = false;
        if (animate) {
          i.classList.add('is-out');
          setTimeout(() => i.classList.remove('is-out'), 30 + Math.min(k, 12) * 40);
        }
      });
      moreBtn.hidden = matches.length <= limit;
      moreBtn.textContent = `Show more (${matches.length - limit})`;
    };
    if (animate && !reduce) {
      items.filter((i) => !i.hidden).forEach((i) => i.classList.add('is-out'));
      setTimeout(apply, 260);
    } else apply();
  };
  const setFilter = (f) => {
    filter = f; limit = PAGE;
    chips.forEach((c) => { const on = c.dataset.filter === f; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', String(on)); });
    render(true);
  };
  chips.forEach((c) => c.addEventListener('click', () => setFilter(c.dataset.filter)));
  moreBtn.addEventListener('click', () => { limit += PAGE; render(false); });
  $$('[data-filter-link]').forEach((a) => a.addEventListener('click', () => setFilter(a.dataset.filterLink)));
  render(false);

  /* ---------- Reviews: rotating 3D carousel ---------- */
  const track = $('.quotes--four');
  const controls = $('.carousel__controls');
  if (track && controls) {
    const cards = $$('.quote', track);
    const dotsWrap = $('.carousel__dots', controls);
    const n = cards.length, DUR = 6000;
    let cur = 0, auto = null, paused = false;
    cards.forEach((c) => { c.classList.remove('reveal'); c.style.removeProperty('--d'); });
    track.classList.add('is-carousel');
    track.setAttribute('aria-roledescription', 'carousel');
    controls.hidden = false;
    controls.style.setProperty('--dur', DUR + 'ms');

    const dots = cards.map((c, i) => {
      const b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Review ' + (i + 1) + ' of ' + n);
      b.addEventListener('click', () => { go(i); restart(); });
      dotsWrap.append(b);
      return b;
    });

    const layout = () => {
      const narrow = innerWidth < 640;
      const shift = narrow ? 78 : 66;           // % of card width each side card moves out
      cards.forEach((c, i) => {
        let off = (i - cur + n) % n;
        if (off > n / 2) off -= n;               // -1, 0, 1, 2 for four cards
        const abs = Math.abs(off);
        const t = abs > 1
          ? `translateX(0) translateZ(-420px) rotateY(180deg) scale(.6)`
          : `translateX(${off * shift}%) translateZ(${-abs * 160}px) rotateY(${-off * 32}deg) scale(${1 - abs * 0.12})`;
        c.style.setProperty('--t', t);
        c.style.transform = t;
        c.style.opacity = abs > 1 ? 0 : abs === 1 ? 0.55 : 1;
        c.style.zIndex = 10 - abs;
        c.style.pointerEvents = abs > 1 ? 'none' : '';
        c.classList.toggle('is-center', off === 0);
        c.classList.toggle('is-side', abs === 1);
        c.setAttribute('aria-hidden', String(off !== 0));
        $$('a', c).forEach((a) => { a.tabIndex = off === 0 ? 0 : -1; });
      });
      kickDot();
    };
    // restart the progress fill on the active dot
    const kickDot = () => {
      dots.forEach((d) => d.setAttribute('aria-selected', 'false'));
      void dotsWrap.offsetWidth;
      dots[cur].setAttribute('aria-selected', 'true');
    };
    const measure = () => {
      const h = Math.max(...cards.map((c) => c.offsetHeight));
      track.style.setProperty('--h', h + 24 + 'px');
    };
    const go = (i) => { cur = (i + n) % n; layout(); };
    const restart = () => {
      clearInterval(auto);
      if (!reduce && !paused) auto = setInterval(() => go(cur + 1), DUR);
    };
    const setPaused = (p) => {
      if (p === paused) return;
      paused = p; controls.classList.toggle('is-paused', p);
      if (!p) kickDot();
      restart();
    };

    $$('.carousel__btn', controls).forEach((b) => b.addEventListener('click', () => { go(cur + +b.dataset.dir); restart(); }));
    cards.forEach((c, i) => c.addEventListener('click', (e) => {
      if (i !== cur && !e.target.closest('a')) { go(i); restart(); }
    }));
    track.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') setPaused(true); });
    track.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') setPaused(false); });
    track.addEventListener('focusin', () => setPaused(true));
    track.addEventListener('focusout', () => setPaused(false));
    $('#reviews').addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { go(cur - 1); restart(); }
      if (e.key === 'ArrowRight') { go(cur + 1); restart(); }
    });
    let sx = null;
    track.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; setPaused(true); }, { passive: true });
    track.addEventListener('touchend', (e) => {
      if (sx !== null) {
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
      }
      sx = null; setPaused(false);
    });
    // only rotate while the section is on screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => {
        if (en.isIntersecting) restart(); else clearInterval(auto);
      }, { threshold: 0.3 }).observe(track);
    }
    addEventListener('resize', () => { measure(); layout(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    measure(); layout();
  }

  /* ---------- FAQ: one open at a time ---------- */
  const faqs = $$('.faq__list details');
  faqs.forEach((d) => d.addEventListener('toggle', () => { if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; }); }));

  /* ---------- Lightbox with prev/next, keys and swipe ---------- */
  const box = $('.lightbox');
  if (box && typeof box.showModal === 'function') {
    const img = $('img', box), cap = $('figcaption', box);
    let group = [], idx = 0;
    const open = (list, i) => { group = list; idx = i; paint(); box.showModal(); };
    const paint = () => {
      const t = group[idx], thumb = $('img', t);
      img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
      img.src = t.dataset.full; img.alt = thumb.alt; cap.textContent = thumb.alt;
    };
    const go = (d) => { idx = (idx + d + group.length) % group.length; paint(); };
    const bind = (selector) => {
      $$(selector).forEach((btn) => btn.addEventListener('click', () => {
        const list = $$(selector).filter((b) => !b.closest('[hidden]'));
        open(list, list.indexOf(btn));
      }));
    };
    bind('.shop__open'); bind('.choc__tile');
    $('.lightbox__close', box).addEventListener('click', () => box.close());
    $('.lightbox__prev', box).addEventListener('click', () => go(-1));
    $('.lightbox__next', box).addEventListener('click', () => go(1));
    box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
    box.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') go(-1); if (e.key === 'ArrowRight') go(1); });
    let sx = null;
    box.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      sx = null;
    });
  }

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  onScroll();
})();
