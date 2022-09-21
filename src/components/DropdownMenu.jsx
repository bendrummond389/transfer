// will display available colors

import React, { useContext, useEffect, useState } from "react";
import { AvailableColorsContext } from "../contexts/AvailableColorsContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { usePlayerColor } from "../contexts/PlayerColorContext";
import { useAuth } from "../contexts/AuthContext";

function DropdownMenu(props) {
  const { getColorFromArray, updateColorInArray } = usePlayerColor();
  const { availableColors, setAvailableColors } = useContext(
    AvailableColorsContext
  );

  const index = props.id;
  const [playerColor, setPlayerColor] = useState(getColorFromArray(index));
  const [loaded, setLoaded] = useState(true);

  const toggleAvailableColors = (value) => {
    if (playerColor != "none") {
      let newArray = [...availableColors];
      let index = availableColors.findIndex(
        (color) => color.value === playerColor
      );
      newArray[index].available = value;
      setAvailableColors(newArray);
    }
  };
  
  const handleChange = (e) => {
    if (playerColor) {
      toggleAvailableColors(true);
    }
    setPlayerColor(e.target.value);
    console.log(playerColor);
  };
  
  useEffect(() => {
    if (playerColor) {
      updateColorInArray(index, playerColor);
    }
    toggleAvailableColors(false);
    // eslint-disable-next-line
  }, [playerColor]);

  let colorList = availableColors.map((color) => (
    <MenuItem
      key={color.id}
      value={color.value}
      sx={{
        ...(!color.available && {
          display: "none",
        }),
      }}
    >
      {color.name}
    </MenuItem>
  ));
  return (
    <FormControl fullWidth>
      <InputLabel id="color-select-label">Select Color</InputLabel>
      <Select
        labelId="color-select-label"
        id="color-select"
        label="Select Color"
        value={playerColor}
        onChange={handleChange}
      >
        {loaded && colorList}
      </Select>
    </FormControl>
  );
}

export default DropdownMenu;
