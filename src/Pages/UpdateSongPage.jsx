import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch, updateSongFetch } from "../Redux/features/songSlice";
import { BsFileEarmarkImage, BsChevronLeft } from "react-icons/bs";
import { MdAudioFile } from "react-icons/md";
import LoaderBars from "../Components/loaders/LoaderBars";
import * as Style from "../Components/styles/FormStyles";
import LoadingBar from "../Components/loaders/LoadingBar";
import formValidation from "../utils/formValidation";

const BackBtn = styled(Link)`
  color: #fff;
`;

function UpdateSongPage() {
  useEffect(() => {
    dispatch(getSongsFetch());
  }, []);

  const { songId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.value);
  console.log(songs);
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

  const [errors, setErrors] = useState({});

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

    const errorValidation = formValidation(data);
    setErrors(errorValidation);

    if (Object.keys(errorValidation).length === 0) {
      dispatch(updateSongFetch({ id: songId, data }));
      navigate("/");
    }
  }

  return loading ? (
    <LoadingBar />
  ) : (
    <>
      <Style.PageHeader>
        <BackBtn to="..">
          <BsChevronLeft />
        </BackBtn>
        <h2>Edit song</h2>
      </Style.PageHeader>
      <Style.Form onSubmit={handleSubmit}>
        <Style.Card>
          <Style.Image src={data.avatar?.url} alt="" />

          <Style.CardBody>
            <Style.InputContainer>
              <label htmlFor="title">Title: </label>
              <Style.Input
                maxLength={40}
                id="title"
                type="text"
                value={data.title || ""}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </Style.InputContainer>
            {errors?.title ? (
              <Style.ValidationErrorMsg>
                * Title is required
              </Style.ValidationErrorMsg>
            ) : null}

            <Style.InputContainer>
              <label htmlFor="artist">Artist:</label>
              <Style.Input
                maxLength={40}
                id="artist"
                type="text"
                value={data.artist || ""}
                onChange={(e) => handleArtistChange(e.target.value)}
              />
            </Style.InputContainer>
            {errors?.artist ? (
              <Style.ValidationErrorMsg>
                * Artist is required
              </Style.ValidationErrorMsg>
            ) : null}

            <Style.FileInput color="white" background="primary_light">
              <BsFileEarmarkImage />
              Change Cover Image:
              <input
                type="file"
                accept="image/*"
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
            {errors?.avatar ? (
              <Style.ValidationErrorMsg>
                * Avatar is required
              </Style.ValidationErrorMsg>
            ) : null}

            <Style.FileInput color="white" background="primary_light">
              <MdAudioFile />
              Change Audio:
              <input
                type="file"
                accept="audio/*"
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
          </Style.CardBody>
        </Style.Card>
        {errors?.audio ? (
          <Style.ValidationErrorMsg>
            * Audio is required
          </Style.ValidationErrorMsg>
        ) : null}

        <Style.SubmitButton type="submit" color="white" background="secondary">
          update
        </Style.SubmitButton>
      </Style.Form>
    </>
  );
}

export default UpdateSongPage;
