import { useEffect, useRef, useState } from 'react'
import { BRAND, PIZZA_IMG } from '../brand'

const LEFT_WORDS = ['brasa', 'masa', 'leña', 'fuego']
const RIGHT_WORDS = ['pizza', 'parrilla', 'queso', 'humo']

const TITLE_LAYERS = [
  { color: BRAND.olive, desktop: 36, mobile: 18 },
  { color: BRAND.bg, desktop: 24, mobile: 12 },
  { color: BRAND.orange, desktop: 12, mobile: 6 },
  { color: BRAND.cream, desktop: 0, mobile: 0 },
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
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 500,
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

      {/* Texto sticky (z5) */}
      <div className="sticky top-0 h-screen w-full" style={{ zIndex: 5 }}>
        <div className="absolute inset-0 flex items-start justify-center pt-[2vh] md:pt-[3vh]">
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
                style={{ ...wordStyle, color: BRAND.cream, transform: `translateX(${-offset(i)}px)` }}
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
                style={{ ...wordStyle, color: BRAND.cream, transform: `translateX(${offset(i)}px)` }}
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
