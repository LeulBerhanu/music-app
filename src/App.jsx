import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongFetch,
  addSong,
  deleteSongFetch,
  deleteSongSuccess,
} from "./Redux/features/songSlice";

function App() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);

  console.log("Songs: ", songs);

  useEffect(() => {
    dispatch(getSongFetch());
  }, [dispatch]);

  function handleAdd() {
    dispatch(addSong({ id: uuid(), title: "newSong" }));
  }

  function handleDelete(id) {
    dispatch(deleteSongFetch({ id: id }));
  }

  return (
    <div>
      <h1>music app</h1>
      {songs.map((song) => (
        <div key={song.id}>
          <div>{song.title}</div>
          <button onClick={() => handleDelete(song.id)}>delete</button>
        </div>
      ))}

      <button onClick={() => handleAdd()}>click to add</button>
    </div>
  );
}

export default App;
