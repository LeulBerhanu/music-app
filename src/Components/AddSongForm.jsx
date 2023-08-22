import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { color, layout, space, background } from "styled-system";
import { addSong, updateSongFetch } from "../Redux/features/songSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { RxCross2 } from "react-icons/rx";
import { MdDone, MdAudioFile, MdAudiotrack } from "react-icons/md";
import { BsFileEarmarkImage } from "react-icons/bs";

import ProgressBar from "./loaders/ProgressBar";
import axios from "axios";
import theme from "../theme/theme";
import { offEditMode } from "../Redux/features/editModeSlice";

const FormContainer = styled.div`
  position: fixed;
  background: #00000050;
  padding: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-content: center;
  text-transform: capitalize;

  * {
    font-size: 1.8rem;
  }
`;

const Form = styled.div`
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  > input {
    padding: 10px;
    border: none;
    border-bottom: 1px solid #000;
    margin-bottom: 30px;
    outline: none;
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const FormHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;

  > * {
    font-size: 2.2rem;
  }

  > button {
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: red;
    }
  }
`;

const Button = styled.button`
  background: ${theme.background.secondary};
  cursor: pointer;
  border-radius: 30px;
  border: none;
  padding: 10px;
  font-size: 2.2rem;
  text-transform: uppercase;
  width: 200px;
  transition: 0.2s;
  color: #fff;
  margin: 0 auto;
  margin-top: 40px;

  :disabled {
    color: #ccc;
    background: #2f2f2f;
    cursor: unset;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const StyledFileInput = styled.label`
  ${color}
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: ${theme.background.secondary};
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 30px;
  transition: 0.2s;
  text-transform: capitalize;
  position: relative;

  /* &::after {
    content: "image uploaded";
    position: absolute;
    bottom: -20px;
    font-size: 1.5rem;
    color: ${theme.colors.secondary};
  } */

  input[type="file"] {
    display: none;
  }

  > :first-of-type {
    margin-right: 10px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

function AddSongForm({ setAddClicked }) {
  const dispatch = useDispatch();
  const isEditMode = useSelector((state) => state.editMode);

  console.log(isEditMode);

  const [title, setTitle] = useState(
    isEditMode.value ? isEditMode.song.title : ""
  );
  const [artist, setArtist] = useState(
    isEditMode.value ? isEditMode.song.artist : ""
  );
  const [avatar, setAvatar] = useState({
    avatar_data: {},
    uploading: false,
    isUploaded: false,
  });
  const [audio, setAudio] = useState({
    audio_data: {},
    uploading: false,
    isUploaded: false,
  });
  const [allUploaded, setAllUploaded] = useState(false);

  // TODO: remove the if statement and check ...
  useEffect(() => {
    if (audio.isUploaded && avatar.isUploaded) {
      setAllUploaded(audio.isUploaded && avatar.isUploaded ? true : false);
    }
  }, [audio.isUploaded, avatar.isUploaded]);

  // TODO: change avatar to avatar: avatar.avatar_data
  const data = {
    title,
    artist,
    avatar,
    audio,
  };

  function handleAddOrEdit() {
    isEditMode
      ? dispatch(updateSongFetch({ id, data }))
      : dispatch(addSong({ id: uuid(), ...data }));

    setTitle("");
    setArtist("");
    setAvatar({ avatar: null, uploading: false, isUploaded: false });
    setAudio({ audio: null, uploading: false, isUploaded: false });
    setAllUploaded(false);
    setAddClicked(false);
  }

  function handleImageUpload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ozdawca4");

    try {
      setAvatar((prev) => ({ ...prev, uploading: true, isUploaded: false }));
      axios
        .post("https://api.cloudinary.com/v1_1/dqqtrkjtr/image/upload", data)
        .then((res) => res.data)
        .then((data) => {
          setArtist(data.original_filename);
          return setAvatar({
            avatar_data: {
              url: data.url,
              original_filename: data.original_filename,
              format: data.format,
            },
            uploading: false,
            isUploaded: true,
          });
        });
    } catch (err) {
      console.error("error uploading: ", err);
      setAvatar((prev) => ({ ...prev, uploading: false }));
    }
  }

  function handleAudioUpload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ozdawca4");

    try {
      setAudio((prev) => ({ ...prev, uploading: true, isUploaded: false }));
      axios
        .post("https://api.cloudinary.com/v1_1/dqqtrkjtr/upload", data)
        .then((res) => res.data)
        .then((data) => {
          setTitle(data.original_filename);
          return setAudio({
            audio_data: {
              url: data.url,
              original_filename: data.original_filename,
              length: data.duration,
              format: data.format,
              upload_time: data.created_at,
            },
            uploading: false,
            isUploaded: true,
          });
        });
    } catch (err) {
      console.error("error uploading: ", err);
      setAudio((prev) => ({ ...prev, uploading: false }));
    }
  }

  return (
    <FormContainer>
      <Form>
        <FormHeader>
          <div>{isEditMode ? "edit song" : "add a song"}</div>
          <button
            onClick={() => {
              setAddClicked(false);
              dispatch(offEditMode());
            }}
            color="secondary"
          >
            <RxCross2 />
          </button>
        </FormHeader>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />

        <StyledFileInput color={avatar.isUploaded ? "lightGreen" : "#fff"}>
          <BsFileEarmarkImage />
          Upload cover image
          <input
            type="file"
            accept=".jpeg, .png"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {avatar.uploading ? <ProgressBar /> : null}
        </StyledFileInput>

        <StyledFileInput color={audio.isUploaded ? "lightGreen" : "#fff"}>
          <MdAudioFile />
          Upload audio
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleAudioUpload(e.target.files[0])}
          />
          {audio.uploading ? <ProgressBar /> : null}
        </StyledFileInput>

        <Button
          onClick={() => handleAddOrEdit()}
          disabled={allUploaded ? false : true}
        >
          {isEditMode ? "Edit" : "submit"}
        </Button>
        {/* TODO: Error message when trying to submit */}
      </Form>
    </FormContainer>
  );
}

export default AddSongForm;
