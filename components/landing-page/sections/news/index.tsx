import ScrollFader from '../../generic/scrollFader'
import styles from './news.module.scss'
import NewsContent from './newsContent'

import icons from '../../../../public/images/landingpage/news/icons.svg'
import NumbersFlair from '../../generic/flair/numbers'

const NewsSection = ({ progress, news }: any) => {
  return (
    <ScrollFader
      progress={progress}
      width='100%'
      height='100%'
      scrollVisibleDistance={0}
      scrollFadeDistance={10}
      scaleIn={1}
      scrollIn={false}
      scrollRange={0.1}
    >
      <div className={styles.wrapper}>
        <div className={styles.overlay}>
          <img className={styles.icons} src={icons.src} alt='' />
          <NumbersFlair className={styles.numbers} />
        </div>
        <NewsContent progress={progress} news={news} />
      </div>
    </ScrollFader>
  )
}

export default NewsSection
