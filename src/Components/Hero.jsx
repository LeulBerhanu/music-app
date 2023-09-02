import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const HeroSection = styled.section(
  ({ theme }) => css`
    width: 100%;
    height: 200px;
    border-radius: 20px;
    background: linear-gradient(to left, #ffb500, #ffd700);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 50px;
    transition: 0.3s;

    &:hover {
      box-shadow: inset 0 0 30px -5px red;

      img {
        transform: scale(1.2);
      }
    }

    article {
      width: 50%;
      font-size: 3rem;
      font-weight: 800;

      p {
        text-align: center;
        letter-spacing: 3px;
        text-shadow: 2px 2px 4px #00000050;
        z-index: 2;
      }

      span {
        text-transform: uppercase;
        /* color: #0077ff; */
        color: #212121;
      }
    }

    /* media queries */
    ${theme.mediaQueries.small} {
      min-width: 576px;
    }

    ${theme.mediaQueries.large} {
      min-width: 992px;
    }

    ${theme.mediaQueries.ExtraLarge} {
      flex-direction: column;
      min-width: 100%;
      height: 50vh;
      padding: 0;
      padding-top: 50px;
      line-height: 6rem;

      article {
        width: unset;
        font-size: 3rem;
        font-weight: 800;
      }
    }
  `
);

const HeroImg = styled.img`
  width: 180px;
  object-fit: cover;
  position: absolute;
  bottom: 0;
  right: 0;
  transition: 2s ease-out;
`;

function Hero() {
  return (
    <HeroSection>
      <article>
        <p>
          create and share your music with <span>musica</span>
        </p>
      </article>
      <HeroImg src="src/Images/Abel-Makkonen-Tesfaye-PNG-Image.png" alt="" />
    </HeroSection>
  );
}

export default Hero;
