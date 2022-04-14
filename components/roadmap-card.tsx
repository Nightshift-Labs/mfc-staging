import dynamic from "next/dynamic";
import Image from "next/image";

//ASSETS
import Divider from "../public/images/roadmap/divider.svg";
import Back from "../public/images/number-back.svg";
import GreenBack from "../public/images/num-back-green.svg";
import DownBlock from "../public/images/home/down-arrow-block.svg";
import WhiteTriangle from "../public/images/white-triangle-corner.svg";
import { RoadMapCardProps } from "../interfaces/RoadMapCardProps";

import styles from "../styles/components/roadmap-card.module.scss";

const RoadMapCard = ({
  num,
  headline,
  date,
  title,
  description,
  featured,
  image,
}: RoadMapCardProps) => {
  return (
    <>
      {featured ? (
        <article className={styles.roadmapCardFeatured}>
          <div className={styles.border}>
            <div className={styles.numBack}>
              <Image src={GreenBack} alt="background" />
            </div>
            <span className={styles.num}>{num}</span>
            <div className={styles.card}>
              <Image
                src={image}
                alt="roadmap image"
                width={400}
                height={400}
                layout="responsive"
              />
              {/* <img src={image} alt="roadmap img" /> */}
            </div>
            <div className={styles.content}>
              <span className={styles.date}>{date}</span>
              <h4 className={styles.title}>{title}</h4>
              <div className={styles.divider}>
                <Image src={Divider} alt="divider" />
              </div>
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.whiteTriangle}>
            <Image src={WhiteTriangle} alt="white triangle" />
          </div>
        </article>
      ) : (
        <article className={styles.roadmapCard}>
          <div className={styles.numBack}>
            <Image src={Back} alt="background" />
          </div>
          <span className={styles.num}>{num}</span>
          {/* <div className={styles.card} style={{'background': `url(${image})`, 'backgroundPosition':'center', 'backgroundSize': 'cover', 'backgroundRepeat':'no-repeat', objectFit: 'cover'}}></div> */}
          <img
            src={image}
            className={styles.cardImage}
            alt="milestone illustration"
          />
          <div className={styles.content}>
            <span className={styles.date}>{date}</span>
            <h4 className={styles.title}>{title}</h4>
            <p>{description}</p>
          </div>
          <div className={styles.downBlock}>
            <Image src={DownBlock} alt="down arrow" />
          </div>
        </article>
      )}
    </>
  );
};

export default RoadMapCard;
