import React, { type ReactNode } from "react";
import { CheckIcon } from "src/Utils/Icons";

interface ListItemProps {
  children: string | ReactNode;
}

export function ListItem(props: ListItemProps) {
  return (
    <div className="flex !items-start !gap-3 3xl:!gap-4 !px-4">
      <div className="2xl:w-7 h-5 !max-w-5 min-w-5 2xl:min-w-7 2xl:!max-w-7 2xl:h-7 mt-1.5 2xl:mt-0.5">
        <CheckIcon />
      </div>
      <h2 className="text-base sm:text-xl !leading-[145%] 3xl:text-2xl">{props.children}</h2>
    </div>
  );
}
