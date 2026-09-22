import { useEffect, useRef, useState } from 'react'
import { BRAND, FONT_BODY, LOGO_IMG, PIZZA_IMG } from '../brand'

const LEFT_WORDS = ['brasa', 'masa', 'leña', 'fuego']
const RIGHT_WORDS = ['pizza', 'parrilla', 'queso', 'humo']

const TITLE_LAYERS = [
  { color: BRAND.goldDark, desktop: 36, mobile: 18 },
  { color: BRAND.bgPanel, desktop: 24, mobile: 12 },
  { color: BRAND.gold, desktop: 12, mobile: 6 },
  { color: BRAND.goldSoft, desktop: 0, mobile: 0 },
]

export default function Hero({ revealed }: { revealed: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const range = el.offsetHeight - window.innerHeight
      const p = range > 0 ? -rect.top / range : 0
      setProgress(Math.min(1, Math.max(0, p)))
      setIsMobile(window.innerWidth < 768)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scaleFactor = isMobile ? 0.5 : 1
  const offset = (i: number) => (60 + i * 40) * scaleFactor * (1 - progress)
  const opacity = 0.35 + progress * 0.65

  const wordStyle = {
    fontFamily: FONT_BODY,
    fontWeight: 700,
    fontSize: 'clamp(1.6rem, 7vw, 9rem)',
    lineHeight: 1.1,
    transition: 'transform 0.05s linear',
  } as const

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${revealed ? 'hero-in' : ''}`}
      style={{ height: '120vh', backgroundColor: BRAND.bg }}
    >
      {/* halo dorado de marca */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background:
            'radial-gradient(760px 340px at 50% -8%, rgba(217,169,74,0.18), transparent 70%)',
        }}
      />
      {/* Pizza (z10) */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 10 }}>
        <img
          src={PIZZA_IMG}
          alt="Pizza a la parrilla de Roderick: mitad fugazza, mitad napolitana y jamón con morrones"
          className="absolute bottom-0 left-1/2 block w-auto max-w-none -translate-x-1/2"
          style={{
            height: isMobile ? '85%' : '115%',
            maxHeight: '115%',
            minHeight: isMobile ? '0' : '80%',
            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, #000 62%, transparent 100%)',
          }}
        />
      </div>

      {/* Velo oscuro para que el logo blanco respire sobre la foto (z15) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[34vh]"
        style={{
          zIndex: 15,
          background:
            'linear-gradient(to bottom, rgba(12,11,9,0.95) 0%, rgba(12,11,9,0.75) 45%, transparent 100%)',
        }}
      />

      {/* Barra de marca: logo oficial por encima de la pizza (z20) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-2 pt-5 md:pt-7"
        style={{ zIndex: 20 }}
      >
        <img
          src={LOGO_IMG}
          alt="Roderick — Drinks & Beer"
          className="w-[min(38vw,190px)] select-none"
          style={{ filter: 'drop-shadow(0 4px 18px rgba(217,169,74,0.35))' }}
        />
        <span
          className="font-display text-[clamp(0.7rem,1.6vw,0.95rem)]"
          style={{ color: BRAND.goldSoft, letterSpacing: '0.22em' }}
        >
          Pizza a la parrilla
        </span>
      </div>

      {/* Texto sticky (z5) */}
      <div className="sticky top-0 h-screen w-full" style={{ zIndex: 5 }}>
        <div className="absolute inset-0 flex items-start justify-center pt-[22vh] md:pt-[24vh]">
          <div className="relative">
            {TITLE_LAYERS.map((layer, i) => {
              const front = i === TITLE_LAYERS.length - 1
              return (
                <h1
                  key={i}
                  aria-hidden={!front}
                  className={`font-display select-none leading-[0.85] tracking-tight ${front ? 'relative' : 'absolute inset-0'}`}
                  style={{
                    color: layer.color,
                    fontSize: 'clamp(3.5rem, 15vw, 18rem)',
                    transform: `translateY(${isMobile ? layer.mobile : layer.desktop}px)`,
                  }}
                >
                  {BRAND.name}
                </h1>
              )
            })}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 flex items-end justify-between px-[3vw] md:px-[6vw]"
          style={{ bottom: '-8vh' }}
        >
          <div className="flex flex-col gap-1 md:gap-2" style={{ opacity }}>
            {LEFT_WORDS.map((w, i) => (
              <span
                key={w}
                className="select-none uppercase"
                style={{ ...wordStyle, color: BRAND.creamDim, transform: `translateX(${-offset(i)}px)` }}
              >
                {w}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-end gap-1 md:gap-2" style={{ opacity }}>
            {RIGHT_WORDS.map((w, i) => (
              <span
                key={w}
                className="select-none text-right uppercase"
                style={{ ...wordStyle, color: BRAND.creamDim, transform: `translateX(${offset(i)}px)` }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
