import React from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const StyledLayout = styled.div`
  display: grid;
  grid-template-rows: 50px 100vh 60px;
  min-height: 100vh;
`;

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Outlet />
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
