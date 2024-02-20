import { Chart, data, PriceAndChange } from "../Elements";
import { Link } from "react-router-dom";
import { ChartData, ValidRepository } from "../../model";
import React, { useEffect, useState } from "react";
import { ProjectHeader } from "../Elements/ProjectHeader";

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
              <ProjectHeader
                logo={repository.githubData.organization.avatar_url}
                name={repository.githubData.full_name}
                tokenCode={repository.tokenCode}
                tagline={repository.githubData.description}
                quoteCurrency={repository.serverData.quoteCurrency}
              />

              <PriceAndChange
                price={repository.serverData.price}
                priceChange={repository.serverData.priceChange}
                quoteCurrency={repository.serverData.quoteCurrency}
              />
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
