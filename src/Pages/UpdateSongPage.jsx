import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch, updateSongFetch } from "../Redux/features/songSlice";
import axios from "axios";

function UpdateSongPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { songId } = useParams();
  const songs = useSelector((state) => state.songs.value);
  const loading = useSelector((state) => state.songs.isLoading);

  const [uploading, setUploading] = useState({ image: false, audio: false });

  const song = songs.find((song) => song.id === songId);

  const [data, setData] = useState({
    title: song?.title,
    avatar: song?.avatar,
    audio: song?.audio,
  });

  useEffect(() => {
    dispatch(getSongsFetch());
  }, []);

  useEffect(() => {
    song
      ? setData({ title: song.title, avatar: song.avatar, audio: song.audio })
      : null;
  }, [song]);

  function handleTitleChange(value) {
    setData((prev) => ({ ...prev, title: value }));
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
    <form onSubmit={handleSubmit}>
      <p>
        <Link to="..">back</Link>
      </p>
      <input
        required
        type="text"
        value={data.title || ""}
        onChange={(e) => handleTitleChange(e.target.value)}
      />

      <img src={data.avatar?.url} alt="" />
      <input
        type="file"
        onChange={(e) => handleAvatarChange(e.target.files[0])}
      />
      <div>{uploading.image ? "uploading" : null}</div>

      <div>
        <audio src={data.audio?.url} controls></audio>
        <p>change audio</p>
        <input
          type="file"
          onChange={(e) => handleAudioChange(e.target.files[0])}
        />
      </div>
      <div>{uploading.audio ? "uploading" : null}</div>

      <button type="submit">update</button>
    </form>
  );
}

export default UpdateSongPage;
