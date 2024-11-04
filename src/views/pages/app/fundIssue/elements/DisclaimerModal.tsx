import React from "react";
import Modal from "react-bootstrap/Modal";
import catimg from "src/assets/catimg.png";
import check from "src/assets/checkmark.png";

interface RegisterModalProps {
  show: boolean;
  setShow: (show: boolean) => void;

  closeCallback?: () => void;
}

export function DisclaimerModal(props: RegisterModalProps) {
  const handleClose = () => {
    props.setShow(false);
    if (props.closeCallback) {
      props.closeCallback();
    }
  };

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Body>
        <div id="modal" className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#0E1E34] border-1 border-[#292929] rounded-[50px] py-5 md:px-14 px-3 mx-3 flex flex-col w-[100%] sm:w-[40%] lg:w-[32%] relative animate-slideInDown">
            <h1 className=" text-center text-[30px] ">What is the Spirit?</h1>
            <img src={catimg} className="w-[153px] montserrat h-[211px] my-4 mx-auto" alt="" />
            <div className="px-4">
              <h2 className="montserrat text-[#FF518C] text-[20px]">I understand that:</h2>
              <div className="montserrat flex items-center gap-2 mt-3">
                <img src={check} className="w-[14px] h-[14px]" alt="" />
                <h3>This platform works with trust</h3>
              </div>
              <div className="montserrat flex items-center gap-2 mt-3">
                <img src={check} className="w-[14px] h-[14px]" alt="" />
                <h3>Maintainer will do their best to solve issues</h3>
              </div>
              <div className="montserrat flex items-start gap-2 mt-3">
                <img src={check} className="w-[14px] h-[14px]" alt="" />
                <h3>Use of the funds collected works is at the honor of the maintainers</h3>
              </div>
              <div className="flex mt-3 items-center justify-center">
                <button onClick={handleClose} className="sm:px-14 px-[20px]  py-3 mt-4 findbutton">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
