import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch, selectedSong } from "../Redux/features/songSlice";
import styled from "@emotion/styled";

const ListedSong = styled.li`
  display: flex;
  justify-content: space-between;
  /* gap: 50px; */
  padding: 10px;
  border: 1px dashed red;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const LeftColumn = styled.div`
  display: flex;
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
          <p onClick={() => handleSelect(song)}>{song.title}</p>
          <p>{song.artist}</p>
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
