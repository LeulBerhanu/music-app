import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch, selectedSong } from "../Redux/features/songSlice";
import styled from "@emotion/styled";
import theme from "../theme/theme";
import formattedMinutes from "../utils/formattedMinutes";

const ListedSong = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* justify-content: ; */
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;

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
  /* border: 1px solid red; */
  /* width: 50%; */

  > :first-of-type {
    margin-right: 10px;
  }
`;

const MiddleColumn = styled.div`
  justify-self: center;
`;

const RightColumn = styled.div`
  justify-self: end;
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

  function handleSelection(e) {
    dispatch(selectedSong(song));
  }

  function handleStopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <ListedSong key={song.id} onClick={handleSelection}>
      <LeftColumn>
        <Avatar src={song?.avatar?.url} />
        <div>
          <Title>{song.title}</Title>
          <Artist>{song.artist}</Artist>
        </div>
      </LeftColumn>

      <MiddleColumn>{formattedMinutes(song?.audio?.length)}</MiddleColumn>

      <RightColumn>
        <Link to={`update-song/${song.id}`}>
          <button onClick={handleStopPropagation}>edit</button>
        </Link>
        <button onClick={() => handleDelete(song.id)}>delete</button>
      </RightColumn>
    </ListedSong>
  );
}

export default Song;
