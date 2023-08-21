import { useState } from "react";
import styled from "@emotion/styled";
import { color, layout, space } from "styled-system";
import { addSong } from "../Redux/features/songSlice";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

const FormContainer = styled.div`
  ${color}
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
  /* width: 500px; */
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

function AddSongForm({ setAddClicked }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [avatar, setAvatar] = useState(null);

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

  const handleImageUpload = (event) => {
    const image = event.target.files[0];

    setAvatar(URL.createObjectURL(image));
  };

  return (
    <FormContainer>
      <Form>
        <div>add form</div>
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
        <input type="file" accept=".jpeg, .png" onChange={handleImageUpload} />
        <button onClick={() => handleAdd()}>add</button>
      </Form>
    </FormContainer>
  );
}

export default AddSongForm;
