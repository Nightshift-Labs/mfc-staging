import ScrollFader from '../../generic/scrollFader'
import styles from './intro.module.scss'

const IntroSection = ({ progress, pageLoading }: any) => {
  return (
    <div className={styles.wrapper}>
      <ScrollFader
        progress={progress}
        min={0}
        max={0.9}
        scrollRange={0.9}
        scrollFadeDistance={0}
        scaleIn={1}
        scrollVisibleDistance={0}
        fadeIn={false}
      >
        <div className={styles.animation}>
          <div
            className={`${styles.circleAnimation} ${
              !pageLoading ? styles.circleAnimationActive : ''
            }`}
          >
            <video
              autoPlay
              muted
              playsInline
              loop
              className={styles.animVid}
            >
              <source src='/animations/logo-rotating.mp4' type='video/mp4' />
            </video>
          </div>
        </div>
      </ScrollFader>
    </div>
  )
}

export default IntroSection
