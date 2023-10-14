import { useState } from "react";
import ProjectPageChart from "../Elements/ProjectPageChart";

const TabChart = () => {
  const [active, setActive] = useState("tab-1");
  return (
    <>
      {/* <div className="tabs ">
                <button className={active == "tab-1" ? "active" : "tab"} onClick={() => { setActive("tab-1") }}>
                    24h
                </button>
                <button className={active == "tab-2" ? "active" : "tab"} onClick={() => { setActive("tab-2") }}>
                    1W
                </button>
                <button className={active == "tab-3" ? "active" : "tab"} onClick={() => { setActive("tab-3") }}>
                    1M
                </button>
                <button className={active == "tab-4" ? "active" : "tab"} onClick={() => { setActive("tab-4") }}>
                    1Y
                </button>
                <button className={active == "tab-5" ? "active" : "tab"} onClick={() => { setActive("tab-5") }}>
                    All
                </button>
            </div> */}
      <div className="d-flex justify-content-center">
        <div className="w-100">
          <ProjectPageChart />
        </div>
      </div>
      {/* <div className="d-flex justify-content-center mt-4">
                {
                    active == "tab-1" ?
                        // <img src={Chart} className='img-fluid' alt="" />
                      <div className='w-100'>
                          <ProjectPageChart/>
                      </div>
                        :
                        active == "tab-2" ?
                            <img src={Chart} className='img-fluid' alt="" />
                            :
                            active == "tab-3" ?
                                <img src={Chart} className='img-fluid' alt="" />
                                :
                                active == "tab-4" ?
                                    <img src={Chart} className='img-fluid' alt="" />
                                    :
                                    active == "tab-5" ?
                                        <img src={Chart} className='img-fluid' alt="" />
                                        : <div></div>

                }
            </div> */}
    </>
  );
};

export default TabChart;
