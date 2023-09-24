import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import Layout from "./Components/Layout";
import Main from "./Components/Main";
import HomePage from "./Pages/HomePage";
import AddSongPage from "./Pages/AddSongPage";
import UpdateSongPage from "./Pages/UpdateSongPage";
import NotFoundPage from "./Pages/NotFoundPage";

const globalStyles = (theme) => css`
  html {
    font-size: 62.5%;
  }

  * {
    letter-spacing: 0.5px;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    text-transform: capitalize;
  }

  body {
    background: ${theme.background.primary};
    color: ${theme.colors.white};
    min-height: 100vh;
    font-size: 1.6rem;
  }

  input {
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: none;
    padding: 2.5px;
    width: 100%;
    color: ${theme.colors.white};
  }

  button {
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 10px;

    :hover {
      opacity: 0.8;
    }
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Main />}>
            <Route index element={<HomePage />} />
            <Route path="add-song" element={<AddSongPage />} />
            <Route path="update-song/:songId" element={<UpdateSongPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
