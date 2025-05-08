import React from "react";
import { useState } from "react";
import "./loader.css";
function Loader() {
  let [loading, setLoading] = useState(true);
  return (
    <div className="centered">
      <div className="🤚">
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="👉"></div>
        <div className="🌴"></div>
        <div className="👍"></div>
      </div>
    </div>
  );
}

export default Loader;
