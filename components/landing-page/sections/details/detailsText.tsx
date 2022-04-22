import styles from './details.module.scss'

const DetailsText = () => {
  return (
      <div className={styles.detailsTextWrapper}>
        <div className={styles.detailsLiberation}>
          Liberated peoples of earth, take notice! Claim and train your mechabot
          now to join MFC, the craziest combat arena since Rome&apos;s colleseum.
        </div>
        <div className={styles.detailsText}>
          MFC is coming to liberate a city near you! We&apos;re releasing{' '}
          <span>6,969 fully-fertilized EGGs</span> which will hatch into MFC
          mechabots. They&apos;ll fight and breed for you. They&apos;re powered by lost
          alien technologies beyond human comprehension, so supplies are
          extremely limited! This is the first batch of{' '}
          <span>only 41,000 total EGGs on Earth</span>, and we plan to find and
          distribute every last one of them!
        </div>
      </div>
  )
}

export default DetailsText
