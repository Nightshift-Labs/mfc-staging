import styles from '../../styles/components/minting.module.scss'

const MintingFooter = () => {
  const year = new Date().getFullYear()

  return (
    <div className={styles.footer}>
      <div className={styles.footerText}>
        © {year} Irreverent Labs. All rights reserved.
      </div>
      <div className={styles.socialMedia}>
        <SocialMediaLink
          link='https://twitter.com/mechafightclub'
          site='twitter'
        />
        <SocialMediaLink
          link='https://medium.com/@IrreverentLabs'
          site='medium'
        />
        <SocialMediaLink
          link='https://discord.com/invite/mechafightclub'
          site='discord'
        />
        <SocialMediaLink
          link='https://www.linkedin.com/company/irreverentlabs/'
          site='linkedin'
          linkedin
        />
      </div>
    </div>
  )
}

const SocialMediaLink = ({ link, site, linkedin = false }: any) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noreferrer'
      referrerPolicy='no-referrer'
      className={`${styles.icon} ${styles[site]} ${linkedin ? styles.linkedin : ''}`}
    />
  )
}

export default MintingFooter
