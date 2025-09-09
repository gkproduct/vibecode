export function Benefits() {
  const items = [
    {
      title: 'Простота без кода',
      desc: 'Готовые сценарии и блоки. Подходит без тех. подговки.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: 'Мессенджеры и платежи',
      desc: 'Telegram/WhatsApp, Stripe/ЮKassa, подписки и разовые оплаты.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: 'Автоматизация задач',
      desc: 'Напоминания, рассылки, триггеры — рост LTV и удержания.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: 'Прозрачная аналитика',
      desc: 'Конверсия воронки, оплаты, активность — всё в одном месте.',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 20V8m6 12V4m6 16v-6m4 6H2" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    }
  ]

  return (
    <section id="benefits" className="section bg-base-light/60">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Почему именно EazyCRM</h2>
        <p className="mt-3 text-neutral-600">Фокус на простоте, результатах и экономии времени</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((b, i) => (
          <div key={i} className="rounded-2xl border border-base-gray bg-white p-6 shadow-soft">
            <div className="text-accent-orange">{b.icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-neutral-600">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


