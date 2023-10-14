import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Solana from "../../assets/images/solana.png";
import kitty2 from "../../assets/images/kitty2.png";
import { Modal } from "react-bootstrap";

const amount = 10;
const SwapComp2 = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [swap, setswap] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [result, setResult] = useState(0);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // TODO: lolo
    // setInputValue(value);
    // // Calculate the result and set it in the 'result' state
    // setResult((value / 137.677).toFixed(3));
  };
  return (
    <>
      <div className="swapc">
        <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap">
          <div className="d-flex gap-4 align-items-center">
            <Link to="/swap" className="text-white text-decoration-none helvetica">
              Swap
            </Link>
            <Link to="/donate" className="text__primary  text-decoration-none helvetica">
              Donate
            </Link>
          </div>
          <div>
            <p className="text-white helvetica mb-0">
              Your Holding &nbsp; - &nbsp; <span className="text__primary fw-bold"> 1.58 CHSB</span>
            </p>
          </div>
        </div>

        <div
          className={
            swap
              ? "mt-3 d-flex flex-column-reverse gap-1 align-items-center position-relative"
              : "mt-3 d-flex flex-column gap-1 align-items-center position-relative"
          }
        >
          <div className="swapdiv w-100 px-3 py-3">
            <div className="d-flex justify-content-between">
              <div>
                <p className="text-white-50 helvetica">You Pay</p>
                <input type="text" value={inputValue} onChange={handleInputChange} className="bg-transparent border-0 h1 text-white nofocus" placeholder="10" />
                <p className="text-white-50 mb-0 helvetica">$1.63</p>
              </div>
              <div>
                <div className="d-flex gap-3 align-items-center mb-4 pb-2">
                  <img src={Solana} alt="" />
                  <h1 className="helvetica text-white text-uppercase mb-0">Sol</h1>
                </div>

                <p className="text-white text-end mb-0 helvetica fw-600">
                  Balance :1.58 <span className="text__primary">Max</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-3 mb-5 pb-lg-5 ">
          <span className="text-center text-white-50 helvetica">Minimum price 0.071 sol</span>
        </p>

        {inputValue <= amount ? (
          <button onClick={handleShow} className="connect__btn  w-100">
            Donate
          </button>
        ) : (
          <button disabled className="connect__btn bg-secondary border-0 w-100">
            insufficent funds
          </button>
        )}
      </div>
      <Modal show={show} onHide={handleClose} centered id="registermodal" size="sm">
        {/* <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header> */}
        <Modal.Body>
          <div className="px-lg-1 py-3">
            <h5 className="text-white text-center">Donated Successfully</h5>
            <img src={kitty2} className="img-fluid mt-4 pt-3" alt="" />

            <div className="d-block mt-4 pt-3">
              <button onClick={handleClose} className="connect__btn w-100">
                Done
              </button>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default SwapComp2;
