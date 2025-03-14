import { useEffect, useState } from "react";
import { BookACallButton } from "../elements/BookACallButton";

const BackToTop = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const [, setShowScrollTop] = useState(false);

  // USE EFFECT HOOK TO TRACK SCROLL POSITION
  useEffect(() => {
    const handleScroll = () => {
      setScrollValue(window.scrollY); // SET SCROLL POSITION ON SCROLL
    };
    // ADD SCROLL EVENT LISTENER
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // USE EFFECT HOOK TO TOGGLE VISIBILITY OF BACK-TO-TOP BUTTON
  useEffect(() => {
    if (scrollValue > 200) {
      setShowScrollTop(true); // SHOW BUTTON IF SCROLLED MORE THAN 200PX
    } else {
      setShowScrollTop(false); // HIDE BUTTON OTHERWISE
    }
  }, [scrollValue]); // DEPENDS ON SCROLL VALUE

  return (
    // <button
    //   onClick={scrollTopHandler} // SCROLL TO TOP WHEN CLICKED
    //   className={`fixed bottom-[2%] right-[2%] z-50 bg-gloomy flex h-10 w-10 items-center shadow-off-white justify-center overflow-hidden rounded-full hover:bg-gloomy transition-all duration-500 large:right-[calc((100vw-1900px)/2)] border border-white ${
    //     showScrollTop ? "translate-y-0 scale-100" : "translate-y-[40px] scale-0"
    //   }`}
    // >
    //   <img src={backToTop} alt="BackToTop" />
    // </button>
    <div className="fixed bottom-[2%] right-[2%] z-50">
      <BookACallButton />
    </div>
  );
};

export default BackToTop;
