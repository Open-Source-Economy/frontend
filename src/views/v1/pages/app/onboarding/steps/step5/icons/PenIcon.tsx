import React from "react";

interface PenIconProps {
  className?: string;
}

export function PenIcon(props: PenIconProps) {
  return (
    <>
      <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.999 20H20.999M16.375 3.62198C16.7731 3.22389 17.313 3.00024 17.876 3.00024C18.439 3.00024 18.9789 3.22389 19.377 3.62198C19.7751 4.02007 19.9987 4.55999 19.9987 5.12298C19.9987 5.68596 19.7751 6.22589 19.377 6.62398L7.367 18.635C7.1291 18.8729 6.83502 19.0469 6.512 19.141L3.64 19.979C3.55395 20.0041 3.46274 20.0056 3.37591 19.9833C3.28908 19.9611 3.20983 19.9159 3.14645 19.8525C3.08307 19.7892 3.03789 19.7099 3.01564 19.6231C2.9934 19.5362 2.9949 19.445 3.02 19.359L3.858 16.487C3.95222 16.1643 4.12625 15.8706 4.364 15.633L16.375 3.62198Z"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
