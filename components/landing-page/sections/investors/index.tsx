import ScrollCanvas from '../../generic/scrollCanvas'
import ScrollFader from '../../generic/scrollFader'
import styles from './investors.module.scss'

import investorsDesktop from '../../../../public/images/landingpage/investors/investors_desktop.svg'
import investorsMobile from '../../../../public/images/landingpage/investors/investors_mobile.svg'

const clamp = (v: any, min: any, max: any) => Math.max(Math.min(v, max), min)
const prog = (p: any, min: any, max: any) =>
  clamp((p - min) / (max - min), 0, 1)

const investorsFaderProps = {
  min: 0.5,
  max: 1,
  scrollFadeDistance: 5,
  scrollVisibleDistance: 5,
  scaleIn: 1,
  fadeOut: false
}

const InvestorsSection = ({ progress, imgs }: any) => {
  const blurMin = 0
  const blurMax = 0.2
  const blurMag = 100
  const blurP = prog(progress, blurMin, blurMax)
  const blur = blurMag - clamp(blurP * blurMag, 0, blurMag)

  const opacityMin = 0
  const opacityMax = 0.05
  const opacityP = prog(progress, opacityMin, opacityMax)
  const opacity = clamp(opacityP * 1, 0, 1)

  return (
    <div className={styles.wrapper}>
      <div className={styles.frames}>
        <div
          className={styles.blur}
          style={{ backdropFilter: `blur(${blur}px)` }}
        />
        <div style={{ opacity }}>
          <ScrollCanvas frames={imgs} progress={progress} min={0} max={0.75} />
        </div>
        <ScrollFader progress={progress} {...investorsFaderProps}>
          <img
            src={investorsDesktop.src}
            alt=''
            className={styles.investorsDesktop}
          />
        </ScrollFader>
        <ScrollFader progress={progress} {...investorsFaderProps} scrollFadeDistance={0} scrollVisibleDistance={0}>
          <img
            src={investorsMobile.src}
            alt=''
            className={styles.investorsMobile}
          />
        </ScrollFader>
      </div>
    </div>
  )
}

export default InvestorsSection
