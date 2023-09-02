import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { getSongsFetch } from "../Redux/features/songSlice";
import { MdOutlineAccessTime } from "react-icons/md";
import Song from "./Song";
import { css } from "@emotion/react";

const SongsList = styled.ul`
  display: flex;
  flex-direction: column;
  transition: 0.3s;

  width: 100%;

  ${({ theme }) => theme.mediaQueries.small} {
    min-width: 576px;
  }

  ${({ theme }) => theme.mediaQueries.large} {
    min-width: 992px;
  }

  /* ${({ theme }) => theme.mediaQueries.ExtraLarge} {
    min-width: 1200px;
  } */
`;

const ListHeader = styled.div(
  ({ theme }) => css`
    background: ${theme.background.primary};
    display: grid;
    grid-template-columns: 1fr 30px 50px;
    padding: 0 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ffffff50;
    opacity: 1;
    justify-items: center;
    align-items: center;
    position: sticky;
    top: 60px;
    z-index: 1;

    > p {
      justify-self: start;
    }
  `
);

function Songs() {
  const songs = useSelector((state) => state.songs.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongsFetch());
  }, [dispatch]);

  return (
    <>
      <SongsList>
        <ListHeader>
          <p>Title</p>
          <MdOutlineAccessTime />
        </ListHeader>
        <div>
          {songs.map((song) => (
            <Song key={song.id} song={song} />
          ))}
        </div>
      </SongsList>
    </>
  );
}

export default Songs;
