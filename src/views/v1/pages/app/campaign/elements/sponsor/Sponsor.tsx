import type React from "react";
import { useEffect } from "react";
import { SponsorCard } from "./SponsorCard";
import { getCardWidth } from "./utils";
import { DividerTitle } from "../../../../../components";
import { useSponsors } from "../../../../../hooks/useSponsors";
import { ProjectId } from "@open-source-economy/api-types";

interface SponsorProps {
  projectId: ProjectId;
}

export function Sponsor(props: SponsorProps) {
  const { sponsors, isLoading, error, reloadSponsors } = useSponsors(props.projectId);

  useEffect(() => {
    reloadSponsors();
  }, []);

  if (sponsors === null || sponsors.length === 0) {
    return <></>;
  } else {
    return (
      <section className="!px-4 2xl:!px-0">
        <div className="!pb-32 xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto">
          <DividerTitle title="Companies Supporting Us" />

          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-wrap !justify-center gap-2 1800:gap-3 w-full">
              {sponsors.map((card, index) => (
                <div key={index} className={`${getCardWidth(card.size)} ${card.position !== undefined ? `order-${card.position} lg:!order-none` : ""}`}>
                  {card.nestedCards ? (
                    <div className={`grid gap-2 1800:gap-3 min-h-full min-w-full ${card.nestedCards.length >= 3 ? "grid-cols-2" : "grid-cols-1"}`}>
                      {card.nestedCards.map((nestedCard, indexNested) => (
                        <SponsorCard key={`${index}-${indexNested}`} sponsor={card} className={`${nestedCard.className || ""}`} />
                      ))}
                    </div>
                  ) : (
                    <SponsorCard sponsor={card} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
