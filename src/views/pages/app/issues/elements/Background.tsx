import React from "react";
import bgimage from "src/assets/Group258.svg";
import bgimage2 from "src/assets/issuebg2.png";
import bgimage3 from "src/assets/issuebg3.png";
import bgimage4 from "src/assets/issuebg4.png";

interface BackgroundProps {
  children?: React.ReactNode;
}

export function Background(props: BackgroundProps) {
  return (
    <>
      <div>
        <div
          style={{
            backgroundImage: `url(${bgimage4})`,
            backgroundPosition: "bottom",
            backgroundPositionY: "1600px",
            backgroundSize: "80%",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              backgroundImage: `url(${bgimage2})`,
              backgroundPosition: "left 20%",
              backgroundSize: "60%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div
              style={{
                backgroundImage: `url(${bgimage3})`,
                backgroundPosition: "right 2%",
                backgroundSize: "60%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-col items-center justify-center ">
                <div
                  className="mt-20 py-5 px-3"
                  style={{
                    backgroundImage: `url(${bgimage})`,
                    backgroundPosition: "top",
                    backgroundPositionY: "-320px",
                    backgroundSize: "1200px",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
