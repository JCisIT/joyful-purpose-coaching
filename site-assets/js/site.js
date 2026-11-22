// Shared behavior for every page.
(() => {
  // Contact messages save to the Cosmic Weather database. This key is public by design;
  // the database rules only allow sending a message, never reading one.
  const DB_URL = 'https://ewqgwsjsmkpkpmcpsprg.supabase.co';
  const DB_KEY = 'sb_publishable_oEw63XMw_TenER3eBgGE-g_3mK-UXU1';

  // Header turns solid after scrolling.
  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr.classList.toggle('solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu.
  const drawer = document.getElementById('drawer');
  const setDrawer = (open) => drawer.classList.toggle('open', open);
  document.getElementById('burger').onclick = () => setDrawer(true);
  document.getElementById('drawerx').onclick = () => setDrawer(false);
  drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
  addEventListener('keydown', (e) => e.key === 'Escape' && setDrawer(false));

  // Calendly opens in a pop-up on the page. If its script is blocked, the link still works.
  document.querySelectorAll('a[data-calendly]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!window.Calendly) return;
      e.preventDefault();
      setDrawer(false);
      window.Calendly.initPopupWidget({ url: a.href });
    });
  });

  // Fade sections in as they scroll into view.
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Rotating testimonials.
  document.querySelectorAll('.slider').forEach((slider) => {
    const slides = [...slider.querySelectorAll('.slide')];
    const dots = slider.parentElement.querySelector('.dots');
    if (!slides.length || !dots) return;
    let cur = 0;
    const go = (i) => {
      slides[cur].classList.remove('on'); dots.children[cur].classList.remove('on');
      cur = i;
      slides[cur].classList.add('on'); dots.children[cur].classList.add('on');
    };
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Testimonial ${i + 1}`);
      b.onclick = () => { go(i); clearInterval(timer); };
      dots.appendChild(b);
    });
    go(0);
    const timer = setInterval(() => go((cur + 1) % slides.length), 6500);
  });

  // Contact form.
  const form = document.getElementById('contact-form');
  if (form) {
    const msg = form.querySelector('.msg');
    const btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      if (d.website) return; // hidden field only bots fill in
      btn.disabled = true; btn.textContent = 'Sending…';
      msg.className = 'msg';
      try {
        const r = await fetch(`${DB_URL}/rest/v1/contact_messages`, {
          method: 'POST',
          headers: { apikey: DB_KEY, Authorization: `Bearer ${DB_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
          body: JSON.stringify({ first_name: d.first_name.trim(), last_name: d.last_name.trim(), email: d.email.trim(), subject: d.subject.trim(), message: d.message.trim() }),
        });
        if (!r.ok) throw new Error(String(r.status));
        form.reset();
        msg.textContent = 'Thank you. Your message is on its way to Astra.';
        msg.className = 'msg ok';
      } catch {
        msg.textContent = "That didn't send. Please try again, or message Astra on Instagram @joyfulpurposecoaching.";
        msg.className = 'msg err';
      }
      btn.disabled = false; btn.textContent = 'Send message';
    });
  }
})();
