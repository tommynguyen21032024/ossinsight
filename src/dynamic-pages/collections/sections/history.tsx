import { Legend, LineChart, Title, Toolbox } from '@djagger/echartsx';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import React, { useContext, useMemo } from 'react';
import { withInViewContainer } from '../../../components/InViewContainer';
import Watermark from '../components/Watermark';
import CollectionsContext from '../context';
import { useCollectionHistory } from '../hooks/data';
import { useDimensionTabs } from '../hooks/useTabs';
import { withRemote } from '../hooks/withRemote';
import { H2, P1 } from './typograpy';

use(CanvasRenderer);

const df = new Intl.DateTimeFormat(['en-US'], {
  month: 'short',
  year: 'numeric',
});
const formatTime = (name: string): string => df.format(new Date(name));

export default withInViewContainer(function HistorySection() {
  const { collection } = useContext(CollectionsContext);

  const { dimension, tabs } = useDimensionTabs();
  const asyncData = useCollectionHistory(collection?.id, dimension.key);

  const top10Names = useMemo(() => {
    if (!asyncData.data) {
      return []
    }
    const maxTime = asyncData.data.data.reduce((set, item) => {
      return set < item.event_month ? item.event_month : set
    }, '')
    return asyncData.data.data
      .filter(item => item.event_month === maxTime)
      .sort((a, b) =>b.total - a.total)
      .slice(0, 10)
      .map(item => item.repo_name)
  }, [asyncData.data])

  const top10Data: typeof asyncData = useMemo(() => {
    if (!asyncData.data) {
      return asyncData
    }
    const top10NamesSet = top10Names
      .reduce((set, item) => set.add(item), new Set<string>())
    return {
      data: {
        ...asyncData.data,
        data: asyncData.data.data.filter(item => top10NamesSet.has(item.repo_name)),
      },
      loading: asyncData.loading,
      error: asyncData.error,
    }
  }, [asyncData.data, asyncData.error, asyncData.loading, top10Names])

  return (
    <section>
      <H2>Historical Trending</H2>
      <P1>Historical trending since 2011.</P1>
      {tabs}
      <br />
      {withRemote(
        top10Data,
        data => (
          <LineChart
            theme="dark"
            renderer="canvas"
            data={data.data}
            height={480}
            fields={{ name: 'repo_name', time: 'event_month', value: 'total' }}
            formatTime={formatTime}
          >
            <Title id='title' top={0} text={`Top 10 ${collection.name} - ${dimension.title}`}/>
            <Watermark left='10%' top='10%' />
            <Toolbox feature={{ saveAsImage: { title: '' } }}/>
            <Legend top='center' left='10%' orient='vertical' type='scroll' data={top10Names}/>
          </LineChart>
        ),
        () => (
          <Box height={480}>
            <Skeleton variant="text" width="70%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="90%" sx={{ my: 1 }} />
          </Box>
        ),
      )}
    </section>
  );
});
