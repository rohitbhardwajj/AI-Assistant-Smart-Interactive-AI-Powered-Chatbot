import React from "react";
import Spline from "@splinetool/react-spline";

const App = () => {
  return (
    <div className="al">
      <div className="h1"> <h1 className="r">I'm Chitti Your Advance Ai Assistance</h1></div>
      <div className="button"><button>Click-Here</button></div>
      <div  style={{ width: "100vw", height: "100vh",zIndex:"100" }}>
        <Spline scene="https://prod.spline.design/7r54cNUtHw3xgy8u/scene.splinecode" />
      </div>
    </div>
    
  );
};

export default App;
