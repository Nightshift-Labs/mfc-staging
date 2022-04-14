import MintingComplete from "./complete";
import MintingContent from "./content";
import MintingFlair from "./flair";
import MintingFooter from "./footer";
import { MintingProps } from "../../interfaces/MintingProps";

import styles from "../../styles/components/minting.module.scss";

const MintingLayout = (props: MintingProps) => {
  return (
    <div className={styles.wrapper}>
      <MintingFlair />
      <MintingFooter />
      <div className={styles.body}>
        {props.complete ? (
          <MintingComplete {...props} />
        ) : (
          <MintingContent {...props} />
        )}
      </div>
    </div>
  );
};

export default MintingLayout;
