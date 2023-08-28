import styled from "@emotion/styled";
import { color, fontSize, layout, space } from "styled-system";

import { Link } from "react-router-dom";
import Songs

const Song = styled.div`
  ${space}
  ${color}
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  font-size: 1.6rem;

  img {
    margin-right: 15px;
  }

  > :first-child {
    display: flex;
  }

  &:hover {
    cursor: pointer;
    background: #ccc;
  }
`;

const Title = styled.p`
  ${fontSize}
  ${space}
`;

const Artist = Title.withComponent("p");

const ButtonContainer = styled.div`
  display: flex;
  button {
    ${fontSize}
    ${space}
  }
`;

const IconBtn = styled.button`
  ${fontSize}
  ${space}
  background: none;
  border: none;

  &:hover {
    border-bottom: 2px solid #000;
  }
`;

const AddForm = styled.div`
  ${layout}
`;

function HomePage() {
  return (
    <div>
      <Songs />

      <Link to="/add-song">add song</Link>
    </div>
  );
}

export default HomePage;
