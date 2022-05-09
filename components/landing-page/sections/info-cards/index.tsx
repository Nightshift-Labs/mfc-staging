import styles from './info-cards.module.scss'
import Marquee from 'react-fast-marquee'
import React, { useEffect } from 'react'
import ScrollFader from '../../generic/scrollFader'

const Card = ({ title, img, content }: any) => {
  return (
    <div className={styles.card}>
      <img src={img} alt={title} className={styles.cardImg} />
      <div className={styles.contentWrapper}>
        <div className={styles.bgBlur} />
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{content}</div>
          <Marquee gradient={false}>
                <div className={styles.marqee}>{title}</div>
                <div className={styles.marqeeDot}>•</div>
                <div className={styles.marqee}>{title}</div>
                <div className={styles.marqeeDot}>•</div>
                <div className={styles.marqee}>{title}</div>
                <div className={styles.marqeeDot}>•</div>
                <div className={styles.marqee}>{title}</div>
                <div className={styles.marqeeDot}>•</div>
                <div className={styles.marqee}>{title}</div>
                <div className={styles.marqeeDot}>•</div>
          </Marquee>
        </div>
      </div>
    </div>
  )
}

const InfoCardsSection = ({ cards, progress, toggle }: any) => {
  useEffect(() => {
    toggle(!(progress > 0 && progress < 1))
  }, [progress])
  return (
    <ScrollFader
      progress={progress}
      scrollFadeDistance={10}
      scrollVisibleDistance={0}
      scaleIn={1}
      height='100%'
      width='100%'
    >
      <div className={styles.cardWrapper}>
        {cards.map((c: any, i: number) => (
          <Card key={i} title={c.title} img={c.img} content={c.content} />
        ))}
      </div>
    </ScrollFader>
  )
}

export default InfoCardsSection
