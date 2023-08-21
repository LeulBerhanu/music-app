import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { v4 as uuid } from "uuid";
import styled from "@emotion/styled";
import { color, fontSize, layout, space } from "styled-system";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongFetch,
  addSong,
  deleteSongFetch,
  updateSongFetch,
} from "../Redux/features/songSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import AddSongForm from "../Components/AddSongForm";

const Song = styled.div`
  ${space}
  ${color}
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;

  img {
    margin-right: 15px;
  }

  > :first-child {
    display: flex;
  }

  &:hover {
    cursor: pointer;
    background: #ccc;
  }
`;

const Title = styled.p`
  ${fontSize}
  ${space}
`;

const Artist = Title.withComponent("p");

const ButtonContainer = styled.div`
  display: flex;
  button {
    ${fontSize}
    ${space}
  }
`;

const IconBtn = styled.button`
  ${fontSize}
  ${space}
  background: none;
  border: none;

  &:hover {
    border-bottom: 2px solid #000;
  }
`;

const AddForm = styled.div`
  ${layout}
`;

function HomePage() {
  const [addClicked, setAddClicked] = useState(false);

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);

  useEffect(() => {
    dispatch(getSongFetch());
  }, [dispatch]);

  function handleDelete(id) {
    dispatch(deleteSongFetch({ id }));
  }

  function handleUpdate(id, data) {
    dispatch(updateSongFetch({ id, data }));
  }

  function handleClick() {
    setAddClicked(true);
  }

  return (
    <div>
      <h1>music app</h1>
      {songs.map((song) => (
        <Song key={song.id} color="secondary" p={15}>
          <div>
            <img src={song.avatar} width={60} />
            <div>
              <Title fontSize={3}>{song.title}</Title>
              <Artist fontSize={1}>{song.artist}</Artist>
            </div>
          </div>
          <ButtonContainer fontSize={1} px={1}>
            <IconBtn onClick={() => handleUpdate(song.id, { title: "leul" })}>
              <FiEdit2 />
            </IconBtn>
            <IconBtn onClick={() => handleDelete(song.id)}>
              <RiDeleteBin6Line />
            </IconBtn>
          </ButtonContainer>
        </Song>
      ))}

      <button onClick={() => handleClick()}>click to add</button>
      <AddForm display={addClicked ? "unset" : "none"}>
        <AddSongForm setAddClicked={setAddClicked} />
      </AddForm>
    </div>
  );
}

export default HomePage;
