import ScrollFader from '../../generic/scrollFader'
import styles from './intro.module.scss'

import scrollSplash from '../../../../public/images/landingpage/scroll-to-enter.svg'
import swipeSplash from '../../../../public/images/landingpage/swipe-to-enter.svg'
import { Player } from '@lottiefiles/react-lottie-player'

import animLoaded from '../../../../public/animations/Anim-Loaded.json'
import { useEffect, useRef, useState } from 'react'

const IntroSection = ({ progress, pageLoading }: any) => {
  const vidRef: any = useRef()

  useEffect(() => {
    var video = vidRef.current
    if (!video) return

    var isPlaying =
      video.currentTime > 0 &&
      !video.paused &&
      !video.ended &&
      video.readyState > video.HAVE_CURRENT_DATA
    if (progress > 0.95 && isPlaying) vidRef.current?.pause()
    else vidRef.current?.play()
  }, [progress])

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
              ref={vidRef}
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
