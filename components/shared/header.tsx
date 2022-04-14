import Head from "next/head";
import { HeaderProps } from "../../interfaces/HeaderProps";

const Header = ({}: HeaderProps) => {
  return (
    <>
      <Head>
        <title>
          MechaFightClub - The Metaverse&apos;s Craziest Battle Arena
        </title>
        <meta
          name="title"
          content="MechaFightClub - The Metaverse's Craziest Battle Arena"
        />
        <meta
          name="description"
          content="MechaFightClub is a blockchain-based play-to-earn fighting game where players train & battle artificially-intelligent NFTs on the blockchain."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mechafightclub.com/" />
        <meta
          property="og:title"
          content="MechaFightClub - The Metaverse's Craziest Battle Arena"
        />
        <meta
          property="og:description"
          content="MechaFightClub is a blockchain-based play-to-earn fighting game where players train & battle artificially-intelligent NFTs on the blockchain."
        />
        <meta
          property="og:image"
          content="https://mechafightclub.com/images/social.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mechafightclub.com/" />
        <meta
          property="twitter:title"
          content="MechaFightClub - The Metaverse's Craziest Battle Arena"
        />
        <meta
          property="twitter:description"
          content="MechaFightClub is a blockchain-based play-to-earn fighting game where players train & battle artificially-intelligent NFTs on the blockchain."
        />
        <meta
          property="twitter:image"
          content="https://mechafightclub.com/images/social.png"
        />

        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  );
};

export default Header;
