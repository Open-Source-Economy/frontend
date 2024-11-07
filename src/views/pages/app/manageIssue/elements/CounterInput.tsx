import React, { ChangeEvent } from "react";
import up from "src/assets/arrowup.png";
import down from "src/assets/arrowdown.png";
import Decimal from "decimal.js";

interface CounterInputProps {
  value: Decimal | null;
  increment: () => void;
  decrement: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CounterInput(props: CounterInputProps) {
  return (
    <div className="flex items-center gap-4 justify-between">
      <div>
        <div className="flex items-center gap-3 mt-1">
          <input
            type="number"
            value={props.value ? props.value.toNumber() : undefined}
            placeholder="0.0"
            onChange={props.onChange}
            className="border-0 outline-none md:text-[18px] text-[16px] md:w-24 sm:w-28 w-20 bg-transparent"
          />
          <div className="flex flex-col gap-2">
            <img src={up} className="md:w-[11px] w-[11px] h-2 cursor-pointer" onClick={props.increment} alt="Increment" />
            <img
              src={down}
              className={`md:w-[11px] w-[11px] h-2 cursor-pointer ${props.value?.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={props.decrement}
              alt=""
              style={{
                pointerEvents: props.value?.isZero() ? "none" : "auto",
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <h2 className="gradient-texts font-bold md:text-[16px] text-[12px]">DoW</h2>
        <style>{`
          .gradient-texts {
            background: linear-gradient(90deg, #ff7e4b, #ff518c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
      </div>
    </div>
  );
}
