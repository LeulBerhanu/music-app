import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch, selectedSong } from "../Redux/features/songSlice";
import styled from "@emotion/styled";
import theme from "../theme/theme";

const ListedSong = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: ${theme.background.primary_light};
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 5px;
`;

const LeftColumn = styled.div`
  display: flex;
  align-items: center;

  > :first-of-type {
    margin-right: 10px;
  }
`;

const Title = styled.p`
  font-weight: 500;
`;

const Artist = styled.p`
  font-size: 1.4rem;
  opacity: 0.5;
`;

function Song({ song }) {
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteSongFetch(id));
  }

  function handleSelect(song) {
    dispatch(selectedSong(song));
  }

  return (
    <ListedSong key={song.id}>
      <LeftColumn>
        <Avatar src={song?.avatar?.url} />
        <div>
          <Title onClick={() => handleSelect(song)}>{song.title}</Title>
          <Artist>{song.artist}</Artist>
        </div>
      </LeftColumn>
      <div>
        <Link to={`update-song/${song.id}`}>
          <button>edit</button>
        </Link>
        <button onClick={() => handleDelete(song.id)}>delete</button>
      </div>
    </ListedSong>
  );
}

export default Song;
