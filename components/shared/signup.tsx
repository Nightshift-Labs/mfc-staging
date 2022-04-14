import { useState } from "react";
import Image from "next/image";
import { Formik, ErrorMessage } from "formik";
import axios from "axios";
import { SignUpSchema } from "./signup-schema";
import FooterGraphic from "../../public/images/FooterGraphic-min.png";

import styles from "../../styles/components/form.module.scss";

const SignUp = ({}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  return (
    <section className={styles.signup} id="signup">
      <div className={styles.signupImage}>
        <Image src={FooterGraphic} alt="purple egg" />
      </div>
      <div className={styles.formContent}>
        <h3>
          Early birds <br />
          <span className={styles.primaryColor}>get the worms!</span>
        </h3>
        <div className={styles.formWrapper}>
          <p className={styles.signupSubtitle}>
            SIGN UP &amp; JOIN OUR DISCORD
          </p>
          <p className={styles.formText}>
            Drops and invites will prioritize our early bird community, so sign
            up for email updates and join the Discord discussion now!
          </p>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const url = `/api/email`;
                await axios.post(url, { email: values.email });
                setMessage("Thank you! Your submission has been received!");
              } catch (e) {
                setMessage(
                  "Oops! Something went wrong while submitting the form."
                );
                setError(true);
              } finally {
                setSubmitting(false);
              }
              setShowMessage(true);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formInner}>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={styles.email}
                      placeholder="Email"
                    />
                    <div className={styles.formButtons}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={styles.button}
                      >
                        Submit
                      </button>
                      {/* <div className={styles.discordBtn}>
                          <Button type="secondary-large" text="Join Our Discord" icon={true} link={""}/>
                        </div> */}
                    </div>
                  </div>
                  <div className={styles.errorMessage}>
                    <ErrorMessage name="email">
                      {(msg) => <div>{msg}</div>}
                    </ErrorMessage>
                  </div>
                </form>
              </>
            )}
          </Formik>
        </div>
        <div className={`${error ? "red" : ""}`}>
          {showMessage && <div className={styles.message}>{message}</div>}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
