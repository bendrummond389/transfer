import { Button, Card, Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useImage } from "../contexts/ImageContext"
import { usePlayerColor } from "../contexts/PlayerColorContext";


export default function LogoutButton() {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const { setImage } = useImage();
  let navigate = useNavigate();
  let { setPlayerColorArray } = usePlayerColor()

  async function handleLogout() {
    setError("");

    try {
      setImage(null)
      await logout();
      setPlayerColorArray()
      navigate("/login");
    } catch {
      setError("log out unsuccessful");
    }
  }
  return (
    <Button variant="link" onClick={handleLogout}>
      Log Out
    </Button>
  );
}
