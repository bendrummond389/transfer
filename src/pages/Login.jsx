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
import { useAuth } from "../contexts/AuthContext";
import { usePlayerColor } from "../contexts/PlayerColorContext";
import { Link, useNavigate } from "react-router-dom";
import { loadArrayFromServer } from "../helperFunctions/ServerFunctions";

export default function Login() {
  const { login, currentUser } = useAuth();
  const { setPlayerColorArray } = usePlayerColor()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      setError("");
      setLoading(true);
      const credentials = await login(data.get("email"), data.get("password"));
      const loadedArray = await loadArrayFromServer(credentials.user.uid)
      navigate('/')
      setPlayerColorArray(loadedArray)
    } catch {
      setError("Failed to sign in");
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
            Log In
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
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </Box>
        </Card>
          Need an account? <Link to="/signup">Sign Up</Link>
      </Box>
    </Container>
  );
}
