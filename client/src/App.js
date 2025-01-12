import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Form";
import Videos from "./Videos";


function App() {
  const [vid, setVid] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
    .then((response) => response.json())
    .then((data) => {
      setVid(data)
    })
  },[]);

  const addData = (title, url) => {
    let newVideo = {
      //id: Math.floor(Math.random()* 1000000),
      title: title,
      url: url
    };
    vid.push(newVideo);
    setVid([...vid]);
  }

  const removeItem = (item) => {
    const vidId = item.id;
    fetch(`http://127.0.0.1:5000/${vidId}`, {
      method: "delete"
    })
    .then(() => setStatus("Video deleted"));//to use useEffect on this
    const filteredVid = vid.filter(video => video.title !== item.title);
    setVid([...filteredVid]);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Recommendation</h1>
      </header>
      <p>{status}</p>
      <Form addVideos={addData}/>
      <Videos videos={vid} delete={removeItem} />
    </div>
  );
}

export default App;
