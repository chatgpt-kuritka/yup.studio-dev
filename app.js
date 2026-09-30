const all=window.__CONTENT__||{};
const pick=()=>{
  const stored=localStorage.getItem('yup-language');
  if(stored&&all[stored]) return stored;
  const browser=(navigator.language||'en').toLowerCase();
  return browser.startsWith('cs')&&all.cs?'cs':'en';
};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const render=lang=>{
  const d=all[lang]||all.en;
  document.documentElement.lang=lang;
  document.title=d.seo.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content',d.seo.description);
  const items=x=>x.map(v=>'<li>'+esc(v)+'</li>').join('');
  const features=d.features.map(f=>'<article class="card"><h3>'+esc(f.title)+'</h3><p>'+esc(f.text)+'</p></article>').join('');
  const steps=d.process.steps.map((s,i)=>'<article class="card"><div class="eyebrow">'+(i+1)+'</div><h3>'+esc(s.title)+'</h3><p>'+esc(s.text)+'</p></article>').join('');
  const highlights=d.highlights.map(v=>'<span class="pill">'+esc(v)+'</span>').join('');
  document.querySelector('#app').innerHTML=
    '<header class="wrap header"><a class="brand" href="#top"><img src="/assets/logo-girl.svg" alt=""><span>yup<span class="dot">.studio</span></span></a><div class="header-actions"><button class="ghost" data-lang="cs">CZ</button><button class="ghost" data-lang="en">EN</button></div></header>'+
    '<main id="top">'+
      '<section class="wrap hero"><h1>'+esc(d.hero.title)+'</h1><p>'+esc(d.hero.text)+'</p><div class="price">'+esc(d.hero.price)+'</div><div class="hero-actions"><a class="cta" href="#kontakt">'+esc(d.hero.primaryCta)+'</a><a class="ghost inline" href="#jak-to-funguje">'+esc(d.hero.secondaryCta)+'</a></div><div class="pills">'+highlights+'</div></section>'+
      '<section class="wrap section"><div class="eyebrow">'+esc(d.audience.title)+'</div><ul class="clean-list">'+items(d.audience.items)+'</ul></section>'+
      '<section class="wrap section" id="jak-to-funguje"><h2>'+esc(d.process.title)+'</h2><div class="cards">'+steps+'</div></section>'+
      '<section class="wrap section"><h2>'+esc(d.included.title)+' <span class="accent">'+esc(d.included.price)+'</span></h2><ul class="clean-list">'+items(d.included.items)+'</ul><p class="muted">'+esc(d.included.note)+'</p></section>'+
      '<section class="wrap section"><h2>'+esc(d.management.title)+'</h2><p class="price-small">'+esc(d.management.price)+'</p><p class="muted">'+esc(d.management.text)+'</p></section>'+
      '<section class="wrap section"><div class="cards">'+features+'</div></section>'+
      '<section class="wrap section" id="kontakt"><h2>'+esc(d.contact.title)+'</h2><p class="muted">'+esc(d.contact.text)+'</p><form class="form" data-form>'+
        '<div class="field"><label>'+esc(d.contact.fields.name)+'</label><input name="name" required autocomplete="name"></div>'+
        '<div class="field"><label>'+esc(d.contact.fields.email)+'</label><input name="email" type="email" required autocomplete="email"></div>'+
        '<div class="field"><label>'+esc(d.contact.fields.phone)+'</label><input name="phone" type="tel" autocomplete="tel"></div>'+
        '<div class="field"><label>'+esc(d.contact.fields.website)+'</label><input name="website"></div>'+
        '<div class="field full"><label>'+esc(d.contact.fields.message)+'</label><textarea name="message" rows="5" required></textarea></div>'+
        '<div class="field full"><button class="cta" type="submit">'+esc(d.contact.submit)+'</button></div>'+
      '</form><div class="success" data-success role="status"><div class="check">✓</div><div><strong>'+esc(d.contact.successTitle)+'</strong><p>'+esc(d.contact.successText)+'</p></div></div></section>'+
    '</main>'+
    '<footer class="footer"><div class="wrap footer-row"><a class="brand" href="#top"><span>yup<span class="dot">.studio</span></span></a><small>'+esc(d.footer.copyright)+'</small></div></footer>';
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('yup-language',b.dataset.lang);render(b.dataset.lang)}));
  const form=document.querySelector('[data-form]');
  if(form) form.addEventListener('submit',e=>{e.preventDefault();form.hidden=true;document.querySelector('[data-success]')?.classList.add('show')});
};
render(pick());
