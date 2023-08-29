import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch, selectedSong } from "../Redux/features/songSlice";

function Song({ song }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteSongFetch(id));
  }

  function handleSelect(song) {
    dispatch(selectedSong(song));
  }

  return (
    <li key={song.id}>
      <div onClick={() => handleSelect(song)}>{song.title}</div>
      <Link to={`update-song/${song.id}`}>
        <button>edit</button>
      </Link>
      <button onClick={() => handleDelete(song.id)}>delete</button>
    </li>
  );
}

export default Song;
