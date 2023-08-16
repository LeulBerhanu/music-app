import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongFetch, addSong } from "./Redux/features/songSlice";

function App() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);

  console.log("Songs: ", songs);

  useEffect(() => {
    dispatch(getSongFetch());
  }, [dispatch]);

  function handleAdd() {
    dispatch(addSong({ title: "newSong" }));
  }

  return (
    <div>
      <h1>music app</h1>
      {songs.map((song) => (
        <div key={song.id}>{song.title}</div>
      ))}

      <button onClick={() => handleAdd()}>click to add</button>
    </div>
  );
}

export default App;
