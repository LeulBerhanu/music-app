import React from "react";
import { color, background } from "styled-system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Songs from "../Components/Songs";
import theme from "../theme/theme";

const AddButton = styled.button`
  ${color}
  ${background}
  font-size: 1.8rem;
`;

const Bar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  color: white;
  margin: 20px 0;
  transition: 0.2s;

  &:hover {
    background: ${theme.background.primary_light};
  }
`;

function HomePage() {
  return (
    <>
      <Bar>
        <p>sort</p>
        <p>filter</p>
        <Link to="/add-song">
          <AddButton color="white" background="secondary">
            add song +
          </AddButton>
        </Link>
      </Bar>
      <Songs />
    </>
  );
}

export default HomePage;
