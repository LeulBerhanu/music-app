import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { color, layout, space } from "styled-system";
import { addSong } from "../Redux/features/songSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

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
`;

const Form = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;

  > input {
    border: none;
    border-bottom: 1px solid #000;
    margin-bottom: 15px;
    outline: none;
  }
`;

const FormHeader = styled.header`
  display: flex;
  justify-content: space-between;

  > button {
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: red;
    }
  }
`;

function AddSongForm({ setAddClicked, setImage }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [avatar, setAvatar] = useState({});

  const [imageSelected, setImageSelected] = useState("");

  const data = {
    title,
    artist,
    avatar,
  };

  function handleAdd() {
    dispatch(addSong({ id: uuid(), ...data }));
    setTitle("");
    setArtist("");
    setAddClicked(false);
  }

  // const handleImageUpload = (event) => {
  //   const image = event.target.files[0];

  //   // setImage(URL.createObjectURL(image));
  //   // setAvatar(URL.createObjectURL(image));
  // };

  async function handleUpload() {
    const data = new FormData();
    data.append("file", imageSelected);
    data.append("upload_preset", "ozdawca4");

    try {
      axios
        .post("https://api.cloudinary.com/v1_1/dqqtrkjtr/image/upload", data)
        .then((res) => res.data)
        .then((data) => setAvatar(data.url));
      // .then((data) => console.log(data));
    } catch (err) {
      console.error("error uploading: ", err);
    }
  }

  return (
    <FormContainer>
      <Form>
        <FormHeader>
          <div>add form</div>
          <button onClick={() => setAddClicked(false)} color="secondary">
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
        <input
          type="file"
          accept=".jpeg, .png"
          onChange={(e) => setImageSelected(e.target.files[0])}
        />
        <button onClick={handleUpload}>upload</button>
        <button onClick={() => handleAdd()}>add</button>
      </Form>
    </FormContainer>
  );
}

export default AddSongForm;
