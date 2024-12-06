import React from "react";
import { TelephoneIcon } from "src/Utils/Icons";

const BookACall = () => {
  return (
    <>
      {" "}
      <h4 className="text-base sm:text-xl md:text-[22px] min-[1800px]:text-[28px] opacity-80 border-t border-[#233959] w-full text-center pt-9 mt-12">
        Never get stuck again. Never fork again. Meet your deadline.
      </h4>
      <div className="relative !mt-7 md:!mt-12">
        <button className="bg-gradient-to-r font-michroma flex justify-center items-center gap-2 h-14 lg:h-16 lg:text-lg from-[#FF7E4B]  via-[#FF518C] to-[#66319B] min-[1800px]:h-[75px] min-w-[210px] hover:bg-transparent after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:bg-secondary after:h-[93%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:hover:opacity-100 after:duration-300 rounded-md">
          <span className="relative text-white z-30 flex gap-2 items-center">
            {" "}
            <TelephoneIcon /> Book a Call
          </span>
        </button>
      </div>
    </>
  );
};

export default BookACall;
