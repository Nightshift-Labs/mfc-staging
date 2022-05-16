import styles from './details.module.scss'

const DetailsText = () => {
  return (
      <div className={styles.detailsTextWrapper}>
        <div className={styles.detailsLiberation}>
        Claim and train your artificially-intelligent mechabot in the craziest combat arena ever created!
        </div>
        <div className={styles.detailsText}>
          MFC is reinventing entertainment, starting with the release of <span>6,969 EGGs</span>, alien technology used to generate truly unique mechabots! Each Mechabot will train, fight, compete and breed for you, earning BokBoks based on human engagement and performance. Only <span>41,000 genesis mechabots</span> can ever be produced, one for each EGG left on Earth by the advanced Satoshi aliens.
        </div>
      </div>
  )
}

export default DetailsText
