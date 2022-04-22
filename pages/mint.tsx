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
import { PlayersMe } from "../interfaces/api/PlayersMe";
import { isLoggedIn } from "../services/magic-service";
import Spinner from "../components/spinner";
import MintingMobileBlocker from "../components/minting/mobile";
import { MintingProps } from "../interfaces/MintingProps";
import { PurchaseStatus, PurchaseType } from "../utils/constants";

const Header = dynamic(() => import("../components/shared/header"));

const Mint: NextPage = () => {
  const { playerProfile, setPlayerProfile, user } = useContext(UserContext);
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

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      if (!(await isLoggedIn())) {
        setLoading(false);
        return;
      }

      let response = await api.get("/api/v1/players/me");

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const playerProfile = response.data as PlayersMe;

      if (setPlayerProfile && playerProfile) {
        setPlayerProfile(playerProfile);
        //check if profile is ready for mint
        if (playerProfile) {
          if (isProfileReadyForMint(playerProfile)) {
            setIsProfileComplete(true);
          }
        }
      }

      if (isMobile) {
        setIsMobileView(true);
      }

      response = await api.get("/api/v1/status/mint");

      if (!response.ok) {
        console.error(response.originalError.message);
        setLoading(false);
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

      //check if user has a mint pass
      try {
        const mintPassAddress = mintStatus.result?.mintAddress;
        const airDropAddress = playerProfile?.airdropWallet?.address;

        if (await hasMintPass(mintPassAddress, airDropAddress, connection)) {
          setMintPassComplete(true);

          //get transcation from api
          await api.get("/api/v1/payments/status").then(async (response) => {
            if (!response.ok) {
              console.error(response.originalError.message);
              return;
            }

            const tx = response.data as PurchaseStatusAPIResponse;
            setPurchaseType(tx.result?.data?.type);
            setTransactionTxId(tx.result?.data?.paymentTxId || "");
          });
        }
      } catch (e) {
        //if this fails user has not minted
        console.log((e as Error).message);
      }

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    init();
  }, [publicKey, user]);

  const onPrePayEth = async () => {
    try {
      const response = await api.post("/api/v1/payments/create/ethereum");

      if (!response.ok) {
        console.error(response.originalError.message);
        return;
      }

      const result = response.data as CreatePurchaseAPIResponse;

      if (!result.success) {
        toast.error(result.message);
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
  };

  const onPrePaySol = async () => {
    try {
      if (!publicKey) {
        toast.error("Please connect your wallet");
        return;
      }

      const response = await api.post("/api/v1/payments/create/solana");

      if (!response.ok) {
        console.error(response);
        return;
      }

      const result = response.data as CreatePurchaseAPIResponse;

      if (!result.success) {
        toast.error(result.message);
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
        toast.error((e as Error).message);
      }
    }
  };

  const onTrackTransaction = async () => {
    const response = await api.get("/api/v1/payments/status");

    if (!response.ok) {
      console.error(response.originalError.message);
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
        window.open(
          `https://explorer.solana.com/tx/${transactionTxId}?cluster=devnet`
        );
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
      ? dateformat(new Date(hatchListOpensAtUtc), "mmmm dS yyyy, hTT")
      : playerProfile?.status?.waitList && waitListOpensAtUtc
      ? dateformat(new Date(hatchListOpensAtUtc), "mmmm dS yyyy, hTT")
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
      ? "Please login to mint"
      : "You are not on the hatchlist";
    content = {
      title,
      hideMinted: hatchListOpen || waitListOpen || !user,
      text: "For updates on when the next entry is, follow us on Twitter and join our Discord.",
      buttonA: {
        click: () =>
          window.open("https://twitter.com/mechafightclub", "_blank"),
        text: "Follow on Twitter",
      },
      buttonB: {
        click: () =>
          window.open("https://discord.com/invite/mechafightclub", "_blank"),
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
      title: "Mint Pass Complete",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
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
      title: "Missed your minting window",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
    };
  }
  // Before Minting Window
  else if (isBeforeHatchListMint() || isBeforeWaitListMint()) {
    content = {
      title: "Your minting window is soon",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
      windowTitle: "Your mint window is at:",
      windowText: mintingWindow,
    };
  }
  // Disable mint on mobile
  else {
    // Able to Mint
    content = {
      title: "Get Your Mint Pass",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel hendrerit ante. Maecenas ligula urna, laoreet eu rhoncus sed, interdum non ante pellentesque ",
      buttonA: {
        click: () => onPrePayEth(),
        text: "Mint with ETH",
      },
      buttonB: {
        click: () => onPrePaySol(),
        text: "Mint with SOL",
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
