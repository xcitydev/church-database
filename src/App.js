import storage from "./firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import UploadPage from "./components/UploadPage";
function App() {
  return (
    <>
      <UploadPage />
    </>
  );
}

export default App;
