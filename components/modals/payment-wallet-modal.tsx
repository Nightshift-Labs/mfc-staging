import { useContext, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { UserContext } from "../../contexts/user-context";
import { ModalProps } from "../../interfaces/ModalProps";
import { ETHEREUM, SOLANA, steps } from "../../utils/constants";
import {
  getMetaMaskAddress,
  getPhantomAddress,
} from "../../services/wallet-service";
import {
  getCompletedSteps,
  showError,
  updateCompleteSteps,
} from "../../utils/helpers";
import { UpdatePaymentWalletBody } from "../../interfaces/api/UpdatePaymentWalletBody";
import { PlayersMe } from "../../interfaces/api/PlayersMe";
import { api } from "../../pages/_app";

//ASSETS
import Close from "../../public/images/close-button.svg";
import Meta from "../../public/images/metamask-logo.svg";
import Phantom from "../../public/images/phantom-logo.svg";

import styles from "../../styles/components/modal.module.scss";
import { useRouter } from "next/router";

Modal.setAppElement("body");

const customStyles = {
  content: {
    border: "none",
    padding: "0",
    overflow: "initial",
    height: "fit-content",
    top: "50%",
    background: "transparent",
    transform: "translate(0, -50%)",
    maxWidth: "600px",
    margin: "0 auto",
    maxHeight: "calc(100vh - 100px)",
    width: "100%",
    left: "0",
  },
  overlay: {
    background: "rgba(0,0,0, 0.85)",
    backdropFilter: "blur(5px)",
    zIndex: "999",
  },
};

const PaymentWalletModal = ({ isOpen, closeModal }: ModalProps) => {
  const { completedSteps, setCompletedSteps, setPlayerProfile } =
    useContext(UserContext);

  const [loadingMetaMask, setLoadingMetaMask] = useState(false);
  const [loadingPhantom, setLoadingPhantom] = useState(false);

  const router = useRouter();

  const connectPhantom = async () => {
    setLoadingPhantom(true);

    let address = "";

    try {
      address = await getPhantomAddress();
    } catch (e) {
      //do nothing
    }

    if (!address) {
      setLoadingPhantom(false);
      return;
    }

    updatePlayerProfileWithWallet(address, SOLANA);
  };

  const connectMetaMask = async () => {
    setLoadingMetaMask(true);

    let address = "";

    try {
      address = await getMetaMaskAddress();
    } catch (e) {
      //do nothing
    }

    if (!address) {
      setLoadingMetaMask(false);
      return;
    }

    updatePlayerProfileWithWallet(address, ETHEREUM);
  };

  const updatePlayerProfileWithWallet = async (
    address: string,
    blockchain: string
  ) => {
    if (loadingMetaMask || loadingPhantom) return;

    const updatePaymentWalletBody: UpdatePaymentWalletBody = {
      blockchain: blockchain,
      address: address,
    };

    if (blockchain === SOLANA) {
      await api
        .patch("/api/v1/players/me/wallets/airdrop", updatePaymentWalletBody)
        .then((response) => {
          if (!response.ok) {
            if (response?.originalError?.response?.data) {
              showError(response.originalError.response.data);
            } else {
              showError(response.originalError.message);
            }
            setLoadingPhantom(false);
            return;
          }
        });
    } else {
      await api
        .patch("/api/v1/players/me/wallets/payment", updatePaymentWalletBody)
        .then((response) => {
          if (!response.ok) {
            if (response?.originalError?.response?.data) {
              showError(response.originalError.response.data);
            } else {
              showError(response.originalError.message);
            }
            setLoadingMetaMask(false);
            return;
          }
        });
    }

    if (completedSteps && setCompletedSteps) {
      updateCompleteSteps(
        completedSteps,
        steps.connectWallet,
        setCompletedSteps
      );
    }

    await api.get("/api/v1/players/me").then((response) => {
      if (response.ok) {
        const playerProfile = response.data as PlayersMe;

        if (setPlayerProfile && playerProfile && setCompletedSteps) {
          setPlayerProfile(playerProfile);
        }

        const completedSteps = getCompletedSteps(playerProfile) || [];

        closeModal();

        if (completedSteps?.length === 3) {
          router.push("/account");
        } else {
          router.push("/registration");
        }
      } else {
        if (response.status !== 404) {
          showError(response.originalError.message);
        }
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div onClick={closeModal} className={styles.closeButton}>
        <Image src={Close} alt="close button" />
      </div>
      <div className={styles.outline}>
        <div className={styles.form}>
          <h4 className={styles.title}>
            CHOOSE YOUR <br></br>PAYMENT WALLET
          </h4>
          <p className={styles.description}>
            <span style={{ color: "#E83E38" }}>IMPORTANT: </span>Your payment
            wallet cannot be changed once connected. If you want to pay with a
            non-Solana wallet, you may connect an additional drop wallet later.
          </p>
          <div
            className={styles.walletButton}
            onClick={() => connectMetaMask()}
          >
            <span>{loadingMetaMask ? "Connecting..." : "METAMASK"}</span>
            <Image width={40} height={40} src={Meta} alt="Metamask logo" />
          </div>
          <div className={styles.walletButton} onClick={() => connectPhantom()}>
            <span>{loadingPhantom ? "Connecting..." : "PHANTOM"}</span>
            <Image width={40} height={40} src={Phantom} alt="Phantom logo" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentWalletModal;
