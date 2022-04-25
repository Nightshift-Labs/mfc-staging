import ScrollFader from '../../generic/scrollFader'
import styles from './release.module.scss'

import overlay from '../../../../public/images/landingpage/release/backdrop.svg'
import chicken from '../../../../public/images/landingpage/release/chicken.png'
import vegas from '../../../../public/images/landingpage/release/vegas.png'
import egg from '../../../../public/images/landingpage/release/egg.png'
import moltres from '../../../../public/images/landingpage/release/moltres.png'
import title from '../../../../public/images/landingpage/release/title.svg'
import NumbersFlair from '../../generic/flair/numbers'
import ProgressFlair from '../../generic/flair/progress'

const ReleaseSection = ({ progress }: any) => {
  const transform = -240 * progress + 120

  return (
    <>
      <ScrollFader
        progress={progress}
        scaleIn={1}
        scrollVisibleDistance={0}
        scrollFadeDistance={0}
        height='100%'
        width='100%'
      >
        <div className={styles.wrapper}>
          <img src={overlay.src} alt='background' className={styles.backdrop} />
          <NumbersFlair className={styles.numbers} />
          <ProgressFlair className={styles.progress} />
          <div className={styles.moltresWrapper}>
            <img src={moltres.src} alt='moltres' className={styles.moltres} />
          </div>
          <img src={title.src} alt='title' className={styles.title} />
          <div className={styles.imagesWrapper}>
            <div
              className={styles.images}
              style={{ top: `${transform.toFixed(0)}%` }}
            >
              <img src={chicken.src} alt='chicken' className={styles.chicken} />
              <img src={vegas.src} alt='vegas' className={styles.vegas} />
              <img src={egg.src} alt='egg' className={styles.egg} />
            </div>
            <div className={styles.textSeason}>SPRING</div>
            <div className={styles.textYear}>2022</div>
          </div>
        </div>
      </ScrollFader>
    </>
  )
}

export default ReleaseSection
