import styles from './projectTeam.module.scss'

import linkedIn from '../../../../public/images/linkedin-icon.svg'
import instagram from '../../../../public/images/instagram-icon.svg'
import twitter from '../../../../public/images/twitter-icon.svg'

const TeamCard = ({ card }: any) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${card.img})` }}
      />
      <div className={styles.title}>
        <div className={styles.name}>{card.name}</div>
        <SocialMedia card={card} />
      </div>
    </div>
  )
}

const SocialMedia = ({ card }: any) => {
  return (
    <div className={styles.sm}>
      {card.linkedIn ? (
        <a href={card.linkedIn} target='_blank' rel="noreferrer">
          <img className={styles.smImg} src={linkedIn.src} alt='linkedIn' />
        </a>
      ) : null}
      {card.insta ? (
        <a href={card.insta} target='_blank' rel="noreferrer">
          <img className={styles.smImg} src={instagram.src} alt='insta' />
        </a>
      ) : null}
      {card.twitter ? (
        <a href={card.twitter} target='_blank' rel="noreferrer">
          <img className={styles.smImg} src={twitter.src} alt='twitter' />
        </a>
      ) : null}
    </div>
  )
}

export default TeamCard
