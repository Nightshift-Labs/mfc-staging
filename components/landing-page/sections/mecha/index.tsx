import styles from './mecha.module.scss'

import scrolling from '../../../../public/images/flair/continue-scrolling.svg'
import swiping from '../../../../public/images/flair/continue-swiping.svg'
import background from '../../../../public/images/landingpage/mecha/background.svg'

import ScrollFader from '../../generic/scrollFader'
import ScrollCanvas from '../../generic/scrollCanvas'
import Cursor from './cursor'


const MechaSection = ({ progress, frames }: any) => {
  return (
    <div className={styles.container}>
      <Cursor progress={progress}/>
      <ScrollFader
        progress={progress}
        min={0}
        max={1}
        scrollRange={0.3}
        scaleIn={1}
        scrollFadeDistance={0}
        scrollVisibleDistance={0}
        width='100%'
        height='100%'
      >
        <ScrollCanvas frames={frames} progress={progress} />
      </ScrollFader>
      <ScrollFader
        progress={progress}
        min={0}
        max={0.7}
        scaleIn={1}
        scrollRange={0.3}
        scrollFadeDistance={0}
        scrollVisibleDistance={0}
        width='100%'
        height='100%'
      >
        <div className={styles.continueContainer}>
          <img
            src={swiping.src}
            className={`${styles.continue} ${styles.continueMobile}`}
            alt='swipe'
          />
        </div>
      </ScrollFader>
      <div style={{ zIndex: -10 }}>
        <ScrollFader
          progress={progress}
          min={0.3}
          max={1}
          scrollRange={0.5}
          scaleIn={1}
          scrollFadeDistance={0}
          scrollVisibleDistance={0}
          width='100%'
          height='100%'
        >
          <div className={styles.backgroundContainer}>
          </div>
        </ScrollFader>
      </div>
    </div>
  )
}

export default MechaSection
