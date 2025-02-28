import { BaseInput } from "./frames/BaseInput";
import { FormEntry } from "./frames/FormEntry";

interface EmailInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  disabled?: boolean;
}

export function EmailInput(props: EmailInputProps) {
  return (
    <FormEntry label={props.label}>
      <BaseInput type="email" placeholder="Email" {...props} />
      {!props.isValid && !props.value && <span className="text-red-500">Please fill in the email field.</span>}
      {props.value && !props.isValid && <span className="text-red-500">Please enter a valid email address.</span>}
    </FormEntry>
  );
}
