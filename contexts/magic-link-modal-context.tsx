import { createContext, useState } from "react";
import { ModalContextType } from "../types/ModalContextType";

export const MagicLinkModalContext = createContext<Partial<ModalContextType>>(
  {}
);

const MagicLinkModalContextProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MagicLinkModalContext.Provider
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
    </MagicLinkModalContext.Provider>
  );
};

export default MagicLinkModalContextProvider;
