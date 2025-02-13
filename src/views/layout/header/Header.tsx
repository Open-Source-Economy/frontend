import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { Container, Navbar, Offcanvas } from "react-bootstrap";

import { CurrencyModal, NavbarContent } from "./navbar";
import { Currency } from "src/model";
import { useAuth } from "../../pages/app/authenticate/AuthContext";
import { PreferredCurrency } from "../../../ultils/PreferredCurrency";
import { paths } from "src/paths";
import { TopNavbar } from "./topNavbar";

interface HeaderProps {}

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

  const Logo = () => <img className=" 800:w-[300px] sm:w-[250px] max-[540px]:w-[200px]" src="/Logo-svg.svg" alt="Logo" />;

  return (
    <div data-aos="fade-down">
      <TopNavbar />

      <Navbar expand="lg" className="pt-3 md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]">
        <Container fluid className="">
          <Navbar.Brand href={paths.HOME}>
            <Logo />
          </Navbar.Brand>

          <Navbar.Toggle onClick={() => setShowOffcanvas(true)} aria-controls="offcanvasNavbar" className="bg-white" />

          <Navbar.Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
            className="bg-primaryBg"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <Navbar.Brand href={paths.HOME}>
                  <Logo />
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              {auth.loading ? (
                <></>
              ) : (
                <NavbarContent
                  setShowOffcanvas={setShowOffcanvas}
                  showDropdownNavbar={showDropdownNavbar}
                  setShowDropdownNavbar={setShowDropdownNavbar}
                  showCurrencyModal={showCurrencyModal}
                  setShowCurrencyModal={setShowCurrencyModal}
                  selectedCurrency={preferredCurrency}
                />
              )}
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
