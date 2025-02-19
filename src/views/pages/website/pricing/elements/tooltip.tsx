import * as Tooltip from "@radix-ui/react-tooltip";
import { MdInfo } from "react-icons/md";

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <span>
            <MdInfo className="h-3.5 w-3.5 text-white/70 hover:text-white transition" />
          </span>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="max-w-xs rounded-lg bg-theme-pink px-3 py-2 text-xs text-white shadow-lg" sideOffset={5} side="bottom">
            {content}
            <Tooltip.Arrow className="fill-theme-pink" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
