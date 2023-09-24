import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const CenterOfPage = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
  gap: 20px;

  h1 {
    font-size: 10rem;
  }

  h2 {
    font-size: 3rem;
  }
`;

function NotFoundPage() {
  return (
    <CenterOfPage>
      <h1>404</h1>
      <h2>Page Not Found!</h2>
      <Link to="/">Back to home page</Link>
    </CenterOfPage>
  );
}

export default NotFoundPage;
