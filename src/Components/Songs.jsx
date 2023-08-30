import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch } from "../Redux/features/songSlice";
import { MdOutlineAccessTime } from "react-icons/md";
import Song from "./Song";

const SongsList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 55% 30px 1fr;
  padding: 0 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ffffff50;
  opacity: 0.5;
  justify-items: center;

  > p {
    justify-self: start;
  }
`;

function Songs() {
  const songs = useSelector((state) => state.songs.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <>
      <SongsList>
        <ListHeader>
          <p>Title</p>
          <MdOutlineAccessTime />
        </ListHeader>
        <div>
          {songs.map((song) => (
            <Song key={song.id} song={song} />
          ))}
        </div>
      </SongsList>
    </>
  );
}

export default Songs;
