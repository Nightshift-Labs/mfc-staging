import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

import styles from "../../styles/components/footer.module.scss";

//ASSETS
import Logo from "../../public/images/mfc-full-logo.svg";
import Twitter from "../../public/images/twitter.svg";
import LinkedIn from "../../public/images/linkedin.svg";

const Button = dynamic(() => import("./button"));

const Footer = ({}) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.footerInner}>
          <div className={styles.logo}>
            <Image src={Logo} alt="MechaFightClub logo" />
          </div>
          <div className={styles.footerButton}>
            <Button
              type="discord-link"
              text="Join Our Discord"
              icon={true}
              link={"http://discord.gg/mechafightclub"}
            />
          </div>
          <ul className={styles.navLinks}>
            <li className={styles.socialLogo}>
              <Link href="/#about">
                <a>About</a>
              </Link>
            </li>
            <li className={styles.socialLogo}>
              <Link href="/#roadmap">
                <a>Roadmap</a>
              </Link>
            </li>
            <li className={styles.socialLogo}>
              <Link href="/#media">
                <a>Release</a>
              </Link>
            </li>
            <li className={styles.socialLogo}>
              <Link href="/#team">
                <a>Team</a>
              </Link>
            </li>
          </ul>
          <ul className={styles.icons}>
            <li>
              <Link
                passHref
                href="https://www.linkedin.com/company/irreverentlabs/"
              >
                <a target="_blank" rel="noopener noreferrer">
                  <Image src={LinkedIn} alt="LinkedIn icon" />
                </a>
              </Link>
            </li>
            <li>
              <Link passHref href="http://twitter.com/mechafightclub">
                <a target="_blank" rel="noopener noreferrer">
                  <Image src={Twitter} alt="Twitter icon" />
                </a>
              </Link>
            </li>
            {/* <li>
                        <Link passHref href="/">
                            <a>
                                <Image src={Medium} alt="Medium icon"/>
                            </a>
                        </Link>
                    </li> */}
          </ul>
        </div>
        <p className={styles.footerYear}>
          © {new Date().getFullYear()} Irreverent Labs. All Rights Reserved.
        </p>
        <div className={styles.tosContainer}>
          <a
            href="https://app.termly.io/document/terms-of-use-for-website/07eae708-9869-4328-bedd-3330bb29fb87"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Terms of Use
          </a>
          <a
            href="https://app.termly.io/document/privacy-policy/861615dc-b01c-4254-b881-155e95400659"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
