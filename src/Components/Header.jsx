import { useState } from "react";
import AddSongForm from "../Components/AddSongForm";
import styled from "@emotion/styled";
import { layout, background } from "styled-system";
import theme from "../theme/theme";
import { useSelector } from "react-redux";

const AddForm = styled.div`
  ${layout}
`;

const StyledHeader = styled.header`
  ${background}
  height: 150px;
  border-radius: 0 0 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AddButton = styled.button`
  ${background}
  border-radius: 30px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px 15px;
  transition: 0.2s;

  &:hover {
    background: #584ed8;

    &::after {
      content: "+";
      margin-left: 10px;
    }
  }
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 5rem;
`;

function Header() {
  const [addClicked, setAddClicked] = useState(false);
  const isEditMode = useSelector((state) => state.editMode.value);

  function handleClick() {
    setAddClicked(true);
  }

  return (
    <StyledHeader background="primary_dark">
      <Logo>MUSICA</Logo>
      <AddButton background="secondary" onClick={() => handleClick()}>
        Add a song
      </AddButton>
      <AddForm display={addClicked || isEditMode ? "unset" : "none"}>
        <AddSongForm setAddClicked={setAddClicked} />
      </AddForm>
    </StyledHeader>
  );
}

export default Header;
