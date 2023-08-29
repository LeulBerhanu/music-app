import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch, updateSongFetch } from "../Redux/features/songSlice";
import axios from "axios";
import { background, color } from "styled-system";
import { BsFileEarmarkImage } from "react-icons/bs";
import { MdAudioFile } from "react-icons/md";
import ProgressBar from "../Components/loaders/ProgressBar";
import theme from "../theme/theme";

const EditPageHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CardBody = styled.div`
  width: 100%;
  margin-top: 20px;

  input {
    margin-left: 10px;
    font-size: 1.8rem;
    border: none;
    transition: 0.2s;

    &:focus {
      border-bottom: 0.5px solid #fff;
    }
  }
`;

const Image = styled.img`
  box-shadow: 0 0 50px 0 #00000050;
  width: 300px;
  height: 300px;
  object-fit: contain;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 50px 0 ${theme.background.primary_light};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s;
  padding: 10px;

  label {
    opacity: 0.8;
    transition: 0.2s;
  }

  &:hover {
    background: ${theme.background.primary_light};
    border-radius: 10px;
  }

  &:hover label {
    opacity: 1;
    color: ${theme.background.secondary};
    cursor: pointer;
  }
`;

const StyledFileInput = styled.label`
  ${color}
  /* ${background} */
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s;
  text-transform: capitalize;
  position: relative;
  margin-top: 10px;

  input[type="file"] {
    display: none;
  }
  > :first-of-type {
    margin-right: 10px;
  }
  &:hover {
    opacity: 0.8;
    background: #2b2b2b;
  }
`;

const SubmitButton = styled.button`
  ${color}
  ${background}
  font-size: 1.8rem;
`;

const UploadButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

function UpdateSongPage() {
  const { songId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);
  const song = songs.find((song) => song.id === songId);

  const loading = useSelector((state) => state.songs.isLoading);
  const [uploading, setUploading] = useState({ image: false, audio: false });

  const initialState = {
    title: song?.title,
    artist: song?.artist,
    avatar: song?.avatar,
    audio: song?.audio,
  };

  const [data, setData] = useState(initialState);

  useEffect(() => {
    dispatch(getSongsFetch());
  }, []);

  useEffect(() => {
    setData(initialState);
  }, [song]);

  function handleTitleChange(value) {
    setData((prev) => ({ ...prev, title: value }));
  }

  function handleArtistChange(value) {
    setData((prev) => ({ ...prev, artist: value }));
  }

  function handleAvatarChange(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ozdawca4");

    try {
      setUploading((prev) => ({ ...prev, image: true }));
      axios
        .post("https://api.cloudinary.com/v1_1/dqqtrkjtr/image/upload", data)
        .then((res) => res.data)
        .then((data) => {
          setData((prevData) => ({
            ...prevData,
            avatar: {
              url: data.url,
              original_filename: data.original_filename,
              format: data.format,
            },
          }));
          setUploading((prev) => ({ ...prev, image: false }));
        });
    } catch (err) {
      console.error("error uploading: ", err);
    }
  }

  function handleAudioChange(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ozdawca4");

    try {
      setUploading((prev) => ({ ...prev, audio: true }));

      axios
        .post("https://api.cloudinary.com/v1_1/dqqtrkjtr/upload", data)
        .then((res) => res.data)
        .then((data) => {
          setData((prevData) => ({
            ...prevData,
            audio: {
              url: data.url,
              original_filename: data.original_filename,
              length: data.duration,
              format: data.format,
              upload_time: data.created_at,
            },
          }));

          setUploading((prev) => ({ ...prev, audio: false }));
        });
    } catch (err) {
      console.error("error uploading: ", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(updateSongFetch({ id: songId, data }));

    navigate("/");
  }

  return loading ? (
    <p>loading</p>
  ) : (
    <>
      <EditPageHeader>
        <p>
          <Link to="..">back</Link>
        </p>
        <h1>Edit song</h1>
      </EditPageHeader>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Image src={data.avatar?.url} alt="" />

          <CardBody>
            <InputContainer>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                required
                type="text"
                value={data.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="artist">Artist:</label>
              <input
                id="artist"
                required
                type="text"
                value={data.artist || ""}
                onChange={(e) => handleArtistChange(e.target.value)}
              />
            </InputContainer>

            <StyledFileInput color={"white"} background={"secondary"}>
              <BsFileEarmarkImage />
              Change Cover Image
              <input
                type="file"
                onChange={(e) => handleAvatarChange(e.target.files[0])}
              />
              <div>{uploading.image ? <ProgressBar /> : null}</div>
            </StyledFileInput>

            <StyledFileInput color={"white"} background={"secondary"}>
              <MdAudioFile />
              Change Audio
              <input
                type="file"
                onChange={(e) => handleAudioChange(e.target.files[0])}
              />
              <div>{uploading.audio ? "uploading" : null}</div>
            </StyledFileInput>

            <audio src={data.audio?.url} controls></audio>
          </CardBody>
        </Card>

        <SubmitButton type="submit" color={"white"} background={"secondary"}>
          update
        </SubmitButton>
      </Form>
    </>
  );
}

export default UpdateSongPage;
