import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import AOS from "aos"; // Importing the AOS (Animate On Scroll) library for animations
import "aos/dist/aos.css"; // Importing AOS CSS for animation styling
import "./sec_4.css"; // Importing custom CSS specific to this component
import vector from "src/assets/playbtn.svg";
import hover from "src/assets/playbtnhover.png";
import videoimg from "src/assets/videoframe_16852.png"; // Importing the video thumbnail image asset

// Array of video data, including video source URLs and alt text for thumbnails
const videoData = [
  {
    id: 1,
    src: "https://videos.pexels.com/video-files/2278095/2278095-sd_640_360_30fps.mp4",
    alt: "Video Thumbnail 1",
  },
  {
    id: 2,
    src: "https://videos.pexels.com/video-files/2278095/2278095-sd_640_360_30fps.mp4",
    alt: "Video Thumbnail 2",
  },
  {
    id: 3,
    src: "https://videos.pexels.com/video-files/2278095/2278095-sd_640_360_30fps.mp4",
    alt: "Video Thumbnail 3",
  },
];

const Sec4 = () => {
  // Defining the Sec4 functional component
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null); // State to track the currently playing video ID

  const handlePlayClick = (id: number) => {
    // Function to handle play button click
    setPlayingVideoId(id); // Set the state to the ID of the video to be played
    const video = document.getElementById(`myVideo-${id}`); // Get the video element by its ID
    if (video) {
      // @ts-ignore
      video.play(); // Play the video
    }
  };

  useEffect(() => {
    // Using the useEffect hook to initialize AOS after the component mounts
    AOS.init({
      // Initializing AOS with specific options
      duration: 1000, // Setting the animation duration to 1000ms (1 second)
      once: false, // Allowing animations to occur multiple times while scrolling
      mirror: true, // Allowing elements to animate out while scrolling past them
    });
  }, []); // Empty dependency array to ensure the effect runs only once after initial render

  return (
    <div className="container mt-4 mt-md-0 pt-3 sec_4">
      {" "}
      <h1 className="texth1">Dig into the details</h1>{" "}
      <div className="bgimage">
        {" "}
        <div className="sec_4box d-flex align-items-center justify-content-center gap-5 flex-wrap">
          {" "}
          {videoData.map(
            (
              video,
              index, // Mapping over video data to create video boxes
            ) => (
              <div
                key={video.id} // Unique key for each video box
                className="d-flex align-items-center justify-content-center"
                data-aos="fade-right" // Applying fade-right animation on scroll
                data-aos-delay={index * 200} // Staggered delay for each video box
              >
                <div className="position-relative videobox px-3 py-3">
                  {" "}
                  {playingVideoId !== video.id && ( // Conditionally rendering the video thumbnail if the video is not playing
                    <img className="video-img" src={videoimg} alt={video.alt} onClick={() => handlePlayClick(video.id)} />
                  )}
                  <div className={`overlay ${playingVideoId === video.id ? "hide" : ""}`}></div>
                  <video
                    id={`myVideo-${video.id}`} // Unique ID for each video element
                    className={`videohide ${
                      playingVideoId === video.id ? "show" : "" // Conditional class for hiding/showing video
                    }`}
                    width="300px"
                    height="auto"
                    controls
                    playsInline
                  >
                    <source src={video.src} /> {/* Video source URL */}
                  </video>
                  {playingVideoId !== video.id && ( // Conditionally rendering the play button if the video is not playing
                    <div
                      className="videoplaybtn"
                      onClick={() => handlePlayClick(video.id)} // Click event to handle video play
                    >
                      <button className="playbtn">
                        <img src={vector} className="playbtn" alt="Play Button" /> <img src={hover} className="sec3play" alt="Play Button" />{" "}
                        {/* Alt text for the play button image */}
                      </button>
                    </div>
                  )}
                  <h1 className="mt-3 video-h1-text">New video youtube</h1> <h2 className="my-3 video-h2-text">READ MORE</h2>{" "}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Sec4; // Exporting the Sec4 component as the default export
