import styles from './info-cards.module.scss'

const MobileCard = ({ img, title, content }: any) => {
  return (
    <div className={styles.mobileCard}>
      <img className={styles.bgImg} src={img} alt={title} />
      <div className={styles.contentWrapper}>
        <div className={styles.contentBg} />
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.text}>{content}</div>
        </div>
      </div>
    </div>
  )
}

const InfoCardsMobile = ({ cards }: any) => {
  return (
    <div className={styles.mobileCardWrapper}>
      {cards.map((c: any, i: number) => (
        <MobileCard key={i} img={c.img} title={c.title} content={c.content} />
      ))}
    </div>
  )
}

export default InfoCardsMobile
