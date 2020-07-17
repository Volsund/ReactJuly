import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import "./flexboxgrid.css";
import { convertSecondsToMinutes } from "./helpers/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import TimeSlider from "./components/time-slider/time-slider";
import FormComments from "./components/form-comments/form-comments";

function App() {
  const [loading, setLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [volume, setVolume] = useState(0);
  const [videoPosition, setVideoPosition] = useState(0);

  const videoElement = useRef(null);

  useEffect(() => {
    setLoading(false); //ja aizkomentēt, tad varēs redzēt loading
  });

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">Loading ...</div>
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

  const stopVideo = () => {
    togglePlay();
    videoElement.current.currentTime = 0;
  };

  const toggleSound = () => {
    if (isMuted) {
      videoElement.current.volume = 1;
    } else {
      videoElement.current.volume = 0;
    }

    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    videoElement.current.requestFullscreen();
  };

  const timeChangeHandler = () => {
    const videoCurrentTime = videoElement.current.currentTime;
    setVideoTime(Math.round(videoCurrentTime));
  };

  const metadataLoaded = () => {
    const videoDuration = videoElement.current.duration;
    setVideoDuration(Math.round(videoDuration));
  };

  const volumeChangeHandler = (event) => {
    const newVolume = event.target.value / 10;
    setVolume(newVolume);
    videoElement.current.volume = newVolume;
  };

  const playbackChangeHandler = (event) => {
    const newPosition = event.target.value;
    setVideoPosition(newPosition);
    videoElement.current.currentTime = newPosition;
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-xs-9 col-xs-offset-2">
            <video
              ref={videoElement}
              className="video"
              onTimeUpdate={timeChangeHandler}
              onLoadedMetadata={metadataLoaded}
            >
              <source
                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                type="video/mp4"
              ></source>
            </video>
          </div>
        </div>

        <div className="row">
          <div className="col-xs col-xs-offset-2">
            <div className="controls box-row">
              {isVideoPlaying ? (
                <img
                  onClick={togglePlay}
                  src="https://www.svgrepo.com/show/911/pause.svg"
                  alt="Pause"
                  className="control-icon"
                />
              ) : (
                <img
                  onClick={togglePlay}
                  src="https://www.svgrepo.com/show/70480/play-button.svg"
                  alt="Play"
                  className="control-icon"
                />
              )}
            </div>
          </div>

          <div className="col-xs">
            <div className="controls box-row">
              <img
                onClick={stopVideo}
                src="https://www.svgrepo.com/show/62195/stop.svg"
                alt="Stop"
                className="control-icon"
              />
            </div>
          </div>

          <div className="col-xs">
            <div className="controls box-row">
              {isMuted ? (
                <img
                  onClick={toggleSound}
                  src="https://www.svgrepo.com/show/41190/speaker.svg"
                  alt="Sound On"
                  className="control-icon"
                />
              ) : (
                <img
                  onClick={toggleSound}
                  src="https://www.svgrepo.com/show/81515/mute.svg"
                  alt="Sound Off"
                  className="control-icon"
                />
              )}
            </div>
          </div>
          <div className="col-xs">
            <div className="box-row">
              <span className="video_time">
                {convertSecondsToMinutes(videoTime)} |{" "}
                {convertSecondsToMinutes(videoDuration)}
              </span>
            </div>
          </div>

          <div className="col-xs ">
            <div className="controls box-row">
              <img
                onClick={toggleFullscreen}
                src="https://www.svgrepo.com/show/183518/expand-fullscreen.svg"
                alt="Fullscreen"
                className="control-icon"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs col-xs-offset-2 ">
            <div className="slidecontainer">
              <p>Volume</p>
              <input
                type="range"
                min="0"
                max="10"
                id="myRange"
                onChange={volumeChangeHandler}
              />
            </div>
          </div>
          <div className="col-xs col-xs-offset-2 ">
            {/* <div className="slidecontainer">
              <p>Video Playback</p>
              <input
                type="range"
                min="0"
                max={Math.round(videoDuration)}
                value={videoTime}
                id="playbackRange"
                onChange={playbackChangeHandler}
              />
            </div> */}
            <TimeSlider
              videoDuration={videoDuration}
              videoTime={videoTime}
              playbackChangeHandler={playbackChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs col-xs-offset-2 ">
            <FormComments />
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

   9.!Change all icons from npm library. 
      <FontAwesomeIcon icon={faCoffee} />
*/