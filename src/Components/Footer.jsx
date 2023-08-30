import React from "react";
import { useSelector } from "react-redux";

function Footer() {
  const selectedSong = useSelector((state) => state.songs.selectedSong);
  console.log(selectedSong);

  return (
    <footer>
      <audio src={selectedSong?.audio?.url} controls></audio>
    </footer>
  );
}

export default Footer;
