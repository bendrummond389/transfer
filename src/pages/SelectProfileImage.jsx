import React, { useState } from "react";
import { Button, Card, Typography, Container, Box } from "@mui/material";
import { useImage } from "../contexts/ImageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


export default function ProfileImage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth()
  const { uploadImage } = useImage();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async  () =>  {
    await uploadImage(image, currentUser.uid)
    navigate('/')
  };

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
        <Card
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5">
            Choose Profile Image
          </Typography>
          <input type="file" onChange={handleImageChange} />
          <Button onClick={handleSubmit}>Submit</Button>
        </Card>
      </Box>
    </Container>
  );
}
