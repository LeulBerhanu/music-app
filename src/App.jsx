import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import Layout from "./Components/Layout";
import Main from "./Components/Main";
import HomePage from "./Pages/HomePage";
import AddSongPage from "./Pages/AddSongPage";
import UpdateSongPage from "./Pages/UpdateSongPage";

import theme from "./theme/theme";

const globalStyles = css`
  html {
    font-size: 62.5%;
    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: ${theme.background.gradient};
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
    margin-bottom: 10px;
    color: ${theme.colors.white};
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
