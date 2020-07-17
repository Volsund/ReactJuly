import React, { useState, useRef, useEffect } from "react";
import "./time-slider.scss";

const TimeSlider = ({ videoDuration, videoTime, playbackChangeHandler }) => {
  return (
    <div className="slidecontainer">
      <p>Video Playback</p>
      <input
        type="range"
        min="0"
        max={Math.round(videoDuration)}
        value={videoTime}
        id="playbackRange"
        onChange={playbackChangeHandler}
      />
    </div>
  );
};

export default TimeSlider;
