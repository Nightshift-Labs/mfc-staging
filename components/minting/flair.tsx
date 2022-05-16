import styles from "../../styles/components/minting.module.scss";

const MintingFlair = () => {
  return (
    <div className={styles.flair}>
      <div className={styles.borderLeft} />
      <div className={styles.borderRight} />
      <div className={styles.dashed} />
      <div className={styles.numbers} style={{ top: 270, left: 125 }} >57333459 7455</div>
      <div className={styles.numbers} style={{ top: 370, right: 180 }}>619142 751455</div>
    </div>
  );
};

export default MintingFlair;
