import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { color, fontSize, space } from "styled-system";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongFetch,
  addSong,
  deleteSongFetch,
  updateSongFetch,
} from "../Redux/features/songSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

const Song = styled.div`
  ${color}
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  ${fontSize}
  ${space}
`;

const Artist = Title.withComponent("p");

const ButtonContainer = styled.div`
  display: flex;
  > {
    border: 2px solid red;
  }
`;

const IconButton = styled.button`
  ${fontSize}
  ${space}
  background: none;
  border: none;
`;

function HomePage() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);

  useEffect(() => {
    dispatch(getSongFetch());
  }, [dispatch]);

  function handleAdd() {
    dispatch(addSong({ id: uuid(), title: "newSong" }));
  }

  function handleDelete(id) {
    dispatch(deleteSongFetch({ id }));
  }

  function handleUpdate(id, data) {
    dispatch(updateSongFetch({ id, data }));
  }

  return (
    <div>
      <h1>music app</h1>
      {songs.map((song) => (
        <Song key={song.id} color="secondary">
          <img src={song.avatar} width={60} />
          <div>
            <Title fontSize={3}>{song.title}</Title>
            <Artist fontSize={0}>{song.artist}</Artist>
          </div>
          <ButtonContainer>
            <IconButton
              onClick={() => handleUpdate(song.id, { title: "leul" })}
            >
              <FiEdit2 />
            </IconButton>
            <IconButton onClick={() => handleDelete(song.id)}>
              <RiDeleteBin6Line />
            </IconButton>
          </ButtonContainer>
        </Song>
      ))}

      <button onClick={() => handleAdd()}>click to add</button>
    </div>
  );
}

export default HomePage;
