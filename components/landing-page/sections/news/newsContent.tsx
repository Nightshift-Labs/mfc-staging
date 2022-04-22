import ScrollBar from '../../generic/flair/scroll'
import styles from './news.module.scss'
import NewsCard from './newsCard'
import NewsImage from './newsImage'
import NewsMobileCard from './newsMobileCard'

const NewsContent = ({ news, progress }: any) => {
  const r = 0.1
  const p = (progress - r) / (1 - 2 * r) // Adjusted for fade effect
  const index = Math.min(Math.max(p * news.length, 0), news.length)

  const getStateClass = (state: number) =>
    state > 1 ? 'past' : state < 0 ? 'future' : 'active'

  return (
    <>
      <div className={styles.contentMobile}>
        {news.map((n: any, i: number) => (
          <NewsMobileCard key={i} news={n} state={index-i} stateClass={getStateClass(index - i)} />
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.images}>
          {news.map((n: any, i: number) => (
            <NewsImage key={i} news={n} stateClass={getStateClass(index - i)} />
          ))}
        </div>
        <div className={styles.titleAndDescription}>
          <div className={styles.fader} />
          {news.map((n: any, i: number) => (
            <NewsCard key={i} news={n} state={index - i} />
          ))}
        </div>
        {/* <div className={styles.progress}>
          <ScrollBar pos={progress} horz />
        </div> */}
      </div>
    </>
  )
}

export default NewsContent
