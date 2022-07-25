import React, { useState } from "react";
import "../App.css";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import picture1 from "../assets/pic.jpg";
import { getStorage } from "firebase/storage";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function FirstTab() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCTWFd8FcL3qJXGG2P-T79ivAhW6CdC4og",
    authDomain: "churchdocs-79e0d.firebaseapp.com",
    projectId: "churchdocs-79e0d",
    storageBucket: "churchdocs-79e0d.appspot.com",
    messagingSenderId: "1096538489264",
    appId: "1:1096538489264:web:3a7b5ff56d3aab103dd675",
    measurementId: "G-SNV7W190JQ",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const [doc, setDoc] = useState([]);
  const [percent, setPercent] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [documentFileName, setDocumentFileName] = useState("");
  const [hrefTag, setHrefTag] = useState("");
  const db = getFirestore(app);

  const uploadFile = async (file) => {
    console.log(file.name);
    const storageRef = ref(storage, `files/${file.name}`);
    const upload = uploadBytesResumable(storageRef, file);

    upload.on(
      "state_changed",
      (snapshot) => {
        const percentOfUpload = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percentOfUpload);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(upload.snapshot.ref)
          .then((url) => setDownloadUrl(url))
          .catch((err) => console.log(err));
      }
    );
  };
  const uploadFireStore = async () => {
    if (downloadUrl) {
      try {
        const docRef = await addDoc(collection(db, "documents"), {
          documentName: documentFileName,
          documentUrl: downloadUrl,
        });
        console.log(docRef.id);
      } catch (error) {}
    } else {
      console.log("Not yet");
    }
  };

  const getAllData = async () => {
    const querySnapshot = await getDocs(collection(db, "documents"));
    querySnapshot.forEach((doc) => {
      if (doc.get("documentName").includes("Rich")) {
        setHrefTag(doc.get("documentUrl"));
        console.log(doc.get("documentUrl"));
        document.getElementById("hrefInput").href = doc.get("documentUrl");
        return true;
      }
    });
    console.log(hrefTag);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter file Name"
        onChange={(e) => setDocumentFileName(e.target.value)}
      />
      <input
        type="file"
        id="getdoc"
        onChange={(e) => {
          setDoc(e.target.files[0]);
        }}
      />
      <button onClick={() => uploadFile(doc)}>Upload to Firebase</button>
      <button className="m-2" onClick={() => uploadFireStore()}>
        Upload to Firestore
      </button>
      <p>{percent} "% done"</p>
      <a id="hrefInput" href="#">
        Download File here
      </a>{" "}
    </div>
  );
}

export default FirstTab;
