import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch, updateSongFetch } from "../Redux/features/songSlice";
import { BsFileEarmarkImage } from "react-icons/bs";
import { MdAudioFile } from "react-icons/md";
import ProgressBar from "../Components/loaders/ProgressBar";
import LoaderBars from "../Components/loaders/LoaderBars";
import * as Style from "../Components/styles/FormStyles";

const EditPageHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
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
      <Style.Form onSubmit={handleSubmit}>
        <Style.Card>
          <Style.Image src={data.avatar?.url} alt="" />

          <Style.CardBody>
            <Style.InputContainer>
              <label htmlFor="title">Title: </label>
              <Style.Input
                id="title"
                required
                type="text"
                value={data.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </Style.InputContainer>

            <Style.InputContainer>
              <label htmlFor="artist">Artist:</label>
              <Style.Input
                id="artist"
                required
                type="text"
                value={data.artist || ""}
                onChange={(e) => handleArtistChange(e.target.value)}
              />
            </Style.InputContainer>

            <Style.FileInput color={"white"} background={"secondary"}>
              <BsFileEarmarkImage />
              Change Cover Image:
              <input
                type="file"
                onChange={(e) => handleAvatarChange(e.target.files[0])}
              />
              <div>
                {uploading.image ? (
                  <LoaderBars />
                ) : (
                  <Style.SelectedAvatar color="blue">
                    {data.avatar?.original_filename}.{data.avatar?.format}
                  </Style.SelectedAvatar>
                )}
              </div>
            </Style.FileInput>

            <Style.FileInput color={"white"} background={"secondary"}>
              <MdAudioFile />
              Change Audio:
              <input
                type="file"
                onChange={(e) => handleAudioChange(e.target.files[0])}
              />
              <div>
                {uploading.audio ? (
                  <LoaderBars />
                ) : (
                  <Style.SelectedAudio color="blue">
                    {data.audio?.original_filename}.{data.audio?.format}
                  </Style.SelectedAudio>
                )}
              </div>
            </Style.FileInput>

            {/* <audio src={data.audio?.url} controls></audio> */}
          </Style.CardBody>
        </Style.Card>

        <Style.SubmitButton
          type="submit"
          color={"white"}
          background={"secondary"}
        >
          update
        </Style.SubmitButton>
      </Style.Form>
    </>
  );
}

export default UpdateSongPage;
