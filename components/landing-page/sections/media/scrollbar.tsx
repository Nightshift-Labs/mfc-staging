import styles from './media.module.scss'

const Scrollbar = ({ state, length }: any) => {
  const singleWidth = 100 / length
  const width = `${singleWidth}%`

  const stateA = state % (3 * length)
  const leftA = `${stateA * singleWidth - 100}%`
  const opacityA = stateA === 0 || stateA === 3 * length - 1 ? 0 : 1

  const stateB = (state + length) % (3 * length)
  const leftB = `${stateB * singleWidth - 100}%`
  const opacityB = stateB === 0 || stateB === 3 * length - 1 ? 0 : 1

  const stateC = (state + 2 * length) % (3 * length)
  const leftC = `${stateC * singleWidth - 100}%`
  const opacityC = stateC === 0 || stateC === 3 * length - 1 ? 0 : 1

  return (
    <div className={styles.scrollbar}>
      <div className={styles.scrollbarTrack} />
      <Bar width={width} left={leftA} opacity={opacityA} />
      <Bar width={width} left={leftB} opacity={opacityB} />
      <Bar width={width} left={leftC} opacity={opacityC} />
    </div>
  )
}

const Bar = ({ width, left, opacity }: any) => {
  return (
    <div className={styles.bar} style={{ width, left, opacity }}>
      <div className={styles.dot} />
      <div className={styles.dot} style={{ left: '100%' }} />
    </div>
  )
}

export default Scrollbar
