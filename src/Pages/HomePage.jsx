import React from "react";
import { Link } from "react-router-dom";
import Songs from "../Components/Songs";

function HomePage() {
  return (
    <>
      <Songs />

      <Link to="/add-song">add song</Link>
    </>
  );
}

export default HomePage;
