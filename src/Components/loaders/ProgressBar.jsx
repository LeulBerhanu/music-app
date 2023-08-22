import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const moving = keyframes`
    50% {
    width: 100%;
  }

  100% {
    width: 0;
    right: 0;
    left: unset;
  }
`;

const Loader = styled.div`
  display: block;
  --height-of-loader: 4px;
  --loader-color: #fff;
  width: 90%;
  height: var(--height-of-loader);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: 4px;

  &::before {
    content: "";
    position: absolute;
    background: var(--loader-color);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: ${moving} 1s ease-in-out infinite;
  }
`;

function ProgressBar() {
  return <Loader></Loader>;
}

export default ProgressBar;
