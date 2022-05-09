import type { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getIdToken, isLoggedIn } from "../services/magic-service";
import { UserContext } from "../contexts/user-context";
import { PaymentWalletModalContext } from "../contexts/payment-wallet-modal-context";
import { OAuthPayload } from "../interfaces/OAuthTokenPayload";
import {
  METAMASK,
  PHANTOM,
  STATE_KEY,
  steps,
  VERIFIER_KEY,
} from "../utils/constants";
import { CompleteSignUpModalContext } from "../contexts/complete-signup-modal-context";
import { PlayersMe } from "../interfaces/api/PlayersMe";
import axios from "axios";
import {
  getCompletedSteps,
  getNextStep,
  getPercentageComplete,
  showError,
  updateCompleteSteps,
} from "../utils/helpers";
import { UpdateSocialFromOAuthBody } from "../interfaces/api/UpdateSocialFromOAuthBody";
import { api } from "./_app";
import Spinner from "../components/spinner";
import styles from "../styles/pages/registration.module.scss";

//ASSETS
import Star from "../public/images/account/star.svg";
import Progress0 from "../public/images/account/progress-0.svg";
import Progress1 from "../public/images/account/progress-1.svg";
import Progress2 from "../public/images/account/progress-2.svg";

import RegisterBG from "../public/images/account/register-bg-1.png";
import RegisterBG2 from "../public/images/account/register-bg-2.png";

import RegistrationDetail from "../public/images/account/registration-detail.svg";

import Step1 from "../public/images/account/step-1.svg";
import Step1Icon from "../public/images/account/step-1-sign.svg";
import Step1IconDone from "../public/images/account/step-1-sign-done.svg";
import Step1Num from "../public/images/account/step-1-num.svg";
import Step1NumDone from "../public/images/account/step-1-num-done.svg";
import Step1Done from "../public/images/account/step-1-done.svg";

import Step2 from "../public/images/account/step-2.svg";
import Step2Icon from "../public/images/account/step-2-sign.svg";
import Step2IconDone from "../public/images/account/step-2-sign-done.svg";
import Step2Num from "../public/images/account/step-2-num.svg";
import Step2NumDone from "../public/images/account/step-2-num-done.svg";
import Step2Done from "../public/images/account/step-2-done.svg";

import Step3 from "../public/images/account/step-3.svg";
import Step3Num from "../public/images/account/step-3-num.svg";
import Step3Icon from "../public/images/account/step-3-sign.svg";
import Step3NumDone from "../public/images/account/step-3-num-done.svg";
import Step3IconDone from "../public/images/account/step-3-sign-done.svg";
import Step3Done from "../public/images/account/step-3-done.svg";

const Header = dynamic(() => import("../components/shared/header"));
const PageTitle = dynamic(() => import("../components/shared/page-title"));
const Layout = dynamic(() => import("../layout/layout"));

