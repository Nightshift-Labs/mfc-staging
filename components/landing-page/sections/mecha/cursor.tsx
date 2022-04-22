import { useEffect, useState } from 'react'
import styles from './mecha.module.scss'

const Cursor = ({ progress }: any) => {
  const fadeRange = 0.4
  const adjustment = { top: 60, left: -55 }
  const [mousePos, setMousePos] = useState({ top: 0, left: 0 })
  const opacity = Math.max(
    0,
    Math.min(
      1,
      progress < fadeRange
        ? progress / fadeRange
        : progress > 1 - fadeRange
        ? (1 - progress) / fadeRange
        : 1
    )
  )

  useEffect(() => {
    if (progress <= 0 || progress >= 1) return

    const onMouseMove = (e: any) => {
      setMousePos({ top: e.clientY, left: e.clientX })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [progress])

  const { left, top } = mousePos
  let hideCursor = left < 200;

  return (
    <div
      className={`${styles.cursor} ${hideCursor ? styles.cursorHidden : ''}`}
      style={{
        opacity,
        left,
        top,
        transform: `translate(${adjustment.left}%, ${adjustment.top}%)`
      }}
    >
      SCROLL TO EXPLORE
    </div>
  )
}

export default Cursor
