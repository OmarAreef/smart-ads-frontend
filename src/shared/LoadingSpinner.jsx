import React, { useEffect } from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  useEffect(() => console.log(props), []);
  return (
    <>
      <div className={`${props.asOverlay && "loading-spinner__overlay d-flex flex-column"}`}>
        {props.campaignImage && (
          <>
            <h1 className="display-2 fs-5 overlay-title text-center">
              {" "}
              We are detecting the area of the text in the advertisement <br />
              This could take from a few seconds to 2-3 minutes depending on the
              Image.
            </h1>
            <br />
          </>
        )}
        <div className="lds-dual-ring"></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
