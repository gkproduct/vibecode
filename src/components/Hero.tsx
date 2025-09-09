export function Hero() {
  return (
    <header className="section pt-12 sm:pt-16 lg:pt-20">
      <nav className="container mx-auto container-px flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent-emerald" />
          <span className="text-lg font-semibold">EazyCRM</span>
        </div>
        <div className="hidden gap-6 sm:flex">
          <a href="#how" className="hover:text-accent-orange">Как это работает</a>
          <a href="#benefits" className="hover:text-accent-orange">Преимущества</a>
          <a href="#pricing" className="hover:text-accent-orange">Тарифы</a>
        </div>
        <a href="#cta" className="btn-primary">Подключить бота</a>
      </nav>

      <div className="container mx-auto container-px grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="badge mb-5">CRM-бот для экспертов</span>
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Автоматизируйте заявки и оплаты в мессенджерах за 1 день
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-600">
            EazyCRM помогает тренерам, репетиторам и онлайн-наставникам собирать лиды, принимать
            оплаты и вести коммуникацию с учениками — без сложных настроек и дорогостоящих систем.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cta" className="btn-primary">Подключить бота</a>
            <a href="#pricing" className="btn-secondary">Попробовать бесплатно</a>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-green" />
              Без кода
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-orange" />
              Оплаты и подписки
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-yellow" />
              Telegram/WhatsApp
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl border border-base-gray bg-gradient-to-br from-base-light to-white p-4 shadow-soft">
            <div className="h-full w-full rounded-xl border border-base-gray bg-white p-6">
              <div className="grid h-full grid-rows-3 gap-4">
                <div className="rounded-lg bg-base-light" />
                <div className="rounded-lg bg-base-light" />
                <div className="rounded-lg bg-base-light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}


