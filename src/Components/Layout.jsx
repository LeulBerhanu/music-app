import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Main from "./Main";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
