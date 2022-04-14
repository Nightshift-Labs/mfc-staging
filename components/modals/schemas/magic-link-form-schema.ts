import * as Yup from "yup";

export const MagicLinkFormSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  privacyAndTermsOfService: Yup.boolean().oneOf(
    [true],
    "The Privacy Policy and Terms of Use must be accepted."
  ),
});
