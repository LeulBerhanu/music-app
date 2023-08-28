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
    font-family: poppins, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: ${theme.background.primary};
    color: ${theme.colors.secondary};
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
