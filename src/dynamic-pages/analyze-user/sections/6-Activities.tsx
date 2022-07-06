import React, { ForwardedRef, forwardRef, useCallback, useContext, useMemo, useState } from "react";
import Section from "../../../components/Section/Section";
import InViewContext from "../../../components/InViewContext";
import { useAnalyzeUserContext } from "../charts/context";
import {
  ContributionActivityRange, contributionActivityRanges,
  ContributionActivityType, contributionActivityTypes,
  usePersonalContributionActivities,
  usePersonalData,
  useRange,
} from "../hooks/usePersonal";
import { Axis, Dataset, EChartsx, Grid, Legend, Once, Title, Tooltip, withBaseOption } from "@djagger/echartsx";
import { Common } from "../charts/Common";
import { useDimension } from "../hooks/useDimension";
import { ScatterSeriesOption } from "echarts/charts";
import { primary } from "../colors";
import { TooltipFormatterCallback } from "echarts/types/dist/shared";
import Box from "@mui/material/Box";
import { InputLabel, Select, useEventCallback } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import { SectionHeading } from "../../../components/Section";
import ChartWrapper from "../charts/ChartWrapper";

export default forwardRef(function ActivitiesSection({}, ref: ForwardedRef<HTMLElement>) {
  return (
    <Section id='activities' ref={ref}>
      <SectionHeading
        title="Contribution Activities in different repositories"
        description={<>All personal activities happened on <b>all public repositories</b> in GitHub since 2011. You can check each specific activity type by type with a timeline.</>}
      />
      <Activities />
    </Section>
  );
});

const Activities = () => {
  const { inView } = useContext(InViewContext);
  const { userId } = useAnalyzeUserContext();

  return (
    <>
      <ActivityChart show={inView} userId={userId} />
    </>
  );
};

const Scatter = withBaseOption<ScatterSeriesOption>('series', { type: 'scatter' }, 'Scatter')

const ActivityChart = ({ userId, show }: ModuleProps) => {
  const [type, setType] = useState<ContributionActivityType>('all')
  const [period, setPeriod] = useState<ContributionActivityRange>('last_28_days')

  const { data } = usePersonalContributionActivities(userId, type, period, show)
  const repoNames = useDimension(data?.data ?? [], 'repo_name')

  const [min, max] = useRange(period)

  const typeString = useMemo(() => contributionActivityTypes.find(({ key }) => type === key)?.label, [type])
  const periodString = useMemo(() => contributionActivityRanges.find(({ key }) => period === key)?.label, [period])

  const tooltipFormatter: TooltipFormatterCallback<any> = useCallback(({ value }) => {
    return `${value.event_period} ${value.cnt} ${typeString} on ${value.repo_name}`
  }, [typeString])

  const handleTypeChange = useEventCallback((e: SelectChangeEvent<ContributionActivityType>) => {
    setType(e.target.value as ContributionActivityType)
  })
  const handlePeriodChange = useEventCallback((e: SelectChangeEvent<ContributionActivityRange>) => {
    setPeriod(e.target.value as ContributionActivityRange)
  })

  const title = useMemo(() => {
    return `${typeString} in ${periodString}`
  }, [typeString, periodString])

  return (
    <ChartWrapper title={title}>
      <Box mb={2}>
        <FormControl variant="standard" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="event-type-selector-label">Contribution type</InputLabel>
          <Select id="event-type-selector-label" value={type} onChange={handleTypeChange}>
            {contributionActivityTypes.map(({ key, label }) => (
              <MenuItem key={key} value={key}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" size="small" sx={{ minWidth: 120, ml: 2 }}>
          <InputLabel id="event-type-selector-label">Period</InputLabel>
          <Select id="event-type-selector-label" value={period} onChange={handlePeriodChange}>
            {contributionActivityRanges.map(({ key, label }) => (
              <MenuItem key={key} value={key}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <EChartsx init={{ height: 240 + 30 * repoNames.length, renderer: 'canvas' }} theme="dark">
        <Once>
          <Legend type="scroll" orient="horizontal" top={32}/>
          <Grid top={64} left={8} right={8} bottom={8} containLabel/>
          <Tooltip trigger="item" />
          <Axis.Category.Y axisTick={{ show: false }} axisLine={{ show: false }} />
        </Once>
        <Title text={title} left="center"/>
        <Axis.Time.X min={min} max={max} />
        <Scatter encode={{ x: 'event_period', y: 'repo_name', value: 'cnt' }} symbolSize={(val) => Math.min(val.cnt * 5, 60)} tooltip={{ formatter: tooltipFormatter }} color={primary} />
        <Dataset source={data?.data ?? []}/>
      </EChartsx>
    </ChartWrapper>
  );
};

type ModuleProps = {
  userId: number
  show: boolean
}
