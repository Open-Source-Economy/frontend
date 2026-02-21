import offerLeftLinear from "src/assets/v1/offer-linear.webp";
import rightLinear from "src/assets/v1/right-linear-bg.webp";
import React from "react";
import * as model from "@open-source-economy/api-types";
import { GetProjectServicesResponse, OwnerId, ProjectId, RepositoryId, ServiceType } from "@open-source-economy/api-types";
import { ServiceCard } from "./ServiceCard";
import { ServiceButton } from "../ServiceButton";
import { projectHooks } from "src/api";

const DEFAULT_SERVICES: GetProjectServicesResponse = {
  services: [ServiceType.DEVELOPMENT],
  comingSoonServices: [ServiceType.SUPPORT, ServiceType.SECURITY_AND_COMPLIANCE, ServiceType.ADVISORY],
};

interface ServicesProps {
  projectId?: ProjectId;
  buttons?: { [key in ServiceType]?: ServiceButton };
}

export function Services(props: ServicesProps) {
  const serviceParams = props.projectId
    ? {
        owner: props.projectId instanceof OwnerId ? props.projectId.login : props.projectId.ownerId.login,
        repo: props.projectId instanceof RepositoryId ? props.projectId.name : undefined,
      }
    : { owner: "" };
  const { data: projectServicesData, error } = projectHooks.useProjectServicesQuery(serviceParams, {});
  const projectServices = projectServicesData || DEFAULT_SERVICES;

  return (
    <section className="relative pt-6 xl:pt-10 pb-10 xl:pb-16">
      <img src={rightLinear} alt="" className="absolute pointer-events-none object-cover right-0 max-w-[671px] -z-10 top-[20%]" />
      <img src={offerLeftLinear} alt="" className="absolute max-w-[970px] w-full -z-10 pointer-events-none left-[-2%] top-0 md:-top-[15%] xl:-top-[26%]" />
      <div className="px-4 max-w-[1164px] 2xl:max-w-[1250px] 3xl:max-w-[1440px] mx-auto relative z-20">
        <div className="grid lg:place-items-start place-items-center grid-cols-1 900:grid-cols-2 gap-5 3xl:gap-10">
          {projectServices?.services.map((serviceType, index) => <ServiceCard key={index} serviceType={serviceType} button={props.buttons?.[serviceType]} />)}
          {projectServices?.comingSoonServices.map((serviceType, index) => (
            <ServiceCard key={index} serviceType={serviceType} comingSoon={true} button={props.buttons?.[serviceType]} />
          ))}
        </div>
      </div>
    </section>
  );
}
