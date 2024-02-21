import * as React from "react";
import { ValidRepository } from "../../../../model";
import { ProjectHeader } from "../../../../components";
import { PriceAndChange } from "../../../../components";

interface ProjectBannerProps {
  repository: ValidRepository;
}

export function ProjectBanner({ repository }: ProjectBannerProps) {
  return (
    <div className="row mx-0 justify-content-center pt-5  mt-3 mt-lg-5">
      <div className="col-lg-7">
        <div className="row mx-0 align-items-center gap-lg-0 gap-3 flex-md-row flex-column">
          <div className=" col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-8">
            <ProjectHeader
              logo={repository.githubData.organization.avatar_url}
              name={repository.githubData.full_name}
              tokenCode={repository.tokenCode}
              tagline={repository.githubData.description}
              quoteCurrency={repository.serverData.quoteCurrency}
            />
          </div>

          <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
            <PriceAndChange
              price={repository.serverData.price}
              priceChange={repository.serverData.priceChange}
              quoteCurrency={repository.serverData.quoteCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
