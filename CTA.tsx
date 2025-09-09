import React from 'react'

const CTA: React.FC = () => {
  return (
    <section id="cta" className="py-16 md:py-24 scroll-mt-24">
      <div className="container-page">
        <div className="card p-8 md:p-10 text-center">
          <h2 className="mb-3">Готовы убрать рутину и расти быстрее?</h2>
          <p className="mb-6 max-w-2xl mx-auto">Запустите CRM‑бота бесплатно за 10 минут. Без карточки, без рисков.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#" className="btn-primary">Попробовать бесплатно</a>
            <a href="#" className="btn-secondary">Посмотреть демо</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA


