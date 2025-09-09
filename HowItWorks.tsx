import React from 'react'

const steps = [
  {
    title: 'Подключение за 10 минут',
    desc: 'Авторизуйтесь, выберите мессенджеры и подключите оплату.',
    icon: '⚡'
  },
  {
    title: 'Сбор лидов',
    desc: 'Бот принимает заявки и записывает контакты в CRM.',
    icon: '📥'
  },
  {
    title: 'Оплаты и напоминания',
    desc: 'Автоматические оплаты, напоминания об уроках и чек‑ин сообщения.',
    icon: '💳'
  },
  {
    title: 'Аналитика',
    desc: 'Смотрите конверсию, выручку и активность учеников.',
    icon: '📊'
  }
]

const HowItWorks: React.FC = () => {
  return (
    <section id="how" className="py-16 md:py-24 scroll-mt-24">
      <div className="container-page">
        <h2 className="text-center mb-4">Как это работает</h2>
        <p className="text-center max-w-2xl mx-auto mb-10">Запускайте CRM‑бота без программиста и сложных интеграций. Нужны только мессенджеры и аккаунт для приема оплат.</p>
        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((s) => (
            <div key={s.title} className="card p-6 text-center">
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="mb-2">{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks


