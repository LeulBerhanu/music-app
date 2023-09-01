import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function Player({ song }) {
  return (
    <>
      <AudioPlayer
        layout="horizontal-reverse"
        controls
        src={song}
        customAdditionalControls={[]}
      />
    </>
  );
}

export default Player;
