import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch } from "../Redux/features/songSlice";
import Song from "./Song";

function Songs() {
  const songs = useSelector((state) => state.songs.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <ul>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </ul>
  );
}

export default Songs;
