import { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
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
import formattedMinutes from "../utils/formattedMinutes";
import AddSongForm from "../Components/AddSongForm";
import { onEditMode, offEditMode } from "../Redux/features/editModeSlice";

const Song = styled.div`
  ${space}
  ${color}
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  font-size: 1.6rem;

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
  const [selectedAudio, setSelectedAudio] = useState({});
  // const [editMode, setEditMode] = useState({ id: null, editing: true });

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);
  const isEditMode = useSelector((state) => state.editMode.value);

  useEffect(() => {
    dispatch(getSongFetch());
  }, [dispatch]);

  function handleDelete(id) {
    dispatch(deleteSongFetch({ id }));
  }

  function handleUpdate(song) {
    dispatch(onEditMode(song));
    // dispatch(updateSongFetch({ id, data }));
  }

  // TODO: stylese while on play, pause
  // TODO: notification when upload is done

  return (
    <div>
      {songs.map((song) => (
        <Song
          key={song.id}
          color="secondary"
          p={15}
          onClick={() => setSelectedAudio(song.audio.audio_data.url)}
        >
          <div>
            <img src={song.avatar.avatar_data.url} width={60} />
            <div>
              <Title fontSize={3}>{song.title}</Title>
              <Artist fontSize={1}>{song.artist}</Artist>
            </div>
          </div>

          <p>{formattedMinutes(song.audio.audio_data.length)}</p>

          <ButtonContainer fontSize={1} px={1}>
            <IconBtn onClick={() => handleUpdate(song)}>
              <FiEdit2 />
            </IconBtn>

            <IconBtn onClick={() => handleDelete(song.id)}>
              <RiDeleteBin6Line />
            </IconBtn>
          </ButtonContainer>
        </Song>
      ))}

      <audio controls src={selectedAudio}>
        Your browser does not support the audio element.
      </audio>

      {/* <AddForm display={editMode.editing ? "unset" : "none"}>
        <AddSongForm editMode={editMode} setEditMode={setEditMode} />
      </AddForm> */}
    </div>
  );
}

export default HomePage;
