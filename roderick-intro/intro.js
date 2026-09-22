/*
 * Roderick · animación de entrada
 * Se agrega al sitio con una sola línea dentro de <head>:
 *   <script src="/roderick-intro/intro.js"></script>
 * Tapa la página, corre la animación (~5 s) y desaparece. No modifica nada del sitio.
 * Se muestra una vez por visita (sessionStorage). Para verla siempre: ?intro=1
 */
(function () {
  var BASE = (document.currentScript && document.currentScript.src || '').replace(/[^/]*$/, '')
  var KEY = 'roderick-intro-visto'
  var force = /[?&]intro=1/.test(location.search)

  try {
    if (!force && sessionStorage.getItem(KEY)) return
    sessionStorage.setItem(KEY, '1')
  } catch (e) {}
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return

  var landscape = window.innerWidth > window.innerHeight
  var PIZZA = BASE + (landscape ? 'pizza-h.jpg' : 'pizza-v.jpg')
  // Versión 4K (upscale Higgs). Si carga, reemplaza a la local sin que se note el cambio.
  var PIZZA_4K = 'https://d2ol7oe51mr4n9.cloudfront.net/user_3Jb92LJaGWIxuHuPn3iLmr8dXg6/' +
    (landscape ? '13162063-5f8c-4f7c-8c41-a0fe5bf9871b.jpg' : '15b0cdbd-baf8-4afe-aefb-76e202e941ce.jpg')
  var LOGO = BASE + 'logo.png'

  var css = [
    '#rdi{position:fixed;inset:0;z-index:2147483647;overflow:hidden;background:#0c0b09;pointer-events:auto}',
    '#rdi *{box-sizing:border-box;margin:0;padding:0}',
    // pizza de fondo, nítida, con acercamiento lento
    '#rdi .rdi-pz{position:absolute;inset:0;transform:scale(1.12);transition:transform 5s cubic-bezier(.22,.61,.36,1)}',
    '#rdi .rdi-half{position:absolute;inset:0;background-size:cover;background-position:center;',
    '  transition:transform 1.05s cubic-bezier(.76,0,.24,1),opacity 1.05s ease}',
    '#rdi .rdi-a{clip-path:polygon(0 0,62% 0,38% 100%,0 100%)}',
    '#rdi .rdi-b{clip-path:polygon(62% 0,100% 0,100% 100%,38% 100%)}',
    '#rdi .rdi-vig{position:absolute;inset:0;pointer-events:none;',
    '  background:radial-gradient(ellipse at center,rgba(12,11,9,.15) 30%,rgba(12,11,9,.75) 100%);transition:opacity .6s}',
    // telón negro que se abre al medio
    '#rdi .rdi-door{position:absolute;top:0;bottom:0;width:50.5%;background:#0c0b09;',
    '  transition:transform 1.1s cubic-bezier(.76,0,.24,1)}',
    '#rdi .rdi-dl{left:0;box-shadow:12px 0 40px rgba(0,0,0,.6)}',
    '#rdi .rdi-dr{right:0;box-shadow:-12px 0 40px rgba(0,0,0,.6)}',
    // línea dorada vertical
    '#rdi .rdi-vline{position:absolute;left:50%;top:0;width:2px;height:100%;margin-left:-1px;',
    '  background:linear-gradient(#ecca7f,#d9a94a 50%,#8a6a2c);box-shadow:0 0 12px #d9a94a,0 0 30px rgba(217,169,74,.6);',
    '  transform:scaleY(0);transform-origin:top;transition:transform .5s cubic-bezier(.65,0,.35,1),opacity .3s}',
    // corte diagonal
    '#rdi svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
    '#rdi .rdi-cut{clip-path:inset(0 0 100% 0);transition:clip-path .4s cubic-bezier(.7,0,.3,1),opacity .3s}',
    '#rdi .rdi-knife{stroke:#fff;stroke-width:2;fill:none;filter:drop-shadow(0 0 6px #fff) drop-shadow(0 0 16px #d9a94a)}',
    // logo
    '#rdi .rdi-brand{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;pointer-events:none;',
    '  opacity:0;transform:scale(.94);transition:opacity .8s ease,transform 1.2s cubic-bezier(.16,1,.3,1)}',
    '#rdi .rdi-brand::before{content:"";position:absolute;width:min(90vw,760px);height:min(60vh,460px);',
    '  background:radial-gradient(closest-side,rgba(12,11,9,.8),rgba(12,11,9,0));z-index:-1}',
    '#rdi .rdi-brand img{width:min(62vw,420px);height:auto;filter:drop-shadow(0 6px 24px rgba(0,0,0,.6))}',
    '#rdi .rdi-tag{font-family:Anton,Impact,"Arial Narrow",sans-serif;color:#ecca7f;letter-spacing:.32em;',
    '  font-size:clamp(14px,2.2vw,22px);text-transform:uppercase;padding-left:.32em}',
    '#rdi .rdi-skip{position:absolute;right:20px;bottom:20px;font:600 11px/1 Nunito,Arial,sans-serif;letter-spacing:.2em;',
    '  text-transform:uppercase;color:#f5efe0;background:rgba(12,11,9,.5);border:1px solid rgba(217,169,74,.5);',
    '  border-radius:999px;padding:10px 16px;cursor:pointer;pointer-events:auto}',
    '#rdi .rdi-skip:hover{background:rgba(217,169,74,.2)}',
    '#rdi.rdi-out{opacity:0;transition:opacity .45s ease}',
  ].join('\n')

  var style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)

  var root = document.createElement('div')
  root.id = 'rdi'
  root.setAttribute('aria-hidden', 'true')
  root.innerHTML =
    '<div class="rdi-pz">' +
    '  <div class="rdi-half rdi-a"></div><div class="rdi-half rdi-b"></div>' +
    '</div>' +
    '<div class="rdi-vig"></div>' +
    '<svg class="rdi-cut" viewBox="0 0 100 100" preserveAspectRatio="none"><line class="rdi-knife" x1="62" y1="0" x2="38" y2="100" vector-effect="non-scaling-stroke"/></svg>' +
    '<div class="rdi-door rdi-dl"></div><div class="rdi-door rdi-dr"></div>' +
    '<div class="rdi-vline"></div>' +
    '<div class="rdi-brand"><img alt="Roderick" src="' + LOGO + '"><span class="rdi-tag">Pizza a la parrilla</span></div>' +
    '<button class="rdi-skip" type="button">Saltar</button>'

  var halves = root.querySelectorAll('.rdi-half')
  function setPizza(src) {
    for (var i = 0; i < halves.length; i++) halves[i].style.backgroundImage = 'url("' + src + '")'
  }
  setPizza(PIZZA)
  var hd = new Image()
  hd.onload = function () { if (!done) setPizza(PIZZA_4K) }
  hd.src = PIZZA_4K

  var q = function (s) { return root.querySelector(s) }
  var html = document.documentElement
  var prevOverflow = html.style.overflow
  html.style.overflow = 'hidden'
  html.appendChild(root)

  var timers = []
  var done = false
  function at(ms, fn) { timers.push(setTimeout(fn, ms)) }

  function finish() {
    if (done) return
    done = true
    timers.forEach(clearTimeout)
    root.classList.add('rdi-out')
    setTimeout(function () {
      root.remove()
      style.remove()
      html.style.overflow = prevOverflow
    }, 460)
  }
  q('.rdi-skip').addEventListener('click', finish)

  function play() {
    var brand = q('.rdi-brand'), vline = q('.rdi-vline'), knife = q('.rdi-cut')
    // 1. logo sobre negro
    at(50, function () { brand.style.opacity = '1'; brand.style.transform = 'scale(1)' })
    // 2. línea dorada al medio
    at(900, function () { vline.style.transform = 'scaleY(1)' })
    // 3. se abre la pantalla y aparece la pizza
    at(1450, function () {
      q('.rdi-dl').style.transform = 'translateX(-102%)'
      q('.rdi-dr').style.transform = 'translateX(102%)'
      vline.style.opacity = '0'
      q('.rdi-pz').style.transform = 'scale(1)'
    })
    // 4. sale el logo, corte diagonal
    at(3300, function () { brand.style.opacity = '0'; brand.style.transform = 'scale(1.04)' })
    at(3500, function () { knife.style.clipPath = 'inset(0 0 0 0)' })
    // 5. la pizza se parte y deja ver la página
    at(3950, function () {
      knife.style.opacity = '0'
      q('.rdi-vig').style.opacity = '0'
      root.style.background = 'transparent'
      halves[0].style.transform = 'translate(-30vw,10vh) rotate(-4deg)'
      halves[1].style.transform = 'translate(30vw,-10vh) rotate(4deg)'
      halves[0].style.opacity = halves[1].style.opacity = '0'
    })
    at(5000, finish)
  }

  // Arranca cuando la foto y el logo están cargados (máximo 2,5 s de espera).
  var pending = 2, started = false
  function ready() { if (--pending <= 0 && !started) { started = true; play() } }
  ;[PIZZA, LOGO].forEach(function (src) {
    var im = new Image()
    im.onload = im.onerror = ready
    im.src = src
  })
  setTimeout(function () { if (!started) { started = true; play() } }, 2500)
})()
