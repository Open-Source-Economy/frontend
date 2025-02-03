import React from "react";
import { Button } from "src/views/components";

interface BookACallProps {}

export function BookACall(props: BookACallProps) {
  return (
    // <section className="relative pt-6 xl:pt-10 pb-10 xl:pb-16">
    //   <div className="flex justify-center items-center mt-14 3xl:mt-16">
    <section className="relative">
      <div className="flex justify-center items-center">
        <Button audience="ALL" level="PRIMARY" size="LARGE" className="cursor-pointer" asChild>
          <span>Book a Meeting</span>
        </Button>
      </div>
    </section>
  );
}
