import { createContext, useState } from "react";
import { TopBarContext } from "../types/TopBarContext";

export const SetupTopBarContext = createContext<
  Partial<TopBarContext>
>({});

const TopBarContextProvider = ({ children }: any) => {
  const [text, setText] = useState("");
  return (
    <SetupTopBarContext.Provider
      value={{
        text,
        updateText: setText
      }}
    >
      {children}
    </SetupTopBarContext.Provider>
  );
};

export default TopBarContextProvider;
