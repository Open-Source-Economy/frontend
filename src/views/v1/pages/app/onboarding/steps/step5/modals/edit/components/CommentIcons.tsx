import React from "react";

export function CommentIcon(props: {}) {
  return (
    <>
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 15.0017V25.0017M15 20.0017H25M20 35C22.9667 35 25.8668 34.1203 28.3336 32.4721C30.8003 30.8238 32.7229 28.4811 33.8582 25.7403C34.9935 22.9994 35.2906 19.9834 34.7118 17.0737C34.133 14.1639 32.7044 11.4912 30.6066 9.3934C28.5088 7.29562 25.8361 5.86701 22.9264 5.28823C20.0166 4.70945 17.0006 5.0065 14.2597 6.14181C11.5189 7.27713 9.17618 9.19972 7.52796 11.6665C5.87973 14.1332 5 17.0333 5 20C5 22.48 5.6 24.8167 6.66667 26.8783L5 35L13.1217 33.3333C15.1817 34.3983 17.5217 35 20 35Z"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export function CloseIcon(props: {}) {
  return (
    <>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
