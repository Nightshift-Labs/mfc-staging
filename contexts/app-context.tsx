import UserContextProvider from "./user-context";
import MagicLinkModalContextProvider from "./magic-link-modal-context";
import { combine } from "../utils/combine";
import CompleteSignUpModalContextProvider from "./complete-signup-modal-context";
import PaymentWalletModalContextProvider from "./payment-wallet-modal-context";

const providers = [
  UserContextProvider,
  MagicLinkModalContextProvider,
  CompleteSignUpModalContextProvider,
  PaymentWalletModalContextProvider,
];

export const AppContextProvider = combine(...providers);
