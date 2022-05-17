import styles from './news.module.scss'
import NewsMobileCard from './newsMobileCard'

const NewsMobile = ({ news }: any) => {
  return (
    <div className={styles.mobileWrapper}>
      {news.map((n: any, i: number) => (
        <NewsMobileCard news={n} key={i} />
      ))}
    </div>
  )
}

export default NewsMobile
