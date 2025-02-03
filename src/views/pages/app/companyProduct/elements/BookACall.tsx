import React from "react";
import { BookACallButton } from "../../../../components/elements/BookACallButton";

interface BookACallProps {}

export function BookACall(props: BookACallProps) {
  return (
    <section className="max-w-[1164px] relative 3xl:max-w-[1376px] px-4 mx-auto">
      {" "}
      <h4 className="text-base sm:text-xl md:text-[22px] 3xl:text-[28px] opacity-80 border-t border-[#233959] w-full text-center pt-9">
        Never get stuck again. Never fork again. Meet your deadline.
      </h4>
      <div className="relative !mt-7 md:!mt-12 flex justify-center items-center">
        <BookACallButton />
      </div>
    </section>
  );
}
