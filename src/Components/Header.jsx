import React from "react";
import styled from "@emotion/styled";
import { PiMusicNoteFill } from "react-icons/pi";
import theme from "../theme/theme";

const StyledHeader = styled.header`
  height: 100%;
  /* box-shadow: 0 0 20px -10px #cccccc50; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

function Header() {
  return (
    <StyledHeader>
      <h1>
        <PiMusicNoteFill />
        MUSICA
      </h1>
    </StyledHeader>
  );
}

export default Header;
