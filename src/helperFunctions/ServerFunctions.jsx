export async function addNewUser(userId) {
  const res = await fetch("http://localhost:5000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userId,
      colors: ["none", "none", "none", "none"],
    }),
  });
  console.log(res);
}

export async function updateArrayOnServer(userId, playerColorArray) {
  try {
    const res = await fetch("http://localhost:5000/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        colors: playerColorArray,
      }),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function loadArrayFromServer(userId) {
  const res = await fetch("http://localhost:5000/byId/" + userId);
  const data = await res.json();
  return data.colors;
}


export async function uploadImageToServer(userId, imgBase64) {
  try {
    const res = await fetch("http://localhost:5000/upload", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        image: imgBase64
      }),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function loadImageFromServer(userId) {
  const res = await fetch("http://localhost:5000/byId/" + userId);
  const data = await res.json();
  return data.image;
}





