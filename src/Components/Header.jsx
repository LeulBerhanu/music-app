import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PiMusicNoteFill } from "react-icons/pi";

const StyledHeader = styled.header(
  ({ theme }) => css`
    background: ${theme.background.primary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;
  `
);

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
