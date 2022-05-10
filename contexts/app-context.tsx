import UserContextProvider from "./user-context";
import MagicLinkModalContextProvider from "./magic-link-modal-context";
import { combine } from "../utils/combine";
import CompleteSignUpModalContextProvider from "./complete-signup-modal-context";
import PaymentWalletModalContextProvider from "./payment-wallet-modal-context";
import TopBarContextProvider from "./topbar-context";

const providers = [
  UserContextProvider,
  MagicLinkModalContextProvider,
  CompleteSignUpModalContextProvider,
  PaymentWalletModalContextProvider,
  TopBarContextProvider,
];

export const AppContextProvider = combine(...providers);
