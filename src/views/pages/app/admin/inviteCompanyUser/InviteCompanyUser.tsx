import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";

interface InviteCompanyUserProps {}

export function InviteCompanyUser(props: InviteCompanyUserProps) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">Fund an </h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleLocalAuthentication}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="email"
                placeholder="Email"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={email}
                onChange={handleEmailChange}
                required
              />

              <button type="submit" className="sm:px-14 px-[20px]  py-3  findbutton cursor-pointer">
                Sign In
              </button>
            </form>

            <h2 className="text-white text-[30px] font-medium"></h2>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
