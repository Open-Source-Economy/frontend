import { Modal } from "react-bootstrap";
import kitty2 from "../../assets/old/images/kitty2.png";
import React from "react";

interface SuccessModalProps {
  title: string;
  show: boolean;
  setShow: (boolean: boolean) => void;

  closeCallback?: () => void;
}

export function SuccessModal(props: SuccessModalProps) {
  const handleClose = () => {
    props.setShow(false);
    if (props.closeCallback) {
      props.closeCallback();
    }
  };

  return (
    <Modal show={props.show} onHide={handleClose} centered id="registermodal" size="sm">
      <Modal.Body>
        <div className="px-lg-1 py-3">
          <h5 className="text-white text-center">{props.title}</h5>
          <img src={kitty2} className="img-fluid mt-4 pt-3" alt="" />

          <div className="d-block mt-4 pt-3">
            <button onClick={handleClose} className="connect__btn w-100">
              Done
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
