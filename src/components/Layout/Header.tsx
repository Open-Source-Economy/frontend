import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import logo from "../../assets/images/logo.png";
import phantom from "../../assets/images/phantom.png";
import pfp from "../../assets/images/pfp.png";
import solicon3 from "../../assets/images/solicon3.png";
import { Button, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLogged: boolean;
}

const Header: React.FC<HeaderProps> = props => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <header>
        <nav className="container pt-4">
          <div className="d-flex justify-content-between flex-lg-nowrap flex-wrap gap-lg-0 gap-3">
            <Link to="/" className="text-decoration-none">
              <div className="d-flex gap-3 align-items-center">
                <img src={logo} className="logo" alt="" />
                <p className="logofont text-center text-white mb-0">
                  Open Source <br />
                  <span className="text__primary">Economy</span>
                </p>
              </div>
            </Link>
            {props.isLogged ? (
              <div className="d-flex gap-2">
                <Dropdown>
                  <Dropdown.Toggle className="bg__solana" id="dropdown-basic">
                    <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />
                    SOL
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      {" "}
                      <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />
                      SOL
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      {" "}
                      <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />
                      SOL
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      {" "}
                      <img src={solicon3} style={{ width: "50px" }} className="me-2" alt="" />
                      SOL
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button onClick={handleShow} className="wallet">
                  <img src={pfp} style={{ width: "50px" }} className="me-2" alt="" />
                  0x5c...0fee
                </button>
              </div>
            ) : (
              <div>
                <button onClick={handleShow} className="connect__btn">
                  Connect
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      <Modal show={show} onHide={handleClose} centered id="registermodal" size="sm">
        <Modal.Body>
          <div className="px-lg-1 py-3">
            {props.isLogged ? <h5 className="text-white text-center">Disconnect Wallet</h5> : <h5 className="text-white text-center">Connect A Wallet</h5>}
            <div className="bg__blue d-flex rounded py-3 align-items-center justify-content-between px-3 mt-4">
              <div className="d-flex align-items-center gap-2">
                <div>
                  <img src={phantom} width="40px" className="img-fluid" alt="" />
                </div>
                <div>
                  <span className="text-white small">Phantom</span>
                </div>
              </div>
              {props.isLogged ? (
                <Link to="/" onClick={handleClose} className="connect__btn2 text-decoration-none  small">
                  Disconnect
                </Link>
              ) : (
                <Link to="/swap" onClick={handleClose} className="connect__btn2 text-decoration-none small">
                  Connect
                </Link>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
