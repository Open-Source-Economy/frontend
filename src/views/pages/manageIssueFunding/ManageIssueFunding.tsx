import React, { useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { Modal } from "react-bootstrap";
import Blob from "../../../assets/images/blob.png";
import Sol from "../../../assets/images/SOL.png";
import Lady from "../../../assets/images/lady.png";
import Code from "../../../assets/images/code.png";
import Sad from "../../../assets/images/sad.png";
import Ose from "../../../assets/images/ose.png";
import Crypto from "../../../assets/images/crypto.png";
import Hero from "../../../assets/images/hero.png";
import Money from "../../../assets/images/money.png";
import User from "../../../assets/images/git-user.png";

interface ManageIssueFundingProps {}

export function ManageIssueFunding({}: ManageIssueFundingProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);

  const handleClick2 = () => {
    // Update both show and show3 states simultaneously
    setShow(false);
    setShow2(true);
  };

  return (
    <PageWrapper>
      <section>
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">
            Manage this <span className="text__primary">Issue</span>
          </h1>
          <div className="row d-flex  justify-content-center gy-5 mt-5">
            <div className="col-lg-10">
              <div className="native-card">
                <div className="top d-flex gap-4 mb-5 flex-wrap md-text-center">
                  <img src={Blob} alt="" style={{ height: "100%" }} />
                  <div className="text-box">
                    <h3 className="text-white fw-600  helvetica">
                      <a href="https://github.com/scala-native" target="_blank" className="text-decoration-none c_links color-70">
                        <span className="color-70">scala-native</span>
                      </a>
                      <a href="https://github.com/scala-native/scala-native" className=" text-white text-decoration-none c_links" target="_blank">
                        {" "}
                        /scala-native
                      </a>
                    </h3>
                    <p className="text-white helvetica mb-0">The solution to make Open-Source as Competitive as Closed Source.</p>
                  </div>
                </div>
                <a href="#" className="text-decoration-none c_links text-white">
                  {" "}
                  <h6 className="helvetica text-white fw-700 fs-5 mt-5 mb-4">"Address boundary error" with a recursive Conversion</h6>
                </a>

                <ul className="d-flex gap-3 align-items-center mb-5 p-0 flex-wrap">
                  <li className="list-group-item color-70 helvetica fs-4">
                    <a href="#" className="text-decoration-none color-70 c_links">
                      #3701
                    </a>
                  </li>
                  <li className="list-group-item">
                    <a href="#" className="text-decoration-none helvetica  color-70 c_links">
                      <img className="lady-img" src={Lady} alt="" /> @laurianemollier
                    </a>
                  </li>
                  <li className="list-group-item helvetica ">
                    <a href="#" className=" color-70 text-decoration-none c_links">
                      2 weeks ago
                    </a>
                  </li>
                </ul>
                <hr style={{ height: "3px", background: "#ffffffad" }} />
                <p className="text-white helvetica mb-0">Run this with Scala CLI:</p>
                <div className="my-4">
                  <img src={Code} alt="" className="code-img" />
                </div>
                <a href="#" className="helvetica color-80 c_links text-decoration-none" style={{ fontStyle: "italic    " }}>
                  See More
                </a>
              </div>
            </div>
            <div className="col-lg-10">
              <div className="native-card">
                <div className="top d-flex justify-content-center gap-4 mb-4 flex-wrap md-text-center">
                  <div className="text-box ">
                    <h3 className="text-white text-center fw-600  helvetica mb-5">Manage the issue</h3>
                    <div className="d-flex justify-content-center mb-3 gap-2 ">
                      <img src={Sol} alt="" />
                      <p className="m-0 helvetica fs-4 text-white">
                        SOL <span className="fw-600">400 Collected</span>
                      </p>
                    </div>
                    <p className="text-center helvetica color-70">Collect have to be approved by a maintainer or will be refunded</p>
                  </div>
                </div>
                <div className="row gy-5">
                  <div className="col-lg-6 px-5 border-right ">
                    <p className="m-0 helvetica fs-4 text-white mb-4">The issue will be resolved</p>
                    <ul className="p-0">
                      <li className="list-group-item mb-4 d-flex align-items-star ">
                        <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>{" "}
                        <p className="text-white helvetica ps-3 m-0"> Close the issue on GitHub</p>
                      </li>
                      <li className="list-group-item  mb-4 d-flex align-items-start">
                        <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>
                        <p className="text-white helvetica ps-3 m-0">All the amount collected will be refunded</p>
                      </li>
                    </ul>
                    <div className="text-center">
                      <div className="split-btn c-margin   btn w-100 helvetica fw-700 fs-5 ">Reject the issue</div>
                    </div>
                  </div>
                  <div className="col-lg-6 px-5">
                    <p className="m-0 helvetica fs-4 text-white mb-5">Reject the issue</p>
                    <p className="helvetica text-white">Amount needed</p>
                    <div className="child d-flex justify-content-between mb-5">
                      <input type="number" placeholder="0" className="helvetica text-white fs-1 count w-100" />

                      <div>
                        <div className="text-box d-flex flex-column gap-5">
                          <div className="d-flex ">
                            <img src={Sol} alt="" />
                            <p className="m-0 helvetica fs-4 text-white">SOL</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-white helvetica">When this amount would be collected:</p>
                    <li className="list-group-item d-flex align-items-start  mb-2">
                      <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>
                      <p className="text-white helvetica ps-3">I will split fairly the amount collected among contributors and reviewers</p>
                    </li>
                    <div className="text-center">
                      <button className="connect__btn   w-100 helvetica fw-700 fs-5 " onClick={handleShow}>
                        I give my word
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 text-center">
            <a href="#" className="color-70 helvetica c_links text-decoration-none mt-5 font-italic" style={{ fontStyle: "italic" }}>
              Need some help?
            </a>
            <div>
              <img src={Sad} alt="" />
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} centered id="to" size="sm">
          <Modal.Body className="p-0 to-body">
            <div className="native-card px-0">
              <div className="top d-flex gap-4 mb-5 flex-wrap md-text-center">
                <div className="d-flex  flex-wrap flex-md-nowrap justify-content-center justify-content-lg-between">
                  <h1 className="text__primary"> Successful Crowdfunding! </h1>
                  <img src={Ose} alt="" />
                </div>
              </div>
              <div className="top d-flex align-items-center gap-4 justify-content-center">
                <img src={Sol} alt="" />
                <div className="text-box">
                  <p className="m-0 helvetica fs-4 text-white">
                    SOL 400 <span className="fw-bold color-70">/ 1000 SOL collected</span>
                  </p>
                </div>
              </div>
              <div className="bar2 my-4"></div>
              <div className="d-flex justify-content-center py-4">
                <p className="helvetica text-white text-center">
                  {" "}
                  You promised it, the community followed you! It is now <br /> time to solve the issue!{" "}
                </p>
              </div>
              <div className="text-center">
                <img src={Crypto} alt="" style={{ maxWidth: "100px" }} />
              </div>

              <div className="text-center mt-5">
                <button className="split-btn btn w-100 helvetica fw-700 fs-5 " onClick={handleClick2}>
                  Solve the Issue on Github
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show2} onHide={handleClose2} centered id="to">
          <Modal.Body className="p-0 to-body"></Modal.Body>
        </Modal>

        <Modal show={show3} onHide={handleClose3} centered id="to">
          <Modal.Body className="p-0 to-body conduct-bg">
            <div className="native-card  px-0" style={{ background: "transparent" }}>
              <div className="top d-flex justify-content-center">
                <h1 className=" text-white text-center fs-3 mb-2"> Chart of Conduct</h1>
              </div>
              <p className="helvetica text-white text-center mb-5">I garanty that:</p>
              <ul className="p-0 d-flex justify-content-between flex-wrap">
                <li className="list-group-item mb-2 d-flex align-items-start ">
                  <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>{" "}
                  <p className="text-white helvetica ps-3">The issue is solved</p>
                </li>
                <li className="list-group-item  mb-2 d-flex align-items-start">
                  <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>
                  <p className="text-white helvetica ps-3">
                    I split the amount contributors
                    <br /> and reviewers fairly
                  </p>
                </li>
              </ul>
              <div className="text-center">
                <img src={Crypto} alt="" style={{ maxWidth: "150px" }} />
              </div>
              <div className="text-center mt-5">
                <div className="connect__btn   w-100 helvetica fw-600 fs-5 " onClick={handleClose3}>
                  Split the Reward
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div style={{ height: "150px" }}></div>
      </section>
    </PageWrapper>
  );
}
