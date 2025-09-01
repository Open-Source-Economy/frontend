import clsx from "clsx";

export const formLabel = "font-montserrat font-normal text-base leading-[150%] text-white opacity-60";
export const formError = "font-montserrat font-normal text-base leading-[150%] text-[#FF8C8C] self-stretch";
export const formContainer = "flex flex-col items-start gap-2 w-full";

export function wrapperBorder(options: { hasError: boolean; isActiveOrFilled: boolean }): string {
  const { hasError, isActiveOrFilled } = options;
  if (hasError) return "border !border-[#FF8C8C]";
  if (isActiveOrFilled) return "border border-white";
  return "border-0";
}

export function buildInputWrapperClass(base: string, options: { hasError: boolean; isActiveOrFilled: boolean }): string {
  return clsx(base, wrapperBorder(options));
}


