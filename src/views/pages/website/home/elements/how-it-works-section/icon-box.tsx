interface IconBoxProps {
  icon: React.ReactNode;
  text: string;
  index: number;
  span?: boolean;
}

export function IconBox(props: IconBoxProps) {
  const getBorderClasses = () => {
    if (props.span) {
      switch (props.index % 4) {
        case 0:
          return "max-lg:right-0 md:border-l-2 md:rounded-bl-lg md:w-1/2 lg:left-1/2 lg:w-full";
        case 1:
          return "max-lg:left-0 max-lg:border-r-2 max-lg:rounded-br-lg md:w-1/2 lg:right-0 lg:border-l-2 lg:rounded-bl-lg lg:w-1/2";
        case 2:
          return "max-lg:right-0 max-lg:border-l-2 max-lg:rounded-bl-lg md:w-1/2 lg:left-0 lg:border-r-2 lg:rounded-br-lg lg:w-1/2";
        case 3:
          return "max-lg:left-0 md:border-r-2 md:rounded-br-lg md:w-1/2 lg:right-1/2 lg:w-full";
      }
    }
    return props.index % 2 === 0 ? "md:right-0 md:border-l-2 md:rounded-bl-lg md:w-1/2" : "md:left-0 md:border-r-2 md:rounded-br-lg md:w-1/2";
  };

  return (
    <div className="relative max-md:p-2 md:p-6 w-full">
      <div className="flex min-h-[120px] w-full items-center gap-4 relative overflow-hidden p-6 bg-white/[0.01] rounded-2xl">
        <div className="absolute h-[170px] w-[180px] left-1/2 -translate-x-1/2 bottom-[-178px] rounded-full bg-gradient-radial from-gradient-1 via-gradient-2 to-gradient-3 opacity-60 blur-[78px]" />
        <div className="flex size-12 items-center justify-center shrink-0">{props.icon}</div>
        <p className="text-base text-white">{props.text}</p>
      </div>
      {props.index >= 0 && (
        <>
          <div className={`hidden md:block absolute bottom-0 h-4 border-white/30 border-b-2 border-dashed ${getBorderClasses()}`} />
          <div className="hidden md:block absolute h-4 w-4 md:h-5 md:w-5 left-1/2 -translate-x-1/2 bottom-3.5 rounded-full bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 p-[1px]">
            <div className="h-full w-full rounded-full bg-theme-background" />
          </div>
        </>
      )}
    </div>
  );
}
