import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import AOS from "aos"; // Importing the AOS (Animate On Scroll) library for animations
import "aos/dist/aos.css"; // Importing AOS CSS for animation styling
import "./Sec3.css"; // Importing custom CSS specific to this component
import vector from "../../../../../../assets/playbtn.svg"
import hover from "../../../../../../assets/playbtnhover.png"
import videoimg from "../../../../../../assets/videoframe_16852.png";

const Sec3 = () => {
  // Defining the Sec3 functional component
  const [isPlaying, setIsPlaying] = useState(false); // State to track whether the video is playing or not

  const handlePlayClick = () => {
    // Function to handle play button click
    setIsPlaying(true); // Set the state to indicate video is playing
    const video = document.getElementById("myVideo"); // Get the video element by its ID
    video.play(); // Play the video
  };

  useEffect(() => {
    // Using the useEffect hook to initialize AOS after the component mounts
    AOS.init({
      // Initializing AOS with specific options
      duration: 1000, // Setting the animation duration to 1000ms (1 second)
      once: false, // Allowing animations to occur multiple times while scrolling
      mirror: false, // Disabling animations when scrolling past elements in reverse
    });
  }, []); // Empty dependency array to ensure the effect runs only once after initial render

  return (
      <div
          className="container mt-md-5 pt-3 pt-md-5 mt-4 sec_3"
          data-aos="zoom-in" // Applying zoom-in animation on scroll
      >
        <div className="sec_4box">
          {" "}

          <div
              id="video_play"
              className={`video_play ${isPlaying ? "videoshow" : ""}`} // Conditional class for showing video
          >
            <div className="d-flex align-items-center ">
              {" "}

              <div className="position-relative sec3videobox px-3 py-3">
                {" "}

                {!isPlaying && ( // Conditionally rendering the video thumbnail if not playing
                    <img
                        className="sec3video-img"
                        src={videoimg}
                        onClick={handlePlayClick}
                        alt="Video Thumbnail"
                    />
                )}
                <video
                    id="myVideo"
                    className={`videohide ${isPlaying ? "show" : ""}`} // Conditional class for hiding/showing video
                    width="100%"
                    height="auto%"
                    controls
                    playsInline
                >
                  <source src="https://media.istockphoto.com/id/1046965704/video/programming-source-code-abstract-background.mp4?s=mp4-640x640-is&k=20&c=E7PGx6e2DxpcNqp2SaN6Q9JaJ4A5OdBTp7ldtgLX_RE=" />{" "}
                  {/* Video source URL */}
                </video>
                {!isPlaying && ( // Conditionally rendering the play button if not playing
                    <div className="secvideoplaybtn"  onClick={handlePlayClick}>
                      {" "}
                      {/* Play button container with click event */}
                      <button className="sec3playbtn">
                        <img src={vector} className="playbtn" alt="Play Button" />{" "}
                        <img src={hover} className="sec3play" alt="Play Button" />{" "}
                        {/* Alt text for the play button image */}
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
