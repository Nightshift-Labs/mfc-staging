import { useState, useContext, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Modal from "react-modal";
import { Formik, ErrorMessage } from "formik";
import { loginUser } from "../../services/magic-service";
import { useRouter } from "next/router";
import { MagicLinkFormValues } from "../../interfaces/MagicLinkFormValues";
import { ModalProps } from "../../interfaces/ModalProps";
import { MagicLinkFormSchema } from "./schemas/magic-link-form-schema";
import { UserContext } from "../../contexts/user-context";
import { CompleteSignUpModalContext } from "../../contexts/complete-signup-modal-context";
import { PlayersMe } from "../../interfaces/api/PlayersMe";
import { getCompletedSteps, showError } from "../../utils/helpers";

const Button = dynamic(() => import("../shared/button"));

//ASSETS
import Close from "../../public/images/close-button.svg";
import styles from "../../styles/components/modal.module.scss";
import { api } from "../../pages/_app";

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

const MagicLinkModal = ({ isOpen, closeModal }: ModalProps) => {
  const { setPlayerProfile, setUser } = useContext(UserContext);
  const { openModal } = useContext(CompleteSignUpModalContext);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const submitBtn = useRef<HTMLButtonElement>(null);

  const clickEl = () => {
    submitBtn.current?.click();
  };

  const onSubmit = async (values: MagicLinkFormValues) => {
    setLoading(true);

    if (setPlayerProfile && setUser) {
      try {
        await loginUser(values.email, setUser);

        await api.get("/api/v1/players/me").then((response) => {
          if (!response.ok) {
            if (response.status === 404 && openModal) {
              closeModal();
              openModal();
            } else {
              showError(response.originalError.message);
            }
          } else {
            const playerProfile = response.data as PlayersMe;
            setPlayerProfile(playerProfile);

            if (playerProfile) {
              const completedSteps = getCompletedSteps(playerProfile) || [];

              closeModal();

              if (completedSteps?.length === 3) {
                router.push("/account");
              } else {
                router.push("/registration");
              }
            }
          }
        });

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }
  };

  const initialValues: MagicLinkFormValues = {
    email: "",
    privacyAndTermsOfService: false,
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <div onClick={closeModal} className={styles.closeButton}>
        <Image src={Close} alt="close button" />
      </div>
      <div className={styles.outline}>
        <Formik
          initialValues={initialValues}
          validationSchema={MagicLinkFormSchema}
          onSubmit={async (values) => {
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
                <h4 className={styles.title}>Log In /Sign Up with Email</h4>
                <p className={styles.description}>
                  Provide the email address linked to your MFC account. If this
                  email doesn&apos;t already have an account, one will be
                  created.
                </p>
                <div
                  className={
                    focus ? styles.inputWrapperFocus : styles.inputWrapper
                  }
                >
                  <input
                    name="email"
                    autoComplete="off"
                    className={styles.input}
                    onChange={handleChange}
                    onFocus={() => setFocus(true)}
                    onBlur={() => {
                      handleBlur;
                      setFocus(false);
                    }}
                    value={values.email}
                    placeholder="Email"
                  />
                </div>
                <ErrorMessage name="email">
                  {(msg) => <div style={{ fontSize: "12px" }}>* {msg}</div>}
                </ErrorMessage>
                <div className={styles.wrapper}>
                  <input
                    type="checkbox"
                    checked={values.privacyAndTermsOfService}
                    name="privacyAndTermsOfService"
                    onChange={() =>
                      setFieldValue(
                        "privacyAndTermsOfService",
                        !values.privacyAndTermsOfService
                      )
                    }
                  />
                  <label
                    className={styles.checkbox}
                    htmlFor="privacyAndTermsOfService"
                  >
                    Accept
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://app.termly.io/document/privacy-policy/861615dc-b01c-4254-b881-155e95400659"
                    >
                      {" "}
                      Privacy Policy
                    </a>{" "}
                    &amp;
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://app.termly.io/document/terms-of-use-for-website/07eae708-9869-4328-bedd-3330bb29fb87"
                    >
                      {" "}
                      Terms of Service
                    </a>
                  </label>
                </div>
                <ErrorMessage name="privacyAndTermsOfService">
                  {(msg) => <div style={{ fontSize: "12px" }}>{msg}</div>}
                </ErrorMessage>
                <div className={styles.buttonWrapper}>
                  <button
                    style={{ display: "none" }}
                    ref={submitBtn}
                    type="submit"
                    disabled={isSubmitting}
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

export default MagicLinkModal;
