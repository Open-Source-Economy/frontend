import React, { ReactNode, useEffect, useRef } from "react";
import { Footer, Header } from "src/views/components/layout";
import gsap from "gsap";

export interface PageWrapperProps {
  children: ReactNode;
}

export function PageWrapper(props: PageWrapperProps) {
  const pageContainer = useRef(null);
  useEffect(() => {
    if (pageContainer.current) {
      gsap.from(pageContainer.current, { autoAlpha: 0 });
    }
  }, [pageContainer]);
  return (
    <div ref={pageContainer}>
      <Header />
      {props.children}
      <section className="bg-gradient-to-t from-brand-neutral-50 to-brand-secondary-dark transition-all duration-1000 ease-in-out">
        <Footer />
      </section>
    </div>
  );
}
