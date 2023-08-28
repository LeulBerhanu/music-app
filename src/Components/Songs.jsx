import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch } from "../Redux/features/songSlice";

function Songs({ song }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteSongFetch(id));
  }

  return (
    <li key={song.id}>
      {song.title}{" "}
      <Link to={`update-song/${song.id}`}>
        <button>edit</button>
      </Link>
      <button onClick={() => handleDelete(song.id)}>delete</button>
    </li>
  );
}

export default Songs;
