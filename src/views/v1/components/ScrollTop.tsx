import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Component that scrolls to the top of the page on route changes
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
