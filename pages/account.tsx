import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { isLoggedIn } from "../services/magic-service";
import { UserContext } from "../contexts/user-context";
import {
  AVATARS,
  ETHEREUM,
  MODAL_COOKIE_KEY,
  SOLANA,
  STATE_KEY,
} from "../utils/constants";
import axios from "axios";
import { OAuthPayload } from "../interfaces/OAuthTokenPayload";
import { PlayersMe } from "../interfaces/api/PlayersMe";
import { getPhantomAddress } from "../services/wallet-service";
import Image from "next/image";
import PickAvatarModal from "../components/modals/pick-avatar-modal";
import DeleteAccountModal from "../components/modals/delete-account-modal";
import { getCompletedSteps, hasMintPass, showError } from "../utils/helpers";
import { UpdateAirdropWalletBody } from "../interfaces/api/UpdateAirdropWalletBody";
import { UpdateSocialFromOAuthBody } from "../interfaces/api/UpdateSocialFromOAuthBody";
import { UpdateEmailSettingsBody } from "../interfaces/api/UpdateEmailSettingsBody";
import { api } from "./_app";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCookies } from "react-cookie";
import dateFormat from "dateformat";

import HatchListModal from "../components/modals/hatch-list-modal";
import Spinner from "../components/spinner";
import moment from "moment";
import { MintStatusAPIResponse } from "../interfaces/api/MintStatusAPIResponse";

import styles from "../styles/pages/account.module.scss";

//ASSETS
import Meta from "../public/images/metamask-logo.svg";
import Phantom from "../public/images/phantom-logo.svg";
import AccountBG from "../public/images/account/account-background.png";

const Header = dynamic(() => import("../components/shared/header"));
const PageTitle = dynamic(() => import("../components/shared/page-title"));
const Layout = dynamic(() => import("../layout/layout"));
const Button = dynamic(() => import("../components/shared/button"));

