import React from "react";
import Modal from "react-bootstrap/Modal";
import mascot from "src/assets/old/images/crypto.png";

interface DisclaimerModalProps {
  show: boolean;
  setShow: (show: boolean) => void;

  acceptCallback?: () => void;
  closeCallback?: () => void;
}

export function DisclaimerModal(props: DisclaimerModalProps) {
  const handleClose = () => {
    props.setShow(false);
    if (props.closeCallback) {
      props.closeCallback();
    }
  };

  const handleAccept = () => {
    props.setShow(false);
    if (props.acceptCallback) {
      props.acceptCallback();
    }
  };

  return (
    <Modal show={props.show} onHide={handleClose} centered id="to">
      <Modal.Body className="p-0 to-body conduct-bg">
        <div className="native-card py-4  px-0" style={{ background: "transparent" }}>
          <div className="top d-flex justify-content-center mb-5">
            <h1 className=" text-white text-center fs-3 ">Disclaimer</h1>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <p className="text__primary helvetica mb-4"> I understand that:</p>
              <ul className="p-0 ">
                <li className="list-group-item mb-1 d-flex align-items-start ">
                  <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>{" "}
                  <p className="text-white helvetica ps-3">This project is still in Beta</p>
                </li>
                <li className="list-group-item  mb-1 d-flex align-items-start">
                  <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>
                  <p className="text-white helvetica ps-3">This platform works with trust</p>
                </li>
                <li className="list-group-item  mb-1 d-flex align-items-start">
                  <i className="fa-solid fa-circle-check mt-1" style={{ color: "#FF5E1A" }}></i>
                  <p className="text-white helvetica ps-3">
                    Use of the funds collected works is at
                    <br /> the honour of the maintainers
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-lg-4  d-flex justify-content-center justify-content-lg-start">
              <div className="text-center c-m2">
                <img src={mascot} alt="" style={{ maxWidth: "150px" }} />
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <div className="connect__btn w-100 helvetica fw-600 fs-5 " onClick={handleAccept}>
              Fund issue
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
