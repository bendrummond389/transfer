import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from './AuthContext'
import { loadArrayFromServer, updateArrayOnServer } from '../helperFunctions/ServerFunctions'

const PlayerColorContext = createContext();

export function usePlayerColor() {
  return useContext(PlayerColorContext);
}

export function PlayerColorProvider({ children }) {
  const { currentUser } = useAuth();
  const [playerColorArray, setPlayerColorArray] = useState([]);
  const [loading, setloading] = useState(true);

  function getColorFromArray(index) {
    return playerColorArray[index];
  }

  function updateColorInArray(index, color) {
    let tempArray = [...playerColorArray];
    tempArray[index] = color;
    setPlayerColorArray(tempArray);
    console.log(playerColorArray, index)
    updateArrayOnServer(currentUser.uid, tempArray)
  }

  const value = {
    playerColorArray,
    getColorFromArray,
    updateColorInArray,
    setPlayerColorArray,
  };


  useEffect(() => {
    const loadInit = async () =>{
      const array = await loadArrayFromServer(currentUser.uid)
      setPlayerColorArray(array)
      setloading(false)
    }
    loadInit()

  }, [])
  

  return (
    <PlayerColorContext.Provider value={value}>
      {!loading && children}
    </PlayerColorContext.Provider>
  );
}
