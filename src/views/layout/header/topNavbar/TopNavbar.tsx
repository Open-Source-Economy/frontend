import React from "react";
import { Authentication } from "./Authentication";
import { useAuth } from "src/views/pages";

interface TopNavbarProps {}

export function TopNavbar(props: TopNavbarProps) {
  const auth = useAuth();

  if (auth.loading) return <></>;
  else if (auth.authInfo?.user === null) {
    return (
      <div className=" border-b border-b-white 1200:px-20 sm:px-10 max-[540px]:px-4 flex items-end justify-end w-full  gap-3 pb-3 pt-4">
        <Authentication />
        {/*<SocialMedia />*/}
      </div>
    );
  } else return <></>;
}
