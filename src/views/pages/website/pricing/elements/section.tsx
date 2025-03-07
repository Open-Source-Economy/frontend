interface SectionProps {
  title: React.ReactNode;
  subtitle: string;
  children: React.ReactNode;
  span?: boolean;
  aos?: string;
}

export function Section(props: SectionProps) {
  return (
    <div className={`flex w-full flex-col items-center ${props.span ? "col-span-1 lg:col-span-2" : ""}`} data-aos={props.aos}>
      <div className="flex flex-col items-center w-full max-md:gap-2 md:gap-5">
        <h1 className="font-mich text-2xl md:text-4xl text-theme-pink flex items-center gap-3 text-center">{props.title}</h1>
        {props.span ? (
          <div className="flex flex-col lg:flex-row items-center max-md:gap-1 md:gap-3">
            <div className="hidden lg:block w-[124px] h-1 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 max-w-md rounded-full" />
            <p className="text-xl md:text-[26px] text-white font-medium text-center">{props.subtitle}</p>
            <div className="hidden lg:block w-[124px] h-1 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 max-w-md rounded-full" />
          </div>
        ) : (
          <p className="text-xl md:text-[26px] text-white font-medium text-center">{props.subtitle}</p>
        )}
        <div className={`w-full h-1 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 max-w-md rounded-full ${props.span ? "lg:opacity-0" : ""}`} />
      </div>
      <div className={`grid pt-6 relative w-full ${props.span ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2"}`}>
        {props.children}
        <div className="hidden md:block border-white/30 absolute top-0 left-0 md:left-1/2 md:translate-x-[calc(-50%+1px)] h-full w-[1px] border-l-2 border-dashed" />
      </div>
    </div>
  );
}
