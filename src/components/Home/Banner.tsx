import {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

import kittyimg from '../../assets/images/kitty.png'
import frame from '../../assets/images/Frame.png'

const Banner = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);

    const handleClose = () => error ? setShow(false) : setError(true);
    const handleShow = () => setShow(true);
    return (
        <>
            <section className='banner__home'>
                <div className="container mt-5 pt-lg-5 pt-3">
                    <h1 className='text-center text-white'>
                        Fastest & Secure
                    </h1>
                    <h1 className='text-center text-white'>
                        <span className="text__primary">
                            open-source</span> marketplace
                    </h1>
                    <h5 className="text-center text-white helvetica fw-400 mt-3 h6 ">
                        The solution to make Open-Source as Competitive as <br className='d-lg-block d-none' />
                        Closed Source.
                    </h5>
                    <div className="d-flex justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse  gap-lg-0 gap-3 mt-4">
                        <div>
                            <button className='connect__btn' onClick={handleShow}>
                                Register a Project
                            </button>
                        </div>
                        <div>
                            <img src={kittyimg} className='kittyimg img-fluid' alt="" />
                        </div>
                    </div>
                </div>

            </section>
            <Modal show={show} onHide={handleClose} centered id="registermodal" size="sm">
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="px-lg-1 py-3">
                        <h5 className="text-white text-center">
                            Register Your Project
                        </h5>
                        <label htmlFor="" className="helvetica mt-4  pt-3 text-white small d-block">Owner</label>
                        <input type="text" className='form-control controla text-white' />
                        <label htmlFor="" className="helvetica mt-3 text-white small d-block">Repository</label>
                        <input type="text" className='form-control controla text-white' />
                        {error ?
                            <div className="bg__pink py-2 rounded mt-4 d-flex gap-2 align-items-center px-2">
                                <img src={frame} className=' img-fluid' alt="" />
                                <div className='text__red helvetica fw-600 small'>
                                    The project does not exist
                                </div>
                            </div>
                            : <div className="d-block mt-0 pt-0">

                            </div>}
                        <div className="d-block mt-4 pt-3">
                            <button onClick={handleClose} className='connect__btn w-100'>
                                Submit
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
    )
}

export default Banner