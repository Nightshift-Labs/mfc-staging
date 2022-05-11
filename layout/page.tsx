import dynamic from "next/dynamic";

import { useContext, useEffect, useState } from "react";
import Navbar from "../components/shared/navbar";
import { LayoutProps } from "../interfaces/LayoutProps";
import { MagicLinkModalContext } from "../contexts/magic-link-modal-context";
import { CompleteSignUpModalContext } from "../contexts/complete-signup-modal-context";
import pageStyles from "../styles/components/page.module.scss";

const TopBar = dynamic(() => import("../components/shared/topbar"));
const MagicLinkModal = dynamic(
  () => import("../components/modals/magic-link-modal")
);
const CompleteSignUpModal = dynamic(
  () => import("../components/modals/complete-signup-modal")
);

const Page = ({ children }: LayoutProps) => {
  const [hideFooter, setHideFooter] = useState(false);
  const { isOpen: isMagicLinkModalOpen, closeModal: closeMagicLinkModal } =
    useContext(MagicLinkModalContext);
  const {
    isOpen: isCompleteSignUpModalOpen,
    closeModal: closeCompleteSignUpModal,
  } = useContext(CompleteSignUpModalContext);

  useEffect(() => {
    setHideFooter(!["mint"].includes(!!window ? window.location.href : ""));
  }, []);

  const [isHome, setIsHome] = useState(false);
  useEffect(() => {
    const isCurrentHome = window.location.pathname === "/";
    if (isCurrentHome != isHome) setIsHome(isCurrentHome);
  });

  return (
    <>
      <div
        className={pageStyles.header}
        style={{ position: isHome ? "fixed" : "relative" }}
      >
        <TopBar />
        <Navbar />
      </div>
      <main>{children}</main>
      {isMagicLinkModalOpen && closeMagicLinkModal && (
        <MagicLinkModal
          isOpen={isMagicLinkModalOpen}
          closeModal={closeMagicLinkModal}
        />
      )}
      {isCompleteSignUpModalOpen && closeCompleteSignUpModal && (
        <CompleteSignUpModal
          isOpen={isCompleteSignUpModalOpen}
          closeModal={closeCompleteSignUpModal}
        />
      )}
    </>
  );
};

export default Page;
