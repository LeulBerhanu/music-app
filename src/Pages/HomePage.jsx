import React from "react";

import { Link } from "react-router-dom";
import Songs from "../Components/Songs";
import { useSelector } from "react-redux";

function HomePage() {
  const selectedSong = useSelector((state) => state.songs.selectedSong);

  return (
    <>
      <Songs />

      <Link to="/add-song">add song</Link>
    </>
  );
}

export default HomePage;
