import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./flexboxgrid.css";
import { secondsToMinutes } from "./helpers/functions";

function App() {
  const [loading, setLoading] = useState(true);
  const [videoTime, setVideoTime] = useState(0);
  // const [videoDuration, setVideoDuration] = useSate(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoElement = useRef(null);

  //Says that everything is loaded
  useEffect(() => {
    setLoading(false);
  });

  //Can use custom loader etc..
  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">Loading...</div>
        </div>
      </div>
    );
  }

  const togglePlay = () => {
    if (isVideoPlaying) {
      videoElement.current.pause();
    } else {
      videoElement.current.play();
    }
    setIsVideoPlaying(!isVideoPlaying);
  };

  const timeChangeHandler = () => {
    const time = videoElement.current.currentTime;
    setVideoTime(Math.round(time));
  };

  // const metaDataLoadHandler = () => {
  //   const videoCurrentTime = videoElement.current.currentTime;
  //   setVideoTime(Math.round.videoCurrentTime);
  // }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <video
              ref={videoElement}
              className="video"
              onTimeUpdate={timeChangeHandler}
              // onLoadedMetadata={}
            >
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-2">
            <button onClick={togglePlay}>
              {isVideoPlaying ? "Pause" : "Play"}
            </button>
          </div>
          <div className="col-xs-2">
  {/* <span className="video_time">{secondsToMinutes(videoTime)} / {secondsToMinutes(videoDuration)}</span> */}
  <span className="video_time">{secondsToMinutes(videoTime)}</span>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

/* Todo 
   1. Izveidojam layout
   2. video
   3.video html
   4.Play/pause
   5.laiks
   6.progress
   7. skaņa
   8.fullscreen on/off
*/
