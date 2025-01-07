import React from "react";
import background from "src/assets/hero-bg.webp";

interface HeroProps {}

export function Hero(props: HeroProps) {
  return (
    <>
      {" "}
      <section className="relative w-full !pt-10 !px-4 xl:!pt-20 flex flex-col items-center">
        {" "}
        {/* ================== HERO LINEAR BG ================== */}
        <img
          src={background}
          alt=""
          className="absolute pointer-events-none sm:max-w-[80%] w-full lg:max-w-[75%] xl:max-w-[802px] 3xl:max-w-[1020px] object-contain -translate-x-1/2 left-1/2 -z-10 top-[4%] opacity-40 md:opacity-30"
        />
        {/*TODO: Star Works: to be fixed - should word with all those logo:
         * https://avatars.githubusercontent.com/u/141809657?v=4
         * https://avatars.githubusercontent.com/u/6135171?v=4
         * https://avatars.githubusercontent.com/u/47359?v=4
         */}
        <img
          src="https://avatars.githubusercontent.com/u/141809657?v=4"
          alt="Logo"
          className="w-16 rounded-full md:h-20 md:w-20 xl:w-[109px] h-16 xl:h-[109px]"
        />
        <h1 className="relative text-center mx-auto  main-heading !mt-3">
          Apache/
          <span className="bg-gradient-to-r from-[#FF518C] to-[#66319B]  text-transparent bg-clip-text">Pekko</span>
        </h1>
      </section>
    </>
  );
}
