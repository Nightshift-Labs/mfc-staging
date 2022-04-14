import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";

import styles from "../styles/components/explore.module.scss";

//ASSETS
import MFCAlt from "../public/images/home/mfc-logo-alt.svg";
import Explore1 from "../public/images/explore/explore1.png";
import Explore1Desktop from "../public/images/explore/explore1-desktop.png";
import Explore2 from "../public/images/explore/explore2.svg";
import Explore2Desktop from "../public/images/explore/explore2-desktop.png";
import Explore3 from "../public/images/explore/explore3.svg";
import Explore3Desktop from "../public/images/explore/explore3-desktop.png";
import Explore4 from "../public/images/explore/darker-small.png";
import Explore4Desktop from "../public/images/explore/explore4-desktop.png";

import RightBracket from "../public/images/explore/right-bracket.svg";
import LeftBracket from "../public/images/explore/left-bracket.svg";

import Circle from "../public/images/explore/circle.svg";
import PurpleLine from "../public/images/explore/purple-line.svg";
import WhiteLine from "../public/images/explore/white-line.svg";
import GreenLine from "../public/images/explore/green-line.svg";
import WhiteLine2 from "../public/images/explore/white-line-2.svg";

// import Centurion from '../public/images/explore/cent.png'
import Lambo from "../public/images/explore/lambo-min.png";
import Zombie from "../public/images/explore/zombie-min.png";
import Pure from "../public/images/explore/purewhite-min.png";
import Royal from "../public/images/explore/royal-min.png";
import Snow from "../public/images/explore/snow-min.png";

import DotGroup from "../public/images/home/square-dot-group.svg";
import TwoDots from "../public/images/home/team-dots.svg";

