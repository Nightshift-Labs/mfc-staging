import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { logoutUser } from "../../services/magic-service";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/user-context";
import { MagicLinkModalContext } from "../../contexts/magic-link-modal-context";
import { AVATARS, GRAY } from "../../utils/constants";
import React from "react";
import Popup from "reactjs-popup";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { PlayersMe } from "../../interfaces/api/PlayersMe";

//ASSETS
import Logo from "../../public/images/mfc-logo.svg";
import LogoWhite from "../../public/images/mfc-logo-white.svg";
import Twitter from "../../public/images/twitter.svg";
import Medium from "../../public/images/medium.svg";
import LinkedIn from "../../public/images/linkedin.svg";
import Discord from "../../public/images/discord.svg";
import MenuOpen from "../../public/images/menu-open.svg";
import MenuClosed from "../../public/images/menu-closed.svg";
import { getCompletedSteps } from "../../utils/helpers";
import DropArrow from "../../public/images/drop-arrow.svg";
import AccountIcon from "../../public/images/account-icon.svg";
import LogoutIcon from "../../public/images/logout-icon.svg";
import { api } from "../../pages/_app";

import styles from "../../styles/components/header.module.scss";
import "reactjs-popup/dist/index.css";

const Navbar = ({}) => {
  const { setCompletedSteps, setPlayerProfile } = useContext(UserContext);
  const { openModal } = useContext(MagicLinkModalContext);
  const { user, setUser, playerProfile } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { disconnect } = useWallet();

  useEffect(() => {
    const init = async () => {

      const response = await api.get("/api/v1/players/me");

      if (!response.ok) return;

      const playerProfile = response.data as PlayersMe;
      if (setPlayerProfile && playerProfile && setCompletedSteps) {
        setPlayerProfile(playerProfile);
        const completedSteps = getCompletedSteps(playerProfile) || [];
        setCompletedSteps(completedSteps);
        if (completedSteps.length < 3 && router.pathname === "/account") {
          router.push("/registration");
        }
      }
    };

    init();
  }, []);

  const logout = async () => {
    router.push("/");
    disconnect();
    await logoutUser();
    if (setUser && setCompletedSteps && setPlayerProfile) {
      setUser(null);
      setPlayerProfile(null);
      setCompletedSteps([]);
    }
  };

  const PlayerIcon = () => {
    const displayName = playerProfile
      ? playerProfile.displayName
      : user?.email?.substring(0, user?.email?.indexOf("@"));
    const avatarColor = playerProfile ? playerProfile.avatarColor : GRAY;
    const completedSteps = playerProfile
      ? getCompletedSteps(playerProfile) || []
      : [];

    return (
      <Popup
        trigger={
          <div className={styles.playerIconDesktop}>
            <div className={styles.avatar}>
              <div className={styles.avatarBorder}>
                {avatarColor && AVATARS[avatarColor] && (
                  <Image
                    src={AVATARS[avatarColor]}
                    width={35}
                    height={35}
                    alt="avatar"
                  />
                )}
              </div>
            </div>
            <p className={styles.displayName}>{displayName}</p>
            <span className={open ? styles.dropArrowOpen : styles.dropArrow}>
              {DropArrow && (
                <Image
                  width={12}
                  height={12}
                  src={DropArrow}
                  alt="dropdown arrow"
                />
              )}
            </span>
          </div>
        }
        position="bottom right"
      >
        <ul className={styles.playerDropDown}>
          {completedSteps?.length === 3 ? (
            <li onClick={() => router.push("/account")}>
              {AccountIcon && <Image src={AccountIcon} alt="account icon" />}
              <span>Account</span>
            </li>
          ) : (
            <li onClick={() => router.push("/registration")}>
              {AccountIcon && (
                <Image
                  src={AccountIcon}
                  width={20}
                  height={18}
                  alt="account icon"
                />
              )}
              <span>Registration</span>
            </li>
          )}
          <li onClick={logout}>
            {LogoutIcon && (
              <Image
                width={20}
                height={12}
                src={LogoutIcon}
                alt="account icon"
              />
            )}
            <span>Sign Out</span>
          </li>
        </ul>
      </Popup>
    );
  };

  const PlayerIconMobile = () => {
    const displayName = playerProfile ? playerProfile.displayName : user?.email;
    const avatarColor = playerProfile ? playerProfile.avatarColor : GRAY;
    const completedSteps = playerProfile
      ? getCompletedSteps(playerProfile) || []
      : [];

    return (
      <div className={styles.playerIcon}>
        <div className={styles.playerMobile}>
          <div className={styles.avatar}>
            <div className={styles.avatarBorder}>
              <Image
                src={AVATARS[avatarColor]}
                width={35}
                height={35}
                alt="avatar"
              />
            </div>
          </div>
          <span className={styles.displayNameMobile}>{displayName}</span>
          {
            <span
              className={styles.signoutMobile}
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Sign out
            </span>
          }
        </div>
        {completedSteps.length === 3 ? (
          <li
            onClick={() =>
              router.push("/account").then(() => {
                setOpen(false);
              })
            }
          >
            View Account
          </li>
        ) : (
          <li
            onClick={() =>
              router.push("/registration").then(() => {
                setOpen(false);
              })
            }
          >
            Registration
          </li>
        )}
      </div>
    );
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navItems}>
        <div
          className={styles.logoContainer}
          onClick={() => {
            setOpen(false);
          }}
        >
          <Link href="/" passHref>
            <a>
              <img
                src={LogoWhite.src}
                className={styles.logo}
                alt="MechaFightClub logo"
              />
              <img
                src={Logo.src}
                className={styles.logoMobile}
                alt="MechaFightClub logo"
              />
            </a>
          </Link>
        </div>
      </div>
      <nav className={styles.navRight}>
        <div onClick={() => setOpen(!open)} className={styles.menuOpen}>
          <Image src={MenuClosed} alt="menu button" />
        </div>
        <div
          style={{ display: open ? "block" : "none" }}
          className={styles.mobileNav}
        >
          <li
            className={styles.socialLogoMobile}
            onClick={() => setOpen(false)}
          >
            <Link href="http://discord.gg/mechafightclub">
              <a target="_blank" rel="noopener noreferrer">
                <Image src={Discord} alt="Discord logo" />
              </a>
            </Link>
            <Link href="https://medium.com/@IrreverentLabs">
              <a target="_blank" rel="noopener noreferrer">
                <Image src={Medium} alt="medium logo" />
              </a>
            </Link>
            <Link href="http://twitter.com/mechafightclub">
              <a target="_blank" rel="noopener noreferrer">
                <Image src={Twitter} alt="Twitter logo" />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/company/irreverentlabs/">
              <a target="_blank" rel="noopener noreferrer">
                <Image src={LinkedIn} alt="LinkedIn logo" />
              </a>
            </Link>
          </li>
          <div className={styles.mobileNavTop}>
            <div
              className={styles.logoContainer}
              onClick={() => setOpen(false)}
            >
              <Link href="/" passHref>
                <a>
                  <Image src={Logo} alt="MechaFightClub logo" />
                </a>
              </Link>
            </div>
            <div onClick={() => setOpen(false)} className={styles.menuClose}>
              <Image src={MenuOpen} alt="menu button" />
            </div>
          </div>
          <nav>
            <ul className={styles.mobileNavLinks}>
              {user && <PlayerIconMobile />}
              <li className={styles.socialLogo} onClick={() => setOpen(false)}>
                <Link href="/mint">
                  <a>Mint</a>
                </Link>
              </li>
              {!user && openModal && (
                <li
                  onClick={() => {
                    openModal();
                    setOpen(false);
                  }}
                >
                  Sign Up / Log in
                </li>
              )}
            </ul>
          </nav>
        </div>
        <ul className={styles.socialLinks}>
          <li className={styles.socialLogo}>
            <Link href="http://discord.gg/mechafightclub">
              <a target="_blank" rel="noopener noreferrer">
                <Image src={Discord} alt="Discord logo" />
              </a>
            </Link>
          </li>
          <li className={styles.socialLogo}>
            <Link href="http://twitter.com/mechafightclub">
              <a target="_blank" rel="noopener noreferrer">
                <Image src={Twitter} alt="Twitter logo" />
              </a>
            </Link>
          </li>
        </ul>
        {user && <WalletMultiButton />}
        <Link href="/mint">
          <div className={styles.mintButton} />
        </Link>
        {!user && openModal && (
          <div className={styles.loginButton} onClick={openModal} />
        )}
        {user && <PlayerIcon />}
      </nav>
    </header>
  );
};

export default Navbar;
