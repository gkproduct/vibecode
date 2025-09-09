import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Benefits } from './components/Benefits'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { CTA } from './components/CTA'

export function App() {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <Testimonials />
      <CTA />
      <footer className="section border-t border-base-gray text-sm text-neutral-600">
        <div className="container mx-auto container-px flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} EazyCRM. Все права защищены.</p>
          <div className="flex gap-4">
            <a className="hover:text-accent-orange" href="#pricing">Тарифы</a>
            <a className="hover:text-accent-orange" href="#how">Как это работает</a>
            <a className="hover:text-accent-orange" href="#">Политика конфиденциальности</a>
          </div>
        </div>
      </footer>
    </div>
  )
}


