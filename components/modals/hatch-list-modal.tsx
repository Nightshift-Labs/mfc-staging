import Image from "next/image";
import { useContext } from "react";
import Modal from "react-modal";
import { UserContext } from "../../contexts/user-context";
import { ModalProps } from "../../interfaces/ModalProps";

//ASSETS
import Close from "../../public/images/close-button.svg";
import styles from "../../styles/components/hatchlistModal.module.scss";
import Button from "../shared/button";

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
    maxWidth: "850px",
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

const HatchListModal = ({ isOpen, closeModal }: ModalProps) => {
  const { playerProfile } = useContext(UserContext);

  if (playerProfile?.status?.hatchList) {
    return (
      <HatchModalContent
        isOpen={isOpen}
        closeModal={closeModal}
        title="Congratulations! you are on the hatchlist!"
        text="Your minting window is available on your profile home page. Don't miss your window or you will lose your chance to mint!"
        button1={{
          click: () => closeModal(),
          text: "View Profile",
        }}
      />
    );
  }
 
  if (playerProfile?.status?.waitList) {
    return (
      <HatchModalContent
        isOpen={isOpen}
        closeModal={closeModal}
        title="You are currently on the waitlist."
        text="You will receive an email when you are added to the next hatchlist."
        button1={{
          click: () => closeModal(),
          text: "View Profile",
        }}
      />
    );
  }

  return (
    <HatchModalContent
      isOpen={isOpen}
      closeModal={closeModal}
      title="You are not on the hatchlist"
      text="To increase your chances at being added to the hatchlist, get involved with the MFC community!"
      button1={{
        click: () =>
          window.open("https://twitter.com/mechafightclub", "_blank"),
        text: "Follow on Twitter",
      }}
      button2={{
        click: () =>
          window.open("https://discord.com/invite/mechafightclub", "_blank"),
        text: "Join our Discord",
      }}
    />
  );
};

const HatchModalContent = ({
  isOpen,
  closeModal,
  title,
  text,
  button1 = null,
  button2 = null,
}: any) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div onClick={closeModal} className={styles.closeButton}>
        <Image src={Close} alt="close button" />
      </div>
      <div className={styles.outline}>
        <h3>{title}</h3>
        <div className={styles.text}>
          <p>{text}</p>
        </div>
        <div className={styles.buttonWrapper}>
          {button1 && (
            <Button
              click={button1.click}
              type="primary"
              link=""
              icon={false}
              text={button1.text}
            />
          )}
          {button2 && (
            <Button
              click={button2.click}
              type="secondary"
              link=""
              icon={false}
              text={button2.text}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default HatchListModal;
