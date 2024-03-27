import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { EmailInput, CheckInputHandle } from "../../../../components";

interface RegisterModalProps {
  show: boolean;
  setShow: (show: boolean) => void;

  acceptCallback?: () => void;
  closeCallback?: () => void;
  rejectCallback?: () => void;
}

export function RegisterModal(props: RegisterModalProps) {
  const emailInputRef = React.useRef<CheckInputHandle>(null);

  const handleAccept = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // Prevent default form submission behavior
    props.setShow(false);

    const isEmailValid = emailInputRef.current?.check();

    if (isEmailValid) {
      // TODO: You can trigger an API call, update states, etc.

      if (props.acceptCallback) {
        props.acceptCallback();
      }
    }
  };

  const handleClose = () => {
    props.setShow(false);
    if (props.closeCallback) {
      props.closeCallback();
    }
  };

  const handleReject = () => {
    props.setShow(false);
    if (props.rejectCallback) {
      props.rejectCallback();
    }
  };

  return (
    <Modal show={props.show} onHide={handleClose} centered id="to">
      <Modal.Body className=" to-body conduct-bg py-2">
        <div className="native-card py-1  px-0" style={{ background: "transparent" }}>
          <div className="top d-flex justify-content-center mb-3">
            <h1 className=" text-white text-center fs-3 ">
              Keep <span className="text__primary">Track</span>
            </h1>
          </div>
          <p className="text-center helvetica text-white">Get refunded if the issue is not solved</p>
          <p className="text-center helvetica color-70">(we will no spam you)</p>

          <form className="form-small mt-5" onSubmit={handleAccept}>
            <div className="row mb-5">
              <div className="col-lg-12">
                <EmailInput ref={emailInputRef} />
              </div>
            </div>
            <div className="row gy-5 mt-5">
              <div className="col-lg-6">
                <button className=" track-btn w-100 bg-transparent helvetica fw-600 fs-5 text-white" onClick={handleReject}>
                  Disengage
                </button>
              </div>
              <div className="col-lg-6">
                <button type="submit" className="track-btn track-active w-100 helvetica fw-600 fs-5" onClick={handleAccept}>
                  Register for refund
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-5"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
