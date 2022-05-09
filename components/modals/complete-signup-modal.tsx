import { useState, useContext, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Modal from "react-modal";
import Image from "next/image";
import { Formik, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { ModalProps } from "../../interfaces/ModalProps";
import { CompleteSignUpFormValues } from "../../interfaces/CompleteSignUpFormValues";
import { CompleteSignUpFormSchema } from "./schemas/complete-signup-form-schema";
import ReCAPTCHA from "react-google-recaptcha";
import { UserContext } from "../../contexts/user-context";
import { steps } from "../../utils/constants";
import { showError, updateCompleteSteps } from "../../utils/helpers";
import { PlayerRegistrationBody } from "../../interfaces/api/PlayerRegistrationBody";
import { PlayersMe } from "../../interfaces/api/PlayersMe";
import { api } from "../../pages/_app";
import axios from "axios";

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

const CompleteSignUpModal = ({ isOpen, closeModal }: ModalProps) => {
  const { user, setCompletedSteps, completedSteps, setPlayerProfile } =
    useContext(UserContext);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [focusEmail, setFocusEmail] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const submitBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    return () => {
      setLoading(false);
      closeModal();
    };
  }, [router]);

  const clickEl = () => {
    submitBtn.current?.click();
  };

  const onRecaptchaChange = (value: any) => {
    if (value) {
      setToken(value);
      setError("");
    }
  };

  const onSubmit = async (values: CompleteSignUpFormValues) => {
    setLoading(true);

    if (token === null) {
      setError("Please complete RECAPTCHA");
      setLoading(false);
      return;
    }

    await axios.post("/api/email", { email: values.email });

    const playerRegistrationBody: PlayerRegistrationBody = {
      displayName: values.username,
      verificationCode: token,
      hasAcceptedTerms: true,
      emailSettings: {
        sendMarketingAndEventEmails:
          values.receiveDropUpdatesAndMarketingEmails,
      },
    };

    let response = await api.post(
      "/api/v1/players/register",
      playerRegistrationBody
    );

    if (!response.ok) {
      showError(response.originalError.message);
      setLoading(false);
      return;
    }

    response = await api.get("/api/v1/players/me");

    if (!response.ok) return;

    const playerProfile = response.data as PlayersMe;

    if (setPlayerProfile && playerProfile && setCompletedSteps) {
      setPlayerProfile(playerProfile);
    }

    if (completedSteps && setCompletedSteps) {
      updateCompleteSteps(
        completedSteps,
        steps.basicInformation,
        setCompletedSteps
      );
    }

    // setLoading(false);
    closeModal();

    if (router.pathname !== "/registration") {
      router.push("/registration");
    }
  };

  const initialValues: CompleteSignUpFormValues = {
    email: user && user.email ? user.email : "",
    username: "",
    receiveDropUpdatesAndMarketingEmails: false,
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div onClick={closeModal} className={styles.closeButton}>
        <Image src={Close} alt="close button" />
      </div>
      <div className={styles.outlineUsername}>
        <Formik
          initialValues={initialValues}
          validationSchema={CompleteSignUpFormSchema}
          onSubmit={async (values: CompleteSignUpFormValues) => {
            onSubmit(values);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <form className={styles.form} onSubmit={handleSubmit}>
                <h4 className={styles.title}>Complete Sign Up</h4>
                <p className={styles.description}>
                  The provided email doesn’t already have an MFC account
                  associated with it. You can create one below!
                </p>
                <div
                  className={
                    focusEmail ? styles.inputWrapperFocus : styles.inputWrapper
                  }
                >
                  <input
                    name="email"
                    autoComplete="off"
                    className={styles.input}
                    onFocus={() => setFocusEmail(true)}
                    onBlur={() => {
                      handleBlur;
                      setFocusEmail(false);
                    }}
                    value={values.email}
                    placeholder="Email"
                    readOnly
                  />
                </div>
                <div
                  className={
                    focusUser ? styles.inputWrapperFocus : styles.inputWrapper
                  }
                >
                  <input
                    name="username"
                    onChange={handleChange}
                    autoComplete="off"
                    className={styles.input}
                    onFocus={() => setFocusUser(true)}
                    onBlur={() => {
                      handleBlur;
                      setFocusUser(false);
                    }}
                    value={values.username}
                    placeholder="Username"
                  />
                </div>
                <ErrorMessage name="username">
                  {(msg) => <div>{msg}</div>}
                </ErrorMessage>
                {process.env.RECAPTCHA_KEY && (
                  <ReCAPTCHA
                    sitekey={process.env.RECAPTCHA_KEY}
                    onChange={onRecaptchaChange}
                    theme="dark"
                  />
                )}
                {error && <p>{error}</p>}
                <div className={styles.wrapper}>
                  <input
                    type="checkbox"
                    checked={values.receiveDropUpdatesAndMarketingEmails}
                    name="receiveDropUpdatesAndMarketingEmails"
                    onChange={() =>
                      setFieldValue(
                        "receiveDropUpdatesAndMarketingEmails",
                        !values.receiveDropUpdatesAndMarketingEmails
                      )
                    }
                  />
                  <label
                    className={styles.checkbox}
                    htmlFor="receiveDropUpdatesAndMarketingEmails"
                  >
                    Receive drop updates & marketing emails.
                  </label>
                </div>
                <div className={styles.buttonWrapper}>
                  <button
                    style={{ display: "none" }}
                    type="submit"
                    disabled={isSubmitting}
                    ref={submitBtn}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                  <Button
                    click={clickEl}
                    disabled={isSubmitting || loading}
                    text={loading ? "Loading..." : "Submit"}
                    type="primary"
                    link={""}
                    icon={false}
                  />
                </div>
              </form>
            </>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CompleteSignUpModal;
