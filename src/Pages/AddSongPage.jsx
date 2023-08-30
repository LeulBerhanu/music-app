import React, { useState } from "react";
import { color, width } from "styled-system";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { addSong } from "../Redux/features/songSlice";
import { v4 as UUID } from "uuid";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import * as Style from "../Components/styles/FormStyles";
import { BsFileEarmarkImage } from "react-icons/bs";
import { MdAudioFile } from "react-icons/md";
import LoaderBars from "../Components/loaders/LoaderBars";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

function AddSongPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState({ image: false, audio: false });

  const [data, setData] = useState({
    title: "",
    artist: "",
    avatar: {},
    audio: {},
  });
  console.log("data", data);

  function handleTitleChange(value) {
    setData((prevData) => ({
      ...prevData,
      title: value,
    }));
  }

  function handleArtistChange(value) {
    setData((prevData) => ({
      ...prevData,
      artist: value,
    }));
  }

  function handleImageUpload(file) {
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

  function handleAudioUpload(file) {
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

    dispatch(addSong({ id: UUID(), ...data }));

    navigate("/");
  }

  return (
    <>
      <p>
        <Link to="..">back</Link>
      </p>
      <h1>Add song</h1>

      <StyledForm onSubmit={handleSubmit}>
        <Style.InputContainer>
          <label htmlFor="title">Title: </label>
          <Style.Input
            required
            type="text"
            value={data.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            id="title"
          />
        </Style.InputContainer>

        <Style.InputContainer>
          <label htmlFor="artist">Artist:</label>
          <Style.Input
            required
            type="text"
            value={data.artist}
            onChange={(e) => handleArtistChange(e.target.value)}
            id="artist"
          />
        </Style.InputContainer>

        <Style.FileInput color={"white"} background={"secondary"}>
          <BsFileEarmarkImage />
          Upload Cover Image:
          <input
            required
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          <div>
            {uploading.image ? (
              <LoaderBars />
            ) : (
              <Style.SelectedAvatar color="blue">
                {data.avatar.original_filename
                  ? `${data.avatar?.original_filename}.${data.avatar?.format}`
                  : "No image selected"}
              </Style.SelectedAvatar>
            )}
          </div>
        </Style.FileInput>

        <Style.FileInput>
          <MdAudioFile />
          Upload Audio:
          <input
            required
            accept="audio/*"
            type="file"
            onChange={(e) => handleAudioUpload(e.target.files[0])}
          />
          <div>
            {uploading.audio ? (
              <LoaderBars />
            ) : (
              <Style.SelectedAudio color="blue">
                {data.audio.original_filename
                  ? `${data.audio?.original_filename}.${data.audio?.format}`
                  : "No audio selected"}
              </Style.SelectedAudio>
            )}
          </div>
        </Style.FileInput>

        <button type="submit">Submit</button>
      </StyledForm>
    </>
  );
}

export default AddSongPage;
