import { useState, useEffect, useRef } from 'react'
import { api, type FaqItem as FaqItemType } from '../../lib/api'
import { fallbackFaq, translateFaqItem } from '../../data/content'
import { useLanguage } from '../../context/LanguageContext'
import LoadState from './ui/LoadState'

function Faq() {
  const { lang, t } = useLanguage()
  const [items, setItems] = useState<FaqItemType[]>(fallbackFaq(lang))
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const serverLoadedRef = useRef(false)

  useEffect(() => {
    if (serverLoadedRef.current) return
    setItems(fallbackFaq(lang))
  }, [lang])

  useEffect(() => {
    let ignore = false
    api.faq.list()
      .then(data => {
        if (!ignore && Array.isArray(data) && data.length > 0) {
          serverLoadedRef.current = true
          setItems(data)
        }
      })
      .catch(() => {
        if (!ignore) setFailed(true)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => { ignore = true }
  }, [reloadKey])

  const load = () => {
    setLoading(true)
    setFailed(false)
    setReloadKey(k => k + 1)
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="px-4 md:px-16 py-16 md:py-24 bg-background">
      <h2 className="text-2xl md:text-4xl font-semibold text-text mb-10">
        {t('faq.title')}
      </h2>

      <LoadState
        loading={loading}
        error={failed ? t('faq.error') : null}
        isEmpty={items.length === 0}
        onRetry={load}
        skeleton={
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-border/40 rounded-lg animate-pulse" />
            ))}
          </div>
        }
        empty={<p className="text-muted text-sm">{t('faq.empty')}</p>}
      />

      <div className="flex flex-col divide-y divide-border border-t border-b border-border">
        {items.map((item, index) => {
          const localized = translateFaqItem(item, lang)
          const isOpen = openIndex === index

          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-text text-base md:text-lg font-medium">
                  {localized.question}
                </span>
                <span className={`text-accent text-xl transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                  +
                </span>
              </button>

              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <p className="text-muted text-sm md:text-base pb-5 max-w-2xl">
                    {localized.answer}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq