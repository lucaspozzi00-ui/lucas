import { BRAND } from '../brand'

const TEXT =
  'PIZZA A LA PARRILLA · HAMBURGUESAS · MILANESAS · ENTRADAS · DRINKS & BEER · RODERICK · '

export default function Marquee() {
  return (
    <div
      className="w-full overflow-hidden py-6 md:py-8"
      style={{
        backgroundColor: BRAND.gold,
        borderTop: `1px solid ${BRAND.line}`,
        borderBottom: `1px solid ${BRAND.line}`,
      }}
    >
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            aria-hidden={i > 0}
            className="font-display shrink-0 select-none uppercase"
            style={{
              color: BRAND.ink,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
              paddingRight: '0.25em',
            }}
          >
            {TEXT}
          </span>
        ))}
      </div>
    </div>
  )
}
