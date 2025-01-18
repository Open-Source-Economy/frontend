import { BaseURL, campaignPath } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import { ProjectServices } from "src/views/pages/app/project/elements/service";
import { Maintainers } from "src/views/pages/app/project/elements/Maintainers";
import { Highlight } from "src/views/pages/app/project/elements/highlight/HighLight";
import React, { useEffect } from "react";
import { ProjectTitle } from "src/components/title";
import { WhyNeedFunding } from "./elements";
import { TitleWithSubtitle } from "src/components/title/TitleWithSubtitle";
import { config, Env } from "../../../../ultils";
import { Button, ExternalLink } from "../../../../components";
import { Link } from "react-router-dom";
import { TelephoneIcon } from "../../../../Utils/Icons";
import { useProjectContext } from "../../../layout/ProjectRoute";
import { useProject } from "../../../hooks/useProject";

interface ProjectProps {}

export function Project(props: ProjectProps) {
  const { projectId } = useProjectContext();
  const { project, error, reloadProject } = useProject(projectId);

  useEffect(() => {
    reloadProject();
  }, []);

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="overflow-hidden">
        {project && <ProjectTitle project={project} displayProjectDescription={false} subtitle="We're the experts who build, debug, and maintain it" />}
        <TitleWithSubtitle title="What do we offer?" subtitle="Support us and unlock exclusive benefits" />
        <ProjectServices projectId={projectId} />

        {/*pb-16 3xl:pb-24: TODO: make variable for padding between sections */}
        <section className="!px-4 relative flex flex-col">
          <div className="flex justify-center z-20 relative flex-wrap items-center !gap-4 !mt-5 md:!mt-7 xl:mt-11">
            <Button
              audience="USER"
              level={"SECONDARY"}
              size={"LARGE"}
              className="hover:!text-white !text-primary-user !capitalize"
              icon={<TelephoneIcon />}
              asChild
            >
              <ExternalLink href="https://calendly.com/lauriane-m/open-source-economy" underline={false}>
                Book a Call
              </ExternalLink>
            </Button>

            <Button audience="ALL" level="PRIMARY" size="LARGE" className="!capitalize" asChild>
              <Link to={campaignPath(projectId)}>Support Us</Link>
            </Button>
          </div>
        </section>

        {/*<BookACall />*/}
        {config.env !== Env.Production && <Highlight />}

        <section className="pt-20 3xl:pt-40">
          <Maintainers projectId={projectId} />
        </section>
        <WhyNeedFunding projectId={projectId} />
      </section>
    </PageWrapper>
  );
}
