type Plan = {
  name: string
  price: string
  period: string
  features: string[]
  highlight?: boolean
}

const plans: Plan[] = [
  {
    name: 'Solo',
    price: '0 ₽',
    period: 'первый месяц',
    features: ['1 бот', 'До 500 диалогов', 'Базовые сценарии', 'Email-поддержка'],
  },
  {
    name: 'Pro',
    price: '1 990 ₽',
    period: 'в месяц',
    features: ['3 бота', 'До 5 000 диалогов', 'Платежи и подписки', 'Приоритетная поддержка'],
    highlight: true,
  },
  {
    name: 'Agency',
    price: '5 900 ₽',
    period: 'в месяц',
    features: ['10 ботов', 'Безлимит диалогов', 'White-label', 'Выделенный менеджер'],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Тарифы</h2>
        <p className="mt-3 text-neutral-600">Начните бесплатно, масштабируйтесь по мере роста</p>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 shadow-soft ${p.highlight ? 'border-accent-emerald bg-white' : 'border-base-gray bg-white'}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{p.name}</h3>
              {p.highlight && <span className="badge bg-accent-emerald/10 text-accent-emerald">Топ выбор</span>}
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold">{p.price}</div>
              <div className="text-neutral-600">{p.period}</div>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-green" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#cta" className={`mt-8 block text-center ${p.highlight ? 'btn-primary' : 'btn-secondary'}`}>
              Выбрать
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}


