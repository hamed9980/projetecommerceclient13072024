import React from "react";
import { Link, useLocation } from "react-router-dom";
import './multistep.css'
const Progress = () => {
  
  const { pathname } = useLocation();
  const isFirstStep = pathname === "/first";
  const isSecondStep = pathname === "/second";

  return (
    <React.Fragment>
      <div className="steps multistep">
        <div className={`${isFirstStep ? "step active" : "step"}`}>
          <div>1</div>
          <div>{isSecondStep ? <Link to="/first">Step 1</Link> : "Step 1"}</div>
        </div>
        <div className={`${isSecondStep ? "step active" : "step"}`}>
          <div>2</div>
          <div>Step 2</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Progress;
