import React from "react";
import { useSelector } from "react-redux";

function Footer() {
  const selectedSong = useSelector((state) => state.songs.selectedSong);
  console.log(selectedSong);

  return (
    <div>
      <audio src={selectedSong?.audio?.url} controls></audio>
    </div>
  );
}

export default Footer;
