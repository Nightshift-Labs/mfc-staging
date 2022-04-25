import styles from './release.module.scss'

import chicken from '../../../../public/images/landingpage/release/chicken.png'
import vegas from '../../../../public/images/landingpage/release/vegas.png'
import egg from '../../../../public/images/landingpage/release/egg.png'
import title from '../../../../public/images/landingpage/release/mobiletitle.svg'

const ReleaseMobile = () => {
  return (
    <div className={styles.mobileWrapper}>
      <div>
        <div className={styles.mobileTitle}>
        <h3>Game Release</h3>
        <h3><span>Spring 2022</span></h3>
        </div>
        <img src={chicken.src} alt='chicken' className={styles.img} />
        <img src={vegas.src} alt='vegas' className={styles.img} />
        <img src={egg.src} alt='egg' className={styles.img} />
      </div>
    </div>
  )
}

export default ReleaseMobile
