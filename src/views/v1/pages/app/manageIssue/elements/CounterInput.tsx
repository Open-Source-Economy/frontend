import { ChangeEvent } from "react";
import { credit, Credit } from "src/model";

interface CounterInputProps {
  credit: Credit | null;
  increment: () => void;
  decrement: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function CounterInput(props: CounterInputProps) {
  const safeIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.disabled) return;
    props.increment();
  };

  const safeDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (props.disabled) return;
    props.decrement();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return;
    props.onChange(e);
  };

  return (
    <div className={`flex items-center gap-4 justify-between ${props.disabled ? "opacity-50" : ""}`}>
      <div>
        <div className="flex items-center !gap-0.5 mt-1">
          <input
            type="number"
            value={props.credit ? props.credit.amount.toNumber() : undefined}
            placeholder="0.0"
            onChange={handleChange}
            disabled={props.disabled}
            className="border-0 outline-none md:text-[18px] text-[16px] md:w-24 sm:w-28 w-20 bg-transparent"
          />
          <div className="flex flex-col gap-2">
            <button
              className={`md:w-[11px] w-[11px] h-2 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={safeIncrement}
              disabled={props.disabled}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path d="M5.5 0L10.2631 8.76562H0.73686L5.5 0Z" fill="#D9D9D9" />
              </svg>
            </button>
            <button
              className={`md:w-[11px] w-[11px] h-2 ${props.disabled || props.credit?.amount.isZero() ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onClick={safeDecrement}
              disabled={props.disabled}
              style={{
                pointerEvents: props.disabled || props.credit?.amount.isZero() ? "none" : "auto",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M5.5 8L10.2631 0.265625H0.73686L5.5 8Z" fill="#D9D9D9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="gradient-texts select-none font-bold md:text-[16px] text-[12px]">{credit.displayUnit(props.credit)}</h2>
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
