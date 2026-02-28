import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

import { CurrencyModal, NavbarContent } from "./navbar";
import { useAuth } from "src/views/auth";
import { TopNavbar } from "./topNavbar";
import { useCurrency } from "../../../../context/CurrencyContext";

interface HeaderProps {}

export function Header(_props: HeaderProps) {
  const auth = useAuth();
  const { preferredCurrency, showCurrencyModal, setShowCurrencyModal, setPreferredCurrency } = useCurrency();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Trigger animation every time the element scrolls into view
      mirror: false, // Do not mirror animation on scrolling past
    });
  }, []);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showDropdownNavbar, setShowDropdownNavbar] = useState<boolean>(false);

  const Logo = () => <img className="800:w-[300px] sm:w-[250px] max-[540px]:w-[200px]" src="/favicon.svg" alt="Logo" />;

  return (
    <div data-aos="fade-down">
      <TopNavbar />

      <nav className="pt-3 md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]">
        <div className="flex items-center justify-between w-full px-3">
          <a href="/">
            <Logo />
          </a>

          {/* Hamburger toggle - visible below lg breakpoint */}
          <button
            onClick={() => setShowOffcanvas(true)}
            aria-controls="offcanvasNavbar"
            className="lg:hidden bg-white p-2 rounded border border-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Desktop nav - hidden below lg */}
          <div className="hidden lg:flex flex-grow">
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
          </div>
        </div>
      </nav>

      {/* Offcanvas / slide-out panel for mobile */}
      {showOffcanvas && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowOffcanvas(false)} />

          {/* Panel */}
          <div className="fixed inset-y-0 left-0 w-[300px] bg-primaryBg z-50 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-4">
              <a href="/">
                <Logo />
              </a>
              <button onClick={() => setShowOffcanvas(false)} className="p-2 rounded hover:bg-gray-700/20">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
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
            </div>
          </div>
        </div>
      )}

      <CurrencyModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        onSelect={(currency) => {
          setPreferredCurrency(currency);
          setShowCurrencyModal(false);
        }}
        selectedCurrency={preferredCurrency}
      />
    </div>
  );
}
