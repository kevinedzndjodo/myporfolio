import { useState, useEffect } from 'react'
import { api, type FaqItem as FaqItemType } from '../../lib/api'
import LoadState from './ui/LoadState'

function Faq() {
  const [items, setItems] = useState<FaqItemType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    api.faq.list()
      .then(data => {
        if (!ignore) setItems(data)
      })
      .catch(() => {
        if (!ignore) setError('Could not load the FAQ.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => { ignore = true }
  }, [reloadKey])

  const load = () => {
    setLoading(true)
    setError(null)
    setReloadKey(k => k + 1)
  }

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="px-4 md:px-16 py-16 md:py-24 bg-background">
      <h2 className="text-2xl md:text-4xl font-semibold text-text mb-10">
        Frequently asked questions
      </h2>

      <LoadState
        loading={loading}
        error={error}
        isEmpty={items.length === 0}
        onRetry={load}
        skeleton={
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-border/40 rounded-lg animate-pulse" />
            ))}
          </div>
        }
        empty={<p className="text-muted text-sm">No FAQ entries yet.</p>}
      />

      <div className="flex flex-col divide-y divide-border border-t border-b border-border">
        {items.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-text text-base md:text-lg font-medium">
                  {item.question}
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
                    {item.answer}
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