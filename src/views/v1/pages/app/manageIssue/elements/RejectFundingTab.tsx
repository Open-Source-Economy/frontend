import React from "react";
import check from "src/assets/v1/checkmark.png";

interface RejectFundingTabProps {}

export function RejectFundingTab(props: RejectFundingTabProps) {
  return (
    <>
      <div className="px-10 md:px-12 xl:px-14 2xl:px-[70px]">
        <div className="flex items-start  gap-3">
          <img src={check} className="w-4 h-4 2xl:mt-2" alt="" />
          <h2 className="xl:text-lg font-normal text-start">All the amount collected will be refunded</h2>
        </div>
        <div className="flex items-start mt-2 gap-3">
          <img src={check} className="w-4 h-4 mt-1 2xl:mt-2" alt="" />
          <h2 className="xl:text-lg font-normal text-start">Another maintainer cannot accept to work on it.</h2>
        </div>

        <p className="!mt-5 lg:!mt-10">
          Not implemented yet. <br />
          If you need to reject an issue, send an email to lauriane@open-source-economy.com so that she implement it.
        </p>

        {/*<p className="text-start mt-4 montserrat">Tell us the reason</p>*/}
        {/*<textarea*/}
        {/*  name=""*/}
        {/*  className="w-100 mt-3 outline-none montserrat rounded-md bg-transparent border-1 border-[#8693A4] text-lg text-[#8693A4] p-2 h-[100px]"*/}
        {/*  id=""*/}
        {/*  placeholder="Tell us the reason"*/}
        {/*></textarea>*/}
        {/*<p className="text-start mt-4 montserrat">Tell us the reason</p>*/}
        {/*<select id="country" name="country" className="bg-[rgba(255,255,255,10%)] montserrat mt-3 rounded-[10px] border-0 p-3 form-select cursor-pointer">*/}
        {/*  <option className="text-black" value="Afghanistan">*/}
        {/*    Afghanistan*/}
        {/*  </option>*/}
        {/*</select>*/}
        {/*<button className="mt-7 border-1 border-[#FF518C] hover:bg-[#FF518C] transition-all duration-500 ease-in-out py-3 rounded-md w-[282px]">Reject</button>*/}
      </div>
    </>
  );
}
