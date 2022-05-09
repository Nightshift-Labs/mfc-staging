import { MediaCardProps } from './MediaCardProps'
import styles from './mediaCard.module.scss'
import { useEffect, useRef, useState } from 'react'

const MediaCard = ({
  title,
  description,
  link,
  logo,
  image
}: MediaCardProps) => {
  const bodyRef: any = useRef()
  const [isSmall, setIsSmall] = useState(false)

  useEffect(() => {
    var height = bodyRef.current?.getBoundingClientRect().height
    if (height > 400 && !!isSmall) setIsSmall(false)
    else if (height <= 400 && !isSmall) setIsSmall(true)
  })

  return (
    <div ref={bodyRef} className={`${styles.wrapper} ${styles.cuttout}`}>
      <div
        className={`${styles.container} ${styles.cuttout} ${
          isSmall ? styles.small : ''
        }`}
      >
        <div className={styles.image}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.border}>
            <div className={styles.small} />
            <div className={styles.large} />
          </div>
          <div className={styles.description}>{description}</div>
          <div className={styles.footer}>
            <a
              href={link}
              target='_blank'
              rel='noreferrer'
              className={styles.button}
            >
              Read Article
            </a>
            <img src={logo} alt='logo' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaCard
