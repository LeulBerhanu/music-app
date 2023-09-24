import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSongFetch, selectedSong } from "../Redux/features/songSlice";
import styled from "@emotion/styled";
import { background, color, display, width } from "styled-system";
import theme from "../theme/theme";
import formattedMinutes from "../utils/formattedMinutes";
import { FiEdit2, FiDelete } from "react-icons/fi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { RiCheckLine } from "react-icons/ri";

const ListedSong = styled.li`
  display: grid;
  grid-template-columns: 1fr 30px 50px;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;

  &:hover {
    ${background}
  }

  ${theme.mediaQueries.large} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
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
  opacity: 0.8;
`;

const RightColumn = styled.div`
  justify-self: end;
`;

const Title = styled.p`
  font-weight: 500;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  ${color}

  &:hover {
    white-space: wrap;
    word-wrap: break-word;
  }

  ${theme.mediaQueries.large} {
    max-width: 400px;
  }
`;

const Artist = styled.p`
  font-size: 1.4rem;
  opacity: 0.5;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    white-space: wrap;
    word-wrap: break-word;
  }

  ${theme.mediaQueries.large} {
    max-width: 400px;
  }
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
      ${background}
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

const Chevron = styled.button`
  ${color}
  background: none;

  &:hover {
    transform: scale(1.5);
  }

  ${(props) => props.theme.mediaQueries.large} {
    display: none;
  }
`;

const ConfirmChoice = styled.button`
  background: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 1.6rem;
  padding: 0;
  width: 78px;
  transition: 0.2s;

  &:hover {
    ${color}
  }
`;

const Confirm = styled.div`
  transition: 0.2s;
  &:hover {
    ${color}
  }
`;

const Cancel = Confirm.withComponent("div");

const ModifyBtns = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.large} {
    display: flex;
    gap: 10px;
  }
`;

function Song({ song }) {
  const selected = useSelector((state) => state.songs.selectedSong);
  const [toggle, setToggle] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(false);

  const dispatch = useDispatch();

  function handleDelete() {
    setDeleteSelected(true);
  }

  function handleConfirmDelete(id) {
    dispatch(deleteSongFetch(id));
  }

  function handleCancelDelete() {
    setDeleteSelected(false);
  }

  function handleSelection() {
    dispatch(selectedSong(song));
  }

  function handleToggle() {
    setToggle(!toggle);
    setDeleteSelected(false);
  }

  return (
    <ListedSong key={song.id} background="primary_light">
      <LeftColumn onClick={handleSelection}>
        <Avatar src={song?.avatar?.url} />
        <div>
          <Title color={selected?.id === song.id ? "#5773ff" : null}>
            {song.title}
          </Title>
          <Artist>{song.artist}</Artist>
        </div>
      </LeftColumn>

      <MiddleColumn onClick={handleSelection}>
        {formattedMinutes(song?.audio?.length)}
      </MiddleColumn>

      <RightColumn>
        <Chevron color="white" onClick={handleToggle}>
          {toggle ? <BsChevronUp /> : <BsChevronDown />}
        </Chevron>

        <ModifyBtns>
          <StyledLink background="secondary" to={`update-song/${song.id}`}>
            <button>
              <FiEdit2 /> edit
            </button>
          </StyledLink>

          {deleteSelected ? (
            <ConfirmChoice background="warning">
              <Confirm
                color="warning"
                onClick={() => handleConfirmDelete(song.id)}
              >
                <RiCheckLine />
              </Confirm>
              <Cancel color="blue" onClick={handleCancelDelete}>
                <RxCross2 />
              </Cancel>
            </ConfirmChoice>
          ) : (
            <DeleteButton
              color="white"
              background="warning"
              onClick={handleDelete}
            >
              <FiDelete />
              delete
            </DeleteButton>
          )}
        </ModifyBtns>
      </RightColumn>

      <Dropdown display={!toggle ? "none" : "flex"}>
        {/* Edit Button */}
        <StyledLink background="secondary" to={`update-song/${song.id}`}>
          <button>
            <FiEdit2 /> edit
          </button>
        </StyledLink>

        {/* Delete Button */}
        {deleteSelected ? (
          <ConfirmChoice background="warning">
            <Confirm
              color="warning"
              onClick={() => handleConfirmDelete(song.id)}
            >
              <RiCheckLine />
            </Confirm>
            <Cancel color="blue" onClick={handleCancelDelete}>
              <RxCross2 />
            </Cancel>
          </ConfirmChoice>
        ) : (
          <DeleteButton
            color="white"
            background="warning"
            onClick={handleDelete}
          >
            <FiDelete />
            delete
          </DeleteButton>
        )}
      </Dropdown>
    </ListedSong>
  );
}

export default Song;
