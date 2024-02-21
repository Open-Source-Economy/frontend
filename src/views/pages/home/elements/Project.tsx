import { PriceAndChange } from "../../../../components";
import { Link } from "react-router-dom";
import { ValidRepository } from "../../../../model";
import React from "react";
import { ProjectHeader } from "../../../../components";
import { Chart } from "./Chart";

export interface ProjectProps {
  repository: ValidRepository;
}

export function Project({ repository }: ProjectProps) {
  return (
    <>
      <Link to={`/swap/${repository.onChainData.owner}/${repository.onChainData.repository}`} state={{ project: repository }} className="text-decoration-none">
        <div className="card__project">
          <div className="card__head pt-3 pb-4 px-md-4">
            <div className="row mx-0 align-items-center flex-md-row gap-lg-0 gap-3">
              <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-9 col-xxl-8">
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

          <div className="chartheight">
            <Chart chartData={repository.serverData.points} />
          </div>
        </div>
      </Link>
    </>
  );
}
