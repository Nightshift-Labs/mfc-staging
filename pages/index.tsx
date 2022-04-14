import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import { getIdToken, isLoggedIn } from "../services/magic-service";
import { api } from "./_app";
import { getCompletedSteps } from "../utils/helpers";
import { PlayersMe } from "../interfaces/api/PlayersMe";
import type { NextPage } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";

import styles from "../styles/pages/home.module.scss";

//ASSETS
import IntroImage from "../public/images/home/eggtop-min.png";

//Launch
import LaunchBird from "../public/images/home/moltress-launch.png";
import LaunchText from "../public/images/home/launch-bg-text.svg";

import Infinity from "../public/images/home/infinity.svg";
import Moltress2 from "../public/images/home/moltres2.png";
import TeamBG from "../public/images/home/project-bg.png";
import ThreeDots from "../public/images/home/three-dots.svg";
import RoadPlus from "../public/images/home/roadmap-plus.svg";
import RoadSideDots from "../public/images/home/roadmap-side-dots.svg";
import TeamDots from "../public/images/home/team-dots.svg";
import DotGroup from "../public/images/home/square-dot-group.svg";
import PlusGroup from "../public/images/home/investors-plus.svg";
import LaunchImage from "../public/images/home/vegas-bg.jpeg";
import A16Z from "../public/images/home/a16z.svg";
import Manits from "../public/images/home/Mantis_Crop.png";
import Chainsmokers from "../public/images/home/chainsmokers.svg";

const Header = dynamic(() => import("../components/shared/header"));
const Layout = dynamic(() => import("../layout/layout"));
const HeroBanner = dynamic(() => import("../components/hero-banner"));
const Explore = dynamic(() => import("../components/explore"));
const RoadMapCard = dynamic(() => import("../components/roadmap-card"));
const TeamCard = dynamic(() => import("../components/team-card"));
const MediaCard = dynamic(() => import("../components/media-card"));
const SignUp = dynamic(() => import("../components/shared/signup"));

