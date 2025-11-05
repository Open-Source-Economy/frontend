import React from "react";

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
  colorScheme: "primary" | "accent";
}

export function ServiceColumn({ title, description, mainIcon, services, colorScheme }: ServiceColumnProps) {
  const getColorClasses = (scheme: string) => {
    switch (scheme) {
      case "primary":
        return {
          gradientOverlay: "from-brand-primary/5 via-transparent to-brand-primary/10",
          glowEffect: "from-brand-primary/30 via-brand-primary/20 to-transparent",
          backgroundRings: "from-brand-primary/15 to-brand-primary/25",
          backgroundRings2: "from-brand-primary/10 to-brand-primary/20",
          mainGradient: "from-brand-primary via-brand-primary to-brand-primary-dark",
          shadowColor: "group-hover:shadow-brand-primary/25",
          particleColor: "bg-brand-primary-light",
          titleHover: "group-hover:text-brand-primary",
          accentLine: "from-brand-primary/40",
          itemIconBg: "from-brand-primary/10 to-brand-primary/20",
          itemIconHover: "group-hover/item:from-brand-primary group-hover/item:to-brand-primary-dark",
          itemTitleHover: "group-hover/item:text-brand-primary",
          itemBorderHover: "hover:border-brand-primary/20",
          itemBgHover: "hover:from-brand-primary/5 hover:to-brand-primary/10",
          accentLineItem: "via-brand-primary/20",
          arrowHover: "group-hover/item:text-brand-primary",
        };
      case "accent":
        return {
          gradientOverlay: "from-brand-accent/5 via-transparent to-brand-accent/10",
          glowEffect: "from-brand-accent/30 via-brand-accent/20 to-transparent",
          backgroundRings: "from-brand-accent/15 to-brand-accent/25",
          backgroundRings2: "from-brand-accent/10 to-brand-accent/20",
          mainGradient: "from-brand-accent via-brand-accent to-brand-accent-dark",
          shadowColor: "group-hover:shadow-brand-accent/25",
          particleColor: "bg-brand-accent-light",
          titleHover: "group-hover:text-brand-accent",
          accentLine: "from-brand-accent/40",
          itemIconBg: "from-brand-accent/10 to-brand-accent/20",
          itemIconHover: "group-hover/item:from-brand-accent group-hover/item:to-brand-accent-dark",
          itemTitleHover: "group-hover/item:text-brand-accent",
          itemBorderHover: "hover:border-brand-accent/20",
          itemBgHover: "hover:from-brand-accent/5 hover:to-brand-accent/10",
          accentLineItem: "via-brand-accent/20",
          arrowHover: "group-hover/item:text-brand-accent",
        };
      default:
        return getColorClasses("primary");
    }
  };

  const colors = getColorClasses(colorScheme);

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
                  className={`w-7 h-7 md:w-8 md:h-8 flex-shrink-0 bg-gradient-to-br ${colors.itemIconBg} rounded-lg flex items-center justify-center text-${colorScheme === "primary" ? "brand-primary" : colorScheme === "highlight" ? "brand-highlight" : "brand-accent"} ${colors.itemIconHover} group-hover/item:text-white transition-all duration-300 shadow-sm mt-0.5`}
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
