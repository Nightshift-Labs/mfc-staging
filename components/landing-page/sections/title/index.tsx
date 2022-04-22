import ScrollFader from '../../generic/scrollFader'
import styles from './title.module.scss'

import Title from '../../../../public/images/landingpage/title/title.svg'
import Desc from '../../../../public/images/landingpage/title/desc.svg'
import DescMobile from '../../../../public/images/landingpage/title/desc-mobile.svg'
import Button from '../../../shared/button'

const TitleSection = ({ progress }: any) => {
  return (
    <div>
      <ScrollFader
        progress={progress}
        min={0}
        max={0.5}
        scrollVisibleDistance={0}
        scrollFadeDistance={0}
        scaleIn={0.975}
      >
        <img src={Title.src} alt='title' className={styles.logo} />
      </ScrollFader>
      <ScrollFader
        progress={progress}
        min={0.5}
        max={1}
        scrollVisibleDistance={0}
        scrollFadeDistance={0}
        scaleIn={0.975}
      >
        <div className={styles.desc}>
          <img src={Desc.src} alt='description' className={styles.descLogo} />
          <img
            src={DescMobile.src}
            alt='description'
            className={styles.descLogoMobile}
          />
          <div className={styles.buttonContainer}>
            <div className={styles.buttonWrapper}>
              <Button
                click={() => console.log('click')}
                text='Sign Up'
                type='primary'
                icon={false}
                disabled={false}
                link=''
              />
              <Button
                click={() => console.log('click')}
                text='Join Our Discord'
                type='secondary'
                icon={false}
                disabled={false}
                link=''
              />
            </div>
          </div>
        </div>
      </ScrollFader>
    </div>
  )
}

export default TitleSection
