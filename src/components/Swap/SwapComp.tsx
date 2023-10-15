import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Solana from "../../assets/images/solana.png";
import swapbtn from "../../assets/images/swapbtn.png";
import kitty2 from "../../assets/images/kitty2.png";
import { Modal } from "react-bootstrap";

const amount = 1.58;

const SwapComp = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [swap, setswap] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [result, setResult] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // TODO: lolo
      // setInputValue(value);
      // setResult((value / 137.677).toFixed(3));
      // setInputValue2(result);
    }
    // Calculate the result and set it in the 'result' state
  };
  const handleInputChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    const value2 = event.target.value;

    if (/^\d*\.?\d*$/.test(value2)) {
      // TODO: lolo
      // setResult((value2 * 137.677).toFixed(5));
      // setInputValue2(value2);
      // setInputValue(result);
    }
    // Calculate the result and set it in the 'result' state
  };
  const handleInputClick = () => {
    setInputValue(""); // Clear the input field
  };

  return (
    <>
      <div className="swapc">
        <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap">
          <div className="d-flex gap-4 align-items-center">
            <Link to="/swap" className="text__primary text-decoration-none helvetica">
              Swap
            </Link>
            <Link to="/donate" className="text-white  text-decoration-none helvetica">
              Donate
            </Link>
          </div>
          <div>
            <p className="text-white helvetica mb-0">
              Your Holding &nbsp; - &nbsp; <span className="text__primary fw-bold"> {amount} CHSB</span>
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
            <div className="d-flex justify-content-between ">
              <div>
                {swap ? <p className="text-white-50 helvetica">You Get</p> : <p className="text-white-50 helvetica">You Pay</p>}

                <input
                  type="text"
                  value={inputValue}
                  id="Hello"
                  maxLength={12}
                  onClick={handleInputClick}
                  onChange={handleInputChange}
                  className="bg-transparent border-0 h3 text-white nofocus"
                  placeholder="0"
                />
                <p className="text-white-50 mb-0 helvetica">$1.63</p>
              </div>
              <div>
                <div className="d-flex gap-3 align-items-center mb-4 pb-2">
                  <img src={Solana} alt="" />
                  <h1 className="helvetica text-white text-uppercase mb-0">Sol</h1>
                </div>
                {swap ? (
                  <p className="text-white text-end mb-0 helvetica fw-600">Balance :0</p>
                ) : (
                  <p className="text-white text-end mb-0 helvetica fw-600">
                    Balance :1.58{" "}
                    <button
                      className="text__primary bg-transparent nofocus  border-0"
                      onClick={() => {
                        setInputValue("1.58");
                        setInputValue2(`${1.58 * 137}`);
                      }}
                    >
                      {" "}
                      Max
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="swapdiv w-100 px-3 py-3">
            <div className="d-flex justify-content-between">
              <div>
                {swap ? <p className="text-white-50 helvetica">You Pay</p> : <p className="text-white-50 helvetica">You Get</p>}
                <input
                  type="text"
                  id="Hello1"
                  maxLength={10}
                  value={inputValue2}
                  className="bg-transparent border-0 h3 text-white nofocus"
                  placeholder="0"
                  onChange={handleInputChange2}
                />
                <p className="text-white-50 mb-0  helvetica">$1.63</p>
              </div>
              <div>
                <div className="d-flex gap-3 align-items-center mb-4 pb-2">
                  <img src={"xmom"} alt="" />
                  <h1 className="helvetica text-white text-uppercase mb-0">Sol</h1>
                </div>
                {swap ? (
                  <p className="text-white text-end mb-0 helvetica fw-600">
                    Balance :1.58{" "}
                    <button
                      className="text__primary bg-transparent nofocus  border-0"
                      onClick={() => {
                        setInputValue("1.58");
                        setInputValue2(`${1.58 * 137}`);
                      }}
                    >
                      {" "}
                      Max
                    </button>
                  </p>
                ) : (
                  <p className="text-white text-end mb-0 helvetica fw-600">Balance :0</p>
                )}
              </div>
            </div>
          </div>
          <button onClick={() => setswap(!swap)} className="swapbtn bg-transparent border-0  nofocus">
            <img src={swapbtn} alt="" />
          </button>
        </div>
        <p className="text-center mt-3 ">
          <span className="text-center text-white-50 helvetica">Minimum price 0.071 sol</span>
        </p>
        {/*//       // TODO: lolo*/}
        {/*{inputValue <= amount ? <button onClick={handleShow} className='connect__btn  w-100'>*/}
        {/*    Swap*/}
        {/*</button> : <button disabled className='connect__btn bg-secondary border-0 w-100'>*/}
        {/*    insufficent funds*/}
        {/*</button>*/}
        {/*}*/}
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

export default SwapComp;
