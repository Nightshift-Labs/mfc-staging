import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { parseURL, createTransaction } from "@solana/pay";
import BigNumber from "bignumber.js";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import dateformat from "dateformat";

import { MintStatusAPIResponse } from "../interfaces/api/MintStatusAPIResponse";
import { PurchaseStatusAPIResponse } from "../interfaces/api/PurchaseStatusAPIResponse";
import { CreatePurchaseAPIResponse } from "../interfaces/api/CreatePurchaseAPIResponse";
import { UserContext } from "../contexts/user-context";
import { hasMintPass, isProfileReadyForMint } from "../utils/helpers";
import TransactionModal from "../components/modals/transaction-modal";
import MintingLayout from "../components/minting";
import { api } from "./_app";
import Spinner from "../components/spinner";
import MintingMobileBlocker from "../components/minting/mobile";
import { MintingProps } from "../interfaces/MintingProps";
import { DATE_FORMAT, PurchaseStatus, PurchaseType } from "../utils/constants";
import { MagicLinkModalContext } from "../contexts/magic-link-modal-context";

const Header = dynamic(() => import("../components/shared/header"));

const Mint: NextPage = () => {
  const { playerProfile, user } = useContext(UserContext);
  const { openModal }: any = useContext(MagicLinkModalContext);
  const router = useRouter();
  const [hatchListOpen, setHatchListOpen] = useState(false);
  const [hatchListOpensAtUtc, setHatchListOpensAtUtc] = useState("");
  const [waitListOpen, setWaitListOpen] = useState(false);
  const [waitListOpensAtUtc, setWaitListOpensAtUtc] = useState("");
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [coinbaseChargeId, setCoinbaseChargeId] = useState("");
  const [showCommerceButton, setShowCommerceButton] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [transactionTxId, setTransactionTxId] = useState("");
  const [purchaseType, setPurchaseType] = useState<Partial<PurchaseType>>();
  const [total, setTotal] = useState(0);
  const [available, setAvailable] = useState(0);
  const [pending, setPending] = useState(0);
  const [confirmed, setConfirmed] = useState(0);
  const [priceInSol, setPriceInSol] = useState(0);
  const [priceInUsd, setPriceInUsd] = useState(0);
  const [mintPassComplete, setMintPassComplete] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disabledPrePaySol, setDisabledPrePaySol] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [solLoading, setSolLoading] = useState(false);
  const [ethLoading, setEthLoading] = useState(false);
  const [mintPassAddress, setMintPassAddress] = useState("");

  useEffect(() => {
    //load for 3 seconds as the states update accordingly
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (playerProfile) {
      if (isProfileReadyForMint(playerProfile)) {
        setIsProfileComplete(true);
      }
    }
  }, [playerProfile]);

  useEffect(() => {
    if (isMobile) {
      setIsMobileView(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      let response = await api.get("/api/v1/status/mint");
      if (!response.ok) {
        console.log(response.originalError.message);
        return;
      }

      const mintStatus = response.data as MintStatusAPIResponse;

      //set hatchlist & wait list params
      setHatchListOpen(mintStatus.result?.hatchListOpen || false);
      setHatchListOpensAtUtc(mintStatus.result?.hatchListOpensAtUtc || "");
      setWaitListOpen(mintStatus.result?.waitListOpen || false);
      setWaitListOpensAtUtc(mintStatus.result?.waitListOpensAtUtc || "");

      //set price and qty
      setPriceInSol(mintStatus.result?.priceInSol || 0);
      setPriceInUsd(mintStatus.result?.priceInUsd || 0);

      setTotal(mintStatus.result?.total || 0);
      setAvailable(mintStatus.result?.available || 0);
      setPending(mintStatus.result?.pending || 0);
      setConfirmed(mintStatus.result?.claimed || 0);

      setMintPassAddress(mintStatus.result?.mintAddress || "");
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      //check if user has a mint pass
      try {
        if (!mintPassAddress) return;

        const airDropAddress = playerProfile?.airdropWallet?.address;

        if (await hasMintPass(mintPassAddress, airDropAddress, connection)) {
          setMintPassComplete(true);

          //get transcation from api
          const response = await api.get("/api/v1/payments/status");

          if (!response.ok) {
            console.log(response.originalError.message);
            return;
          }

          const tx = response.data as PurchaseStatusAPIResponse;
          setPurchaseType(tx.result?.data?.type);
          setTransactionTxId(tx.result?.data?.paymentTxId || "");
        }
      } catch (e) {
        //if this fails user has not minted
      }
    };
    init();
  }, [playerProfile?.airdropWallet?.address, mintPassAddress]);

  const onPrePayEth = async () => {
    setEthLoading(true);
    try {
      const response = await api.post("/api/v1/payments/create/ethereum");

      if (!response.ok) {
        console.log(response.originalError.message);
        setEthLoading(false);
        return;
      }

      const result = response.data as CreatePurchaseAPIResponse;

      if (!result.success) {
        toast.error(result.message);
        setEthLoading(false);
        return;
      }

      setPurchaseType(PurchaseType.Ethereum);

      if (result.success) {
        setCoinbaseChargeId(result.result?.accessor || "");
        setShowCommerceButton(true);
      }
    } catch (e) {
      toast.error((e as Error).message);
    }
    setEthLoading(false);
  };

  const onPrePaySol = async () => {
    setSolLoading(true);
    try {
      if (!publicKey) {
        toast.error("Please connect your wallet");
        setSolLoading(false);
        return;
      }

      const response = await api.post("/api/v1/payments/create/solana");

      if (!response.ok) {
        console.log(response);
        setSolLoading(false);
        return;
      }

      const result = response.data as CreatePurchaseAPIResponse;

      if (!result.success) {
        toast.error(result.message);
        setSolLoading(false);
        return;
      }

      //check for pending ethereum transaction
      if (result.success && result.result?.type === PurchaseType.Ethereum) {
        toast.error("You have a pending ETH request.");
        setSolLoading(false);
        return;
      }

      setPurchaseType(PurchaseType.Solana);

      if (result.success) {
        const { recipient, amount, reference, memo } = parseURL(
          result.result?.accessor || ""
        );
        if (publicKey) {
          // build transaction
          const tx = await createTransaction(
            connection,
            publicKey,
            recipient,
            amount as BigNumber,
            {
              reference,
              memo,
            }
          );

          // send transaction
          await sendTransaction(tx, connection);

          // start tracking
          onTrackTransaction();

          //show modal
          setIsOpen(true);
        }
      }
    } catch (e) {
      const message = (e as Error).message;
      if (message === "payer not found") {
        toast.error("Please make sure you have funds available");
      } else {
        console.log((e as Error).message);
      }
    }
    setSolLoading(false);
  };

  const onTrackTransaction = async () => {
    const response = await api.get("/api/v1/payments/status");

    if (!response.ok) {
      console.log(response.originalError.message);
      return;
    }

    const tx = response.data as PurchaseStatusAPIResponse;
    setTransactionStatus(tx.result?.status || "");
    setTransactionTxId(tx.result?.data?.paymentTxId || "");

    if (
      tx.result?.status === PurchaseStatus.Completed ||
      tx.result?.status === PurchaseStatus.Expired
    ) {
      setTimeout(() => {
        setIsOpen(false);

        if (tx.result?.status === PurchaseStatus.Completed) {
          setMintPassComplete(true);
        } else {
          setTransactionStatus("");
          setTransactionTxId("");
          setCoinbaseChargeId("");
          setShowCommerceButton(false);
        }
      }, 2500);

      return;
    }

    setTimeout(() => {
      onTrackTransaction();
    }, 3 * 1000);
  };

  const startTransactionModal = async () => {
    setIsOpen(true);
    onTrackTransaction();
  };

  const hasMissedHatchListMint = () => {
    return playerProfile?.status?.hatchList && hatchListOpen && available === 0;
  };

  const hasMissedWaitListMint = () => {
    return playerProfile?.status?.waitList && waitListOpen && available === 0;
  };

  const isBeforeHatchListMint = () => {
    return (
      playerProfile?.status?.hatchList &&
      Date.now() < Date.parse(hatchListOpensAtUtc)
    );
  };

  const isBeforeWaitListMint = () => {
    return (
      playerProfile?.status?.waitList &&
      Date.now() < Date.parse(waitListOpensAtUtc)
    );
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onViewTransactions = () => {
    switch (purchaseType) {
      case PurchaseType.Ethereum:
        window.open(`https://etherscan.io/tx/${transactionTxId}`);
        break;
      case PurchaseType.Solana:
        if (process.env.NODE_ENV === "development") {
          window.open(
            `https://explorer.solana.com/tx/${transactionTxId}?cluster=devnet`
          );
        } else {
          window.open(`https://explorer.solana.com/tx/${transactionTxId}`);
        }
        break;
    }
  };

  //show spinner while loading
  if (loading) {
    return <Spinner />;
  }

  // minting window
  const mintingWindow =
    playerProfile?.status?.hatchList && hatchListOpensAtUtc
      ? dateformat(new Date(hatchListOpensAtUtc), DATE_FORMAT)
      : playerProfile?.status?.waitList && waitListOpensAtUtc
      ? dateformat(new Date(hatchListOpensAtUtc), DATE_FORMAT)
      : "";
  let content: MintingProps = {};

  if (isMobileView) {
    content = {
      hideMinted: !user,
      mintedTotal: total,
      mintedAmount: confirmed,
      pending,
      priceInSol,
      priceInUsd,
    };
    return <MintingMobileBlocker {...content} />;
  }

  // User not logged or not on the wait/hatch list
  if (
    !user ||
    !playerProfile ||
    (!playerProfile.status?.hatchList && !playerProfile.status?.waitList)
  ) {
    const title = !user
      ? "Please log in to mint"
      : "You are not on the hatchlist";
    content = {
      title,
      hideMinted: hatchListOpen || waitListOpen || !user,
      text: "For updates on when the next entry is, follow us on Twitter and join our Discord.",
      buttonA: !user
        ? {
            click: openModal,
            text: "Log In",
          }
        : {
            click: () =>
              window.open("https://twitter.com/mechafightclub", "_blank"),
            text: "Follow on Twitter",
          },
      buttonB: !user
        ? undefined
        : {
            click: () =>
              window.open(
                "https://discord.com/invite/mechafightclub",
                "_blank"
              ),
            text: "Join our Discord",
          },
    };
  }
  // Profile is not complete
  else if (!isProfileComplete) {
    content = {
      title: "Your profile is incomplete",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
      buttonA: {
        click: () => router.push("/account"),
        text: "Complete Profile",
      },
      buttonSideText: "Complete your profile to enable minting",
    };
  }
  // Mint Pass Complete
  else if (mintPassComplete) {
    content = {
      title: "MINT CONFIRMATION... CONFIRMED",
      text: "Congratulations, you have completed the confirmation process! You will be airdropped your MFC EGG when all mint confirmations have been claimed. NOTE: Attempting to sell or transfer your mint confirmation between wallets may void your airdrop without refund.",
      buttonA: {
        click: () => onViewTransactions(),
        text: "View Transactions",
      },
      buttonB: {
        click: () => router.push("/account"),
        text: "View Profile",
      },
      complete: true,
    };
  }
  // Missed Minting Window
  else if (hasMissedHatchListMint() || hasMissedWaitListMint()) {
    content = {
      title: "SORRY, BUT THE MINTING WINDOW ALREADY CLOSED",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
    };
  }
  // Before Minting Window
  else if (isBeforeHatchListMint() || isBeforeWaitListMint()) {
    content = {
      title: "PREPARE YOURSELF! THE MINT WINDOW IS OPENING SOON.",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
      windowTitle: "Your mint window is at:",
      windowText: mintingWindow,
    };
  }
  // Disable mint on mobile
  else {
    // Able to Mint
    content = {
      title: "CLAIM YOUR MINT CONFIRMATION",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
      buttonA: {
        click: () => onPrePaySol(),
        text: "Mint with SOL",
        loading: solLoading,
        disabled: solLoading || ethLoading,
      },
      buttonB: {
        click: () => onPrePayEth(),
        text: "Mint with ETH",
        loading: ethLoading,
        disabled: solLoading || ethLoading,
      },
      windowTitle: "Your mint window is now LIVE",
      windowText: mintingWindow,
    };
  }

  content = {
    ...content,
    mintedTotal: total,
    mintedAmount: confirmed,
    pending,
    priceInSol,
    priceInUsd,
    commerceData: {
      showCommerceButton,
      setShowCommerceButton,
      coinbaseChargeId,
      startTransactionModal,
    },
  };

  return (
    <>
      <Header title="Minting" />
      <MintingLayout {...content} />
      <TransactionModal
        isOpen={isOpen}
        disabled={transactionTxId === ""}
        closeModal={closeModal}
        status={transactionStatus}
        onViewTransactions={onViewTransactions}
      />
    </>
  );
};

export default Mint;
