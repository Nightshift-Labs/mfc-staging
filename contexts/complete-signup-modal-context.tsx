import { createContext, useState } from "react";
import { ModalContextType } from "../types/ModalContextType";

export const CompleteSignUpModalContext = createContext<
  Partial<ModalContextType>
>({});

const CompleteSignUpModalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CompleteSignUpModalContext.Provider
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
    </CompleteSignUpModalContext.Provider>
  );
};

export default CompleteSignUpModalContextProvider;
