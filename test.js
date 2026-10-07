(async function stepFind() {
  window.__lockGen = (window.__lockGen || 0) + 1;
  window.stopLock = () => { window.__lockGen++; console.log('🛑 stopped'); };
  const log = (...a) => console.log('%c[step]', 'color:#0f0;font-weight:bold', ...a);
  const real = window.fetch;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const TARGET = 6035990000008417;

  const req = async (url, opts) => {
    const r = await real.call(window, url, Object.assign({ cache: 'no-store' }, opts));
    const t = await r.text();
    let j = null; try { j = JSON.parse(t); } catch (e) {}
    return { status: r.status, j, t };
  };

  // hidden save paths
  if (navigator.sendBeacon) {
    const ob = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = (u, d) => { log('◆ BEACON', u, String(d).slice(0, 140)); return ob(u, d); };
  }
  const XO = XMLHttpRequest.prototype.open, XS = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u, ...r) { this.__m = m; this.__u = u; return XO.call(this, m, u, ...r); };
  XMLHttpRequest.prototype.send = function (b) {
    if (/save/i.test(this.__u || '')) log('◆ XHR', this.__m, this.__u);
    return XS.call(this, b);
  };

  let s = await req('/api/save');
  if (s.status !== 200) { log('GET failed'); return; }
  let base = s.j.updatedAt, game = s.j.game;
  log('seed — money', game.money, '| base', base);

  // freeze this tab's saves, keep its token chain fed
  window.fetch = function (input, init) {
    try {
      const u = typeof input === 'string' ? input : (input && input.url) || '';
      const m = String((init && init.method) || 'GET').toUpperCase();
      if (/\/api\/save/.test(u) && m === 'PUT') {
        return Promise.resolve(new Response(JSON.stringify({ ok: true, updatedAt: base }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }));
      }
    } catch (e) {}
    return real.call(window, input, init);
  };

  let mode = 'withStats';
  const apply = (g, t) => {
    const d = Math.max(t - (g.money || 0), 0);
    g.money = t;
    if (mode === 'withStats') {
      g.stats = g.stats || {};
      g.stats.earnedTotal = (g.stats.earnedTotal || 0) + d;
      g.stats.earnedToday = (g.stats.earnedToday || 0) + d;
    }
  };

  let diag = 0;
  const write = async t => {
    for (let i = 0; i < 8; i++) {
      const g = JSON.parse(JSON.stringify(game));
      apply(g, t);
      const sent = base;
      const r = await req('/api/save', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game: g, base: sent })
      });
      if (r.status === 200) { base = r.j.updatedAt; game = g; return r; }
      if (r.status === 400) return r;
      if (r.status === 409) {
        const f = await req('/api/save');
        const got = f.j && f.j.updatedAt;
        const moved = got !== sent;
        if (diag++ < 5 || diag % 6 === 0)
          log('409 diag | sent', sent, '| GET', got, '| body', r.j && r.j.updatedAt,
              '| record moved:', moved);
        if (f.status === 200) { base = f.j.updatedAt; game = f.j.game; }
        if (!moved) {                               // record still — this is a value refusal
          if (i >= 2) return { status: 'refused', t: 'stale label, record static → value rule', j: r.j };
        } else i === 0 && (diag = 0);
        await sleep(60);
        continue;
      }
      return r;
    }
    return { status: 409, t: 'exhausted' };
  };

  const ctl = await write(game.money);
  log('control →', ctl.status, ctl.status === 200 ? '✓' : (ctl.t || '').slice(0, 80));
  if (ctl.status !== 200) { window.fetch = real; return; }

  // shot at the target straight away
  const direct = await write(TARGET);
  log('direct target →', direct.status, direct.status === 200 ? '✓✓' : ('| ' + (direct.t || '').slice(0, 70)));
  if (direct.status === 200) { log('✔ TARGET ACCEPTED immediately'); }

  // largest accepted step
  let D = 0, failStep = null;
  if (direct.status !== 200) {
    for (const d of [1e3, 1e4, 1e5, 1e6, 2e6, 5e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13]) {
      const r = await write(game.money + d);
      log('Δ', d, '→', r.status, r.status === 200 ? '✓' : ('| ' + (r.t || '').slice(0, 60)));
      if (r.status === 200) D = d;
      else {
        if (mode === 'withStats') {                 // maybe it wants pure money
          mode = 'moneyOnly';
          const r2 = await write(game.money + d);
          log('   retry moneyOnly Δ', d, '→', r2.status);
          if (r2.status === 200) { D = d; continue; }
          mode = 'withStats';
        }
        failStep = d; break;
      }
    }
    if (failStep) {
      let lo = D, hi = failStep;
      for (let i = 0; i < 16 && hi - lo > 1; i++) {
        const mid = Math.floor((lo + hi) / 2);
        const r = await write(game.money + mid);
        log('bisect Δ', mid, '→', r.status);
        if (r.status === 200) lo = mid; else hi = mid;
      }
      D = lo;
    }
  }

  log('MAX STEP D =', D.toLocaleString(), '| mode', mode, '| money now', game.money.toLocaleString());
  if (D <= 0 && game.money < TARGET) { log('✖ nothing accepted — stop, paste diags'); window.fetch = real; return; }

  // ramp with adaptive step
  let step = Math.max(D, 1), it = 0, halvings = 0;
  while (game.money < TARGET && it < 500) {
    const t = Math.min(game.money + step, TARGET);
    const r = await write(t);
    if (r.status === 200) { if (it % 20 === 0) log('ramp', game.money.toLocaleString(), '| step', step, '| writes', it); }
    else { step = Math.floor(step / 10); halvings++; if (step < 1 || halvings > 14) break; }
    it++;
  }

  if (game.money >= TARGET) log('✔ TARGET REACHED —', game.money.toLocaleString());
  else log('ramp ended — money', game.money.toLocaleString(), '| step', step, '| writes', it, '(absolute cap if step collapsed)');

  await write(game.money);                          // seal it
  const held = (await req('/api/save')).j.game.money;

  window.fetch = function (input, init) {
    try {
      const u = typeof input === 'string' ? input : (input && input.url) || '';
      const m = String((init && init.method) || 'GET').toUpperCase();
      if (/\/api\/save/.test(u) && m === 'PUT' && init && typeof init.body === 'string') {
        const b = JSON.parse(init.body);
        if (b && b.game && (b.game.money || 0) < held) {
          const d = held - (b.game.money || 0);
          b.game.money = held;
          if (mode === 'withStats') {
            b.game.stats = b.game.stats || {};
            b.game.stats.earnedTotal = (b.game.stats.earnedTotal || 0) + d;
            b.game.stats.earnedToday = (b.game.stats.earnedToday || 0) + d;
          }
          init = Object.assign({}, init, { body: JSON.stringify(b) });
          log('autosave rewritten →', held.toLocaleString());
        }
      }
    } catch (e) {}
    return real.call(window, input, init);
  };

  for (const k of Object.keys(localStorage)) {
    if (!/^lagos-life-save/.test(k)) continue;
    try {
      const o = JSON.parse(localStorage.getItem(k));
      if (o && o.state && o.state.game) { o.state.game.money = held; localStorage.setItem(k, JSON.stringify(o)); }
    } catch (e) {}
  }
  log('FINAL — server holds', held.toLocaleString(), '| mode', mode, '| RELOAD now');
})();