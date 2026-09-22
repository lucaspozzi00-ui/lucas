import { useState } from 'react'
import PizzaIntro from './components/PizzaIntro'
import Hero from './components/Hero'
import Marquee from './components/Marquee'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  return (
    <>
      {!introDone && <PizzaIntro onDone={() => setIntroDone(true)} />}
      <Hero revealed={introDone} />
      <Marquee />
    </>
  )
}
