// =========================================================================
// LAGOS LIFE — LIVE TRILLIONAIRE INJECTOR & PERSISTENCE ENGINE
// =========================================================================
(async function liveTrillionaire() {
  const TRILLION = 1_000_000_000_000; // ₦1,000,000,000,000
  const log = (...a) => console.log('%c[trillionaire]', 'color:#0f0;font-weight:bold;font-size:14px', ...a);
  const warn = (...a) => console.log('%c[trillionaire]', 'color:#fa0;font-weight:bold', ...a);

  const real = window.__realFetch || window.fetch;
  window.__realFetch = real;

  log('🔍 Fetching base save from server...');
  const res = await real.call(window, '/api/save', { cache: 'no-store' });
  if (!res.ok) {
    warn('Could not reach /api/save:', res.status);
    return;
  }

  const data = await res.json();
  let baseGame = data.game;
  let currentToken = data.updatedAt || Date.now();

  log(`Current Server Balance: ₦${(baseGame?.money || 0).toLocaleString()}`);
  log(`Target Balance: ₦${TRILLION.toLocaleString()} (1 Trillion)`);

  // Create our Trillionaire game save
  let moddedGame = JSON.parse(JSON.stringify(baseGame));
  moddedGame.money = TRILLION;
  if (moddedGame.stats) {
    moddedGame.stats.earnedTotal = Math.max(moddedGame.stats.earnedTotal || 0, TRILLION);
  }

  // 1. Intercept BOTH GET and PUT saves so the game ALWAYS sees 1 Trillion
  window.fetch = async function (input, init) {
    try {
      const u = typeof input === 'string' ? input : (input && input.url) || '';
      const m = String((init && init.method) || 'GET').toUpperCase();

      // Intercept GET /api/save: Feed 1 Trillion to the game engine
      if (/\/api\/save(\?.*)?$/.test(u) && m === 'GET') {
        currentToken = Date.now();
        return new Response(JSON.stringify({
          ok: true,
          updatedAt: currentToken,
          game: moddedGame
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Intercept PUT /api/save: Protect 1 Trillion from being downgraded
      if (/\/api\/save/.test(u) && m === 'PUT') {
        if (init && typeof init.body === 'string') {
          try {
            const bodyObj = JSON.parse(init.body);
            if (bodyObj.game) {
              // If user spent money in game (e.g. bought a house), update our held money!
              if (bodyObj.game.money < moddedGame.money && bodyObj.game.money > (TRILLION - 500_000_000_000)) {
                moddedGame.money = bodyObj.game.money;
              } else {
                bodyObj.game.money = moddedGame.money;
              }
              init = Object.assign({}, init, { body: JSON.stringify(bodyObj) });
            }
          } catch (e) {}
        }
        currentToken = Date.now();
        return Promise.resolve(new Response(JSON.stringify({
          ok: true,
          updatedAt: currentToken
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
    } catch (e) {}
    return real.call(window, input, init);
  };

  // 2. Trigger Lagos Life's internal state updater (without reloading!)
  // In Lagos Life, calling GET /api/save triggers onStaleSave / checkNewer listener!
  try {
    const trigger = await window.fetch('/api/save');
    const triggerData = await trigger.json();
    log('⚡ Dispatched state refresh event to Lagos Life engine.');
  } catch (e) {}

  // 3. Search React Fiber tree to force live re-render of balance on screen
  let fiberFound = false;
  function updateFiberState() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
    let node;
    while ((node = walker.nextNode())) {
      const fiberKey = Object.keys(node).find(k => k.startsWith('__reactFiber$'));
      if (!fiberKey) continue;
      let fiber = node[fiberKey];
      while (fiber) {
        if (fiber.memoizedState && typeof fiber.memoizedState === 'object') {
          // Check for Zustand store or component state holding game
          let s = fiber.memoizedState;
          while (s) {
            if (s.memoizedState && typeof s.memoizedState === 'object' && s.memoizedState.money !== undefined) {
              s.memoizedState.money = TRILLION;
              fiberFound = true;
            }
            s = s.next;
          }
        }
        fiber = fiber.return;
      }
    }
  }

  try { updateFiberState(); } catch (e) {}

  log('\n🎉 SUCCESS: 1 TRILLION IS NOW ACTIVE IN THIS TAB!');
  log('💰 Balance set to: ₦1,000,000,000,000');
  log('🛍️ You can now spend, buy houses, cars, and items in the game without limit!');
  log('⚠️ NOTE: Do NOT reload the tab. Reloading restarts the browser tab and clears injected code.');
})();