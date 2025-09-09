import React from 'react'

type Plan = {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    name: 'Solo',
    price: '0 ₽',
    period: 'на старте',
    features: [
      'До 100 лидов/мес',
      'Базовые сценарии бота',
      'Статистика заявок',
    ],
    cta: 'Попробовать бесплатно'
  },
  {
    name: 'Pro',
    price: '1 490 ₽',
    period: 'в месяц',
    features: [
      'До 2 000 лидов/мес',
      'Продвинутые сценарии и триггеры',
      'Оплаты и рассылки',
      'Приоритетная поддержка',
    ],
    cta: 'Выбрать Pro',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: '4 900 ₽',
    period: 'в месяц',
    features: [
      'Безлимитные лиды',
      'Мульти‑проекты и роли',
      'White‑label и API',
    ],
    cta: 'Подключить Agency'
  }
]

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 scroll-mt-24">
      <div className="container-page">
        <h2 className="text-center mb-4">Тарифы</h2>
        <p className="text-center max-w-2xl mx-auto mb-10">Прозрачные цены без скрытых платежей. Начните бесплатно и масштабируйтесь, когда будете готовы.</p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {plans.map((plan) => (
            <div key={plan.name} className={`card p-6 flex flex-col ${plan.highlighted ? 'border-brand-accent' : ''}`}>
              <div className="flex items-baseline justify-between mb-4">
                <h3>{plan.name}</h3>
                {plan.highlighted && <span className="badge">Рекомендуем</span>}
              </div>
              <div className="mb-4">
                <div className="text-3xl font-semibold">{plan.price}</div>
                <div className="text-sm text-brand-muted">{plan.period}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-accent"></span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#cta" className={`mt-auto ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing


