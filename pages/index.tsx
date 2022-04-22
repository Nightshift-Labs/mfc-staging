import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user-context";
import { isLoggedIn } from "../services/magic-service";
import { api } from "./_app";
import { getCompletedSteps } from "../utils/helpers";
import { PlayersMe } from "../interfaces/api/PlayersMe";
import type { NextPage } from "next";

import LandingPage from '../components/landing-page'
const Home: NextPage = () => {
  const { setCompletedSteps, setPlayerProfile } = useContext(UserContext)

  useEffect(() => {
    const init = async () => {
      if (!(await isLoggedIn())) return

      await api.get('/api/v1/players/me').then(response => {
        if (response.ok) {
          const playerProfile = response.data as PlayersMe
          if (setPlayerProfile && playerProfile && setCompletedSteps) {
            setPlayerProfile(playerProfile)
            const completedSteps = getCompletedSteps(playerProfile) || []
            setCompletedSteps(completedSteps)
          }
        }
      })
    }

    init()
  }, [])

  return <LandingPage/>
}

export default Home
