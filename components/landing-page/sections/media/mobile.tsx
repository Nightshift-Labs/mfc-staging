import { useEffect, useRef } from 'react'
import MediaCard from '../../../media-card'
import styles from './media.module.scss'

const MediaMobile = ({ mediaCards }: any) => {

  return (
    <div className={styles.mobilewrapper}>
      <div className={styles.title}>
        {`Press & `}
        <span>Media</span>
      </div>
      {mediaCards.map((m: any, i: number) => (
        <div key={i} className={styles.cardWrapper}>
          <MediaCard {...m} />
        </div>
      ))}
    </div>
  )
}

export default MediaMobile
