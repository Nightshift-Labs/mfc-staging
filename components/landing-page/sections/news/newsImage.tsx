import styles from './news.module.scss'

const NewsImage = ({ news, stateClass }: any) => {
  return (
    <img
      src={news.img}
      className={`${styles.image} ${styles[stateClass]}`}
      alt=''
    />
  )
}

export default NewsImage
