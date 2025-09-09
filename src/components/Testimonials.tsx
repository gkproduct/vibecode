export function Testimonials() {
  const items = [
    {
      name: 'Анна, фитнес-тренер',
      text: 'Сбор заявок и оплаты перенесли в Telegram. Стало проще управлять группами, выросли повторные покупки.',
    },
    {
      name: 'Игорь, репетитор математики',
      text: 'Автонапоминания спасают занятия от пропусков. Подписки — стабильный доход каждый месяц.',
    },
    {
      name: 'Марина, наставник по SMM',
      text: 'Сделали курс через бота за выходные. Техподдержка быстро помогала на старте.',
    },
  ]

  return (
    <section className="section bg-base-light/60">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold sm:text-4xl">Отзывы и результаты</h2>
        <p className="mt-3 text-neutral-600">Что говорят наши пользователи</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <figure key={i} className="rounded-2xl border border-base-gray bg-white p-6 shadow-soft">
            <blockquote className="text-neutral-700">“{t.text}”</blockquote>
            <figcaption className="mt-4 text-sm font-medium text-neutral-600">{t.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}


