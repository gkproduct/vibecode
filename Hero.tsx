import React from 'react'

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page pt-16 md:pt-24 pb-10 md:pb-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge mb-4">CRM‑бот для экспертов</span>
          <h1 className="mb-4">Автоматизируйте заявки, оплаты и коммуникации в мессенджерах</h1>
          <p className="mb-8 max-w-xl">EazyCRM помогает тренерам, репетиторам и наставникам собирать лиды, напоминать об уроках, принимать оплаты и поддерживать контакт с клиентами — без рутины и лишних инструментов.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#cta" className="btn-primary">Подключить бота</a>
            <a href="#how" className="btn-secondary">Как это работает</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-brand-muted">
            <div className="flex -space-x-3">
              <span className="inline-block h-8 w-8 rounded-full bg-amber-300 border-2 border-white"></span>
              <span className="inline-block h-8 w-8 rounded-full bg-emerald-300 border-2 border-white"></span>
              <span className="inline-block h-8 w-8 rounded-full bg-lime-300 border-2 border-white"></span>
            </div>
            <span>Уже выбрали 1 200+ экспертов</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="h-3 w-24 rounded bg-neutral-100"></div>
                <div className="h-3 w-16 rounded bg-neutral-100"></div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="h-3 w-3/4 rounded bg-neutral-100"></div>
                <div className="h-3 w-2/3 rounded bg-neutral-100"></div>
                <div className="h-3 w-1/2 rounded bg-neutral-100"></div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="btn-primary">Новая рассылка</button>
              <button className="btn-secondary">Импорт лидов</button>
            </div>
          </div>
          <div className="absolute -z-10 -right-24 -top-24 h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl"></div>
          <div className="absolute -z-10 -left-24 -bottom-24 h-64 w-64 rounded-full bg-brand-accentAlt/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero


