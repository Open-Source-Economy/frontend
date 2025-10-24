import * as React from "react";
import { cn } from "../../utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label ref={ref} className={cn("block text-brand-neutral-700 mb-2 font-medium", className)} {...props} />;
});

Label.displayName = "Label";

export { Label };
