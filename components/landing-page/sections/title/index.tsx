import ScrollFader from '../../generic/scrollFader'
import styles from './title.module.scss'

import Title from '../../../../public/images/landingpage/title/title.svg'
import TitleMobile from '../../../../public/images/landingpage/title/title-mobile.svg'
import Desc from '../../../../public/images/landingpage/title/desc.svg'
import DescMobile from '../../../../public/images/landingpage/title/desc-mobile.svg'
import Button from '../../../shared/button'
import { useContext } from 'react'
import { MagicLinkModalContext } from '../../../../contexts/magic-link-modal-context'


const TitleSection = ({ progress }: any) => {
  const { openModal } = useContext(MagicLinkModalContext)

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
        <img src={TitleMobile.src} alt='title' className={styles.logoMobile} />
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
                click={openModal}
                text='Sign Up'
                type='primary'
                icon={false}
                disabled={false}
                link=''
              />
              <Button
                click={() => window?.open("https://discord.com/invite/mechafightclub", '_blank')?.focus()}
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
