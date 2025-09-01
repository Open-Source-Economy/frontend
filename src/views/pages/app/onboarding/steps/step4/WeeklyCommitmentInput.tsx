import React, { useRef } from "react";
import { InputWithAddon } from "../../../../../components/form/input/InputWithAddon";
import { NumberInput } from "../../../../../components/form/input/NumberInput";
import { GenericInputRef } from "../../../../../components/form/input/GenericInput";

interface WeeklyCommitmentInputProps {
  value: number | null | undefined;
  onChange: (value: number | undefined) => void;
  error?: string;
}

export function WeeklyCommitmentInput(props: WeeklyCommitmentInputProps) {
  const { value, onChange } = props;
  const inputRef = useRef<GenericInputRef>(null);

  return (
    <InputWithAddon addon={<span className="text-white font-montserrat text-base font-normal leading-[150%]">h/w</span>}>
      <NumberInput
        ref={inputRef}
        placeholder="eg. 30"
        value={value ?? ""}
        onChange={e => {
          const val = e.target.value;
          onChange(val === "" ? undefined : Number(val));
        }}
        minValue={0}
        maxValue={168}
        className="w-20 text-left pl-4"
        variant="compact"
      />
    </InputWithAddon>
  );
}
