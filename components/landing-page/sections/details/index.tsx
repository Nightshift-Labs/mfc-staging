import ScrollFader from '../../generic/scrollFader'
import DetailsText from './detailsText'
import DetailsVideo from './detailsVideo'
import styles from './details.module.scss'
import { useEffect } from 'react'

const DetailsSection = ({ progress, toggle }: any) => {
  useEffect(() => {
    if (progress > 0 && progress < 1)
    toggle (progress <= 0.2)
  }, [progress])

  
  return (
    <>
      <div className={styles.textScrollDesktop}>
        <ScrollFader
          progress={progress}
          max={0.25}
          scrollFadeDistance={110}
          scrollVisibleDistance={0}
          scrollIn={false}
          scaleIn={1}
          width='100%'
          top='30%'
        >
          <DetailsText />
        </ScrollFader>
      </div>
      <div className={styles.textScrollMobile}>
        <ScrollFader
          progress={progress}
          max={0.15}
          scrollFadeDistance={50}
          scrollVisibleDistance={0}
          scrollIn={false}
          scaleIn={1}
          width='100%'
          top='50%'
        >
          <DetailsText />
        </ScrollFader>
      </div>
      <DetailsVideo progress={progress} />
    </>
  )
}

export default DetailsSection
