import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { PiMusicNoteFill } from "react-icons/pi";
import { AiOutlineLinkedin } from "react-icons/ai";

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

const ProfileLink = styled.a`
  color: white;
  font-size: 3rem;
  transition: 0.1s;

  &:hover {
    color: #47698c;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <h1>
        <PiMusicNoteFill />
        MUSICA
      </h1>
      <ProfileLink href="https://www.linkedin.com/in/leul-berhanu/">
        <AiOutlineLinkedin />
      </ProfileLink>
    </StyledHeader>
  );
}

export default Header;
