import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const spin_animation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }

`;

const Loader = styled.div`
  > {
    /* border: 4px solid rgba(0, 0, 0, 0.1); */
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: transparent;
    border-radius: 50%;
  }

  > {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
  }

  > {
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
    animation: ${spin_animation} 1s linear infinite;
  }
`;

function LoaderSpinner() {
  return <Loader></Loader>;
}

export default LoaderSpinner;
