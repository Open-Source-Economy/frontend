import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SocialMedia } from "src/components/socialMedia/SocialMedia";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import { BaseURL } from "src/App";
import { NavbarContent } from "./NavbarContent";

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

          <Navbar.Toggle aria-controls="offcanvasNavbar" className="bg-white" />

          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="start" className="bg-primaryBg">
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
