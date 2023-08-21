import { useState } from "react";
import AddSongForm from "../Components/AddSongForm";
import styled from "@emotion/styled";
import { layout } from "styled-system";
import theme from "../theme/theme";

const AddForm = styled.div`
  ${layout}
`;

const StyledHeader = styled.header`
  background: #ccc;
  height: 150px;
`;

const AddButton = styled.button`
  background: ${theme.colors.secondary};
  border-radius: 30px;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 2rem;
  padding: 10px 15px;
  transition: 0.2s;

  &:hover {
    background: #1c72b3;

    &::after {
      content: "+";
      margin-left: 10px;
    }
  }
`;

const Logo = styled.h1`
  font-size: 5rem;
`;

function Header() {
  const [addClicked, setAddClicked] = useState(false);

  function handleClick() {
    setAddClicked(true);
  }

  return (
    <StyledHeader>
      <Logo>MUSICA</Logo>
      <AddButton onClick={() => handleClick()}>Add a song</AddButton>
      <AddForm display={addClicked ? "unset" : "none"}>
        <AddSongForm setAddClicked={setAddClicked} />
      </AddForm>
    </StyledHeader>
  );
}

export default Header;
