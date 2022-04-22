import img from '../../../../public/images/landingpage/info/img.png'
import details from '../../../../public/images/landingpage/info/details.svg'
import detailsMobile from '../../../../public/images/landingpage/info/details-mobile.svg'
import backsplash from '../../../../public/images/landingpage/info/backsplash.svg'
import ScrollFader from '../../generic/scrollFader'

import styles from './info.module.scss'

const InfoSection = ({ progress }: any) => {
  const desktopScaleFrom = 0.3
  const desktopScaleTo = 0.7
  const desktopTransformAmount = -35

  const desktopTransfomProg =
    progress > desktopScaleFrom && progress < desktopScaleTo
      ? (progress - desktopScaleFrom) / (desktopScaleTo - desktopScaleFrom)
      : progress <= desktopScaleFrom
      ? 0
      : 1

  const transformAmount = desktopTransformAmount * desktopTransfomProg

  return (
    <div>
      <div className={styles.desktopWrapper} style={{transform: `translate(0, ${transformAmount}vh)`}}>
        <ScrollFader
          progress={progress}
          min={0}
          max={0.7}
          scrollRange={0.3}
          scrollFadeDistance={0}
          scrollVisibleDistance={0}
          scrollIn={false}
          top='45%'
        >
          <img src={img.src} alt='' className={styles.img} />
        </ScrollFader>
        <ScrollFader
          progress={progress}
          min={0.2}
          max={1}
          scaleIn={1}
          scrollFadeDistance={0}
          scrollVisibleDistance={0}
          top='80%'
        >
          <img src={details.src} alt='' className={styles.details} />
        </ScrollFader>
      </div>

      <ScrollFader
        progress={progress}
        min={0.45}
        max={1}
        scaleIn={1}
        scrollFadeDistance={30}
        scrollVisibleDistance={5}
        top='50%'
      >
        <img src={detailsMobile.src} alt='' className={styles.detailsMobile} />
      </ScrollFader>
      <ScrollFader
        progress={progress}
        min={0}
        max={1}
        scrollFadeDistance={0}
        scrollVisibleDistance={0}
        scaleIn={1}
        zIndex={-1}
      >
        <img src={backsplash.src} alt='' className={styles.backsplash} />
      </ScrollFader>
    </div>
  )
}

export default InfoSection
