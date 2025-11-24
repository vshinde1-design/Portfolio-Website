import { FC } from 'react'
import Particles from 'react-tsparticles'
// use a loose type for the engine to avoid package-type export issues
import { loadFull } from 'tsparticles'

const AnalyticsBackground: FC = () => {
  const initParticles = async (engine: any) => {
    await loadFull(engine)
  }

  return (
    <Particles
      id="analytics-bg"
      init={initParticles}
      className="fixed inset-0 -z-10 pointer-events-none"
      options={{
        fullScreen: { enable: false },
        background: { color: '#160b33' },
        fpsLimit: 60,
        interactivity: {
          detectsOn: 'window',
          events: {
            onHover: { enable: true, mode: 'repulse' },
            resize: true
          },
          modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: ['#f97316', '#a855f7', '#22c55e'] },
          links: {
            enable: true,
            distance: 130,
            color: '#a855f7',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            outModes: { default: 'bounce' }
          },
          opacity: { value: 0.7 },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }}
    />
  )
}

export default AnalyticsBackground
