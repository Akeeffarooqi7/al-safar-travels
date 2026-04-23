/* =========================================================
   AL-SAFAR · Main JS
   ========================================================= */

document.addEventListener('DOMContentLoaded', init);

function init() {
  gsap.registerPlugin(ScrollTrigger);

  initPreloader();
  initNavbar();
  initDrawer();
  initScrollProgress();
  initSplitText();
  initReveals();
  initRotator();
  initMagnetic();
  initCounters();
  initHeroParallax();
  initPackages();
  initFilter();
  initDestinations();
  initReviews();
  initCountdown();
  initModalTabs();
  initChatbot();
  initMisc();
}

/* ============= PRELOADER ============= */
function initPreloader() {
  const pre = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      pre.classList.add('is-done');
      // kick off hero animations (deterministic — no ScrollTrigger for above-the-fold)
      gsap.to('.hero__image', { scale: 1, duration: 2.6, ease: 'power2.out' });
      gsap.from('.hero__eyebrow', { opacity: 0, y: 30, duration: 1, delay: 0.2, ease: 'power3.out' });

      // Hero title: animate each line's split chars in sequence
      document.querySelectorAll('.hero .line[data-split] .split-char').forEach((_, i, arr) => {}); // ensure DOM ready
      gsap.from('.hero .line[data-split] .split-char', {
        yPercent: 110, opacity: 0,
        duration: 0.9, ease: 'power3.out',
        stagger: 0.02, delay: 0.35
      });

      gsap.from('.hero__sub .split-char', {
        yPercent: 100, opacity: 0,
        duration: 0.8, ease: 'power3.out',
        stagger: 0.008, delay: 0.9
      });

      gsap.from('.hero__cta .btn', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, delay: 1.2, ease: 'power3.out' });
      gsap.from('.hero__stats .hero-stat', { opacity: 0, y: 20, duration: 0.7, stagger: 0.12, delay: 1.4, ease: 'power3.out' });
      gsap.from('.hero-search', { opacity: 0, y: 40, duration: 1, delay: 1.7, ease: 'power3.out' });
      gsap.from('.hero__scroll', { opacity: 0, duration: 0.8, delay: 2.2 });
    }, 1400);
  });
}

/* ============= NAVBAR ============= */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlight
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 140;
    let current = sections[0];
    sections.forEach(s => { if (s.offsetTop <= y) current = s; });
    links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === '#' + (current?.id || '')));
  }, { passive: true });
}

/* ============= DRAWER ============= */
function initDrawer() {
  const drawer = document.getElementById('drawer');
  const toggle = document.getElementById('navToggle');
  const close = document.getElementById('drawerClose');
  const open = () => { drawer.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
  const shut = () => { drawer.classList.remove('is-open'); document.body.style.overflow = ''; };
  toggle.addEventListener('click', open);
  close.addEventListener('click', shut);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
}

/* ============= SCROLL PROGRESS ============= */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
    bar.style.width = (scrolled * 100) + '%';
  }, { passive: true });
}

/* ============= SPLIT TEXT ============= */
function initSplitText() {
  document.querySelectorAll('[data-split]').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    const words = text.split(' ');
    words.forEach((w, i) => {
      const wrap = document.createElement('span');
      wrap.style.display = 'inline-block';
      wrap.style.whiteSpace = 'pre';
      [...w].forEach(ch => {
        const s = document.createElement('span');
        s.className = 'split-char';
        s.textContent = ch;
        wrap.appendChild(s);
      });
      el.appendChild(wrap);
      if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
    });
  });
}

