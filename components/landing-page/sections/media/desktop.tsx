import MediaCard from './mediaCard'
import ScrollFader from '../../generic/scrollFader'
import styles from './media.module.scss'

import moltrez from '../../../../public/images/landingpage/media/moltres.png'
import { useSwipeable } from 'react-swipeable'
import { useRef, useState } from 'react'
import Scrollbar from './scrollbar'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MediaDesktop = ({ progress, mediaCards }: any) => {
  const sliderRef: any = useRef()

  const [sliderIndex, setSliderIndex] = useState(0)

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
            <Carousel
              // className={styles.carousel}
              // centerMode={true}
              // arrows={false}
              // swipe={false}
              // centerPadding={250}
              // ref={sliderRef}
              // beforeChange={onChange}
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              showThumbs={false}
              useKeyboardArrows={true}
              emulateTouch={true}
              onChange={setSliderIndex}
              selectedItem={sliderIndex}
            >
              {mediaCards.map((m: any, i: number) => (
                <div key={i} className={styles.sliderItemWrapper}>
                  <div className={styles.cardContainer}>
                      <MediaCard {...m} />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <Scrollbar state={sliderIndex} length={mediaCards.length} onUpdate={setSliderIndex} />
        </div>
      </ScrollFader>
    </>
  )
}

export default MediaDesktop
