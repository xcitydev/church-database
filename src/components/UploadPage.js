import React, { useState } from "react";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { getStorage } from "firebase/storage";
import { collection, addDoc, getDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Typewriter from "typewriter-effect/dist/core";
import { CircularProgress } from "@mui/material";
function UploadPage() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const [doc, setDoc] = useState([]);
  const [percent, setPercent] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [documentFileName, setDocumentFileName] = useState("");
  const [hrefTag, setHrefTag] = useState("");
  const [newFile, setNewFile] = useState("");
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
          .then(
            (url) => setDownloadUrl(url),
            document.getElementById("uplo").classList.add("hidden"),
            document.getElementById("datab").classList.remove("hidden")
          )
          .catch((err) => console.log(err));
      }
    );
  };
  const uploadFireStore = async () => {
    if (downloadUrl) {
      try {
        const docRef = await addDoc(collection(db, "documents"), {
          documentName: documentFileName.toLowerCase(),
          documentUrl: downloadUrl,
        });
        console.log(docRef.id);
        document.getElementById("datab").innerHTML = "All Done";
        document.getElementById("datab").disabled = true;
      } catch (error) {}
    } else {
      console.log("Not yet");
    }
  };

  const getAllData = async (fileName) => {
    const querySnapshot = await getDocs(collection(db, "documents"));
    querySnapshot.forEach((doc) => {
      let fileinfo = doc.get("documentName");
      if (fileinfo.includes(fileName)) {
        setHrefTag(doc.get("documentUrl"));
        console.log(doc.get("documentUrl"));
        document.getElementById("fileFound").innerHTML = "File Found!";
        document.getElementById("hrefInput").innerHTML = `Download ${doc.get(
          "documentName"
        )} File here`;
        document.getElementById("hrefInput").classList.remove("hidden");
        document.getElementById("hrefInput").href = doc.get("documentUrl");
        return true;
      }
    });
    console.log(hrefTag);
  };
  const idi = document.getElementById("idi");

  const typewriter = new Typewriter(idi, {
    loop: true,
    delay: 75,
  });

  typewriter
    .pauseFor(1000)
    .typeString("Church Of Ascension")
    .pauseFor(2500)
    .deleteChars(19)
    .typeString("In Christ Alone We Trust")
    .pauseFor(1000)
    .start();

  const toggle = () => {
    document.getElementById("searchFile").classList.add("hidden");
    document.getElementById("sgg").classList.add("hidden");
    document.getElementById("sga").classList.remove("hidden");
    document.getElementById("uploadFile").classList.remove("hidden");
  };
  const toggle12 = () => {
    document.getElementById("uploadFile").classList.add("hidden");
    document.getElementById("sga").classList.add("hidden");

    document.getElementById("sgg").classList.remove("hidden");
    document.getElementById("searchFile").classList.remove("hidden");
  };
  return (
    <div>
      <div className=" overflow-hidden w-full h-[100vh] bg-gradient-to-r from-black to-blue-500 flex-col">
        <div id="idi" className="text-center py-28 text-3xl text-white"></div>
        <div>
          <p
            id="searchFile"
            className="text-center text-lg text-white cursor-pointer hover:text-green-400"
            onClick={() => toggle()}
          >
            Look for a file instead?
          </p>
          <p
            id="uploadFile"
            className="text-center text-lg text-white hidden cursor-pointer hover:text-green-400"
            onClick={() => toggle12()}
          >
            Upload a file?
          </p>
        </div>
        <div className="flex justify-center py-2 g" id="sgg">
          <div className="p-4 flex items-center z-10 w-2/3 lg:w-[30%] bg-slate-700 rounded-md shadow-2xl border-cyan-300 border-2 flex-col h-[40vh]">
            <p className="text-white my-6 z-10">Upload Files</p>
            <input
              placeholder="Name of the file"
              onChange={(e) => setDocumentFileName(e.target.value)}
              className="p-1 my-4 z-10 rounded-sm"
            />
            <input
              type="file"
              id="getdoc"
              onChange={(e) => {
                setDoc(e.target.files[0]);
              }}
              className="w-2/3 my-5 z-10"
            />
            <button
              className=" bg-black rounded-lg p-2 text-sm text-white hover:text-green-400"
              onClick={() => uploadFile(doc)}
              id="uplo"
            >
              Upload
            </button>
            <button
              className="z-10 my-2 bg-black rounded-lg p-2 text-sm text-white hidden"
              onClick={() => uploadFireStore()}
              id="datab"
            >
              Upload to DataBase
            </button>
            <p className="text-white">{percent}%</p>
          </div>
        </div>
        <div className=" justify-center py-2 g hidden" id="sga">
          <div className="p-4 flex items-center z-10 w-2/3 lg:w-[30%] bg-slate-700 rounded-md shadow-2xl border-cyan-300 border-2 flex-col h-[40vh]">
            <p className="text-white my-6 z-10 cursor-pointer">
              Search For Files
            </p>
            <input
              placeholder="Name of the file"
              onChange={(e) => setNewFile(e.target.value)}
              className="p-1 my-4 z-10 rounded-sm"
            />
            <div>
              <p id="fileFound" className="text-white"></p>
              <a id="hrefInput" href="#" className="hidden text-white"></a>
            </div>
            <button
              className="z-10 my-2 bg-black rounded-lg p-2 text-sm hover:text-green-400 text-white"
              onClick={() => getAllData(newFile.toLowerCase())}
              id="uplo"
            >
              Find File
            </button>
          </div>
        </div>
      </div>
      {/* <input
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
      <button onClick={() => getAllData()}>Get all data</button>
      <p>{percent} "% done"</p>
      <a id="hrefInput" href="#">
        Download File here
      </a> */}
    </div>
  );
}

export default UploadPage;