const Registration: NextPage = () => {
  const {
    playerProfile,
    user,
    completedSteps,
    setCompletedSteps,
    setPlayerProfile,
  } = useContext(UserContext);

  const { openModal: openPaymentWalletModal } = useContext(
    PaymentWalletModalContext
  );
  const { openModal: openCompleteSignUpModal } = useContext(
    CompleteSignUpModalContext
  );
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!(await isLoggedIn())) {
        router.push("/");
      }
    };
    init();
  }, [user]);

  useEffect(() => {}, [playerProfile]);

  useEffect(() => {
    const init = async () => {
      const { state, code } = router.query;

      if (state && code) {
        setLoading(true);

        const localState = localStorage.getItem(STATE_KEY);

        if (localState === state) {
          const updateSocialFromOAuthBody: UpdateSocialFromOAuthBody = {
            code: code.toString(),
            redirectUri: process.env.TWITTER_RETURN_URL,
            codeVerifier: localStorage.getItem(VERIFIER_KEY) || "",
          };

          let response = await api.patch(
            "/api/v1/players/me/twitter",
            updateSocialFromOAuthBody
          );

          if (!response.ok) {
            showError(response.originalError.message);
            return;
          }

          //update profile after twitter update to get handle
          response = await api.get("/api/v1/players/me");

          if (!response.ok) return;

          const playerProfile = response.data as PlayersMe;

          if (completedSteps && setCompletedSteps && setPlayerProfile) {
            setPlayerProfile(playerProfile);
            const completedSteps = getCompletedSteps(playerProfile) || [];
            setCompletedSteps(completedSteps);
          }

          localStorage.clear();
          setLoading(false);
        }

        router.push("/registration", undefined, { shallow: true });
      }
    };
    init();
  }, [router]);

  useEffect(() => {
    if (playerProfile && completedSteps && completedSteps.length === 3) {
      router.push("/account");
    }
  }, [completedSteps, playerProfile]);

  const onChoseUsernameClick = async () => {
    if (openCompleteSignUpModal) {
      openCompleteSignUpModal();
    }
  };

  const onConnectWalletClick = async () => {
    if (openPaymentWalletModal) {
      openPaymentWalletModal();
    }
  };

  const onAuthorizeMFCClick = async () => {
    setIsDisabled(true);

    try {
      const url = `/api/twitter-oauth-payload`;
      const result = await axios.get(url);

      const oAuthPayload = result.data as OAuthPayload;
      localStorage.setItem(STATE_KEY, oAuthPayload.state);
      localStorage.setItem(VERIFIER_KEY, oAuthPayload.verifier);
      window.location.href = oAuthPayload.url;
    } catch (e) {
      showError((e as Error).message);
    }

    setIsDisabled(false);
  };

  const BasicInformation = () => {
    return (
      <div className={styles.card}>
        <div className={styles.step}>
          {completedSteps?.includes(steps.basicInformation) ? (
            <Image src={Step1Done} alt="step 1" />
          ) : (
            <Image src={Step1} alt="step 1" />
          )}
        </div>
        <div className={styles.stepNum}>
          {completedSteps?.includes(steps.basicInformation) ? (
            <Image src={Step1NumDone} alt="step 1" />
          ) : (
            <Image src={Step1Num} alt="step 1" />
          )}
        </div>
        <div
          className={
            completedSteps?.includes(steps.basicInformation)
              ? styles.wrapperDone
              : styles.wrapper
          }
        >
          <div
            className={
              completedSteps?.includes(steps.basicInformation)
                ? styles.borderDone
                : styles.border
            }
          >
            <div
              className={
                completedSteps?.includes(steps.basicInformation)
                  ? styles.iconDone
                  : styles.icon
              }
            >
              {completedSteps?.includes(steps.basicInformation) ? (
                <Image
                  src={Step1IconDone}
                  width={68}
                  height={82}
                  alt="step 1"
                />
              ) : (
                <Image width={68} height={82} src={Step1Icon} alt="step 1" />
              )}
            </div>
            <div className={styles.content}>
              <h5 className={styles.primaryColor}>Basic Information</h5>
              <div className={styles.userInfo}>
                <span className={styles.infoTitle}>Email</span>
                <span>{playerProfile ? playerProfile.email : user?.email}</span>
              </div>

              {playerProfile?.displayName ? (
                <div className={styles.userInfo}>
                  <span className={styles.infoTitle}>Username</span>
                  <span>{playerProfile?.displayName}</span>
                </div>
              ) : (
                <button
                  className={styles.button}
                  disabled={!user}
                  onClick={() => onChoseUsernameClick()}
                >
                  Choose Username
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConnectWallet = () => {
    return (
      <div className={styles.card}>
        <div className={styles.step}>
          {completedSteps?.includes(steps.connectWallet) ? (
            <Image src={Step2Done} alt="step 2" />
          ) : (
            <Image src={Step2} alt="step 2" />
          )}
        </div>
        <div className={styles.stepNum}>
          {completedSteps?.includes(steps.connectWallet) ? (
            <Image src={Step2NumDone} alt="step 2" />
          ) : (
            <Image src={Step2Num} alt="step 2" />
          )}
        </div>
        <div
          className={
            completedSteps?.includes(steps.connectWallet)
              ? styles.wrapperDone
              : styles.wrapper
          }
        >
          <div
            className={
              completedSteps?.includes(steps.connectWallet)
                ? styles.borderDone
                : styles.border
            }
          >
            <div
              className={
                completedSteps?.includes(steps.connectWallet)
                  ? styles.iconDone
                  : styles.icon
              }
            >
              {completedSteps?.includes(steps.connectWallet) ? (
                <Image
                  src={Step2IconDone}
                  width={68}
                  height={82}
                  alt="step 1"
                />
              ) : (
                <Image width={68} height={82} src={Step2Icon} alt="step 1" />
              )}
            </div>
            <div className={styles.content}>
              <h5 className={styles.primaryColor}>
                {completedSteps?.includes(steps.connectWallet)
                  ? "Wallet Connected"
                  : "Connect Wallet"}
              </h5>
              {!playerProfile?.paymentWallet && !playerProfile?.airdropWallet && (
                <button
                  className={styles.button}
                  disabled={!playerProfile}
                  onClick={() => onConnectWalletClick()}
                >
                  Connect Wallet
                </button>
              )}

              {playerProfile?.paymentWallet && (
                <div className={styles.userInfo}>
                  <span className={styles.infoTitle}>Type</span>
                  <span>{METAMASK}</span>
                  <span className={styles.infoTitle}>Address</span>
                  <span>
                    {playerProfile?.paymentWallet?.address?.substr(0, 10)}...
                    {playerProfile?.paymentWallet?.address?.substr(-4, 4)}
                  </span>
                </div>
              )}

              {!playerProfile?.paymentWallet && playerProfile?.airdropWallet && (
                <div className={styles.userInfo}>
                  <span className={styles.infoTitle}>Type</span>
                  <span>{PHANTOM}</span>
                  <span className={styles.infoTitle}>Address</span>
                  <span>
                    {playerProfile?.airdropWallet.address.substr(0, 10)}...
                    {playerProfile?.airdropWallet.address.substr(-4, 4)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConnectTwitter = () => {
    return (
      <div className={styles.card}>
        <div className={styles.step}>
          {completedSteps?.includes(steps.connectTwitter) ? (
            <Image src={Step3Done} alt="step 2" />
          ) : (
            <Image src={Step3} alt="step 2" />
          )}
        </div>
        <div className={styles.stepNum}>
          {completedSteps?.includes(steps.connectTwitter) ? (
            <Image src={Step3NumDone} alt="step 3" />
          ) : (
            <Image src={Step3Num} alt="step 3" />
          )}
        </div>
        <div
          className={
            completedSteps?.includes(steps.connectTwitter)
              ? styles.wrapperDone
              : styles.wrapper
          }
        >
          <div
            className={
              completedSteps?.includes(steps.connectTwitter)
                ? styles.borderDone
                : styles.border
            }
          >
            <div
              className={
                completedSteps?.includes(steps.connectTwitter)
                  ? styles.iconDone
                  : styles.icon
              }
            >
              {completedSteps?.includes(steps.connectTwitter) ? (
                <Image
                  src={Step3IconDone}
                  width={68}
                  height={82}
                  alt="step 3"
                />
              ) : (
                <Image width={68} height={82} src={Step3Icon} alt="step 3" />
              )}
            </div>
            <div className={styles.content}>
              <h5 className={styles.primaryColor}>Connect Twitter</h5>
              {playerProfile?.twitter ? (
                <>
                  <div className={styles.userInfo}>
                    <span className={styles.infoTitle}>Username</span>
                    <span>{`${playerProfile?.twitter.username}`}</span>
                  </div>
                </>
              ) : (
                <button
                  className={styles.button}
                  disabled={!playerProfile || isDisabled}
                  onClick={() => onAuthorizeMFCClick()}
                >
                  Authorize MFC
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RegistrationProgress = () => {
    return (
      <div className={styles.progress}>
        <div className={styles.progressTop}>
          <h5>Registration Progress</h5>
          <div className={styles.steps}>
            {Star && <Image width={32} height={32} src={Star} alt="star" />}
            <span
              className={styles.altText}
            >{`${completedSteps?.length}/3 Steps Completed`}</span>
          </div>
        </div>
        <div className={styles.progressBar}>
          {completedSteps && completedSteps.length < 1 && (
            <Image src={Progress0} alt="progress-bar" />
          )}
          {completedSteps && completedSteps.length === 1 && (
            <Image src={Progress1} alt="progress-bar" />
          )}
          {completedSteps && completedSteps.length === 2 && (
            <Image src={Progress2} alt="progress-bar" />
          )}
        </div>
        {completedSteps && (
          <p className={styles.percentage}>{`${getPercentageComplete(
            completedSteps
          )}% COMPLETED`}</p>
        )}
        {completedSteps && getPercentageComplete(completedSteps) !== "100" && (
          <p className={styles.nextStep}>{`Next Step: ${getNextStep(
            completedSteps
          )}`}</p>
        )}
        <div className={styles.registrationDetail}>
          {RegistrationDetail && (
            <Image src={RegistrationDetail} alt="background" />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className={styles.page}>
          <div className={styles.registerBG}>
            <Image src={RegisterBG} alt="background" />
          </div>
          <div className={styles.registerBG2}>
            <Image src={RegisterBG2} alt="background" />
          </div>
          <Header title="Registration" />
          <Layout>
            <PageTitle title="Registration" />
            <div className={styles.registration}>
              <div className={styles.registrationProgress}>
                <RegistrationProgress />
              </div>
              <div className={styles.registrationInfo}>
                <BasicInformation />
                <ConnectWallet />
                <ConnectTwitter />
              </div>
            </div>
          </Layout>
        </section>
      )}
    </>
  );
};

export default Registration;
