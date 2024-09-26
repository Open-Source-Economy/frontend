import React, { useEffect } from "react"; // Importing React and the useEffect hook
import AOS from "aos"; // Importing the AOS (Animate On Scroll) library for animations
import "aos/dist/aos.css"; // Importing AOS CSS for animation styling
import sec2icon1 from "../../../../../../assets/sec2img.png";
import sec2icon2 from "../../../../../../assets/sec2img3.png";
import sec2icon3 from "../../../../../../assets/sec2img2.png";
import startimg from "../../../../../../assets/star.png";
import "./Sec2.css";
import { Link } from "react-router-dom";

const Sec2 = () => {
  // Defining the Sec2 functional component
  useEffect(() => {
    // Using the useEffect hook to initialize AOS after the component mounts
    AOS.init({
      // Initializing AOS with specific options
      duration: 1000, // Setting the animation duration to 1000ms (1 second)
      once: true, // Enabling animations to occur only once while scrolling down
      mirror: false, // Disabling animations when scrolling past elements in reverse
    });
  }, []); // Empty dependency array to ensure the effect runs only once after initial render

  return (
      <div className="container mt-5" style={{ zIndex: 99 }}>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <div
              className="box px-md-5 py-md-5 px-md-5 px-4 py-4 d-flex flex-column gap-5 flex-sm-row align-items-center box1"
              data-aos="fade-left" // Applying fade-left animation on scroll
              data-aos-delay="0" // No delay for the first box animation
          >
            <div>
              <h1 className="boxh1-text">Get Paid</h1>
              <h2 className="boxh2-text mt-3">
                {" "}
                Stop begging for donations! <br /> Fund your future. Have a Say
              </h2>
              <Link to={"/developer"}>
                <button className="mt-4 btn-1 px-3 py-3">DEVELOPERS</button>{" "}
              </Link>
            </div>
            <div className="position-relative">
              <img className="boximg h-100" src={sec2icon1} alt="Get Paid Icon" />{" "}
              <div className="starimg">
                <img src={startimg} alt="" />
              </div>
            </div>
          </div>
          {/* Second Box */}
          <div
              className="box px-md-5 py-md-5 px-md-5 px-4 py-4 d-flex flex-column gap-4 flex-sm-row align-items-center box2"
              data-aos="fade-left" // Applying fade-left animation on scroll
              data-aos-delay="200" // 200ms delay for the second box animation
          >
            <div>
              <h1 className="boxh1-text">Get Support</h1>
              <h2 className="mt-3 boxh2-text">
                {" "}
                Forget the far west! Secure your <br /> platform, secure your business.
              </h2>
              <Link to={'/user'}>
                <button className="mt-3 btn-2 px-3 py-3">
                  OPEN SOURCE USERS
                </button>{" "}
              </Link>
              {/* Button with padding and margin-top */}
            </div>
            <div className="position-relative">
              <img src={sec2icon2} className="boximg" alt="Get Support Icon" />{" "}
              <div className="starimg3">
                <img src={startimg} alt="" />
              </div>
            </div>
          </div>
          {/* Third Box */}
          <div
              className="box3 box px-md-5 py-md-5 px-md-5 px-4 py-4 d-flex flex-column gap-0 flex-sm-row align-items-center"
              data-aos="fade-left" // Applying fade-left animation on scroll
              data-aos-delay="400" // 400ms delay for the third box animation
          >
            <div className="text-content">
              <h1 className="boxh1-text">Get a Stake</h1>
              <h2 className="mt-3 boxh2-text">
                Support, invest, or donate in <br /> projects to get a part of its{" "}
                <br />
                business, governance, and ecosystem.
              </h2>
            </div>
            <div className="image-content position-relative">
              <img src={sec2icon3} className="boximg " alt="Get a Stake Icon" />{" "}
              <div className="starimg2">
                <img src={startimg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Sec2; // Exporting the Sec2 component as the default export
