export function HowItWorks() {
  const steps = [
    {
      title: 'Подключите бота',
      desc: 'Подтвердите доступ к Telegram/WhatsApp и выберите сценарий.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: 'Создайте воронку',
      desc: 'Используйте готовые блоки: заявка, оплата, доступ, рассылка.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: 'Принимайте оплаты',
      desc: 'Подключите Stripe/ЮKassa и запускайте подписки и разовые платежи.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    },
    {
      title: 'Растите LTV',
      desc: 'Авторассылки, напоминания и вледение клиента после покупки.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12l4 4 12-12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      )
    }
  ]

  return (
    <section id="how" className="section">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Как это работает</h2>
        <p className="mt-3 text-neutral-600">4 шага до первой оплаты от ученика</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={i} className="rounded-2xl border border-base-gray bg-white p-6 shadow-soft">
            <div className="text-accent-emerald">{s.icon}</div>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-neutral-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


