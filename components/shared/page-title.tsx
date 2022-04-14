import { PageTitleProps } from "../../interfaces/PageTitleProps";
import styles from "../../styles/components/page-title.module.scss";

const PageTitle = ({ title, align }: PageTitleProps) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default PageTitle;
