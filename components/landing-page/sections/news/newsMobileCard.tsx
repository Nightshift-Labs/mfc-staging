import ScrollBar from '../../generic/flair/scroll'
import styles from './news.module.scss'
import NewsCardLine from './newsCardLine'
import NewsDate from './newsDate'

const NewsMobileCard = ({ news, stateClass, state }: any) => {
  return (
    <div className={`${styles.cardWrapper} ${styles[stateClass]}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={news.img} alt={news.title} />
          </div>
          {/* <ScrollBar pos={state} /> */}
        </div>
        <div className={styles.text}>
          <NewsDate date={news.date} style={stateClass} />
          <NewsCardLine
            content={news.title}
            className='title'
            maxFontSize={25}
          />
          <NewsCardLine
            content={news.content}
            className='desc'
            maxFontSize={18}
          />
        </div>
      </div>
    </div>
  )
}

export default NewsMobileCard
