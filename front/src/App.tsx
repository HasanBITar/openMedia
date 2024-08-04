import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import VideoLib from "./pages/VideoLib";
import Images from "./pages/Images";
import Music from "./pages/Music";
import Documents from "./pages/Documents";
import VideoPage from "./pages/VideoPage";

import ProtectedRoute from "./store/ProtectedRoute";
import { verifyToken } from "./store/authSlice";
import Random from "./random";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="home" element={<HomePage />} />
            <Route path="videos" element={<VideoLib />} />
            <Route path="videos/:videoId" element={<VideoPage />} />
            <Route path="images" element={<Images />} />
            <Route path="music" element={<Music />} />
            <Route path="documents" element={<Documents />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<404 />} exact /> */}
      </Routes>
    </BrowserRouter>
  );
}

// import Random from './random';
// function App() {
//   return (<Random></Random>)
// }

export default App;
