import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch, updateSongFetch } from "../Redux/features/songSlice";
import axios from "axios";

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
  /* border: 1px solid red; */
`;

const CardBody = styled.div`
  width: 100%;
  margin-top: 20px;

  > * {
    margin-bottom: 20px;
  }

  input {
    margin-left: 10px;
  }
`;

const Image = styled.img`
  /* border: 1px solid #fff; */
  border-radius: 20px;
  box-shadow: 0 0 50px 0 #00000050;
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

const InputContainer = styled.div`
  display: flex;
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
      <p>
        <Link to="..">back</Link>
      </p>
      <Form onSubmit={handleSubmit}>
        <Card>
          <Image src={data.avatar?.url} alt="" />

          <CardBody>
            <InputContainer>
              <p>Title</p>
              <input
                required
                type="text"
                value={data.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <p>Artist</p>
              <input
                required
                type="text"
                value={data.artist || ""}
                onChange={(e) => handleArtistChange(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <p>change cover image</p>
              <input
                type="file"
                onChange={(e) => handleAvatarChange(e.target.files[0])}
              />
              <div>{uploading.image ? "uploading" : null}</div>
            </InputContainer>

            <InputContainer>
              <p>change audio</p>
              <input
                type="file"
                onChange={(e) => handleAudioChange(e.target.files[0])}
              />
              <div>{uploading.audio ? "uploading" : null}</div>
            </InputContainer>
            <audio src={data.audio?.url} controls></audio>
          </CardBody>
        </Card>

        <button type="submit">update</button>
      </Form>
    </>
  );
}

export default UpdateSongPage;
