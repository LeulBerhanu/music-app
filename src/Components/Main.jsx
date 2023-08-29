import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const StyledMain = styled.main`
  /* border: 1px dashed yellow; */
  /* margin: 10px; */
  padding: 10px;
  /* box-shadow: 0 0 10px 0 #00000050; */
`;

function Main() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}

export default Main;
