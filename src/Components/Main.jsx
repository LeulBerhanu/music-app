import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <h1>main</h1>
      <Outlet />
    </>
  );
}

export default Main;