const Account: NextPage = () => {
  const [isPickAvatarModalOpen, setIsPickAvatarModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [isHatchListModalOpen, setIsHatchListModalOpen] = useState(false);
  const [avatarColor, setAvatarColor] = useState("");
  const { playerProfile, setCompletedSteps, setPlayerProfile } =
    useContext(UserContext);
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hatchListOpen, setHatchListOpen] = useState(false);
  const [hatchListOpensAtUtc, setHatchListOpensAtUtc] = useState("");
  const [waitListOpen, setWaitListOpen] = useState(false);
  const [waitListOpensAtUtc, setWaitListOpensAtUtc] = useState("");
  const [available, setAvailable] = useState(0);
  const [mintPassComplete, setMintPassComplete] = useState(false);
  const [cookies, setCookie] = useCookies([MODAL_COOKIE_KEY]);

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      if (!(await isLoggedIn())) {
        router.push("/");
      }

      const { state, code } = router.query;

      if (state && code) {
        const localState = localStorage.getItem(STATE_KEY);

        if (localState === state) {
          const updateSocialFromOAuthBody: UpdateSocialFromOAuthBody = {
            code: code.toString(),
            redirectUri: process.env.DISCORD_RETURN_URL,
            codeVerifier: "",
          };

          await api
            .patch("/api/v1/players/me/discord", updateSocialFromOAuthBody)
            .then((response) => {
              if (!response.ok) {
                showError(response.originalError.message);
              }
            });

          localStorage.clear();
        }

        router.push("/account", undefined, { shallow: true });
      }

      let response = await api.get("/api/v1/players/me");

      if (response.status === 404) {
        router.push("/registration");
        return;
      }

      if (!response.ok) {
        setLoading(false);
        console.error("Error getting account information");
        return;
      }

      const playerProfile = response.data as PlayersMe;

      if (setPlayerProfile && playerProfile && setCompletedSteps) {
        setPlayerProfile(playerProfile);
        setAvatarColor(playerProfile?.avatarColor);

        const completedSteps = getCompletedSteps(playerProfile) || [];
        setCompletedSteps(completedSteps);

        if (completedSteps?.length < 3) {
          router.push("/registration");
          return;
        }
      }

      if (!cookies[MODAL_COOKIE_KEY]) {
        setIsHatchListModalOpen(true);
        const expires = moment().add(1, "day");
        setCookie(MODAL_COOKIE_KEY, "true", {
          expires: expires.toDate(),
        });
      }

      response = await api.get("/api/v1/status/mint");

      if (!response.ok) {
        console.error(response.originalError.message);
        setLoading(false);
        return;
      }

      const mintStatus = response.data as MintStatusAPIResponse;

      setHatchListOpen(mintStatus.result?.hatchListOpen || false);
      setHatchListOpensAtUtc(mintStatus.result?.hatchListOpensAtUtc || "");
      setWaitListOpen(mintStatus.result?.waitListOpen || false);
      setWaitListOpensAtUtc(mintStatus.result?.waitListOpensAtUtc || "");
      setAvailable(mintStatus.result?.available || 0);

      //check if user has a mint pass
      try {
        const mintPassAddress = mintStatus.result?.mintAddress;
        const airDropAddress = playerProfile?.airdropWallet.address;
        setMintPassComplete(
          await hasMintPass(mintPassAddress, airDropAddress, connection)
        );
      } catch (e) {
        //if this fails user has not minted
        console.error((e as Error).message);
      }

      setLoading(false);
    };
    init();
  }, [router, publicKey]);

  const closePickAvatarModal = () => {
    setIsPickAvatarModalOpen(false);
  };

  const closeDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const closeHatchListModal = () => {
    setIsHatchListModalOpen(false);
  };

  const onConnectDiscordClick = async () => {
    try {
      const url = `/api/discord-oauth-payload`;
      const result = await axios.get(url);
      const oAuthPayload = result.data as OAuthPayload;
      localStorage.setItem(STATE_KEY, oAuthPayload.state);
      window.location.href = oAuthPayload.url;
    } catch (e) {
      showError((e as Error).message);
    }
  };

  const onConnectPhantomClick = async () => {
    setIsDisabled(true);

    const address = await getPhantomAddress();

    const updateAirdropWalletBody: UpdateAirdropWalletBody = {
      blockchain: SOLANA,
      address: address,
    };

    await api
      .patch("/api/v1/players/me/wallets/airdrop", updateAirdropWalletBody)
      .then((response) => {
        if (!response.ok) {
          showError(response.originalError.message);
          setIsDisabled(false);
          return;
        }

        updateProfile();
        setIsDisabled(false);
      });
  };

  const updateProfile = async () => {
    await api.get("/api/v1/players/me").then((response) => {
      if (!response.ok) {
        showError(response.originalError.message);
        return;
      }

      const playerProfile = response.data as PlayersMe;

      if (playerProfile && setPlayerProfile) {
        setPlayerProfile(playerProfile);
      }
    });
  };

  const onAvatorColorClick = async () => {
    setIsPickAvatarModalOpen(true);
  };

  const onNotificationSetting = async () => {
    setIsDisabled(true);

    const updateEmailSettingsBody: UpdateEmailSettingsBody = {
      emailSettings: {
        sendMarketingAndEventEmails:
          !playerProfile?.emailSettings.sendMarketingAndEventEmails,
      },
    };

    await api
      .patch("/api/v1/players/me/email-settings", updateEmailSettingsBody)
      .then((response) => {
        if (!response.ok) {
          showError(response.originalError.message);
          setIsDisabled(false);
          return;
        }

        updateProfile();

        setTimeout(() => {
          setIsDisabled(false);
        }, 2500);
      });
  };

  const onDeleteAccountClick = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const PaymentWallets = () => {
    return (
      <div className={styles.section}>
        <h6 className={styles.subtitleAlt}>Payment Wallets</h6>

        {loading && (
          <div className={styles.walletConnect}>
            <input type="checkbox" checked={false} readOnly />
            <span className={styles.address}>Loading...</span>
          </div>
        )}

        {playerProfile?.paymentWallet?.blockchain === ETHEREUM && (
          <div className={styles.walletConnect}>
            <input type="checkbox" checked={true} readOnly />
            <Image loading="lazy" src={Meta} width={27} alt="Metamask logo" />
            <span className={styles.address}>
              {playerProfile?.paymentWallet.address.substr(0, 10)}...
              {playerProfile?.paymentWallet.address.substr(-4, 4)}
            </span>
          </div>
        )}

        {playerProfile?.airdropWallet?.blockchain === SOLANA &&
          !playerProfile?.paymentWallet?.blockchain && (
            <div className={styles.walletConnect}>
              <input type="checkbox" checked={true} readOnly />
              <Image src={Phantom} width={27} alt="Phantom logo" />
              <span className={styles.address}>
                {playerProfile?.airdropWallet.address.substr(0, 10)}...
                {playerProfile?.airdropWallet.address.substr(-4, 4)}
              </span>
              {!playerProfile?.airdropWallet && (
                <a onClick={() => onConnectPhantomClick()}>CONNECT PHANTOM</a>
              )}
            </div>
          )}
      </div>
    );
  };

  const NFTWallet = () => {
    return (
      <div className={styles.section}>
        {!playerProfile?.airdropWallet ? (
          <div className={styles.nftWallet}>
            <p>NFT WALLET</p>
            <p className={styles.altTextGrey}>
              If your payment wallet cannot accept Solana NFTs, we’ll need a
              different NFT wallet address before we can deliver your purchases.
              We currently support Phantom wallets.
            </p>
            <p className={styles.altTextGrey}>
              Once an NFT wallet is connected, it cannot be changed or removed
              without deleting your account.
            </p>
            <Button
              disabled={isDisabled}
              click={() => onConnectPhantomClick()}
              text={"Connect Phantom Wallet"}
              type="primary-large"
              link={""}
              icon={false}
            />
          </div>
        ) : (
          <>
            <h6 className={styles.subtitleAlt}>NFT WALLET</h6>
            <div style={{ display: "flex", marginTop: "-15px" }}>
              <Image src={Phantom} alt="Phantom logo" />
              {playerProfile?.airdropWallet && (
                <p style={{ marginLeft: "20px" }}>
                  {playerProfile?.airdropWallet.address.substr(0, 10)}...
                  {playerProfile?.airdropWallet.address.substr(-4, 4)}
                </p>
              )}
            </div>
          </>
        )}
        {available !== 0 &&
          !mintPassComplete &&
          (playerProfile?.status?.hatchList ||
            playerProfile?.status?.waitList) && (
            <div>
              <p className={styles.mintWindowTitle}>
                <span className={styles.icon} /> Your mint pass window is at:
              </p>
              {playerProfile?.status?.hatchList && hatchListOpensAtUtc && (
                <p className={styles.mintWindowDate}>
                  {dateFormat(
                    new Date(hatchListOpensAtUtc),
                    "mmmm dS yyyy, hTT"
                  )}
                </p>
              )}
              {playerProfile?.status?.waitList && waitListOpensAtUtc && (
                <p className={styles.mintWindowDate}>
                  {dateFormat(
                    new Date(waitListOpensAtUtc),
                    "mmmm dS yyyy, hTT"
                  )}
                </p>
              )}
            </div>
          )}
        {mintPassComplete && (
          <div className={styles.mindPassOwn}>
            <p className={styles.mobileOnly}>
              <span className={styles.icon} /> You own a Mint Pass
            </p>
            <p>You own a Mint Pass:</p>
            <div className={styles.mintLogo} />
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className={styles.page}>
            <div className={styles.accountBG}>
              <Image src={AccountBG} alt="background" priority />
            </div>
            <Header title="Account" />
            <Layout>
              <PageTitle title="Account" />
              <div className={styles.account}>
                <div className={styles.accountDetails}>
                  <div className={styles.profile}>
                    <div className={styles.avatarWrapper}>
                      <div className={styles.avatar}>
                        <div className={styles.border}>
                          {playerProfile && playerProfile.avatarColor ? (
                            <Image
                              src={AVATARS[playerProfile.avatarColor]}
                              width={200}
                              height={200}
                              priority
                              alt="profile photo"
                            />
                          ) : (
                            <div className={styles.avatarLoader} />
                          )}
                        </div>
                      </div>
                      <button
                        className={styles.buttonSecondary}
                        onClick={() => onAvatorColorClick()}
                      >
                        Avatar Color
                      </button>
                    </div>
                    <div className={styles.social}>
                      <div className={styles.socialWrapper}>
                        <span className={styles.socialTitle}>Username</span>
                        <span className={styles.socialInfo}>
                          {playerProfile
                            ? playerProfile.displayName
                            : "Loading..."}
                        </span>
                      </div>
                      <div className={styles.socialWrapper}>
                        <span className={styles.socialTitle}>Twitter</span>
                        <span className={styles.socialInfo}>
                          {playerProfile
                            ? playerProfile?.twitter?.username
                            : "Loading..."}
                        </span>
                      </div>
                      <div className={styles.socialWrapper}>
                        <span className={styles.socialTitle}>Email</span>
                        <span className={styles.socialInfo}>
                          {playerProfile ? playerProfile?.email : "Loading..."}
                        </span>
                      </div>
                      {playerProfile?.discord ? (
                        <div className={styles.socialWrapper}>
                          <span className={styles.socialTitle}>Discord</span>
                          <span
                            className={styles.socialInfo}
                          >{`${playerProfile?.discord.username}`}</span>
                        </div>
                      ) : (
                        <div className={styles.socialWrapper}>
                          <span className={styles.socialTitle}>Discord</span>
                          <a
                            onClick={() => onConnectDiscordClick()}
                            style={{ cursor: "pointer" }}
                          >
                            Connect Discord
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.sectionDesktop}>
                    <h6 className={styles.subtitleAlt}>Notification Setting</h6>
                    <div className={styles.marketing}>
                      <input
                        type="checkbox"
                        disabled={isDisabled}
                        checked={
                          playerProfile?.emailSettings
                            ?.sendMarketingAndEventEmails
                        }
                        onChange={() => onNotificationSetting()}
                        name="receiveDropUpdatesAndMarketingEmails"
                      />
                      <label
                        className={styles.altText}
                        htmlFor="receiveDropUpdatesAndMarketingEmails"
                      >
                        Receive drop updates & marketing emails.
                      </label>
                    </div>
                    <div>
                      <button
                        className={styles.buttonAlt}
                        onClick={() => onDeleteAccountClick()}
                      >
                        DELETE ACCOUNT
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.walletDetails}>
                  <div className={styles.wallets}>
                    <PaymentWallets />
                    <NFTWallet />
                  </div>
                  <div className={styles.sectionMobile}>
                    <h6 className={styles.subtitleAlt}>Notification Setting</h6>
                    <div className={styles.marketing}>
                      <input
                        type="checkbox"
                        disabled={isDisabled}
                        checked={
                          playerProfile?.emailSettings
                            ?.sendMarketingAndEventEmails
                        }
                        onChange={() => onNotificationSetting()}
                        name="receiveDropUpdatesAndMarketingEmails"
                      />
                      <label
                        className={styles.altText}
                        htmlFor="receiveDropUpdatesAndMarketingEmails"
                      >
                        Receive drop updates & marketing emails.
                      </label>
                    </div>
                    <div>
                      <button
                        className={styles.buttonAlt}
                        onClick={() => onDeleteAccountClick()}
                      >
                        DELETE ACCOUNT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Layout>
          </section>
          {playerProfile && (
            <PickAvatarModal
              isOpen={isPickAvatarModalOpen}
              closeModal={closePickAvatarModal}
            />
          )}
          {playerProfile && (
            <DeleteAccountModal
              isOpen={isDeleteAccountModalOpen}
              closeModal={closeDeleteAccountModal}
            />
          )}
          {playerProfile && (
            <HatchListModal
              isOpen={isHatchListModalOpen}
              closeModal={closeHatchListModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default Account;
