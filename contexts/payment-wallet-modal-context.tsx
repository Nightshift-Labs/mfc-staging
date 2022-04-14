import { createContext, useState } from "react";
import { ModalContextType } from "../types/ModalContextType";

export const PaymentWalletModalContext = createContext<
  Partial<ModalContextType>
>({});

const PaymentWalletModalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PaymentWalletModalContext.Provider
      value={{
        isOpen,
        openModal: () => {
          setIsOpen(true);
        },
        closeModal: () => {
          setIsOpen(false);
        },
      }}
    >
      {children}
    </PaymentWalletModalContext.Provider>
  );
};

export default PaymentWalletModalContextProvider;
