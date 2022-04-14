import Image from "next/image";
import { ButtonProps } from "../../interfaces/ButtonProps";

import styles from "../../styles/components/button.module.scss";
import Discord from "../../public/images/discord.svg";

const Button = ({ click, text, link, type, icon, disabled }: ButtonProps) => {
  if (type === "primary") {
    return (
      <button
        disabled={disabled}
        onClick={click}
        className={!!disabled ? styles.disabled : styles.primary}
        type="button"
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </button>
    );
  } else if (type === "primary-hero") {
    return (
      <button
        disabled={disabled}
        onClick={click}
        className={styles.primaryHero}
        type="button"
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </button>
    );
  } else if (type === "primary-large") {
    return (
      <button
        disabled={disabled}
        onClick={click}
        className={styles.primaryLarge}
        type="button"
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </button>
    );
  } else if (type === "secondary") {
    return (
      <button
        disabled={disabled}
        onClick={click}
        className={!!disabled ? styles.disabled : styles.secondary}
        type="button"
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </button>
    );
  } else if (type === "secondary-hero") {
    return (
      <button
        disabled={disabled}
        onClick={click}
        className={styles.secondaryHero}
        type="button"
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </button>
    );
  } else if (type === "secondary-large") {
    return (
      <button
        disabled={disabled}
        onClick={click}
        className={styles.secondaryLarge}
        type="button"
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </button>
    );
  } else if (type === "discord-link") {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.secondaryLarge}
      >
        {icon ? (
          <>
            <Image src={Discord} alt="discord logo" />
            <span>{text}</span>
          </>
        ) : (
          text
        )}
      </a>
    );
  } else {
    return (
      <button
        className={styles.alt}
        type="button"
        style={{ backgroundColor: "black", color: "white" }}
      >
        {text}
      </button>
    );
  }
};

export default Button;
