import offerLeftLinear from "src/assets/v1/offer-linear.webp";
import rightLinear from "src/assets/v1/right-linear-bg.webp";
import React from "react";
import * as dto from "@open-source-economy/api-types";
import { ServiceCard } from "./ServiceCard";
import { ServiceButton } from "../ServiceButton";
import { projectHooks } from "src/api";
import { ProjectId, getOwnerFromProjectId, getRepoFromProjectId } from "src/utils/local-types";

const DEFAULT_SERVICES: dto.GetProjectServicesResponse = {
  services: [dto.ServiceType.DEVELOPMENT],
  comingSoonServices: [dto.ServiceType.SUPPORT, dto.ServiceType.SECURITY_AND_COMPLIANCE, dto.ServiceType.ADVISORY],
};

interface ServicesProps {
  projectId?: ProjectId;
  buttons?: { [key in dto.ServiceType]?: ServiceButton };
}

export function Services(props: ServicesProps) {
  const serviceParams = props.projectId
    ? {
        owner: getOwnerFromProjectId(props.projectId),
        repo: getRepoFromProjectId(props.projectId),
      }
    : { owner: "" };
  const { data: projectServicesData, error: _error } = projectHooks.useProjectServicesQuery(serviceParams, {});
  const projectServices = projectServicesData || DEFAULT_SERVICES;

  return (
    <section className="relative pt-6 xl:pt-10 pb-10 xl:pb-16">
      <img
        src={rightLinear}
        alt=""
        className="absolute pointer-events-none object-cover right-0 max-w-[671px] -z-10 top-[20%]"
      />
      <img
        src={offerLeftLinear}
        alt=""
        className="absolute max-w-[970px] w-full -z-10 pointer-events-none left-[-2%] top-0 md:-top-[15%] xl:-top-[26%]"
      />
      <div className="px-4 max-w-[1164px] 2xl:max-w-[1250px] 3xl:max-w-[1440px] mx-auto relative z-20">
        <div className="grid lg:place-items-start place-items-center grid-cols-1 900:grid-cols-2 gap-5 3xl:gap-10">
          {projectServices?.services.map((serviceType, index) => (
            <ServiceCard key={index} serviceType={serviceType} button={props.buttons?.[serviceType]} />
          ))}
          {projectServices?.comingSoonServices.map((serviceType, index) => (
            <ServiceCard
              key={index}
              serviceType={serviceType}
              comingSoon={true}
              button={props.buttons?.[serviceType]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
