import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const matrix = keyframes`
    
    0% {
      background-position: 0% 100%, 50% 100%, 100% 100%
    }
  
    100% {
      background-position: 0% 0%, 50% 0%, 100% 0%
    }
  
`;

const Loader = styled.div`
  margin-left: 20px;
  width: 40px;
  height: 20px;
  background: linear-gradient(
      #0000 calc(1 * 100% / 6),
      #fff 0 calc(3 * 100% / 6),
      #0000 0
    ),
    linear-gradient(
      #0000 calc(2 * 100% / 6),
      #fff 0 calc(4 * 100% / 6),
      #0000 0
    ),
    linear-gradient(
      #0000 calc(3 * 100% / 6),
      #fff 0 calc(5 * 100% / 6),
      #0000 0
    );
  background-size: 10px 400%;
  background-repeat: no-repeat;
  animation: ${matrix} 1s infinite linear;
`;

function LoaderBars() {
  return <Loader></Loader>;
}

export default LoaderBars;
