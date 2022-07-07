import React, { ForwardedRef, forwardRef, useContext, useMemo } from "react";
import Section, { SectionHeading } from "../../../components/Section";
import InViewContext from "../../../components/InViewContext";
import { useAnalyzeUserContext } from "../charts/context";
import { usePersonalData } from "../hooks/usePersonal";
import { Axis, BarSeries, Dataset, EChartsx, LineSeries, Once, Title } from "@djagger/echartsx";
import { Common } from "../charts/Common";
import { green, lightGreen, purple, redColors } from "../colors";
import ChartWrapper from "../charts/ChartWrapper";

export default forwardRef(function CodeSection({}, ref: ForwardedRef<HTMLElement>) {
  return (
    <Section id='code' ref={ref}>
      <Code />
    </Section>
  );
});

const Code = () => {
  const { inView } = useContext(InViewContext);
  const { userId } = useAnalyzeUserContext();

  return (
    <>
      <SectionHeading
        title="Code"
        description="All contributions measured with code related events since 2011.  For example, the history of code submits which includes the pushes and commits, the pull request history which includes merged / un-merged pull requests, the size of pull requests and the code line changes in pull requests."
      />
      <CodeSubmitHistory userId={userId} show={inView} />
      <PullRequestHistory userId={userId} show={inView} />
      <PullRequestSize userId={userId} show={inView} />
      <LineOfCodes userId={userId} show={inView} />
    </>
  );
};

const CodeSubmitHistory = ({ userId, show }: ModuleProps) => {
  const { data } = usePersonalData('personal-pushes-and-commits', userId, show);

  return (
    <ChartWrapper title="Code Submit History">
      <EChartsx init={{ height: 400, renderer: 'canvas' }} theme="dark">
        <Once>
          <Common />
          <Axis.Time.X min="2011-01-01" />
          <Axis.Value.Y />
          <BarSeries encode={{ x: 'event_month', y: 'pushes' }} name="push" color={green} barMaxWidth={10} />
          <BarSeries encode={{ x: 'event_month', y: 'commits' }} name="commit" color={lightGreen} barMaxWidth={10} />
        </Once>
        <Dataset source={data?.data ?? []} />
      </EChartsx>
    </ChartWrapper>
  );
};

const PullRequestHistory = ({ userId, show }: ModuleProps) => {
  const { data } = usePersonalData('personal-pull-request-action-history', userId, show);

  return (
    <ChartWrapper title="Pull Request History">
      <EChartsx init={{ height: 400, renderer: 'canvas' }} theme="dark">
        <Once>
          <Common />
          <Axis.Time.X min="2011-01-01" />
          <Axis.Value.Y />
          <LineSeries datasetId="source" encode={{ x: 'event_month', y: 'opened_prs' }} name="Opened PRs" color={green}
                      areaStyle={{ opacity: 0.15 }} symbolSize={0} lineStyle={{ width: 1 }} />
          <LineSeries datasetId="source" encode={{ x: 'event_month', y: 'merged_prs' }} name="Merged PRs" color={purple}
                      areaStyle={{ opacity: 0.15 }} symbolSize={0} lineStyle={{ width: 1 }} />
        </Once>
        <Dataset id="original" source={data?.data ?? []} />
        {data?.data.length ? <Dataset id="source" fromDatasetId="original"
                         transform={{
                           type: 'sort',
                           config: { dimension: 'event_month', order: 'asc' },
                         }} /> : undefined}
      </EChartsx>
    </ChartWrapper>
  );
};

const PullRequestSize = ({ userId, show }: ModuleProps) => {
  const { data } = usePersonalData('personal-pull-request-size-history', userId, show);

  return (
    <ChartWrapper title="Pull Request Size">
      <EChartsx init={{ height: 400, renderer: 'canvas' }} theme="dark">
        <Once>
          <Common />
          <Axis.Time.X min="2011-01-01" />
          <Axis.Value.Y />
          {['xs', 's', 'm', 'l', 'xl', 'xxl'].reverse().map((size, i) => (
            <BarSeries id={size} key={size} encode={{ x: 'event_month', y: size }} name={size} stack="total"
                       color={redColors.slice(0, 6).reverse()[i]} />
          ))}
        </Once>
        <Dataset source={data?.data ?? []} />
      </EChartsx>
    </ChartWrapper>
  );
};

const LineOfCodes = ({ userId, show }: ModuleProps) => {
  const { data } = usePersonalData('personal-pull-request-code-changes-history', userId, show);

  const mappedData = useMemo(() => {
    return data?.data.map(({ additions, deletions, event_month, changes }) => ({
      additions,
      deletions: -deletions,
      changes,
      event_month,
    })) ?? [];
  }, [data]);

  return (
    <ChartWrapper title="Lines of changes in PRs">
      <EChartsx init={{ height: 400, renderer: 'canvas' }} theme="dark">
        <Once>
          <Common />
          <Axis.Time.X min="2011-01-01" />
          <Axis.Value.Y id="code" />

          <LineSeries color="#57ab5a" id="add" yAxisId="code" encode={{ x: 'event_month', y: 'additions' }}
                      name="Additions"
                      areaStyle={{}} symbolSize={0} lineStyle={{ width: 0 }} />
          <LineSeries color="#e5534b" id="del" yAxisId="code" encode={{ x: 'event_month', y: 'deletions' }}
                      name="Deletions"
                      areaStyle={{}} symbolSize={0} lineStyle={{ width: 0 }} />
        </Once>
        <Dataset source={mappedData} />
      </EChartsx>
    </ChartWrapper>
  );
};

type ModuleProps = {
  userId: number
  show: boolean
}
