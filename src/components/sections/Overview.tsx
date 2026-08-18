import Button from './ui/Button'
import { useLanguage } from '../../context/LanguageContext'

function Overview() {
  const { t } = useLanguage()

  const highlights = [
    { title: t('overview.highlight1.title'), text: t('overview.highlight1.text') },
    { title: t('overview.highlight2.title'), text: t('overview.highlight2.text') },
    { title: t('overview.highlight3.title'), text: t('overview.highlight3.text') },
  ]

  return (
    <section id="overview" className="px-6 md:px-12 py-12 md:py-20 bg-surface rounded-2xl flex flex-col gap-8 justify-between h-full">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-text leading-snug">
          {t('overview.title')}
        </h2>

        <p className="text-muted text-sm md:text-base max-w-lg mt-6">
          {t('overview.text')}
        </p>
      </div>

      <div>
        <ul className="flex flex-col gap-4 md:gap-5">
          {highlights.map((h) => (
            <li key={h.title} className="border-l-2 border-accent pl-4">
              <p className="text-text font-medium text-sm md:text-base">{h.title}</p>
              <p className="text-muted text-xs md:text-sm mt-0.5">{h.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact">{t('overview.hello')}</Button>
          <Button href="#projects" variant="secondary" external={false}>{t('overview.work')}</Button>
        </div>
      </div>
    </section>
  )
}

export default Overview
