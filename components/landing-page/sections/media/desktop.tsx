import MediaCard from './mediaCard'
import ScrollFader from '../../generic/scrollFader'
import styles from './media.module.scss'
const Slider = require('../../generic/slider').default
import moltrez from '../../../../public/images/landingpage/media/moltres.png'
import { useSwipeable } from 'react-swipeable'
import { useRef, useState } from 'react'
import Scrollbar from './scrollbar'

const MediaDesktop = ({ progress, mediaCards }: any) => {
  const sliderRef: any = useRef()

  const [sliderIndex, setSliderIndex] = useState(0)

  const onChange = (a: number, b: number) => {
    setSliderIndex(sliderIndex + (b - a))
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => sliderRef.current?.slickNext(),
    onSwipedRight: () => sliderRef.current?.slickPrev(),
    trackMouse: true
  })

  return (
    <>
      <ScrollFader
        scrollVisibleDistance={0}
        scrollFadeDistance={0}
        scaleIn={1}
        height='100%'
        width='100%'
        progress={progress}
      >
        <img className={styles.moltrez} src={moltrez.src} alt='' />
      </ScrollFader>
      <ScrollFader
        progress={progress}
        height='100%'
        width='100%'
        scrollVisibleDistance={0}
        scrollFadeDistance={0}
        scaleIn={1}
      >
        <div className={styles.wrapper} {...handlers}>
          <div className={styles.faderLeft} />
          <div className={styles.faderRight} />
          <div className={styles.title}>
            {`Press & `}
            <span>Media</span>
          </div>
          <div className={styles.mediaContainer}>
            <Slider
              className={styles.carousel}
              centerMode={true}
              arrows={false}
              swipe={false}
              centerPadding={250}
              ref={sliderRef}
              beforeChange={onChange}
            >
              {mediaCards.map((m: any, i: number) => (
                <div key={i} className={styles.sliderItemWrapper}>
                  <div className={styles.cardContainer}>
                    <div className={styles.cardWrapper}>
                      <MediaCard {...m} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <Scrollbar state={sliderIndex} length={mediaCards.length} />
        </div>
      </ScrollFader>
    </>
  )
}

export default MediaDesktop
