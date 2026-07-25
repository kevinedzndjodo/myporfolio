import Button from './ui/Button'

function Overview() {
  return (
   <section id="overview" className="px-6 md:px-12 py-12 md:py-20 bg-surface rounded-2xl flex flex-col gap-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-text leading-snug">
        Frontend developer experienced in taking ideas from concept to launch.
      </h2>

      <div className="md:w-1/2">
        <p className="text-muted text-sm md:text-base max-w-lg">
          If you're looking to start a new web project, get in touch to discuss your requirements in more detail.
        </p>

        <div className="mt-6 md:mt-8">
          <Button href="#contact">Say hello</Button>
        </div>
      </div>
    </section>
  )
}

export default Overview