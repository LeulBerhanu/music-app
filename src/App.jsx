import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import Layout from "./Components/Layout";
import Main from "./Components/Main";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
// import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryContext } from "cloudinary-react";

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
`;

function App() {
  // const cld = new Cloudinary({ cloud: { cloudName: "dqqtrkjtr" } });

  return (
    <>
      {/* <CloudinaryContext cloudName="dqqtrkjtr"> */}
      <Global styles={globalStyles} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Main />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
      {/* </CloudinaryContext> */}
    </>
  );
}

export default App;
