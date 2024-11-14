import React, { useEffect, useRef } from "react";

import "./Header.css";
import logo from "../../assets/logo.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { SocialMedia } from "../../components/socialMedia/SocialMedia";
import { ButtonType, ExternalLinkButton } from "../../components";
import { Audience } from "../Audience";
import { gsap } from "gsap";
interface HeaderProps {}

export function Header({}: HeaderProps) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
        }
      );
      gsap.fromTo(
        boxRef.current,
        { y: -300, delay: 1 },
        {
          y: 0,
          duration: 1.8,
          ease: "power3.out",
        }
      );
    }
  }, [boxRef.current]);

  return (
    <div style={{ visibility: "hidden" }} ref={boxRef}>
      <div className="icons_section d-flex align-items-end justify-content-end !py-[19px] container-fluid gap-3 iconnav">
        <SocialMedia />
      </div>
      <div className="">
        {["lg"].map(expand => (
          <Navbar key={expand} expand={expand} className="pt-3">
            {/* Navbar with expand prop */}
            <Container fluid className="navbar">
              {/*Fluid container for Navbar*/}
              <Navbar.Brand href="/">
                <img className="logo" src={logo} alt="Logo" />{" "}
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> {/* Toggle button for collapsing Navbar */}
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start bg"
                className="d-none d-lg-block sidebar-transition"
              >
                {/* Offcanvas component for Navbar menu */}
                <Offcanvas.Header closeButton>
                  {/* Header with close button */}
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <Navbar.Brand href="#">
                      <img className="logo" src={logo} alt="Logo" /> {/* Logo image */}
                    </Navbar.Brand>
                  </Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                  <Nav className="justify-content-end align-items-lg-center text-white gap-md-5 gap-3 flex-grow-1">
                    {/*  TODO: use class for that*/}
                    <a
                      className="ff_michroma link-hover-text 3xl:text-base !text-sm"
                      href="https://blog.open-source-economy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blog
                    </a>
                    <a
                      className="ff_michroma link-hover-text 3xl:text-base text-sm"
                      href="https://blog.open-source-economy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MISSION
                    </a>
                    <a
                      className="ff_michroma link-hover-text 3xl:text-base text-sm"
                      href="https://blog.open-source-economy.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      JOBS
                    </a>
                    {/*<Nav.Link href="">MISSION</Nav.Link>*/}
                    {/*<Nav.Link href="" className="me-md-4">*/}
                    {/*  JOBS*/}
                    {/*</Nav.Link>{" "}*/}

                    <ExternalLinkButton
                      href="/white-paper"
                      buttonProps={{
                        htmlButtonProps: { children: "WHITE PAPER" },
                        type: ButtonType.SECONDARY,
                        audience: Audience.ALL,
                      }}
                    />
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    </div>
  );
}
