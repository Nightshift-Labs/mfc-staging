import Modal from "react-modal";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AvatarModalProps } from "../../interfaces/AvatarModalProps";
import { useContext, useState } from "react";
import {
  AVATARS,
  GRAY,
  GREEN,
  PINK,
  PURPLE,
  RED,
  YELLOW,
} from "../../utils/constants";
import { UpdateAvatarColorBody } from "../../interfaces/api/UpdateAvatarColorBody";
import { showError } from "../../utils/helpers";
import { PlayersMe } from "../../interfaces/api/PlayersMe";
import { UserContext } from "../../contexts/user-context";
import { api } from "../../pages/_app";

const Button = dynamic(() => import("../shared/button"));

//ASSETS
import Close from "../../public/images/close-button.svg";

import styles from "../../styles/components/modal.module.scss";

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

const PickAvatarModal = ({ isOpen, closeModal }: AvatarModalProps) => {
  const [selectedAvatarColor, setSelectedAvatarColor] = useState("");
  const { setPlayerProfile } = useContext(UserContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const onAvatarClick = (avatarColor: string) => {
    setSelectedAvatarColor(avatarColor);
  };

  const onSelectAvatarClick = async () => {
    setIsDisabled(true);

    const updateAvatarColorBody: UpdateAvatarColorBody = {
      avatarColor: selectedAvatarColor,
    };

    await api
      .patch("/api/v1/players/me/avatar-color", updateAvatarColorBody)
      .then((response) => {
        if (!response.ok) {
          showError(response.originalError.message);
          setIsDisabled(false);
          return;
        }
      });

    await api.get("/api/v1/players/me").then((response) => {
      if (response.ok) {
        const playerProfile = response.data as PlayersMe;
        if (setPlayerProfile && playerProfile) {
          setPlayerProfile(playerProfile);
        }
      } else {
        showError(response.originalError.message);
        return;
      }
    });

    setIsDisabled(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div onClick={closeModal} className={styles.closeButton}>
        <Image src={Close} alt="close button" />
      </div>
      <div className={styles.outlineAvatar}>
        <div className={styles.avatarInner}>
          <h4 className={styles.altText}>PICK AN AVATAR COLOR</h4>
          <div className={styles.avatarWrapper}>
            <div
              className={
                selectedAvatarColor === GRAY
                  ? styles.avatarSelected
                  : styles.avatar
              }
            >
              <div className={styles.border}>
                <Image
                  alt="avatar"
                  loading="lazy"
                  src={AVATARS[GRAY]}
                  width={135}
                  height={140}
                  onClick={() => onAvatarClick(GRAY)}
                />
              </div>
            </div>
            <div
              className={
                selectedAvatarColor === PINK
                  ? styles.avatarSelected
                  : styles.avatar
              }
            >
              <div className={styles.border}>
                <Image
                  alt="avatar"
                  loading="lazy"
                  src={AVATARS[PINK]}
                  width={135}
                  height={140}
                  onClick={() => onAvatarClick(PINK)}
                />
              </div>
            </div>
            <div
              className={
                selectedAvatarColor === PURPLE
                  ? styles.avatarSelected
                  : styles.avatar
              }
            >
              <div className={styles.border}>
                <Image
                  alt="avatar"
                  loading="lazy"
                  src={AVATARS[PURPLE]}
                  width={135}
                  height={140}
                  onClick={() => onAvatarClick(PURPLE)}
                />
              </div>
            </div>
            <div
              className={
                selectedAvatarColor === RED
                  ? styles.avatarSelected
                  : styles.avatar
              }
            >
              <div className={styles.border}>
                <Image
                  alt="avatar"
                  loading="lazy"
                  src={AVATARS[RED]}
                  width={135}
                  height={140}
                  onClick={() => onAvatarClick(RED)}
                />
              </div>
            </div>
            <div
              className={
                selectedAvatarColor === GREEN
                  ? styles.avatarSelected
                  : styles.avatar
              }
            >
              <div className={styles.border}>
                <Image
                  alt="avatar"
                  loading="lazy"
                  src={AVATARS[GREEN]}
                  width={135}
                  height={140}
                  onClick={() => onAvatarClick(GREEN)}
                />
              </div>
            </div>
            <div
              className={
                selectedAvatarColor === YELLOW
                  ? styles.avatarSelected
                  : styles.avatar
              }
            >
              <div className={styles.border}>
                <Image
                  alt="avatar"
                  loading="lazy"
                  src={AVATARS[YELLOW]}
                  width={135}
                  height={140}
                  onClick={() => onAvatarClick(YELLOW)}
                />
              </div>
            </div>
          </div>
          <Button
            click={() => onSelectAvatarClick()}
            disabled={isDisabled}
            text={isDisabled ? "Updating..." : "Select"}
            type="primary"
            link={""}
            icon={false}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PickAvatarModal;
