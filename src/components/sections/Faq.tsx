import { useState, useEffect } from 'react'
import { api, type FaqItem as FaqItemType } from '../../lib/api'

function Faq() {
  const [items, setItems] = useState<FaqItemType[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    api.faq.list().then(setItems).catch(console.error)
  }, [])

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="px-4 md:px-16 py-16 md:py-24 bg-background">
      <h2 className="text-2xl md:text-4xl font-semibold text-text mb-10">
        Frequently asked questions
      </h2>

      <div className="flex flex-col divide-y divide-border border-t border-b border-border">
        {items.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(index)}
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
