import React from "react";

type ColorScheme = "primary" | "accent";

interface ServiceItem {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface ServiceColumnProps {
  title: string;
  description: string;
  mainIcon: React.ReactNode;
  services: ServiceItem[];
  colorScheme: ColorScheme;
}

interface ColorClasses {
  gradientOverlay: string;
  glowEffect: string;
  backgroundRings: string;
  backgroundRings2: string;
  mainGradient: string;
  shadowColor: string;
  particleColor: string;
  titleHover: string;
  accentLine: string;
  itemIconBg: string;
  itemIconHover: string;
  itemTitleHover: string;
  itemBorderHover: string;
  itemBgHover: string;
  accentLineItem: string;
  arrowHover: string;
}

const createColorClasses = (scheme: ColorScheme): ColorClasses => {
  const brand = `brand-${scheme}`;
  const dark = `${brand}-dark`;
  const light = `${brand}-light`;
  const withAlpha = (value: number) => `${brand}/${value}`;

  return {
    gradientOverlay: `from-${withAlpha(5)} via-transparent to-${withAlpha(10)}`,
    glowEffect: `from-${withAlpha(30)} via-${withAlpha(20)} to-transparent`,
    backgroundRings: `from-${withAlpha(15)} to-${withAlpha(25)}`,
    backgroundRings2: `from-${withAlpha(10)} to-${withAlpha(20)}`,
    mainGradient: `from-${brand} via-${brand} to-${dark}`,
    shadowColor: `group-hover:shadow-${brand}/25`,
    particleColor: `bg-${light}`,
    titleHover: `group-hover:text-${brand}`,
    accentLine: `from-${brand}/40`,
    itemIconBg: `from-${withAlpha(10)} to-${withAlpha(20)}`,
    itemIconHover: `group-hover/item:from-${brand} group-hover/item:to-${dark}`,
    itemTitleHover: `group-hover/item:text-${brand}`,
    itemBorderHover: `hover:border-${withAlpha(20)}`,
    itemBgHover: `hover:from-${withAlpha(5)} hover:to-${withAlpha(10)}`,
    accentLineItem: `via-${withAlpha(20)}`,
    arrowHover: `group-hover/item:text-${brand}`,
  };
};

const COLOR_CLASSES: Record<ColorScheme, ColorClasses> = {
  primary: createColorClasses("primary"),
  accent: createColorClasses("accent"),
};

const ICON_TEXT_CLASS: Record<ColorScheme, string> = {
  primary: "text-brand-primary",
  accent: "text-brand-accent",
};

export function ServiceColumn({ title, description, mainIcon, services, colorScheme }: ServiceColumnProps) {
  const colors = COLOR_CLASSES[colorScheme];
  const iconTextColor = ICON_TEXT_CLASS[colorScheme];

  return (
    <div className="group relative">
      {/* Background gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradientOverlay} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      ></div>

      <div className="relative py-5 px-4 md:py-6 md:px-5 lg:py-8 lg:px-6 space-y-6 md:space-y-7 lg:space-y-8">
        <div className="text-center lg:text-left">
          <div className="relative w-20 h-20 mx-auto lg:mx-0 mb-8">
            {/* Animated glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${colors.glowEffect} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60 group-hover:opacity-100`}
            ></div>

            {/* Rotating background rings */}
            <div
              className={`absolute inset-1 bg-gradient-to-br ${colors.backgroundRings} rounded-2xl rotate-2 group-hover:rotate-6 transition-all duration-700 ease-out`}
            ></div>
            <div
              className={`absolute inset-0.5 bg-gradient-to-br ${colors.backgroundRings2} rounded-2xl -rotate-1 group-hover:-rotate-3 transition-all duration-500 ease-out`}
            ></div>

            {/* Main icon container */}
            <div
              className={`relative w-full h-full bg-gradient-to-br ${colors.mainGradient} rounded-2xl shadow-xl group-hover:shadow-2xl ${colors.shadowColor} transition-all duration-300 flex items-center justify-center border border-white/10`}
            >
              {/* Inner glow */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-60"></div>
              <div className="relative text-white drop-shadow-sm">{mainIcon}</div>
            </div>

            {/* Floating particles effect */}
            <div
              className={`absolute -top-1 -right-1 w-2 h-2 ${colors.particleColor} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-100`}
            ></div>
            <div
              className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 ${colors.particleColor} rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 delay-300`}
            ></div>
          </div>

          <div className="space-y-3">
            <h3 className={`font-semibold text-xl ${colors.titleHover} transition-colors duration-300 tracking-tight`}>{title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto lg:mx-0">{description}</p>

            {/* Subtle accent line */}
            <div
              className={`w-12 h-0.5 bg-gradient-to-r ${colors.accentLine} to-transparent mx-auto lg:mx-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200`}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={service.name} className="group/item relative overflow-hidden">
              <div
                className={`flex items-start gap-3 p-4 md:p-5 rounded-xl bg-gradient-to-r from-brand-neutral-50/50 to-transparent border border-brand-neutral-200/50 ${colors.itemBorderHover} hover:bg-gradient-to-r ${colors.itemBgHover} transition-all duration-300 hover:shadow-md`}
              >
                {/* Icon container */}
                <div
                  className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 bg-gradient-to-br ${colors.itemIconBg} rounded-lg flex items-center justify-center ${iconTextColor} ${colors.itemIconHover} group-hover/item:text-white transition-all duration-300 shadow-sm mt-0.5`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="mb-1.5">
                    <span className={`font-medium text-foreground ${colors.itemTitleHover} transition-colors duration-200`}>{service.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Subtle accent line */}
              <div
                className={`absolute bottom-0 left-5 right-5 h-px bg-gradient-to-r from-transparent ${colors.accentLineItem} to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
