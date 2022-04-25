import ScrollBar from '../../generic/flair/scroll'
import styles from './news.module.scss'
import NewsCardLine from './newsCardLine'
import NewsDate from './newsDate'

const NewsMobileCard = ({ news }: any) => {
  return (
    <div className={`${styles.cardMobile}`}>
      <div className={styles.header}>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={news.img} alt={news.title} />
        </div>
      </div>
      <div className={styles.text}>
        <NewsDate date={news.date} />
        <div className={styles.title}>{news.title}</div>
        <div className={styles.desc}>{news.content}</div>
      </div>
    </div>
  )
}

export default NewsMobileCard
