import * as Yup from "yup";

export const CompleteSignUpFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Your username must be longer than 4 characters.")
    .max(15, "Your username must be shorter than 15 characters.")
    .matches(
      /^[A-Za-z0-9_]*$/,
      "Your username can only contain letters, numbers and '_'"
    )
    .required("Username is required."),
});
