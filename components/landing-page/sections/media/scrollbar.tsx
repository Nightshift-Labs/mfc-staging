import { useState } from 'react'
import styles from './media.module.scss'

const Scrollbar = ({ state, length, onUpdate }: any) => {
  const [mouseDown, setMouseDown] = useState(true)
  const singleWidth = 100 / length
  const width = `${singleWidth}%`
  const left = `${singleWidth * state}%`

  const onMouseMove = (e: any) => {
    if (!mouseDown)
      return;
    const target = e.target
    const rect = target.getBoundingClientRect()
    const x = e.clientX  - rect.left - rect.width / (2 * length);
    const perc = Math.max(Math.round((x / rect.width) * length), 0);
    onUpdate(perc);
  }

  return (
    <div
      className={styles.scrollbar}
      onMouseMove={onMouseMove}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
    >
      <div className={styles.scrollbarTrack} />
      <div className={styles.bar} style={{ width, left }}>
        <div className={styles.dot} />
        <div className={styles.dot} style={{ left: '100%' }} />
      </div>
    </div>
  )
}

export default Scrollbar
