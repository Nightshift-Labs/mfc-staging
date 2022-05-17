import styles from './news.module.scss'
import NewsCardLine from './newsCardLine'
import NewsDate from './newsDate'

const NewsCard = ({ news, state }: any) => {
  const stateClass =
    state > 1 ? 'past' : state < -1 ? 'future' : state < 0 ? 'next' : 'active'

  return (
    <div className={`${styles.card} ${styles[stateClass]}`}>
      <NewsDate
        date={news.date}
        stateClass={stateClass === 'active' ? 'active' : 'past'}
      />
      <NewsCardLine content={news.title} className='title' maxFontSize={30} />
      <NewsCardLine content={news.content} className='desc' maxFontSize={16} />
    </div>
  )
}

export default NewsCard
