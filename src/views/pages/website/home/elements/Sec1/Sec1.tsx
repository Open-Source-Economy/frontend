import React, { useEffect } from "react"; // Importing React and the useEffect hook for side effects
import AOS from "aos"; // Importing the AOS (Animate On Scroll) library for animations
import "aos/dist/aos.css"; // Importing the AOS CSS file for animation styling
import "./Sec1.css"; // Importing custom CSS specific to this component
import img from "src/assets/Frame.svg";
import { ButtonType, LinkButton } from "src/components";
import { Audience } from "src/views";

const Sec1 = () => {
  // Defining the Sec1 functional component
  useEffect(() => {
    // Using the useEffect hook to perform a side effect after the component mounts
    AOS.init({
      // Initializing AOS with specific options
      duration: 1000, // Setting the duration of animations to 1000ms (1 second)
      once: false, // Allowing animations to happen more than once during scrolling
      mirror: false, // Disabling animations when scrolling past elements in reverse
    });
  }, []); // Empty dependency array to ensure the effect runs only once after initial render

  return (
    <div className="sec_1" data-aos="fade-right">
      <div className="d-flex flex-wrap align-items-center">
        <div className="col-lg-6">
          <h1 className="sec1-h1 text-slate-600">
            Building the <br /> foundation of <br /> open source 3.0
          </h1>
          <div className="mt-3">
            <LinkButton
              to="/issues"
              buttonProps={{
                type: ButtonType.PRIMARY,
                audience: Audience.ALL,
                holder: "GET STARTED",
              }}
            />
          </div>
        </div>
        <div className="col-lg-6 mt-4 mt-md-0 sec1img">
          <img src={img} className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Sec1; // Exporting the Sec1 component as the default export
