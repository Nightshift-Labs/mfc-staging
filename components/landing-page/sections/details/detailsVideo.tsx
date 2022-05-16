import ScrollFader from '../../generic/scrollFader'
import styles from './details.module.scss'

import plus from '../../../../public/images/landingpage/details/plus.svg'
import plusFlair from '../../../../public/images/landingpage/details/plus-flair.svg'
import progFlair from '../../../../public/images/landingpage/details/prog-flair.svg'
import Numbers from '../../generic/flair/numbers'
import ProgressFlair from '../../generic/flair/progress'

const calculateLerp = (
  progress: number,
  min: number,
  max: number,
  start: number,
  end: number
) => {
  const p = Math.max(0, Math.min((progress - min) / (max - min), 1));
  return (end - start) * p + start
}

const DetailsVideo = ({ progress }: any) => {
  const vidZoomStart = 0.2
  const vidZoomEnd = 0.4
  
  const vidStyles = {
    height: `calc(100% - ${calculateLerp(progress, vidZoomStart, vidZoomEnd, 200, 0)}px)`,
    width: `calc(100% - ${calculateLerp(progress, vidZoomStart, vidZoomEnd, 400, 0)}px)`,
    borderRadius: calculateLerp(progress, vidZoomStart, vidZoomEnd, 20, 0)
  }
  const mobileVidStyles = {
    height: `calc(100% - ${calculateLerp(progress, vidZoomStart, vidZoomEnd, 80, 0)}px)`,
    width: `calc(100% - ${calculateLerp(progress, vidZoomStart, vidZoomEnd, 80, 0)}px)`,
  }

  return (
    <div className={styles.detailsWrapper}>
      <ScrollFader
        progress={progress}
        scrollFadeDistance={100}
        scrollVisibleDistance={0}
        scrollOut={false}
        scaleIn={1}
        min={0.1}
        max={0.95}
        fadeIn={false}
        width='100%'
        height='100%'
        zIndex={-1}
      >
        <div className={styles.detailsVideoWrapper}>
          <video
            className={styles.video}
            autoPlay
            muted
            playsInline
            loop
            style={vidStyles}
          >
            <source src='/images/landingpage/details/video.mp4' />
          </video>
          <video
            className={styles.videoMobile}
            autoPlay
            muted
            playsInline
            loop
            style={mobileVidStyles}
          >
            <source src='/images/landingpage/details/video.mp4' />
          </video>
        </div>
      </ScrollFader>


      <ScrollFader
        progress={progress}
        min={0.45}
        scrollFadeDistance={0}
        scrollVisibleDistance={0}
        scaleIn={1}
        width='100%'
        height='100%'
      >
        <div className={styles.detailsContentContainer}>
          <div className={styles.detailsVideoBlur} />
          <ProgressFlair className={styles.progress} />
          <Numbers className={styles.numbers} />
          <div className={styles.title}>
            <div className={styles.titleHeader}>
              WHAT IS <span>The MFC Mechabot</span>
            </div>
            <div className={styles.titleContent}>
              Launched in the far future world of 2136, MechaFightClub has reclaimed control of unique alien superweapons to repurpose them as weapons of mass entertainment! Each mechabot has its own artificially-intelligent personality, simulated genome, 5 bionics, a color and a complexion. Each will be ranked based on competition performance, popularity, genetic prowess and aesthetic rarity.
            </div>
          </div>
        </div>
      </ScrollFader>
    </div>
  )
}

export default DetailsVideo
