import React from "react";
import { color, background } from "styled-system";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Songs from "../Components/Songs";
import Hero from "../Components/Hero";

const HomePageLayout = styled.div`
  ${({ theme }) => theme.mediaQueries.ExtraLarge} {
    display: grid;
    grid-template-columns: 350px 1fr;
    gap: 40px;
  }
`;

const AddButton = styled.button`
  ${color}
  ${background}
  font-size: 1.8rem;
  width: 300px;
`;

const Bar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 20px;
  color: white;
  margin: 20px 0;
  transition: 0.2s;
  /* &:hover {
    ${background}
  } */
`;

function HomePage() {
  return (
    <HomePageLayout>
      <div>
        <Hero />
        <Bar>
          {/* <button>sort</button>
        <button>filter</button> */}
          <Link to="/add-song">
            <AddButton color="white" background="secondary">
              add song +
            </AddButton>
          </Link>
        </Bar>
      </div>
      <Songs />
    </HomePageLayout>
  );
}

export default HomePage;
