import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongFetch } from "./Redux/features/songSlice";

function App() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);

  console.log("Songs: ", songs);

  useEffect(() => {
    dispatch(getSongFetch());
  }, [dispatch]);

  return (
    <div>
      <h1>you better work</h1>
      {songs.map((song, idx) => (
        <div key={idx}>{song.title}</div>
      ))}
    </div>
  );
}

export default App;
