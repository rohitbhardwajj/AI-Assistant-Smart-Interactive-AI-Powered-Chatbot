import React, { useContext } from "react";
import Spline from "@splinetool/react-spline";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { DataContext } from "./Context/UserContext"; // Correct Import

const App = () => {
  // Use Context Correctly
  const { recognition, isLoading } = useContext(DataContext); // Added isLoading

  const [text] = useTypewriter({
    words: ["Your Advanced AI Assistant", "a creation of Rohit Bhardwaj"],
    loop: true,
    typeSpeed: 100,
  });

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <h1 className="title">
            I'm Chitti, <span>{text}</span> <Cursor />
          </h1>
          <p className="subtitle">Ready to assist you with anything!</p>
        </div>
        <div className="button-container">
          <button
            onClick={() => recognition.start()}
            className="glow-button"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <div className="spinner"></div> // Show spinner when loading
            ) : (
              "Click Here"
            )}
          </button>
        </div>
      </div>

      {/* ✅ Spline Robot Added Back */}
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/7r54cNUtHw3xgy8u/scene.splinecode" />
      </div>
    </div>
  );
};

export default App;