import React from "react";

interface WeeklyCommitmentInputProps {
  value: number | null | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export function WeeklyCommitmentInput(props: WeeklyCommitmentInputProps) {
  const { value, onChange } = props;

  const handleInputChange = (inputValue: string) => {
    if (inputValue === "") {
      onChange(undefined);
    } else {
      const numericValue = Number(inputValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-10 px-3 items-center gap-3 rounded-md bg-[#202F45]">
        <input
          type="number"
          value={value === null || value === undefined ? "" : value}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="eg. 30"
          className="bg-transparent text-white font-montserrat text-base font-normal leading-[1.5] outline-none placeholder:text-white placeholder:opacity-60 w-20 text-left"
          min="0"
          max="168"
        />
        <div className="flex px-3 py-3 items-center gap-3 rounded-md border border-[#202F45] bg-[#0E1F35]">
          <span className="text-white font-montserrat text-base font-normal leading-[1.5]">h/w</span>
        </div>
      </div>
    </div>
  );
}
