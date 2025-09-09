import React from 'react'

const benefits = [
  { title: 'Меньше рутины', desc: 'Заявки, оплаты и напоминания — на автопилоте.', icon: '🤖' },
  { title: 'Выше конверсия', desc: 'Тёплые касания и персональные сценарии в мессенджерах.', icon: '📈' },
  { title: 'Простая настройка', desc: 'Интерфейс понятен без обучения, запуск за 10–15 минут.', icon: '🧩' },
  { title: 'Гибкая интеграция', desc: 'Подключение платежей и курсовых платформ по клику.', icon: '🔗' },
]

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-white scroll-mt-24">
      <div className="container-page">
        <h2 className="text-center mb-4">Почему EazyCRM</h2>
        <p className="text-center max-w-2xl mx-auto mb-10">Заточено под экспертов и микро‑команды: без лишних функций, только то, что помогает продавать и удерживать учеников.</p>
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="card p-6">
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="mb-2">{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits


