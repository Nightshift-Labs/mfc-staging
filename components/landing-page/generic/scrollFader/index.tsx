import { useEffect, useState } from 'react'
import styles from './scrollFader.module.scss'

type ScrollFaderProps = {
  progress: number
  min?: number
  max?: number
  scrollRange?: number
  scrollVisibleDistance?: number
  scrollFadeDistance?: number
  fadeIn?: boolean
  fadeOut?: boolean
  children: React.ReactNode
  left?: string
  top?: string
  width?: string
  height?: string
  scaleIn?: number
  zIndex?: number
  noTransform?: boolean
  scrollIn?: boolean,
  scrollOut?: boolean,
}

const ScrollFader = ({
  progress,
  min = 0,
  max = 1,
  scrollRange = 0.4,
  scrollVisibleDistance = 50,
  scrollFadeDistance = 50,
  fadeIn = true,
  fadeOut = true,
  left = "50%",
  top = "50%",
  scaleIn = 0.9,
  width,
  height,
  zIndex=1,
  children,
  noTransform = false,
  scrollIn = true,
  scrollOut = true
}: ScrollFaderProps) => {
  // Used for opacity and position calculation
  const range = Math.abs((max - min) / 2)
  const mid = range + Math.min(min, max)
  const rangeMin = range * (1 - scrollRange)

  const calculateOpacity = (p: number) => {
    if (p < mid - rangeMin && !fadeIn) return 1
    if (p > mid + rangeMin && !fadeOut) return 1

    const diff = Math.abs(p - mid)
    const calculated = (range - diff) / (scrollRange * range)
    return Math.max(Math.min(calculated, 1), 0)
  }

  const calculateTransform = (p: number) => {
    const diff = p - mid
    const x = Math.abs(diff)
    const m = diff < 0 ? 1 : -1

    if (x > rangeMin && diff < 0 && !scrollIn)
      return 0
    if (x > rangeMin && diff > 0 && !scrollOut)
      return 0

    if (x < rangeMin) {
      return m * ((scrollVisibleDistance * x) / rangeMin)
    } else {
      return (
        m *
        (scrollVisibleDistance +
          (scrollFadeDistance * (x - rangeMin)) / (range - rangeMin))
      )
    }
  }

  const calculateScale = (p: number) => {
    const diff = mid - p;
    const scale = (scaleIn - 1) * diff / (range * (1 - scrollRange)) + (1 - scrollRange * scaleIn) / (1 - scrollRange);
    return Math.min(1, Math.max(scaleIn, scale));
  }

  const [opacity, setOpacity] = useState(calculateOpacity(progress));
  const [transform, setTransform] = useState(calculateTransform(progress));
  const [scale, setScale] = useState(calculateScale(progress));

  useEffect(() => {
    if (progress > max + range || progress < min - range) return
    setOpacity(calculateOpacity(progress))
    setTransform(calculateTransform(progress))
    setScale(calculateScale(progress));
  }, [progress])

  return (
    <div
      className={`${styles.parent} ${noTransform ? styles.noTransform : ''}`}
      style={{ left, top, width, height, zIndex }}
    >
      <div
        style={{
          opacity,
          transform: `translate(0, ${transform}%) scale(${scale})`,
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default ScrollFader