const Home: NextPage = () => {
  const [safari, setSafari] = useState(false);

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
    }
  }, []);

  const { setCompletedSteps, setPlayerProfile } = useContext(UserContext);

  useEffect(() => {
    const init = async () => {
      if (!(await isLoggedIn())) return;

      await api.get("/api/v1/players/me").then((response) => {
        if (response.ok) {
          const playerProfile = response.data as PlayersMe;
          if (setPlayerProfile && playerProfile && setCompletedSteps) {
            setPlayerProfile(playerProfile);
            const completedSteps = getCompletedSteps(playerProfile) || [];
            setCompletedSteps(completedSteps);
          }
        }
      });
    };

    init();
  }, []);

  return (
    <section className={styles.home}>
      <Header title="Home" />
      <HeroBanner />
      <Layout>
        <section className={styles.intro} id="about">
          <div className={styles.threeDots}>
            <Image src={ThreeDots} alt="dots" />
          </div>
          <h3 className={styles.subtitle}>
            What is <span className={styles.primaryColor}>Mecha</span>Fight
            <span className={styles.primaryColor}>Club?</span>
          </h3>
          <div className={styles.introInner}>
            <div className={styles.introImage}>
              <Image src={IntroImage} alt="mechas" />
            </div>
            <div className={styles.introContent}>
              <p className={styles.altTextGreen}>
                Compete in the biggest fight club in the metaverse as the owner
                of a one-of-a-kind, artificially intelligent mechabot.
              </p>
              <p className={styles.exploreP}>
                MFC takes place in a world ravaged by long-since abandoned alien
                technology. Evil corporations monopolized this and enslaved
                humanity, but a global resistance seized and repurposed them as
                weapons of mass entertainment.
              </p>
              <p className={styles.exploreP}>
                Mechabot roosters are smart, and hens are even smarter. Each
                mechabot is a fully unique individual living on the blockchain
                with its own digital biology and intelligence. They will even
                learn, developing their own fighting styles and personalities
                throughout their lives!
              </p>
              <p className={styles.exploreP}>
                They live to fight and love to breed, giving you the opportunity
                to influence the gene pool of the next generation. Owners even
                earn crypto as their mechabots fight in the metaverse’s biggest
                professional combat arena: the Cocktagon.
              </p>
              <p className={styles.exploreP2}>
                Only{" "}
                <span className={styles.primaryColor}>
                  41,000 Genesis mechabots
                </span>{" "}
                will ever be minted, with 6,969 available in MFC’s first drop.
              </p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <p className={styles.statTitle}>1</p>
                  <p className={styles.statValue}>
                    Massive <br></br>Combat Ring
                  </p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statTitle}>41,000</p>
                  <p className={styles.statValue}>
                    Unique <br></br>Superweapons
                  </p>
                </div>
                <div className={styles.stat}>
                  <div className={styles.infinity}>
                    <Image src={Infinity} alt="mechas" />
                  </div>
                  <p className={styles.statValue}>Potential</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
      <Explore />
      <Layout>
        <section className={styles.roadmap} id="roadmap">
          <div className={styles.roadmapDots}>
            <Image src={DotGroup} alt="dots" />
          </div>
          <div className={styles.roadmapSideDots}>
            <Image src={RoadSideDots} alt="dots" />
          </div>
          <div className={styles.roadmapPlus}>
            <Image src={RoadPlus} alt="plsu" />
          </div>
          <div className={styles.mobileDots}>
            <Image src={DotGroup} alt="dots" />
          </div>
          <h2>Roadmap</h2>
          <div className={styles.roadmapList}>
            <RoadMapCard
              num="01"
              headline=""
              date="Spring 2022"
              title="Genesis"
              description="Due to widespread demand, MFC is finally making mechabot ownership a public option, starting with 6969 pre-fertilized, highly potent EGGs. Based on our calculations, EGGs should take just a couple of weeks to incubate before you’re ready to train your sorta-living new best friend for arena combat!"
              featured={false}
              image="/images/roadmap/1.svg"
            />
            <RoadMapCard
              num="02"
              headline="FPO"
              date="Spring 2022"
              title="THE HATCHENING&trade;"
              description="MFC’s first chapter begins as the first 6969 EGGs finish incubating and hatch new intelligent life, each with a provenance card which entitles your mechabot to fight and train in MFC’s official arenas!"
              featured={false}
              image="/images/roadmap/2.svg"
            />
            <RoadMapCard
              num="03"
              headline="FPO"
              date="Spring 2022"
              title="WELCOME TO THE COCKPIT&trade;"
              description="Genesis continues with another exclusive round of EGGs for MFC's early-bird supporters. Around this time, we'll have constructed the Las Vegas Cockpit, the first-ever MFC amateur fighting arena. Don't worry, you can send your bird to fight from anywhere."
              featured={false}
              image="/images/roadmap/3.svg"
            />
            <RoadMapCard
              num="04"
              headline="FPO"
              date="Summer 2022"
              title="THE COCKTAGON&trade;"
              description="MFC is the official sport of the liberated peoples of Earth! MFC’s premiere professional tournament arena, the Cocktagon, finishes completion and we’re throwing the first-ever global tournament! Glory and breeding elitism waits for the champions of the Cocktagon."
              featured={false}
              image="/images/roadmap/4.svg"
            />
            <RoadMapCard
              num="05"
              headline="FPO"
              date="Summer 2022"
              title="WEN BREEDING?!"
              description="Soon after the Cocktagon, Genesis generation mechabots will reach breeding maturity! Only 2 in 5 mechabots are hens, which we've found to be more intelligent. Around this time, more about our new world order will be revealed."
              featured={false}
              image="/images/roadmap/5.svg"
            />
            <RoadMapCard
              num="06"
              headline="FPO"
              date="Summer 2022"
              title="Recombination"
              description="Without EGGs, there are no more mechs. There’s only so many EGGs on Earth, and they’re all being horded by the corporate war machine. With your help, MFC’s agents plan to recover all 41,000 and make them available so YOU can breed the next generations of prize fighters!"
              featured={false}
              image="/images/roadmap/6.svg"
            />
            <RoadMapCard
              num="07"
              headline="FPO"
              date="Fall 2022"
              title="THE LIBERATION GOES GLOBAL"
              description="MFC is committed to ending the half-century of terror by seizing every remaining EGG and ending the war machine. This year marks a new beginning for Earth with the age of MFC: hilarious, cruelty-free mechanized combat sports."
              featured={true}
              image="/images/roadmap/roadmap-featured.jpeg"
            />
          </div>
        </section>
      </Layout>

      {safari ? (
        <section className={styles.safariLaunch}>
          <div className={styles.launchText}>
            <Image src={LaunchText} alt="spring 2022" />
          </div>
          <div className={styles.launchHeading}>
            <h4 className={styles.primaryColor}>Game Release</h4>
            <h2>
              Spring<br></br>2022
            </h2>
            <div className={styles.launchBird}>
              <Image src={LaunchBird} alt="moltress" />
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.launch}>
          <div className={styles.launchText}>
            <Image src={LaunchText} alt="spring 2022" />
          </div>
          <div className={styles.launchHeading}>
            <h4 className={styles.primaryColor}>Game Release</h4>
            <h2>
              Spring<br></br>2022
            </h2>
            <div className={styles.launchBird}>
              <Image src={LaunchBird} alt="moltress" />
            </div>
          </div>
        </section>
      )}

      <section className={styles.vegas}>
        <div className={styles.launchImage}>
          <Image src={LaunchImage} alt="retro future synth las vegas" />
        </div>
        <div className={styles.vegasGradient} />
      </section>

      <Layout>
        <section className={styles.team} id="team">
          <div className={styles.moltress2}>
            <Image src={Moltress2} alt="moltress" />
          </div>
          <div className={styles.teamBG}>
            <Image src={TeamBG} alt="moltress" />
          </div>
          <div className={styles.teamDots}>
            <Image src={TeamDots} alt="moltress" />
          </div>
          <h2>
            Project <span className={styles.primaryColor}> Team</span>
          </h2>
          <div className={styles.teamList}>
            <TeamCard
              linkedin="https://www.linkedin.com/in/amarsood0/"
              instagram="/"
              twitter="https://twitter.com/soodlum"
              name="Amar"
              position=""
              image="/images/team/amar.png"
              reveal={false}
            />
            <TeamCard
              linkedin="/"
              instagram="/"
              twitter="/"
              name="Dasheed"
              position=""
              image="/images/team/dasheed.png"
              reveal={true}
            />
            <TeamCard
              linkedin="https://www.linkedin.com/in/davidraskino/"
              instagram="/"
              twitter="https://twitter.com/goofydr1"
              name="David"
              position=""
              image="/images/team/david.png"
              reveal={false}
            />
            <TeamCard
              linkedin="/"
              instagram="https://www.instagram.com/metagear2600/?hl=en"
              twitter="https://twitter.com/metagear2600"
              name="Gear"
              position=""
              image="/images/team/gear.png"
              reveal={false}
            />
            <TeamCard
              linkedin="/"
              instagram="/"
              twitter="/"
              name="Greg"
              position=""
              image="/images/team/greg.png"
              reveal={true}
            />
            <TeamCard
              linkedin="/"
              instagram="https://www.instagram.com/officialgodard2/"
              twitter="https://twitter.com/officialgodard2"
              name="MADDI"
              position=""
              image="/images/team/maddi.png"
              reveal={false}
            />
            <TeamCard
              linkedin="/"
              instagram="https://www.instagram.com/SkillsAndVariety/"
              twitter="/"
              name="MC SAV"
              position=""
              image="/images/team/mcsav.png"
              reveal={false}
            />
            <TeamCard
              linkedin="/"
              instagram="/"
              twitter="https://twitter.com/michael_moodie"
              name="Moodie"
              position=""
              image="/images/team/moodie.png"
              reveal={false}
            />
            <TeamCard
              linkedin="https://www.linkedin.com/in/serialceo/"
              instagram="/"
              twitter="https://twitter.com/rahulsood"
              name="Rahul"
              position=""
              image="/images/team/rahul.png"
              reveal={false}
            />
            <TeamCard
              linkedin="https://www.linkedin.com/in/ryan-jurado/"
              instagram="/"
              twitter="https://twitter.com/TheWonderCow"
              name="Ryan"
              position=""
              image="/images/team/ryan.png"
              reveal={false}
            />
          </div>
        </section>

        <section className={styles.media} id="media">
          <div className={styles.mediaDots}>
            <Image src={DotGroup} alt="dots" />
          </div>
          <h2>
            Press &amp; <span className={styles.primaryColor}>Media</span>
          </h2>
          <div className={styles.mediaList}>
            <MediaCard
              title="Rahul Sood returns to gaming with $5M raise for Irreverent Labs"
              description="Gaming veteran Rahul Sood is returning with a new startup today dubbed Irreverent Labs, which has raised $5 million to build games with AI characters."
              link="https://venturebeat.com/2021/11/15/rahul-sood-returns-to-gaming-with-5m-raise-for-irreverent-labs/#:~:text=Irreverent%20Labs%20is%20a%20new%20game%20studio%20in%20Seattle.&text=The%20Seattle%2Dbased%20company%20is,as%20nonfungible%20tokens%20(NFTs)"
              image="/images/media-1.png"
              logo="/images/venture-beast.png"
              featured={true}
            />
            <MediaCard
              title="Andreessen Horowitz leads $5M round for new blockchain gaming startup"
              description="A new Seattle startup led by longtime entrepreneur Rahul Sood is combining a flurry of the latest tech trends..."
              link="https://www.geekwire.com/2021/andreessen-horowitz-leads-5m-round-for-new-blockchain-gaming-startup-led-by-microsoft-vets/"
              image="/images/media-2.jpeg"
              logo="/images/geek-wire.png"
              featured={false}
            />
            <MediaCard
              title="Metaverse gaming tokens Ethverse and Axie Infinity avoid crypto downtrend"
              description="Metaverse gaming tokens Ethverse, The Sandbox, GameSwap, Yield Guild Games and Axie Infinity are the few seeing gains."
              link="https://cointelegraph.com/news/metaverse-gaming-tokens-ethverse-and-axie-infinity-avoid-crypto-downtrend"
              image="/images/media-3.jpeg"
              logo="/images/coin-telegraph.png"
              featured={false}
            />
          </div>
        </section>

        <section className={styles.investors}>
          <div className={styles.roadmapDots}>
            <Image src={ThreeDots} alt="dots" />
          </div>
          <div className={styles.roadmapDotsBottom}>
            <Image src={DotGroup} alt="dots" />
          </div>
          <div className={styles.investorPlus}>
            <Image src={PlusGroup} alt="plus signs" />
          </div>
          <h2>Investors</h2>
          <div className={styles.investorList}>
            <a
              href="https://a16z.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.mobileA16}>
                <Image src={A16Z} alt="a16x logo" width={171} height={95} />
              </div>
              <div className={styles.desktopA16}>
                <Image src={A16Z} alt="a16x logo" width={271} height={151} />
              </div>
            </a>
            <a
              href="https://www.mantisvc.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.mobileMantis}>
                <Image src={Manits} width={296} height={36} alt="manits logo" />
              </div>
              <div className={styles.desktopMantis}>
                <Image src={Manits} width={520} height={64} alt="manits logo" />
              </div>
            </a>
            <a
              href="https://thechainsmokers.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles.mobileChainSmokers}>
                <Image
                  src={Chainsmokers}
                  width={296}
                  height={67}
                  alt="chainsmokers logo"
                />
              </div>
              <div className={styles.desktopChainSmokers}>
                <Image
                  src={Chainsmokers}
                  width={258}
                  height={62}
                  alt="chainsmokers logo"
                />
              </div>
            </a>
          </div>
        </section>

        <SignUp />
      </Layout>
    </section>
  );
};

export default Home;
