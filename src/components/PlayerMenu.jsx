// player cards go here, also total all colors context

import React, { useState, useMemo, useEffect } from "react";
import { Grid } from "@mui/material";
import PlayerCard from "./PlayerCard";
import { AvailableColorsContext } from "../contexts/AvailableColorsContext";
import Navbar from "./Navbar";
import { usePlayerColor } from "../contexts/PlayerColorContext";
import { loadArrayFromServer } from "../helperFunctions/ServerFunctions";
import { useAuth } from "../contexts/AuthContext";

function PlayerMenu() {
  const [availableColors, setAvailableColors] = useState([
    { name: "None", id: "0", value: "none", available: true },
    { name: "Red", id: "1", value: "red", available: true },
    { name: "Blue", id: "2", value: "blue", available: true },
    { name: "Green", id: "3", value: "green", available: true },
    { name: "Yellow", id: "4", value: "yellow", available: true },
  ]);


  const { setPlayerColorArray } = usePlayerColor();
  const { currentUser } = useAuth();
  const providerAvailableColor = useMemo(
    () => ({ availableColors, setAvailableColors }),
    [availableColors, setAvailableColors]
  );

  useEffect(() => {
    const loadArray = async () => {
      const array = await loadArrayFromServer(currentUser.uid);
      setPlayerColorArray(array);
    }
    loadArray()
  }, []);

  return (
    <AvailableColorsContext.Provider value={providerAvailableColor}>
      <Navbar />
      <Grid container justifyContent="center" spacing={10} marginTop={1}>
        <PlayerCard id="0" />
        <PlayerCard id="1" />
        <PlayerCard id="2" />
        <PlayerCard id="3" />
      </Grid>
    </AvailableColorsContext.Provider>
  );
}

export default PlayerMenu;
