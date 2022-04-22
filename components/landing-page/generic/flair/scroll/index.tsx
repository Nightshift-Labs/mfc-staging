import styles from './scroll.module.scss'

const ScrollBar = ({ pos, horz = false }: any) => {
  pos = pos * 100;
  if (!horz)
    return (
      <div className={`${styles.wrapper}`}>
        <div className={styles.bar} />
        <div
          className={styles.progress}
          style={{ height: `${pos.toFixed(1)}%` }}
        />
        <div
          className={styles.indicator}
          style={{ top: `${pos.toFixed(1)}%` }}
        />
      </div>
    )

    return (
      <div className={`${styles.wrapperHorz}`}>
        <div className={styles.bar} />
        <div
          className={styles.progress}
          style={{ width: `${pos.toFixed(1)}%` }}
        />
        <div
          className={styles.indicator}
          style={{ left: `${pos.toFixed(1)}%` }}
        />
      </div>
    )
}

export default ScrollBar
