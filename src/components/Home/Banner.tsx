import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

import kittyimg from "../../assets/images/kitty.png";
import RegisterNewProject from "./RegisterNewProject";

interface BannerProps {
  onRegisteringNewProject: () => void;
}
const Banner: React.FC<BannerProps> = props => {
  const [show, setShow] = useState(false);
  const onHide = () => setShow(false);
  const onRegisteringNewProject = () => {
    props.onRegisteringNewProject();
    onHide();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <section className="banner__home">
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">Fastest & Secure</h1>
          <h1 className="text-center text-white">
            <span className="text__primary">open-source</span> marketplace
          </h1>
          <h5 className="text-center text-white helvetica fw-400 mt-3 h6 ">
            The solution to make Open-Source as Competitive as <br className="d-lg-block d-none" />
            Closed Source.
          </h5>
          <div className="d-flex justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse  gap-lg-0 gap-3 mt-4">
            <div>
              <button className="connect__btn" onClick={handleShow}>
                Register a Project
              </button>
            </div>
            <div>
              <img src={kittyimg} className="kittyimg img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={onHide} centered id="registermodal" size="sm">
        <Modal.Body>
          <RegisterNewProject onRegisteringNewProject={onRegisteringNewProject} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Banner;
