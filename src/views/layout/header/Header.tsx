import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialMedia } from "src/components/socialMedia/SocialMedia";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { BaseURL } from "src/App";
import { NavbarContent } from "./NavbarContent";
import { CurrencyModal } from "./app";
import { Currency } from "src/model";

interface HeaderProps {
  baseURL: BaseURL;
}

const Logo = () => <img className=" 800:w-[300px] sm:w-[250px] max-[540px]:w-[200px]" src="/Logo-svg.svg" alt="Logo" />;

export function Header(props: HeaderProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Trigger animation every time the element scrolls into view
      mirror: false, // Do not mirror animation on scrolling past
    });
  }, []);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleShow = () => setShowOffcanvas(true);
  const handleClose = () => {
    setShowOffcanvas(false);
  }; // Close handler

  // States For Modals

  const [showDropdownNavbar, setShowDropdownNavbar] = useState<boolean>(false);

  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.USD);

  return (
    <div data-aos="fade-down">
      {/* Social Media Icons Section */}
      <div className=" border-b border-b-white 1200:px-20 sm:px-10 max-[540px]:px-4 flex items-end justify-end w-full  gap-3 pb-3 pt-4">
        <SocialMedia />
      </div>

      {/* Navbar Section */}
      <Navbar expand="lg" className="pt-3  md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]">
        <Container fluid className="">
          <Navbar.Brand href="#">
            <Link to={props.baseURL}>
              <Logo />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" className="bg-white" />

          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={handleClose}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="bg-primaryBg"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Navbar.Brand href="#">
                  <Logo />
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <NavbarContent
                baseURL={props.baseURL}
                handleClose={handleClose}
                showDropdownNavbar={showDropdownNavbar}
                setShowDropdownNavbar={setShowDropdownNavbar}
                showCurrencyModal={showCurrencyModal}
                setShowCurrencyModal={setShowCurrencyModal}
                selectedCurrency={selectedCurrency}
              />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        onSelect={currency => {
          setSelectedCurrency(currency);
          setShowCurrencyModal(false);
        }}
        selectedCurrency={selectedCurrency}
      />
    </div>
  );
}
