import React, { useState } from "react";

import { uploadImageToServer } from "../helperFunctions/ServerFunctions";
import {useAuth} from "../contexts/AuthContext"

export default function Test() {
  const { currentUser } = useAuth();

  const [image, setImage] = useState(null)

  const userId = currentUser.uid

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file)
    setImage(base64);
    console.log(base64)
    uploadImageToServer(userId, base64)
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

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      <img src={image}/>

    </div>
  );
}
