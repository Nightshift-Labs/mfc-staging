import Image from "next/image";
import Link from "next/link";
import { TeamCardProps } from "../interfaces/TeamCardProps";

//ASSETS
import Divider from "../public/images/team-divider.svg";
import Instagram from "../public/images/instagram-icon.svg";
import Linkedin from "../public/images/linkedin-icon.svg";
import Twitter from "../public/images/twitter-icon.svg";
import GreenTriangle from "../public/images/green-triangle-corner.svg";

import styles from "../styles/components/teamcard.module.scss";

const RoadMapCard = ({
  linkedin,
  instagram,
  twitter,
  name,
  position,
  image,
  reveal,
}: TeamCardProps) => {
  return (
    <article className={styles.teamCard}>
      <div className={styles.border}>
        <div className={styles.card}>
          <img src={image} alt="team member" />
        </div>
        <div className={styles.content}>
          <div className={styles.social}>
            {linkedin !== "/" && (
              <div className={styles.socioalIcon}>
                <Link href={linkedin}>
                  <a target="_blank">
                    <Image src={Linkedin} alt="instagram icon" />
                  </a>
                </Link>
              </div>
            )}
            {instagram !== "/" && (
              <div className={styles.socioalIcon}>
                <Link href={instagram}>
                  <a target="_blank">
                    <Image src={Instagram} alt="instagram icon" />
                  </a>
                </Link>
              </div>
            )}
            {twitter !== "/" && (
              <div className={styles.socioalIcon}>
                <Link href={twitter}>
                  <a target="_blank">
                    <Image src={Twitter} alt="twitter icon" />
                  </a>
                </Link>
              </div>
            )}
          </div>
          {reveal && (
            <div className={styles.reveal}>
              <span className={styles.undoxxed}>Undoxxed</span>
              <span className={styles.soon}>Reavealed Soon</span>
            </div>
          )}
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.divider}>
            <Image src={Divider} alt="divider" />
          </div>
          <p className={styles.position}>{position}</p>
        </div>
      </div>
      <div className={styles.greenTriangle}>
        <Image src={GreenTriangle} alt="green triangle" />
      </div>
    </article>
  );
};

export default RoadMapCard;
