import Button from "../shared/button";
import { MintingProps } from "../../interfaces/MintingProps";

import styles from "../../styles/components/minting.module.scss";

const MintingComplete = ({ title, text, buttonA, buttonB }: MintingProps) => {
  return (
    <div className={styles.complete}>
      <div className={styles.logo} />
      <div className={styles.layout}>
        {/* Large title */}
        <div className={styles.title}>{title}</div>

        {/* General Text */}
        <div className={styles.text}>{text}</div>

        {/* Buttons */}
        <div className={styles.btns}>
          {buttonA ? (
            <Button
              click={buttonA.click}
              text={buttonA.text}
              link=""
              type="primary"
              icon={false}
            />
          ) : null}
          {buttonB ? (
            <Button
              click={buttonB.click}
              text={buttonB.text}
              link=""
              type="secondary"
              icon={false}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MintingComplete;
