import React from "react";
import { FormEntry } from "./FormEntry";

interface BaseSelectProps {
  value: string;
  onChange: (value: string) => void;
  isValid?: boolean;
  children: React.ReactNode;
}

export function BaseSelect(props: BaseSelectProps) {
  return (
    <>
      <FormEntry>
        <div className={`bg-[rgba(255,255,255,0.1)] rounded-lg`}>
          <select
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className={`w-full p-3 bg-transparent outline-none text-white cursor-pointer ${props.isValid ? "border-0" : "!border-red-500"}`}
          >
            {props.children}
          </select>
        </div>
      </FormEntry>
    </>
  );
}