const Explore = () => {
  const [count, setCount] = useState(0);
  const images = [Lambo, Zombie, Pure, Royal, Snow];

  useEffect(() => {
    setInterval(() => {
      setCount((prev) => (prev < 4 ? prev + 1 : 0));
    }, 1000);
  }, []);

  return (
    <section className={styles.explore}>
      <div className={styles.exploreDots}>
        <Image src={DotGroup} alt="dots" />
      </div>
      <div className={styles.twoDots}>
        <Image src={TwoDots} alt="dots" />
      </div>
      <div className={styles.exploreIntro}>
        <div className={styles.exploreSVG}>
          <Image src={MFCAlt} alt="lines" />
        </div>
        <h3 className={styles.subtitle}>
          Exploring <span className={styles.primaryColor}>The MFC Mechbot</span>
        </h3>
        <div className={styles.leftBracket}>
          <Image src={LeftBracket} alt="left bracket" />
        </div>
        <p className={styles.exploreDescription}>
          The MFC world is filled with rich lore, hysterical fights and unique
          technology. Your mechabot will start life as an EGG before hatching
          into a unique bionic creature living entirely on the blockchain.
        </p>
        <div className={styles.rightBracket}>
          <Image src={RightBracket} alt="left bracket" />
        </div>
      </div>

      <div className={styles.mechaContainer}>
        <ScrollAnimation animateOnce animateIn="fadeIn1">
          <article className={styles.exploreCard1}>
            <div className={styles.exploreCardImage1}>
              <Image src={Explore1} alt="shape" height="575" />
            </div>
            <div className={styles.exploreCardImage1Desktop}>
              <Image src={Explore1Desktop} alt="shape" />
            </div>
            <div className={styles.exploreCardContent}>
              <h4>These are the thinky bits</h4>
              <p>
                MFC’s mechabots are powered by highly advanced artificial
                intelligence and lifelike reproduction processes, making them
                change and evolve over time and across generations. But be sure
                to keep the vitals safe, too much damage during an MFC match and
                you’ll be taking a fistful of fried chicken in for repairs.
              </p>
            </div>
          </article>
        </ScrollAnimation>

        <ScrollAnimation animateOnce animateIn="fadeIn2">
          <article className={styles.exploreCard2}>
            <div className={styles.exploreCardImage2}>
              <Image src={Explore2} alt="shape" />
            </div>
            <div className={styles.exploreCardImage2Desktop}>
              <Image src={Explore2Desktop} alt="shape" />
            </div>
            <div className={styles.exploreCardContent}>
              <h4>For the rooster lovers out there</h4>
              <p>
                In the early days, alien mechabots came in many form factors.
                From worms to weird ukelele-shaped monsters with EMP weapons
                that would disrupt your dreams, they’ve come a long way in the
                last century!
              </p>
              <p>
                These days, the advanced AI and genomic algorithms that dictate
                their evolution seem to have settled on the peak physical form:
                the chicken.
              </p>
              <p>Step aside, homo sapiens, MFC is for the birds!</p>
            </div>
          </article>
        </ScrollAnimation>

        <ScrollAnimation animateOnce animateIn="fadeIn3">
          <article className={styles.exploreCard3}>
            <div className={styles.exploreCardImage3}>
              <Image src={Explore3} alt="shape" />
            </div>
            <div className={styles.exploreCardImage3Desktop}>
              <Image src={Explore3Desktop} alt="shape" />
            </div>
            <div className={styles.exploreCardContent}>
              <h4>Urk Reactor</h4>
              <p>
                Did you know that a single URK reactor uses alien technology to
                produce more power than 700 nuclear bombs? And your mech will
                have three! Too bad the finer details of this engineering were
                lost when the aliens abandoned humanity way back in 2066, but at
                least we still have 41,000 EGGs they left behind!
              </p>
            </div>
          </article>
        </ScrollAnimation>

        <ScrollAnimation animateOnce animateIn="fadeIn4">
          <article className={styles.exploreCard4}>
            <div className={styles.exploreCardImage4}>
              <Image src={Explore4} alt="shape" />
            </div>
            <div className={styles.exploreCardImage4Desktop}>
              <Image src={Explore4Desktop} alt="shape" />
            </div>
            <div className={styles.exploreCardContent}>
              <h4>Your Bionic Birdies</h4>
              <p>
                Your mechabot will be just like you... except you’re made of goo
                and they’re made of alien materials too advanced for the human
                mind to comprehend! Some mechabots even hatch with
                irreplaceably-rare bionic claws, beaks and other parts!
              </p>
              <p>
                Don’t like your mechabot but love its bionics? The Kernel can
                recycle bionics and convert the remainder of your bird into
                nuggets, MFC’s worldwide exchange medium of choice!
              </p>
            </div>
          </article>
        </ScrollAnimation>

        <div className={styles.mechaWrapper}>
          <div className={styles.circle}>
            <Image src={Circle} alt="circle" />
          </div>
          <div className={styles.mecha}>
            <div className={styles.purpleLine}>
              <Image src={PurpleLine} alt="shape" />
            </div>
            <div className={styles.whiteLine2}>
              <Image src={WhiteLine2} alt="shape" />
            </div>
            <div className={styles.bird}>
              <Image src={images[count]} alt="shape" />
            </div>
            <div className={styles.greenLine}>
              <Image src={GreenLine} alt="shape" />
            </div>
            <div className={styles.whiteLine}>
              <Image src={WhiteLine} alt="shape" />
            </div>
          </div>
        </div>

        <article className={styles.exploreCard3Mobile}>
          <div className={styles.exploreCardImage3}>
            <Image src={Explore3} alt="shape" />
          </div>
          <div className={styles.exploreCardImage3Desktop}>
            <Image src={Explore3Desktop} alt="shape" />
          </div>
          <div className={styles.exploreCardContent}>
            <h4>Urk Reactor</h4>
            <p>
              Did you know that a single URK reactor uses alien technology to
              produce more power than 700 nuclear bombs? And your mech will have
              three! Too bad the finer details of this engineering were lost
              when the aliens abandoned humanity way back in 2066, but at least
              we still have 41,000 EGGs they left behind!
            </p>
          </div>
        </article>

        <article className={styles.exploreCard4Mobile}>
          <div className={styles.exploreCardImage4}>
            <Image src={Explore4} alt="shape" height="575" />
          </div>
          <div className={styles.exploreCardImage4Desktop}>
            <Image src={Explore4Desktop} alt="shape" />
          </div>
          <div className={styles.exploreCardContent}>
            <h4>Your Bionic Birdies</h4>
            <p>
              Your mechabot will be just like you... except you’re made of goo
              and they’re made of alien materials too advanced for the human
              mind to comprehend! Some mechabots even hatch with
              irreplaceably-rare bionic claws, beaks and other parts!
            </p>
            <p>
              Don’t like your mechabot but love its bionics? The Kernel can
              recycle bionics and convert the remainder of your bird into
              nuggets, MFC’s worldwide exchange medium of choice!
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Explore;
