import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

const StyledMain = styled.main`
  margin: 0 auto;
  padding: 10px;
  padding-top: 75px;

  ${({ theme }) => theme.mediaQueries.ExtraLarge} {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
  }
`;

function Main() {
  return (
    <StyledMain>
      <Outlet />
    </StyledMain>
  );
}

export default Main;
