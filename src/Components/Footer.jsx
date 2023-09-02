import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Player from "./AudioPlayer";

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  > :first-of-type {
    margin-right: 15px;
  }
`;

const PlayingSong = styled.div`
  padding: 10px 0 0 10px;
  position: absolute;
  color: #000;
  /* max-width: 220px; */
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  bottom: 60px;
  background: #fff;

  &:hover {
    overflow: visible;
  }
`;

const Title = styled.p`
  font-weight: 500;
`;

const Artist = styled.p`
  font-size: 1.4rem;
  opacity: 0.5;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  border-radius: 5px;
`;

function Footer() {
  const selectedSong = useSelector((state) => state.songs.selectedSong);

  return (
    <StyledFooter>
      <PlayingSong>
        <Container>
          {selectedSong ? <Avatar src={selectedSong.avatar?.url} /> : null}
          <div>
            <Title>{selectedSong?.title}</Title>
            <Artist>{selectedSong?.artist}</Artist>
          </div>
        </Container>
      </PlayingSong>
      <Player song={selectedSong?.audio?.url} />
    </StyledFooter>
  );
}

export default Footer;
