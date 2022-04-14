import { useRouter } from "next/router";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import Modal from "react-modal";
import Image from "next/image";
import { UserContext } from "../../contexts/user-context";
import { DeleteAccountModalProps } from "../../interfaces/DeleteAccountModalProps";
import { api } from "../../pages/_app";
import { logoutUser } from "../../services/magic-service";
import { showError } from "../../utils/helpers";

Modal.setAppElement("body");

const Button = dynamic(() => import("../shared/button"));

//ASSETS
import Close from "../../public/images/close-button.svg";

import styles from "../../styles/components/modal.module.scss";

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

const DeleteAccountModal = ({
  isOpen,
  closeModal,
}: DeleteAccountModalProps) => {
  const { setUser, setPlayerProfile } = useContext(UserContext);
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const onYesDeleteClick = async () => {
    setIsDisabled(true);

    await api.delete("/api/v1/players/me").then((response) => {
      if (response.ok) {
        logoutUser();

        if (setUser && setPlayerProfile) {
          setUser(null);
          setPlayerProfile(null);
        }
        router.push("/");
      } else {
        showError(response.originalError.message);
        setIsDisabled(false);
      }
    });
  };

  const onNoGoBackClick = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div onClick={closeModal} className={styles.closeButton}>
        <Image src={Close} alt="close button" />
      </div>
      <div className={styles.outlineDelete}>
        <div className={styles.deleteInner}>
          <h4 className={styles.title}>
            ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?
          </h4>
          <div className={styles.buttonWrapper}>
            <Button
              click={() => onYesDeleteClick()}
              disabled={isDisabled}
              text={"Yes, delete"}
              type="secondary"
              link={""}
              icon={false}
            />
            <Button
              click={() => onNoGoBackClick()}
              disabled={isDisabled}
              text={"No, go back"}
              type="primary"
              link={""}
              icon={false}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
