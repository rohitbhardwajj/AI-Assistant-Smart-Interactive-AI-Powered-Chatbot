import React, { useContext } from "react";
import Spline from "@splinetool/react-spline";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { DataContext } from "./Context/UserContext"; 

const App = () => {
  const { handleVoiceInteraction, stopAI, isLoading } = useContext(DataContext);

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
            onClick={handleVoiceInteraction}
            className="glow-button"
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner"></div> : "Start Chitti"}
          </button>

          <button
            onClick={stopAI}
            className="glow-button stop-button"
          >
            Stop Chitti
          </button>
        </div>
      </div>
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/7r54cNUtHw3xgy8u/scene.splinecode" />
      </div>
    </div>
  );
};

export default App;
