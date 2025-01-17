// @ts-nocheck

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
import ImageLib from "./pages/ImageLib";
import AudioLib from "./pages/AudioLib";
import Documents from "./pages/Documents";
import VideoPage from "./pages/VideoPage";
import LoadingPage from "./pages/LoadingPage";
import SettingsPage from "./pages/SettingsPage";
import ImageViewer from "./components/viewers/ImageViewer";
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
            <Route path="images" element={<ImageLib />} />
            <Route path="music" element={<AudioLib />} />
            {/* <Route path="documents" element={<Documents />} /> */}
            <Route path="settings" element={<SettingsPage />} />
            <Route path="groups" element={<SettingsPage />} />
            <Route path="groups/:groupId" element={<SettingsPage />} />
            <Route path="tags" element={<SettingsPage />} />
            <Route path="permissions" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/random" element={<LoadingPage />} />
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
