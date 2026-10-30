/* Tasbih install popup (PWA). Shows a bottom sheet asking the user to install the app.
   - Android/Chrome: uses the real install prompt
   - iPhone/iPad Safari: shows "Share -> Add to Home Screen" steps
   - Hidden inside the Android APK and when already installed
   - If dismissed, it stays away for 3 days. Menu -> More -> Install always opens it. */
(function () {
  'use strict';
  var KEY = 'tasbih.install.dismissed', WAIT = 3 * 24 * 3600 * 1000;
  var ua = navigator.userAgent || '';
  var inApp = /TasbihApp/.test(ua);
  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var ios = /iphone|ipad|ipod/i.test(ua) && !window.MSStream;
  var web = /^https?:/.test(location.protocol);
  var deferred = null, box = null, shown = false;

  function get() { try { return +localStorage.getItem(KEY) || 0; } catch (e) { return 0; } }
  function set() { try { localStorage.setItem(KEY, String(Date.now())); } catch (e) {} }

  function css() {
    if (document.getElementById('ti-css')) return;
    var s = document.createElement('style'); s.id = 'ti-css';
    s.textContent =
      '#ti{position:fixed;left:0;right:0;bottom:0;z-index:99999;display:flex;justify-content:center;padding:0 12px calc(12px + env(safe-area-inset-bottom,0px));transform:translateY(120%);transition:transform .45s cubic-bezier(.2,.8,.2,1);font-family:system-ui,-apple-system,"Segoe UI",sans-serif}' +
      '#ti.on{transform:none}' +
      '#ti .c{width:100%;max-width:420px;box-sizing:border-box;background:linear-gradient(rgba(10,22,42,.97),rgba(5,12,24,.98));border:1px solid rgba(255,255,255,.18);border-radius:20px;padding:16px;color:#fff;box-shadow:0 10px 40px rgba(0,0,0,.55)}' +
      '#ti .h{display:flex;gap:12px;align-items:center}' +
      '#ti img{width:52px;height:52px;border-radius:12px;flex:none}' +
      '#ti b{display:block;font-size:16px;line-height:1.2}' +
      '#ti p{margin:3px 0 0;font-size:13px;line-height:1.4;color:#a9bdd3}' +
      '#ti .r{display:flex;gap:10px;margin-top:14px}' +
      '#ti button{flex:1;font:inherit;font-size:14px;font-weight:600;padding:11px 0;border-radius:12px;cursor:pointer;border:1px solid rgba(255,255,255,.22);background:transparent;color:#cfe0f2}' +
      '#ti button.p{background:#5fd8ee;border-color:#5fd8ee;color:#04202a}' +
      '#ti ol{margin:12px 0 0;padding-left:20px;font-size:13px;line-height:1.7;color:#dbe8f5}';
    document.head.appendChild(s);
  }

  function close(remember) {
    if (!box) return;
    box.classList.remove('on');
    var b = box; box = null; shown = false;
    setTimeout(function () { b.remove(); }, 500);
    if (remember) set();
  }

  function open(force) {
    if (inApp || standalone || shown) return false;
    if (!force && Date.now() - get() < WAIT) return false;
    css();
    var manual = !deferred;
    var body = manual
      ? (ios
          ? '<ol><li>Tap the <b style="display:inline">Share</b> button in Safari</li><li>Choose <b style="display:inline">Add to Home Screen</b></li></ol>'
          : '<ol><li>Open the browser menu ⋮</li><li>Tap <b style="display:inline">Install app</b> or <b style="display:inline">Add to Home screen</b></li></ol>')
      : '';
    box = document.createElement('div'); box.id = 'ti';
    box.innerHTML =
      '<div class="c" role="dialog" aria-label="Install Tasbih"><div class="h"><img src="app-icon-512.png" alt="">' +
      '<div><b>Install Tasbih</b><p>Add it to your home screen for quick, full-screen, offline use.</p></div></div>' + body +
      '<div class="r"><button type="button" id="ti-no">' + (manual ? 'Close' : 'Not now') + '</button>' +
      (manual ? '' : '<button type="button" class="p" id="ti-yes">Install</button>') + '</div></div>';
    document.body.appendChild(box);
    shown = true;
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (box) box.classList.add('on'); }); });
    box.querySelector('#ti-no').onclick = function () { close(true); };
    var yes = box.querySelector('#ti-yes');
    if (yes) yes.onclick = function () {
      var p = deferred; deferred = null; close(false);
      if (p) { p.prompt(); if (p.userChoice) p.userChoice.then(function (r) { if (r.outcome !== 'accepted') set(); }); }
    };
    return true;
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (document.readyState === 'complete') setTimeout(function () { open(false); }, 2500);
    else window.addEventListener('load', function () { setTimeout(function () { open(false); }, 2500); });
  });
  window.addEventListener('appinstalled', function () { deferred = null; close(false); set(); });

  // iOS never fires beforeinstallprompt: show the steps once after load
  if (ios && web && !standalone && !inApp) {
    window.addEventListener('load', function () { setTimeout(function () { open(false); }, 3000); });
  }

  window.TasbihInstall = { open: function () { return open(true); }, close: function () { close(false); } };
})();
