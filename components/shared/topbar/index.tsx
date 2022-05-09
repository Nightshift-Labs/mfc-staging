import { useContext, useEffect, useState } from "react";
import React from "react";

import { UserContext } from "../../../contexts/user-context";
import { api } from "../../../pages/_app";
import { MintStatusAPIResponse } from "../../../interfaces/api/MintStatusAPIResponse";

import style from "./topbar.module.scss";
import "reactjs-popup/dist/index.css";

const TopBar = ({}) => {
  const { user, playerProfile } = useContext(UserContext);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    const init = async () => {
      const response = await api.get("/api/v1/status/mint");

      if (response.ok) {
        const data = response.data as MintStatusAPIResponse;
        setAvailable(data?.result?.available || 0);
      }
    };
    init();
  }, []);

  let text;

  if (!playerProfile || !user || available === 0) {
    return null;
  }

  text = playerProfile.status?.waitList
    ? "You are currently on the waitlist for a Mint Pass"
    : playerProfile.status?.hatchList
    ? "Congratulations! You are on the Hatchlist!"
    : "You are currently not on the Hatchlist.";

  return (
    <div className={style.topbar}>
      <span className={style.exclaim} />
      <h1 className={style.title}>{text}</h1>
    </div>
  );
};

export default TopBar;
