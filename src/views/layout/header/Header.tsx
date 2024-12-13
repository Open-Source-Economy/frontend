import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SocialMedia } from "src/components/socialMedia/SocialMedia";
import "./Header.css";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { BaseURL } from "src/App";
import { NavbarContent } from "./NavbarContent";

interface HeaderProps {
  baseURL: BaseURL;
}

const Logo = () => <img className="logo" src="/Logo-svg.svg" alt="Logo" />;

export function Header(props: HeaderProps) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Trigger animation every time the element scrolls into view
      mirror: false, // Do not mirror animation on scrolling past
    });
  }, []);

  return (
    <div data-aos="fade-down">
      {/* Social Media Icons Section */}
      <div className="icons_section d-flex align-items-end justify-content-end container-fluid iconnav gap-3 pb-3 pt-4">
        <SocialMedia />
      </div>

      {/* Navbar Section */}
      <Navbar expand="lg" className="pt-3">
        <Container fluid className="navbar">
          <Navbar.Brand href="#">
            <Link to={props.baseURL}>
              <Logo />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" className="d-none d-lg-block">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <Navbar.Brand href="#">
                  <Logo />
                </Navbar.Brand>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <NavbarContent baseURL={props.baseURL} />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}
