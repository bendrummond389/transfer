// this component will house an image and a dropdown menu
// additionally it will hold a current color context for each
// card
import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import DropdownMenu from "./DropdownMenu";
import { usePlayerColor } from "../contexts/PlayerColorContext";

function PlayerCard(props) {
  const { playerColorArray, getColorFromArray, loading } = usePlayerColor();
  const [color, setColor] = useState();
  const index = props.id

  useEffect(() => {
    setColor(getColorFromArray(index))
  })
  
  return (
    <Grid item>
        <Card>
          <Typography variant="h4">Player {props.id}</Typography>
          {!loading && <CardMedia
            component="img"
            height="140"
            image="https://i.stack.imgur.com/l60Hf.png"
            className={color}
          />}
          <CardContent>
            <DropdownMenu id={props.id} />
          </CardContent>
        </Card>
    </Grid>
  );
}

export default PlayerCard;
