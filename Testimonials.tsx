import React from 'react'

const items = [
  {
    name: 'Екатерина, онлайн‑школа английского',
    text: 'На EazyCRM ушли ручные напоминания и хаос в чате. Конверсия в оплату выросла на 23% уже в первый месяц.',
  },
  {
    name: 'Дмитрий, тренер по фитнесу',
    text: 'Бот берёт на себя записи и оплаты, я занимаюсь тренировками. Освободилось 2–3 часа ежедневно.',
  },
  {
    name: 'Марина, репетитор по математике',
    text: 'Напоминания и мини‑рассылки в мессенджере — теперь ученики ничего не пропускают.',
  },
]

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 scroll-mt-24">
      <div className="container-page">
        <h2 className="text-center mb-4">Кейсы и отзывы</h2>
        <p className="text-center max-w-2xl mx-auto mb-10">Результаты клиентов, которые автоматизировали продажи и коммуникации с помощью EazyCRM.</p>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {items.map((t) => (
            <figure key={t.name} className="card p-6">
              <blockquote className="mb-3 text-brand-text">“{t.text}”</blockquote>
              <figcaption className="text-sm text-brand-muted">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials


