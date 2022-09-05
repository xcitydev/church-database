import storage from "./firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import UploadPage from "./components/UploadPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstTab from "./components/FirstTab";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UploadPage />} />
        <Route exact path="/test" element={<FirstTab />} />
      </Routes>
    </Router>
  );
}

export default App;
