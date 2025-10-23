import { PageWrapper } from "../../PageWrapper";
import { Services } from "src/views/v1/components/service";
import { Maintainers } from "src/views/v1/pages/app/project/elements/Maintainers";
import { Highlight } from "src/views/v1/pages/app/project/elements/highlight/HighLight";
import React, { useEffect } from "react";
import { ProjectTitle } from "src/views/v1/components/title";
import { WhyNeedFunding } from "./elements";
import { H3WithSubtitle } from "src/views/v1/components/title/H3WithSubtitle";
import { config, Env } from "src/ultils";
import { Button } from "src/views/v1/components";
import { Link } from "react-router-dom";
import { useProjectContext } from "../../../layout/ProjectRoute";
import { useProject } from "../../../hooks/useProject";
import { BookACallButton } from "../../../components/elements/BookACallButton";
import { Audience } from "../../../../Audience";
import { paths } from "src/paths";
import { getDescription } from "../../../../../services/data/disclaimers/pekkoDisclaimer";

interface ProjectProps {}

export function Project(props: ProjectProps) {
  const { projectId } = useProjectContext();
  const { project, error, reloadProject } = useProject(projectId);

  // TODO: to be refactored
  const disclaimer = getDescription(projectId)?.disclaimer;

  useEffect(() => {
    reloadProject();
  }, []);

  return (
    <PageWrapper>
      <section className="overflow-hidden">
        {project && <ProjectTitle project={project} displayProjectDescription={false} subtitle="We're the experts who build, debug, and maintain it" />}
        <H3WithSubtitle title="What do we offer?" subtitle="Get hourly credits – Unlock exclusive benefits" />

        <Services projectId={projectId} />

        <section className="!px-4 relative flex flex-col">
          <div className="flex justify-center z-20 relative flex-wrap items-center !gap-4 !mt-5 md:!mt-7 xl:mt-11">
            <BookACallButton audience={Audience.USER} level={"SECONDARY"} className="hover:!text-white !text-primary-user !capitalize" />

            <Button audience="ALL" level="PRIMARY" size="LARGE" className="!capitalize" asChild>
              {/*<Link to={paths.campaign(projectId)}>Support Us</Link>*/}
              <Link to={paths.PRICING}>Get Started</Link>
            </Button>
          </div>
        </section>

        {config.env !== Env.Production && <Highlight />}

        <div className="pt-20 3xl:pt-40">
          <Maintainers projectId={projectId} />
        </div>

        <WhyNeedFunding projectId={projectId} />
      </section>

      {disclaimer && (
        <div className="pt-20 3xl:pt-40">
          <div className="max-lg:px-4 flex flex-col items-center text-center text-white mb-40">
            <p>{disclaimer}</p>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
