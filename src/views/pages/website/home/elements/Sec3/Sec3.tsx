import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import AOS from "aos"; // Importing the AOS (Animate On Scroll) library for animations
import "aos/dist/aos.css"; // Importing AOS CSS for animation styling
import "./Sec3.css"; // Importing custom CSS specific to this component
import vector from "src/assets/playbtn.svg";
import hover from "src/assets/playbtnhover.png";
import videoimg from "src/assets/videoframe_16852.png";

const Sec3 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <div className="container mt-md-5 pt-3 pt-md-5 mt-4 sec_3" data-aos="zoom-in">
      <div className="sec_4box">
        <div id="video_play" className={`video_play ${isPlaying ? "videoshow" : ""}`}>
          <div className="d-flex align-items-center">
            <div className="position-relative sec3videobox px-3 py-3">
              {!isPlaying && <img className="sec3video-img" src={videoimg} onClick={handlePlayClick} alt="Video Thumbnail" />}
              {isPlaying && (
                <iframe
                  id="myVideo"
                  width={"100%"}
                  height={"500px"}
                  className="show"
                  src="https://www.youtube.com/embed/PbtRZ-ML9DI?autoplay=1&si=DqkUXy0pYtmmgEnf"
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              {!isPlaying && (
                <div className="secvideoplaybtn" onClick={handlePlayClick}>
                  <button className="sec3playbtn">
                    <img src={vector} className="playbtn" alt="Play Button" />
                    <img src={hover} className="sec3play" alt="Play Button" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sec3; // Exporting the Sec3 component as the default export
