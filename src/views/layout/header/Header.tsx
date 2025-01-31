import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialMedia } from "src/components/socialMedia/SocialMedia";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { BaseURL } from "src/App";
import { NavbarContent } from "./NavbarContent";
import { CurrencyModal } from "./app";
import { Currency } from "src/model";
import { useAuth } from "../../pages/app/authenticate/AuthContext";
import { PreferredCurrency } from "../../../ultils/PreferredCurrency";

interface HeaderProps {
  baseURL: BaseURL;
}

export function Header(props: HeaderProps) {
  const auth = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Trigger animation every time the element scrolls into view
      mirror: false, // Do not mirror animation on scrolling past
    });
  }, []);

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // States For Modals
  const [showDropdownNavbar, setShowDropdownNavbar] = useState<boolean>(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);

  const [preferredCurrency, setPreferredCurrency] = useState<Currency>(PreferredCurrency.get(auth));

  useEffect(() => {
    setPreferredCurrency(PreferredCurrency.get(auth));
  }, [auth.authInfo?.user]);

  const handleSelectPreferredCurrency = (currency: Currency) => {
    setPreferredCurrency(currency);
    PreferredCurrency.set(auth, currency);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navbarExpand = screenWidth >= 1024 ? "lg" : false;

  const Logo = () => <img className="block 800:w-[300px] w-[250px] max-[540px]:!w-[200px]" src="/Logo-svg.svg" alt="Logo" />;

  return (
    <div data-aos="fade-down">
      {/* Social Media Icons Section */}
      <div className=" border-b border-b-white 1200:px-20 sm:px-10 max-[540px]:px-4 flex items-end justify-end w-full  gap-3 pb-3 pt-4">
        <SocialMedia />
      </div>

      {/* Navbar Section */}
      <Navbar expand={navbarExpand} className="pt-3  md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]">
        <Container fluid className="">
          <Navbar.Brand href="#">
            <Link to={props.baseURL} className="block">
              <Logo />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle onClick={() => setShowOffcanvas(true)} aria-controls="offcanvasNavbar" className="bg-white" />

          <Navbar.Collapse className="lg:flex  hidden">
            <NavbarContent
              baseURL={props.baseURL}
              setShowOffcanvas={setShowOffcanvas}
              showDropdownNavbar={showDropdownNavbar}
              setShowDropdownNavbar={setShowDropdownNavbar}
              showCurrencyModal={showCurrencyModal}
              setShowCurrencyModal={setShowCurrencyModal}
              selectedCurrency={preferredCurrency}
            />
          </Navbar.Collapse>
          {/* <Navbar.Collapse id="basic-navbar-nav">
            <NavbarContent
              baseURL={props.baseURL}
              setShowOffcanvas={setShowOffcanvas}
              showDropdownNavbar={showDropdownNavbar}
              setShowDropdownNavbar={setShowDropdownNavbar}
              showCurrencyModal={showCurrencyModal}
              setShowCurrencyModal={setShowCurrencyModal}
              selectedCurrency={preferredCurrency}
            />
          </Navbar.Collapse> */}

          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="bg-primaryBg lg:hidden  flex"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Navbar.Brand href={props.baseURL}>
                  <Logo />
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <NavbarContent
                baseURL={props.baseURL}
                setShowOffcanvas={setShowOffcanvas}
                showDropdownNavbar={showDropdownNavbar}
                setShowDropdownNavbar={setShowDropdownNavbar}
                showCurrencyModal={showCurrencyModal}
                setShowCurrencyModal={setShowCurrencyModal}
                selectedCurrency={preferredCurrency}
              />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        onSelect={currency => {
          handleSelectPreferredCurrency(currency);
          setShowCurrencyModal(false);
        }}
        selectedCurrency={preferredCurrency}
      />
    </div>
  );
}
