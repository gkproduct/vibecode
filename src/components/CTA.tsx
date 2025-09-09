export function CTA() {
  return (
    <section id="cta" className="section">
      <div className="rounded-3xl border border-accent-emerald/30 bg-accent-emerald/5 p-8 text-center shadow-soft sm:p-12">
        <h2 className="text-2xl font-bold sm:text-4xl">Готовы автоматизировать продажи?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-700">
          Попробуйте EazyCRM бесплатно. Подключите бота, настройте воронку и начните принимать оплаты в мессенджерах уже сегодня.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#" className="btn-primary">Подключить бота</a>
          <a href="#pricing" className="btn-secondary">Посмотреть тарифы</a>
        </div>
      </div>
    </section>
  )
}


