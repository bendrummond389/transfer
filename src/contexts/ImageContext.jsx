import React, { createContext, useContext, useEffect, useState } from "react";
import { loadImageFromServer, uploadImageToServer } from "../helperFunctions/ServerFunctions";


const ImageContext = createContext();

export function useImage() {
  return useContext(ImageContext);
}

export function ImageProvider({ children }) {
  const [image, setImage] = useState(null);

  async function uploadImage(image, userId) {
    const base64 = await convertBase64(image)
    setImage(base64);
    console.log(base64)
    uploadImageToServer(userId, base64)
  }

  async function loadImage(userId) {
    const base64 = await loadImageFromServer(userId)
    setImage(base64)
  }

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader()
      fileReader.readAsDataURL(file)


      fileReader.onload = () =>{
        resolve(fileReader.result);
      }

      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const value = {
    image,
    uploadImage,
    loadImage,
    setImage,
  };
  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
}
