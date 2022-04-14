import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { MagicLinkModalContext } from "../contexts/magic-link-modal-context";
import { UserContext } from "../contexts/user-context";
import { browserName, CustomView } from "react-device-detect";

//ASSETS
import MFC from "../public/images/banner/mfc-text.svg";
import DetailBottom from "../public/images/banner/hero-detail-bottom.svg";
import DetailLeft from "../public/images/banner/hero-detail-left.svg";
import DetailLine from "../public/images/banner/hero-detail-line.svg";
import DetailRightBottom from "../public/images/banner/hero-detail-right-bottom.svg";
import DetailRight from "../public/images/banner/hero-detail-right.svg";

import styles from "../styles/components/hero.module.scss";

const Button = dynamic(() => import("./shared/button"));

const HeroBanner = ({}) => {
  const [safari, setSafari] = useState(false);
  const [iOS, setiOS] = useState(false);

  useEffect(() => {
    if (navigator) {
      const uA = navigator.userAgent;
      const vendor = navigator.vendor;
      if (
        /Safari/i.test(uA) &&
        /Apple Computer/.test(vendor) &&
        !/Mobi|Android/i.test(uA)
      ) {
        setSafari(true);
      }
      const iOS = () => {
        return (
          [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
          ].includes(navigator.platform) ||
          // iPad on iOS 13 detection
          (navigator.userAgent.includes("Mac") && "ontouchend" in document)
        );
      };

      setiOS(iOS);
    }
  }, []);

  const { openModal } = useContext(MagicLinkModalContext);
  const { user } = useContext(UserContext);

  return (
    <section className={styles.hero}>
      <div className={styles.fullscreenBG}>
        <CustomView condition={browserName !== "Safari"}>
          <div className={styles.overlayTop}></div>
        </CustomView>

        <video
          autoPlay
          muted
          playsInline
          loop
          id="hero-video"
          className={styles.fullscreenBGVideo}
        >
          <source src="/images/banner/egg-loop-fog.mp4" />
        </video>

        <CustomView condition={browserName !== "Safari"}>
          <div className={styles.overlayBottom}></div>
        </CustomView>

        <CustomView condition={browserName !== "Safari"}>
          <div className={styles.overlaySide}></div>
        </CustomView>
      </div>
      {safari ? (
        <div className={styles.safariContentContainer}>
          <div className={styles.content}>
            <div className={styles.detailLeft}>
              <Image src={DetailLeft} alt="shapes" />
            </div>
            <div className={styles.detailRight}>
              <Image src={DetailRight} alt="shapes" />
            </div>
            <div className={styles.mfcText}>
              <Image src={MFC} alt="MechaFightClub text" />
            </div>
            <p>
              Own a fighter in MFC — the metaverse’s biggest fight club — and
              earn as your champion competes in hilarious battles with other
              advanced, artificially intelligent NFT fighters.
            </p>
            <div className={styles.buttonGroup}>
              {openModal && !user && (
                <Button
                  text={`Sign Up`}
                  type="primary-hero"
                  icon={false}
                  link={""}
                  click={() => openModal()}
                />
              )}
              <Link href="#about" passHref>
                <a>
                  <Button
                    text={`Learn More`}
                    type="secondary-hero"
                    link={""}
                    icon={false}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.detailLine}>
              <Image src={DetailLine} alt="lines" />
            </div>
            <div className={styles.detailBottomRight}>
              <Image src={DetailRightBottom} alt="lines" />
            </div>
            <div className={styles.detailBottom}>
              <Image src={DetailBottom} alt="background text" />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <div className={styles.detailLeft}>
              <Image src={DetailLeft} alt="shapes" />
            </div>
            <div className={styles.detailRight}>
              <Image src={DetailRight} alt="shapes" />
            </div>
            <div className={styles.mfcText}>
              <Image src={MFC} alt="MechaFightClub text" />
            </div>
            <p>
              Own a fighter in MFC — the metaverse’s biggest fight club — and
              earn as your champion competes in hilarious battles with other
              advanced, artificially intelligent NFT fighters.
            </p>
            <div className={styles.buttonGroup}>
              {openModal && !user && (
                <Button
                  text={`Sign Up`}
                  type="primary-hero"
                  icon={false}
                  link={""}
                  click={() => openModal()}
                />
              )}
              <Link href="#about" passHref>
                <a>
                  <Button
                    text={`Learn More`}
                    type="secondary-hero"
                    link={""}
                    icon={false}
                  />
                </a>
              </Link>
            </div>
            <div className={styles.detailLine}>
              <Image src={DetailLine} alt="lines" />
            </div>
            <div className={styles.detailBottomRight}>
              <Image src={DetailRightBottom} alt="lines" />
            </div>
            <div className={styles.detailBottom}>
              <Image src={DetailBottom} alt="background text" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroBanner;
