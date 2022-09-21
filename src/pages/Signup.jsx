import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  Button,
  Container,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { addNewUser } from "../helperFunctions/ServerFunctions";
import { usePlayerColor } from "../contexts/PlayerColorContext";

export default function Signup() {
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPlayerColorArray } = usePlayerColor();
  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (data.get("password") !== data.get("passwordConfirm")) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const credentials = await signup(data.get("email"), data.get("password"));
      addNewUser(credentials.user.uid);
      setPlayerColorArray(["none", "none", "none", "none"]);
      navigate("/");
    } catch {
      setError("Failed to create account");
    }

    setLoading(false);
  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ padding: 5 }}>
          <Typography component="h1" variant="h4">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
              id="passwordConfirm"
              autoComplete="current-password"
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Card>
        Already have an account? <Link to="/login">Log In</Link>
      </Box>
    </Container>
  );
}
