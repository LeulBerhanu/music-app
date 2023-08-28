import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../Redux/features/songSlice";
import { v4 as UUID } from "uuid";
import axios from "axios";
import { Link } from "react-router-dom";

function AddSongPage() {
  const dispatch = useDispatch();

  const [uploading, setUploading] = useState({ image: false, audio: false });

  const [data, setData] = useState({
    title: "",
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <Link to="..">back</Link>
      </p>
      <p>add song</p>
      <label>
        Title:{" "}
        <input
          required
          type="text"
          value={data.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </label>
      {/* 
      <label>
        Artist: <input type="text" />
      </label> */}
      <input
        required
        type="file"
        // accept=".jpg .png"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />
      <p>{uploading.image ? "uploading" : null}</p>

      <div>
        <p>upload audio</p>
        <input
          required
          type="file"
          onChange={(e) => handleAudioUpload(e.target.files[0])}
        />
      </div>
      <p>{uploading.audio ? "uploading" : null}</p>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddSongPage;
