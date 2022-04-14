import Image from "next/image";
import Link from "next/link";
import { MediaCardProps } from "../interfaces/MediaCardProps";

//ASSETS
import Divider from "../public/images/team-divider.svg";
import WhiteTriangle from "../public/images/white-triangle-corner.svg";

import styles from "../styles/components/media-card.module.scss";

const MediaCard = ({
  title,
  description,
  link,
  image,
  logo,
}: MediaCardProps) => {
  return (
    <article className={styles.mediaCard}>
      <div className={styles.border}>
        <div className={styles.card}>
          <img src={image} alt="media image" className={styles.cardImage} />
        </div>
        <div className={styles.content}>
          <Link href={link} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <h4 className={styles.title}>{title}</h4>
            </a>
          </Link>
          <div className={styles.divider}>
            <Image
              src={Divider}
              alt="divider"
              width={650}
              height={15}
              layout="responsive"
            />
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.buttonWrapper}>
            <a
              href={link}
              className={styles.button}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Article
            </a>
            <div className={styles.logo}>
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.whiteTriangle}>
        <Image src={WhiteTriangle} alt="white triangle" />
      </div>
    </article>
  );
};

export default MediaCard;
