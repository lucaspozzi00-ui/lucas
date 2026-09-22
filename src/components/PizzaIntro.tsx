import { useEffect, useState } from 'react'
import { BRAND, PIZZA_IMG } from '../brand'

// Corte diagonal: sigue la dirección de la tabla en la foto.
const CUT_A = 'polygon(0 0, 64% 0, 36% 100%, 0 100%)'
const CUT_B = 'polygon(64% 0, 100% 0, 100% 100%, 36% 100%)'
const TOTAL_MS = 3600

export default function PizzaIntro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('intro-lock')
    window.scrollTo(0, 0)
    const t = window.setTimeout(finish, reduced ? 0 : TOTAL_MS)
    return () => {
      window.clearTimeout(t)
      document.body.classList.remove('intro-lock')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish() {
    document.body.classList.remove('intro-lock')
    setVisible(false)
    onDone()
  }

  if (!visible) return null

  const half = (clip: string, cls: string) => (
    <div className={`absolute inset-0 ${cls}`} style={{ clipPath: clip }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PIZZA_IMG})` }}
      />
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <div className="intro-bg absolute inset-0" style={{ backgroundColor: BRAND.bg }} />

      <div className="intro-dolly absolute inset-0 will-change-transform">
        {half(CUT_A, 'intro-split-a')}
        {half(CUT_B, 'intro-split-b')}
      </div>

      {/* viñeta tipo foto de producto */}
      <div
        className="intro-bg pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)' }}
      />

      {/* vapor */}
      {[18, 42, 63, 80].map((left, i) => (
        <div
          key={left}
          className="pointer-events-none absolute bottom-0 h-[40vh] w-[30vw] rounded-full"
          style={{
            left: `${left - 15}%`,
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.5), transparent)',
            filter: 'blur(30px)',
            animation: `intro-steam 2.6s ease-out ${0.4 + i * 0.25}s both`,
          }}
        />
      ))}

      {/* filo del cuchillo */}
      <svg className="intro-knife pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="64" y1="0" x2="36" y2="100" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 6px #fff) drop-shadow(0 0 18px ' + BRAND.orange + ')' }} />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span
          className="intro-word font-display text-[clamp(3rem,12vw,10rem)]"
          style={{ color: BRAND.cream, textShadow: '0 6px 40px rgba(0,0,0,0.7)' }}
        >
          {BRAND.name}
        </span>
      </div>

      <button
        onClick={finish}
        className="absolute bottom-6 right-6 rounded-full border border-white/30 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white/80 backdrop-blur hover:bg-white/10"
      >
        Saltar
      </button>
    </div>
  )
}