/* ============= REVEALS (GSAP ScrollTrigger) ============= */
function initReveals() {
  // Split reveals (skip hero — handled in preloader timeline for deterministic timing)
  document.querySelectorAll('[data-split]').forEach(el => {
    if (el.closest('.hero')) return;
    const chars = el.querySelectorAll('.split-char');
    gsap.from(chars, {
      yPercent: 100, opacity: 0,
      duration: 0.9, ease: 'power3.out',
      stagger: 0.015,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Generic section reveals
  gsap.utils.toArray('.section-head').forEach(el => {
    gsap.from(el, {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // Cards
  gsap.utils.toArray('.card, .why__card, .timeline__item, .inclusion, .contact__card, .review').forEach((el, i) => {
    gsap.from(el, {
      y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      delay: (i % 4) * 0.08,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Compare rows
  gsap.utils.toArray('.compare__row').forEach((el, i) => {
    gsap.from(el, {
      x: -30, opacity: 0, duration: 0.8, ease: 'power3.out',
      delay: i * 0.06,
      scrollTrigger: { trigger: '.compare__table', start: 'top 82%', once: true }
    });
  });

  // Gallery stagger
  gsap.utils.toArray('.gallery__item').forEach((el, i) => {
    gsap.from(el, {
      scale: 0.92, opacity: 0, duration: 0.9, ease: 'power3.out',
      delay: (i % 4) * 0.1,
      scrollTrigger: { trigger: '.gallery', start: 'top 82%', once: true }
    });
  });

  // Dest list items
  gsap.utils.toArray('.dest-btn').forEach((el, i) => {
    gsap.from(el, {
      x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
      delay: i * 0.08,
      scrollTrigger: { trigger: '.destinations__list', start: 'top 85%', once: true }
    });
  });
}

/* ============= ROTATOR ============= */
function initRotator() {
  const r = document.getElementById('rotator');
  if (!r) return;
  const words = r.querySelectorAll('.rotator__word');
  let i = 0;
  const show = (idx) => {
    words.forEach((w, n) => {
      w.style.transform = `translateY(${(n - idx) * 100}%)`;
    });
  };
  show(0);
  setInterval(() => {
    i = (i + 1) % words.length;
    show(i);
  }, 2400);
}

/* ============= MAGNETIC BUTTONS ============= */
function initMagnetic() {
  if (window.matchMedia('(max-width: 1024px)').matches) return;
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ============= COUNTERS ============= */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0');
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target, duration: 2.2, ease: 'power2.out',
          onUpdate: () => {
            const val = obj.v;
            el.textContent = (decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toLocaleString('en-IN')) + (target >= 1000 && decimals === 0 ? '+' : '');
          }
        });
      }
    });
  });
}

/* ============= HERO PARALLAX ============= */
function initHeroParallax() {
  gsap.to('.hero__image', {
    yPercent: 20, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.hero__content', {
    yPercent: -10, opacity: 0.2, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('.sacred__bg', {
    yPercent: -15, ease: 'none',
    scrollTrigger: { trigger: '.sacred', start: 'top bottom', end: 'bottom top', scrub: true }
  });
}

/* ============= PACKAGES ============= */
const PACKAGES = [
  {
    id: 'umrah-essential',
    type: 'umrah',
    tag: 'Umrah · Essential',
    title: 'The Essential Umrah',
    desc: 'Nine days of quiet, organised pilgrimage. 4★ hotels within walking distance, group transfers, scholar-led ziyarat.',
    price: '99,000',
    duration: '9 nights',
    img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Makkah — Swissôtel Al Maqam (4★) · 400m to Haram', 'Madinah — Pullman Zamzam (4★) · 350m to Masjid Nabawi'],
    itinerary: [
      ['Day 1', 'Fly Mumbai → Jeddah · private transfer to Makkah'],
      ['Day 2', 'First Umrah · tawaf with a scholar · rest day'],
      ['Day 3–4', 'Ziyarat of Makkah · Jabal al-Noor · Mina fields'],
      ['Day 5', 'High-speed train to Madinah'],
      ['Day 6–8', 'Riyadh al-Jannah · Ziyarat of Madinah · Quba · Uhud'],
      ['Day 9', 'Return flight from Madinah, home by evening']
    ]
  },
  {
    id: 'umrah-premium',
    type: 'umrah',
    tag: 'Umrah · Premium',
    title: 'The Premium Umrah',
    desc: 'Hilton Makkah and Oberoi Madinah · full board · private SUV transfers · semi-private scholar access.',
    price: '1,85,000',
    duration: '11 nights',
    img: 'https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Makkah — Hilton Suites Makkah (5★) · 200m to Haram', 'Madinah — Oberoi Madinah (5★) · Haram-adjacent'],
    itinerary: [
      ['Day 1', 'Premium economy flight · meet &amp; greet at Jeddah'],
      ['Day 2', 'First Umrah with personal mutawwif'],
      ['Day 3–5', 'Private ziyarat · optional Taif day trip'],
      ['Day 6', 'Private car transfer to Madinah via Badr'],
      ['Day 7–10', 'Riyadh al-Jannah booked slots · quiet Quba visit'],
      ['Day 11', 'Return via Jeddah · business-lounge access']
    ]
  },
  {
    id: 'umrah-vip',
    type: 'umrah',
    tag: 'Umrah · VIP',
    title: 'The VIP Private Umrah',
    desc: 'Executive suites overlooking the Kaaba. Business-class travel. A personal mutawwif, on call, for every moment.',
    price: '3,75,000',
    duration: '14 nights',
    img: 'https://images.unsplash.com/photo-1580407836477-c79126d2b1ff?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Makkah — Fairmont Clock Tower Royal Suite · 50m', 'Madinah — The Oberoi Royal Suite · Haram view'],
    itinerary: [
      ['Day 1', 'Business-class flight · chauffeured arrival'],
      ['Day 2', 'Guided first Umrah · private roof prayer'],
      ['Day 3–6', 'Bespoke Makkah experience · scholar on call'],
      ['Day 7', 'Private luxury coach to Madinah'],
      ['Day 8–13', 'Private Riyadh al-Jannah slots · elite ziyarat'],
      ['Day 14', 'Business-class return · home delivery of zamzam']
    ]
  },
  {
    id: 'hajj-premium',
    type: 'hajj',
    tag: 'Hajj · Premium',
    title: 'The Hand-Crafted Hajj',
    desc: 'A small, private Hajj group of 30 with a senior scholar. AC tents in Mina, Aziziyah stays, air-conditioned coaches.',
    price: '6,50,000',
    duration: '24 nights',
    img: 'https://images.unsplash.com/photo-1564769625392-651b2c888f2b?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Makkah — Swissôtel Al Maqam · 5★ · 250m', 'Madinah — Anwar Al Madinah Mövenpick · 5★', 'Aziziyah — Private serviced apartments', 'Mina — VIP AC tent · category A'],
    itinerary: [
      ['Pre-Hajj', 'Madinah · 8 nights · Riyadh al-Jannah access'],
      ['Makkah', '6 nights · First Umrah of Hajj · rest &amp; prep'],
      ['8 Dhul-Hijjah', 'Mina · tents · scholar orientation'],
      ['9 Dhul-Hijjah', 'Arafat · khutbah · prayer · dua'],
      ['10 Dhul-Hijjah', 'Muzdalifah · pebbles · Mina · Qurbani · Tawaf Ifadah'],
      ['11–13', 'Rami al-jamarat · tranquil stays in Mina'],
      ['Return', 'Final tawaf · departure from Jeddah']
    ]
  },
  {
    id: 'dubai-lux',
    type: 'dubai',
    tag: 'Dubai · Luxury',
    title: 'Dubai Sky &amp; Sand',
    desc: 'Five nights across Bulgari Resort and Atlantis The Royal. Private desert safari, Burj Khalifa lounge, yacht sunset.',
    price: '1,45,000',
    duration: '5 nights',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Bulgari Resort Dubai · Jumeira Bay · 2 nights', 'Atlantis The Royal · Palm Jumeirah · 3 nights'],
    itinerary: [
      ['Day 1', 'Emirates business arrival · Bulgari check-in · spa'],
      ['Day 2', 'Dubai Frame · Old City walk · gold souk'],
      ['Day 3', 'Atlantis move · private beach · Aquaventure'],
      ['Day 4', 'Desert safari · falconry · private majlis dinner'],
      ['Day 5', 'Burj Khalifa Sky lounge · yacht sunset · return']
    ]
  },
  {
    id: 'istanbul-heritage',
    type: 'intl',
    tag: 'International · Türkiye',
    title: 'Istanbul Heritage Trail',
    desc: 'Seven nights between Istanbul and Cappadocia. Private Bosphorus cruise, hot-air balloon at dawn, heritage walk.',
    price: '1,95,000',
    duration: '7 nights',
    img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Istanbul — Four Seasons Sultanahmet · 4 nights', 'Cappadocia — Argos In Cappadocia · 3 nights'],
    itinerary: [
      ['Day 1', 'Arrive Istanbul · Bosphorus welcome dinner'],
      ['Day 2', 'Hagia Sophia · Blue Mosque · Topkapi · Grand Bazaar'],
      ['Day 3', 'Private Bosphorus yacht · Rumeli Hisarı'],
      ['Day 4', 'Fly Cappadocia · cave suite · sunset valley'],
      ['Day 5', 'Dawn balloon · Uçhisar · pottery in Avanos'],
      ['Day 6', 'Ihlara valley hike · underground city'],
      ['Day 7', 'Return via Istanbul · meze farewell']
    ]
  },
  {
    id: 'malaysia-family',
    type: 'intl',
    tag: 'International · Malaysia',
    title: 'Malaysia Family Escape',
    desc: 'Kuala Lumpur, Langkawi, and rainforest lodges. Halal-certified kitchens, kid-loving nannies, private speedboats.',
    price: '1,25,000',
    duration: '8 nights',
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
    hotels: ['KL — Mandarin Oriental Kuala Lumpur · 3 nights', 'Langkawi — The Datai · 4 nights', 'Penang — Eastern &amp; Oriental · 1 night'],
    itinerary: [
      ['Day 1', 'Arrive KL · Petronas towers sky bridge'],
      ['Day 2', 'Batu Caves · heritage walk · halal hawker lunch'],
      ['Day 3', 'Genting cool air · theme park for kids'],
      ['Day 4', 'Fly Langkawi · The Datai rainforest villas'],
      ['Day 5', 'Private island hopping by speedboat'],
      ['Day 6', 'Sky bridge · mangrove kayak · spa evening'],
      ['Day 7', 'Fly Penang · George Town street art'],
      ['Day 8', 'Return home · halal tiffin packed']
    ]
  },
  {
    id: 'baku',
    type: 'intl',
    tag: 'International · Azerbaijan',
    title: 'Baku &amp; the Caspian',
    desc: 'Old-world walled city, modern flame towers, Caspian sunrises. Thermal mud baths and a scholar-led mosque visit.',
    price: '1,15,000',
    duration: '6 nights',
    img: 'https://images.unsplash.com/photo-1596395463789-2b0e36bcc79a?q=80&w=1600&auto=format&fit=crop',
    hotels: ['Four Seasons Baku · Old City · 4 nights', 'Quba — Rixos Quba · 2 nights'],
    itinerary: [
      ['Day 1', 'Arrive Baku · Caspian sunset · dinner at Shirvanshah'],
      ['Day 2', 'Walled city · Maiden Tower · carpet museum'],
      ['Day 3', 'Gobustan petroglyphs · mud volcanoes'],
      ['Day 4', 'Drive to Quba · pomegranate orchards'],
      ['Day 5', 'Tufandag mountain · traditional dolma lunch'],
      ['Day 6', 'Baku return · Heydar Aliyev Center · departure']
    ]
  }
];

function initPackages() {
  const grid = document.getElementById('packageGrid');
  if (!grid) return;

  PACKAGES.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.type = p.type;
    card.innerHTML = `
      <div class="card__media">
        <div class="card__img" style="background-image:url('${p.img}')"></div>
        <span class="card__tag">${p.tag}</span>
        <div class="card__price">
          <small>From</small>
          <b>₹ ${p.price}</b>
        </div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__desc">${p.desc}</p>
        <div class="card__meta">
          <span><i class="fa-regular fa-clock"></i> ${p.duration}</span>
          <span><i class="fa-solid fa-hotel"></i> 5★ partners</span>
          <span><i class="fa-solid fa-user-tie"></i> Scholar-led</span>
        </div>
      </div>
      <div class="card__foot">
        <button class="btn btn--ghost btn--sm" data-view="${p.id}">View details</button>
        <a href="#book" class="btn btn--gold btn--sm">Enquire</a>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.addEventListener('click', e => {
    const b = e.target.closest('[data-view]');
    if (b) openPackageModal(b.dataset.view);
  });
}

/* ============= FILTER ============= */
function initFilter() {
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  bar.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    bar.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    const f = btn.dataset.filter;
    document.querySelectorAll('#packageGrid .card').forEach(card => {
      const show = f === 'all' || card.dataset.type === f;
      gsap.to(card, {
        opacity: show ? 1 : 0.1,
        scale: show ? 1 : 0.92,
        duration: 0.5, ease: 'power3.out',
        onStart: () => { if (show) card.style.display = 'flex'; },
        onComplete: () => { if (!show) card.style.display = 'none'; }
      });
    });
  });
}

/* ============= DESTINATIONS ============= */
const DESTS = {
  makkah: {
    title: 'Makkah & Madinah', dur: '7–14 nights', price: '99,000',
    desc: 'The heart of every journey. Private Haram-view suites, scholar-guided ziyarat, and a team on the ground that never leaves your side.',
    img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop'
  },
  dubai: {
    title: 'Dubai, UAE', dur: '4–7 nights', price: '1,25,000',
    desc: 'A contemporary luxury capital. Bulgari beach villas, Atlantis waterpark, private yachts across the Palm.',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop'
  },
  istanbul: {
    title: 'Istanbul, Türkiye', dur: '5–9 nights', price: '1,65,000',
    desc: 'Where continents meet. Quiet mornings at Hagia Sophia, private Bosphorus sails, hot-air balloons over Cappadocia.',
    img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop'
  },
  malaysia: {
    title: 'Malaysia', dur: '6–10 nights', price: '1,15,000',
    desc: 'Kuala Lumpur skylines, Langkawi rainforests, halal kitchens that delight the whole family.',
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=2000&auto=format&fit=crop'
  },
  baku: {
    title: 'Baku, Azerbaijan', dur: '5–7 nights', price: '1,05,000',
    desc: 'Old walled city and modern flame towers on the Caspian. A quietly sophisticated escape.',
    img: 'https://images.unsplash.com/photo-1596395463789-2b0e36bcc79a?q=80&w=2000&auto=format&fit=crop'
  },
  samarkand: {
    title: 'Samarkand', dur: '6–8 nights', price: '1,35,000',
    desc: 'Turquoise domes, Silk Road caravanserais, and sundown tea gardens — one of the most photographed pilgrim cities.',
    img: 'https://images.unsplash.com/photo-1607354708830-9f2e39b1dd87?q=80&w=2000&auto=format&fit=crop'
  }
};

function initDestinations() {
  const list = document.getElementById('destList');
  if (!list) return;
  const img = document.getElementById('destImg');
  const title = document.getElementById('destTitle');
  const desc = document.getElementById('destDesc');
  const dur = document.getElementById('destDur');
  const price = document.getElementById('destPrice');

  list.addEventListener('click', e => {
    const btn = e.target.closest('.dest-btn');
    if (!btn) return;
    list.querySelectorAll('.dest-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    const d = DESTS[btn.dataset.dest];
    gsap.to('#destCard', {
      opacity: 0, y: 20, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        img.style.backgroundImage = `url('${d.img}')`;
        title.textContent = d.title;
        desc.textContent = d.desc;
        dur.textContent = d.dur;
        price.textContent = d.price;
        gsap.to('#destCard', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
      }
    });
  });
}

/* ============= REVIEWS ============= */
function initReviews() {
  const wrap = document.getElementById('reviews');
  const dotsWrap = document.getElementById('revDots');
  const prev = document.getElementById('revPrev');
  const next = document.getElementById('revNext');
  if (!wrap) return;
  const items = wrap.querySelectorAll('.review');
  items.forEach((_, i) => {
    const d = document.createElement('button');
    if (i === 0) d.classList.add('is-active');
    d.addEventListener('click', () => scrollTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function scrollTo(i) {
    const el = items[i];
    wrap.scrollTo({ left: el.offsetLeft - wrap.offsetLeft - 12, behavior: 'smooth' });
  }

  wrap.addEventListener('scroll', () => {
    const c = wrap.scrollLeft + wrap.clientWidth / 2;
    let active = 0;
    items.forEach((el, i) => {
      if (Math.abs(el.offsetLeft + el.offsetWidth / 2 - c - wrap.offsetLeft) < el.offsetWidth) active = i;
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === active));
  });

  let current = 0;
  prev.addEventListener('click', () => { current = Math.max(0, current - 1); scrollTo(current); });
  next.addEventListener('click', () => { current = Math.min(items.length - 1, current + 1); scrollTo(current); });

  // auto-advance
  setInterval(() => {
    current = (current + 1) % items.length;
    scrollTo(current);
  }, 6000);
}

/* ============= COUNTDOWN ============= */
function initCountdown() {
  // Next Hajj season target (approx 1 Dhul Hijjah 1447 AH ≈ May 2026)
  // We'll set a compelling future date
  const target = new Date();
  target.setMonth(target.getMonth() + 13); // ~13 months out for demo

  const d = document.getElementById('cd-days');
  const h = document.getElementById('cd-hours');
  const m = document.getElementById('cd-mins');
  const s = document.getElementById('cd-secs');
  if (!d) return;

  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);
    d.textContent = String(days).padStart(3, '0');
    h.textContent = String(hours).padStart(2, '0');
    m.textContent = String(mins).padStart(2, '0');
    s.textContent = String(secs).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

/* ============= PACKAGE MODAL ============= */
function openPackageModal(id) {
  const p = PACKAGES.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalTitle').innerHTML = p.title;
  document.getElementById('modalMedia').style.backgroundImage = `url('${p.img}')`;
  document.getElementById('modalMeta').innerHTML = `
    <span><i class="fa-regular fa-clock"></i> ${p.duration}</span>
    <span><i class="fa-solid fa-indian-rupee-sign"></i> from ${p.price}</span>
    <span><i class="fa-solid fa-tag"></i> ${p.tag}</span>
  `;
  // Itinerary
  document.getElementById('paneItin').innerHTML =
    '<h4>Day-wise flow</h4>' +
    p.itinerary.map(([day, line]) => `<p><strong style="color:var(--gold-2); font-family:var(--font-display)">${day}</strong> — ${line}</p>`).join('');
  // Hotels
  document.getElementById('paneHotels').innerHTML =
    '<h4>Accommodation</h4><ul>' + p.hotels.map(h => `<li>${h}</li>`).join('') + '</ul>';
  // Inclusions
  document.getElementById('paneInc').innerHTML = `
    <h4>Included</h4>
    <ul>
      <li>Return flights (class varies by tier)</li>
      <li>5-star accommodation with daily breakfast</li>
      <li>All airport, inter-city and ziyarat transfers</li>
      <li>Full visa processing &amp; insurance</li>
      <li>Scholar-led ziyarat, in your preferred language</li>
      <li>Ihram, zam-zam bottles, SIM card &amp; pilgrim kit</li>
      <li>24/7 on-ground concierge &amp; India helpline</li>
    </ul>
    <h4>Not included</h4>
    <ul>
      <li>Personal shopping &amp; laundry</li>
      <li>Optional experiences (Taif, private Oud atelier)</li>
    </ul>
  `;
  // Gallery
  const imgs = [
    'https://images.unsplash.com/photo-1580407836477-c79126d2b1ff?q=80&w=800',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800',
    'https://images.unsplash.com/photo-1565019011521-b0575cbb57c8?q=80&w=800',
    'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=800',
    'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800',
    'https://images.unsplash.com/photo-1549221987-25a490f65d34?q=80&w=800'
  ];
  document.getElementById('paneGallery').innerHTML =
    '<div class="pane-gallery">' +
    imgs.map(i => `<div class="pane-gallery__img" style="background-image:url('${i}')"></div>`).join('') +
    '</div>';

  const modal = document.getElementById('modal');
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function initModalTabs() {
  const modal = document.getElementById('modal');
  modal.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    const tab = e.target.closest('.tab');
    if (tab) {
      modal.querySelectorAll('.tab').forEach(t => t.classList.remove('is-active'));
      modal.querySelectorAll('.modal__tabpane').forEach(p => p.classList.remove('is-active'));
      tab.classList.add('is-active');
      modal.querySelector(`[data-pane="${tab.dataset.tab}"]`).classList.add('is-active');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { modal.classList.remove('is-open'); document.body.style.overflow = ''; }
  });
}

/* ============= CHATBOT ============= */
function initChatbot() {
  const bot = document.getElementById('chatbot');
  const toggle = document.getElementById('chatbotToggle');
  const close = document.getElementById('chatbotClose');
  const body = document.getElementById('chatbotBody');
  const chips = document.getElementById('chatbotChips');
  const input = document.getElementById('chatbotInput');
  const send = document.getElementById('chatbotSend');

  toggle.addEventListener('click', () => bot.classList.toggle('is-open'));
  close.addEventListener('click', () => bot.classList.remove('is-open'));

  const addBubble = (text, who = 'bot') => {
    const b = document.createElement('div');
    b.className = 'bubble bubble--' + who;
    b.textContent = text;
    body.appendChild(b);
    body.scrollTop = body.scrollHeight;
    return b;
  };

  const replyFor = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes('umrah')) return 'For a curated Umrah, our Premium tier starts at ₹1,85,000 pp. Want me to ask an advisor to WhatsApp you a proposal?';
    if (m.includes('hajj')) return 'Hajj 2026 premium allocations are open. Group size 30, small groups only. Please share a good time to call.';
    if (m.includes('dubai')) return 'Our Dubai escape starts at ₹1,45,000 pp — Bulgari + Atlantis + desert. Shall I send the itinerary?';
    if (m.includes('human') || m.includes('call')) return 'A senior advisor will call within the hour. What number should we use?';
    if (m.includes('price') || m.includes('cost')) return 'Packages range from ₹99,000 (Essential Umrah) to ₹6,50,000 (Private Hajj). What are you exploring?';
    return 'Thank you — I\'ve noted this for our advisor. Insha\'Allah, we will call you shortly on WhatsApp.';
  };

  chips.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    addBubble(btn.textContent, 'user');
    setTimeout(() => addBubble(replyFor(btn.textContent)), 600);
  });

  const submit = () => {
    const v = input.value.trim();
    if (!v) return;
    addBubble(v, 'user');
    input.value = '';
    setTimeout(() => addBubble(replyFor(v)), 700);
  };
  send.addEventListener('click', submit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

/* ============= MISC ============= */
function initMisc() {
  // footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Smooth anchor offset
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ============= BOOKING + TOAST ============= */
window.handleBookingSubmit = function(e) {
  e.preventDefault();
  openBookingToast();
  e.target.reset();
  return false;
};

window.openBookingToast = function() {
  const t = document.getElementById('toast');
  t.classList.add('is-on');
  setTimeout(() => t.classList.remove('is-on'), 4200);
};
