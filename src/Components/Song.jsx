import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch, selectedSong } from "../Redux/features/songSlice";
import styled from "@emotion/styled";
import { background, color, display } from "styled-system";
import theme from "../theme/theme";
import formattedMinutes from "../utils/formattedMinutes";
import { FiEdit2, FiDelete } from "react-icons/fi";

const ListedSong = styled.li`
  display: grid;
  grid-template-columns: 55% 30px 1fr;
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

  > :first-of-type {
    margin-right: 15px;
  }
`;

const MiddleColumn = styled.div`
  justify-self: end;
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

const StyledLink = styled(Link)`
  text-decoration: none;

  button {
    display: flex;
    gap: 5px;
    align-items: center;
    text-decoration: none;
    color: ${theme.colors.white};
    background: none;

    &:hover {
      background: ${theme.background.secondary};
      opacity: 1;
    }
  }
`;

const Dropdown = styled.div`
  ${display}
  ${background}
  margin-top: 5px;
  border-top: 1px solid #ffffff25;
  grid-column: span 3;
  padding: 5px;
  gap: 10px;
  justify-content: end;
  border-radius: 0 0 20px 20px;
`;

const DeleteButton = styled.button`
  ${color}
  display: flex;
  gap: 5px;
  align-items: center;
  background: none;
  &:hover {
    ${background}
    opacity: 1;
  }
`;

function Song({ song }) {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteSongFetch(id));
  }

  function handleSelection() {
    dispatch(selectedSong(song));
  }

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <ListedSong key={song.id}>
      <LeftColumn onClick={handleSelection}>
        <Avatar src={song?.avatar?.url} />
        <div>
          <Title>{song.title}</Title>
          <Artist>{song.artist}</Artist>
        </div>
      </LeftColumn>

      <MiddleColumn onClick={handleSelection}>
        {formattedMinutes(song?.audio?.length)}
      </MiddleColumn>

      <RightColumn>
        <button onClick={handleToggle}>click</button>
      </RightColumn>

      <Dropdown display={!toggle ? "none" : "flex"}>
        <StyledLink to={`update-song/${song.id}`}>
          <button>
            <FiEdit2 /> edit
          </button>
        </StyledLink>
        <DeleteButton
          color="white"
          background="warning"
          onClick={() => handleDelete(song.id)}
        >
          <FiDelete />
          delete
        </DeleteButton>
      </Dropdown>
    </ListedSong>
  );
}

export default Song;
