import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const loading_wave_animation = keyframes`
  0% {
    height: 10px;
  }

  50% {
    height: 50px;
  }

  100% {
    height: 10px;
  }
`;

const Wave = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  div {
    width: 20px;
    height: 10px;
    margin: 0 5px;
    background-color: #3498db;
    border-radius: 5px;
    animation: ${loading_wave_animation} 1s ease-in-out infinite;
  }

  div:nth-child(2) {
    animation-delay: 0.1s;
  }

  div:nth-child(3) {
    animation-delay: 0.2s;
  }

  div:nth-child(4) {
    animation-delay: 0.3s;
  }
`;

function WaveBars() {
  return (
    <Wave>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Wave>
  );
}

export default WaveBars;
