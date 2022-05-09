import { createContext, useEffect, useState } from "react";
import { UserContextType } from "../types/UserContextType";
import { checkUser } from "../services/magic-service";
import { PlayersMe } from "../interfaces/api/PlayersMe";
import { MagicUserMetadata } from "magic-sdk";

export const UserContext = createContext<Partial<UserContextType>>({});

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<MagicUserMetadata | null>();
  const [playerProfile, setPlayerProfile] = useState<PlayersMe | null>();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        await checkUser(setUser);
      } catch (e) {
        console.log((e as Error).message);
      }
    };
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{
        playerProfile,
        user,
        completedSteps,
        setPlayerProfile,
        setUser,
        setCompletedSteps,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
