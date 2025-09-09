import React from 'react'
import Hero from './sections/Hero'
import HowItWorks from './sections/HowItWorks'
import Benefits from './sections/Benefits'
import Pricing from './sections/Pricing'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'

const App: React.FC = () => {
  return (
    <div>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-neutral-100">
        <div className="container-page flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-brand-accent inline-flex items-center justify-center text-white font-bold">E</span>
            <span className="text-lg font-semibold tracking-tight">EazyCRM</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#how" className="hover:text-brand-accent">Как это работает</a>
            <a href="#benefits" className="hover:text-brand-accent">Преимущества</a>
            <a href="#pricing" className="hover:text-brand-accent">Цены</a>
            <a href="#testimonials" className="hover:text-brand-accent">Кейсы</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#cta" className="btn-secondary">Демо</a>
            <a href="#cta" className="btn-primary">Подключить бота</a>
          </div>
        </div>
      </header>

      <main id="top">
        <Hero />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>

      <footer className="border-t border-neutral-100 mt-16">
        <div className="container-page py-10 text-sm text-brand-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} EazyCRM. Все права защищены.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-brand-accent">Политика конфиденциальности</a>
            <a href="#" className="hover:text-brand-accent">Пользовательское соглашение</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


