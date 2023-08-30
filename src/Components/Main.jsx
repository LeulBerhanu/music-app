import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const StyledMain = styled.main`
  padding: 10px;
`;

function Main() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}

export default Main;
