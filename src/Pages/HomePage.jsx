import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { color, fontSize, layout, space } from "styled-system";
import { useSpring, animated, useTransition } from "react-spring";

import { Link } from "react-router-dom";
import Songs from "../Components/Songs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { selectedSong } from "../Redux/features/songSlice";
import { useState } from "react";

const Song = styled.div`
  background: #191929;
  ${space}
  ${color}
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  font-size: 1.6rem;

  img {
    margin-right: 15px;
  }

  > :first-child {
    display: flex;
  }

  &:hover {
    cursor: pointer;
    background: #ccc;
  }
`;

const Title = styled.p`
  ${fontSize}
  ${space}
`;

const Artist = Title.withComponent("p");

const ButtonContainer = styled.div`
  display: flex;
  button {
    ${fontSize}
    ${space}
  }
`;

const IconBtn = styled.button`
  ${fontSize}
  ${space}
  background: none;
  border: none;

  &:hover {
    border-bottom: 2px solid #000;
  }
`;

const AddForm = styled.div`
  ${layout}
`;

function HomePage() {
  const selectedSong = useSelector((state) => state.songs.selectedSong);

  return (
    <>
      <Songs />

      <Link to="/add-song">add song</Link>
    </>
  );
}

export default HomePage;
