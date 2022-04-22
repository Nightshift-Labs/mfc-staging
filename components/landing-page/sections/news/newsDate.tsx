import styles from './news.module.scss'

const NewsDate = ({ date, stateClass }: any) => {
  return (
    <div className={styles.dateWrapper}>
      <div className={`${styles.date} ${styles[stateClass]}`}>
        <span />
        {date}
      </div>
    </div>
  )
}

export default NewsDate
