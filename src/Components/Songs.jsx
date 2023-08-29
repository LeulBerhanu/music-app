import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch } from "../Redux/features/songSlice";
import Song from "./Song";

const SongsList = styled.ul`
  display: flex;
  flex-direction: column;
  /* list-style: decimal-leading-zero; */
  /* list-style-type: decimal; */
  list-style-type: disc;
  list-style-position: outside;
  list-style-image: none; /* Reset the default image if needed */
`;

function Songs() {
  const songs = useSelector((state) => state.songs.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <SongsList>
      {songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </SongsList>
  );
}

export default Songs;
