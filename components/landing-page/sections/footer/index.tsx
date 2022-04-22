import styles from './footer.module.scss'
import SignUp from './signUp'

import linkedIn from '../../../../public/images/linkedin-icon-2.svg'
import discord from '../../../../public/images/discord-icon.svg'
import twitter from '../../../../public/images/twitter-icon-2.svg'
import medium from '../../../../public/images/medium-icon.svg'
import logo from '../../../../public/images/mfc-full-logo.svg'

const SocialMediaItem = ({ src, children, href }: any) => {
  return (
    <a
      className={styles.socialMediaItem}
      href={href}
      target='_blank'
      rel='noreferrer'
    >
      <img src={src} alt='twitter' className={styles.smicon} />{' '}
      <span>{children}</span>
    </a>
  )
}

const SocialMediaItems = () => {
  return (
    <div className={styles.socialMedia}>
      <div className={styles.socialMediaGroups}>
        <SocialMediaItem
          src={twitter.src}
          href='https://discord.gg/mechafightclub'
        >
          Twitter
        </SocialMediaItem>
        <SocialMediaItem
          src={medium.src}
          href='https://medium.com/@IrreverentLabs'
        >
          Medium
        </SocialMediaItem>
        <SocialMediaItem
          src={discord.src}
          href='https://discord.gg/mechafightclub'
        >
          Discord
        </SocialMediaItem>
        <SocialMediaItem
          src={linkedIn.src}
          href='https://www.linkedin.com/company/irreverentlabs/'
        >
          LinkedIn
        </SocialMediaItem>
      </div>
    </div>
  )
}

const FooterSection = () => {
  return (
    <div className={styles.footerWrapper} id='landing-footer'>
      <div className={styles.copywrite}>
        © 2022 Irreverent Labs. All rights reserved.
      </div>
      <div className={styles.footer}>
        <h3 className={styles.title}>
          Early birds <br />
          <span className={styles.primaryColor}>get the worms!</span>
        </h3>
        <SignUp />
        <img src={logo.src} alt='logo' className={styles.logo} />
        <SocialMediaItems />
      </div>
    </div>
  )
}

export default FooterSection
