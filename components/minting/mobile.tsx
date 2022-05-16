import { MintingProps } from "../../interfaces/MintingProps";

import styles from "../../styles/components/minting.module.scss";

const MintingMobileBlocker = ({
  pending,
  mintedAmount,
  mintedTotal,
  priceInSol,
  priceInUsd,
  hideMinted,
}: MintingProps) => {
  return (
    <div className={styles.mobileContent}>
      <div className={styles.mobileFlair} />
      <div className={styles.logo}>
        <video autoPlay playsInline loop muted={true}>
          <source type="video/mp4" src="images/mint.mp4" />
        </video>
      </div>
      <div className={styles.layout}>
        {/* Green Title */}
        <div className={styles.minting}>MINTING</div>
        {/* Large title */}
        <div className={styles.title}>You can only mint on Desktop</div>
        {/* Minted and Pricing */}
        {!hideMinted && (
          <div className={styles.amount}>
            <div className={styles.amountGroup}>
              <div className={styles.amountTitle}>Minted</div>
              <div className={styles.amountContent}>
                {mintedAmount?.toLocaleString()} /{" "}
                {mintedTotal?.toLocaleString()}{" "}
              </div>
              <div>({pending} pending)</div>
            </div>
            <div className={styles.amountGroup}>
              <div className={styles.amountTitle}>Price</div>
              <div className={styles.amountContent}>
                <div className={styles.amountCurrency}>
                  <div className={styles.iconSol} />
                  <span>{priceInSol}</span>
                  <span className={styles.or}>OR</span>
                  <div className={styles.iconDollar} />
                  <span>{priceInUsd?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Disabled button */}
        <div className={styles.disabled} />
      </div>
    </div>
  );
};

export default MintingMobileBlocker;
