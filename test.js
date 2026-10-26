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

// this is it:: <div class="space-y-5" style="opacity: 1; transform: none;"><div class="mx-auto max-w-3xl space-y-1 px-4 sm:px-6"><p class="dark:text-iron-100 text-xl font-medium text-gray-800">ana.clothing</p><p class="dark:text-iron-300 max-w-3xl text-base text-gray-700">I wanted to develop a small site to showcase some of my favourite clothing and accessory brands.</p></div><div class="w-screen overflow-x-auto overflow-y-visible py-4 [scrollbar-width:none]" style="margin-left:calc(-50vw + 50%);padding-left:max(1.5rem, calc(50vw - 24rem + 1.5rem));padding-right:1.5rem"><div class="flex items-start gap-x-4 [&amp;&gt;*:last-child]:pr-20"><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs" style="transform: none;"><img alt="Rows" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F1.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F1.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F1.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Rows</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="ana.clothing image 2" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F2.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F2.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F2.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Scrolling" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F3.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F3.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fclothing%2F3.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Scrolling</figcaption></div></div></div></div> 
// whwre can i use this thingy in my app: <div class="w-screen overflow-x-auto overflow-y-visible py-4 [scrollbar-width:none]" style="margin-left:calc(-50vw + 50%);padding-left:max(1.5rem, calc(50vw - 24rem + 1.5rem));padding-right:1.5rem"><div class="flex items-start gap-x-4 [&amp;&gt;*:last-child]:pr-20"><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs" style="transform: none;"><img alt="Dashboard" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F1.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F1.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F1.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Dashboard</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs" style="transform: none;"><img alt="Lesson Page" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F2.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F2.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F2.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Lesson Page</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Theatre mode" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F3.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F3.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F3.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Theatre mode</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Tablet" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F4.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F4.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F4.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Tablet</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Forums" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F5.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F5.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F5.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Forums</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Cyfrin Updraft image 6" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F6.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F6.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F6.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Quiz results" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F7.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F7.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F7.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Quiz results</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Individual course" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F8.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F8.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F8.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Individual course</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Modals" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F10.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F10.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F10.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button><figcaption class="dark:text-iron-500 pl-1 text-xs font-medium text-gray-400 uppercase sm:text-sm">Modals</figcaption></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Cyfrin Updraft image 10" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F11.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F11.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F11.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button></div><div class="shrink-0 space-y-2"><button type="button" class="dark:border-iron-800 block h-fit w-fit cursor-zoom-in overflow-clip rounded-lg border border-gray-200 shadow-xs"><img alt="Cyfrin Updraft image 11" loading="lazy" width="800" height="420" decoding="async" data-nimg="1" class="pointer-events-none h-[216px] w-auto sm:h-[420px]" style="color:transparent" srcset="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F12.png&amp;w=828&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 1x, /_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F12.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp 2x" src="/_next/image?url=%2Fimages%2Fportfolio%2Fupdraft%2F12.png&amp;w=1920&amp;q=75&amp;dpl=dpl_AJbXUMHdg4d8UEbHVoHovXe7V6hp"></button></div></div></div>