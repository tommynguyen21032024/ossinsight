import { Tooltip, IconButton} from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  CodeIcon,
  GitCommitIcon,
  IssueOpenedIcon,
  LinkExternalIcon,
  PeopleIcon,
  RepoForkedIcon,
  StarIcon,
} from '@primer/octicons-react';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import Analyze from '../charts/Analyze';
import { useAnalyzeContext } from '../charts/context';
import { LineChart } from '../charts/line';
import Summary, { SummaryProps } from '../charts/summary';
import Section from '../Section';
import { H1, H2, P2 } from '../typography';

export const OverviewSection = forwardRef(function ({}, ref: ForwardedRef<HTMLElement>) {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const { comparingRepoName, repoName: name, comparingRepoId: vs } = useAnalyzeContext()

  const summaries: SummaryProps['items'] = useMemo(() => {
    return [{
      icon: <StarIcon fill='#FAC858'/>,
      title: <>Stars
        <Tooltip title="We only display the total number of stars and ignore developers' unstarring or restarring behaviors." sx={{marginBottom:"2px",color: 'text.secondary',}}>
          <IconButton size="small">
            <InfoOutlined fontSize='small' />
          </IconButton>
        </Tooltip>
      </>,
      query: 'stars-total',
      field: '*'
    },{
      icon: <GitCommitIcon fill='#D54562'/>,
      title: 'Commits',
      query: 'commits-total',
      field: '*'
    },{
      icon: <IssueOpenedIcon fill='#FDE494'/>,
      title: 'Issues',
      query: 'issues-total',
      field: '*'
    },{
      icon: <RepoForkedIcon fill='#E30C34'/>,
      title: 'Forks',
      data: repoInfo => repoInfo.forks,
    },{
      icon: <PeopleIcon fill='#F77C00'/>,
      title: 'PR Creators',
      query: 'pull-request-creators-total',
      field: '*'
    },{
      icon: <CodeIcon fill='#309CF2'/>,
      title: 'Language',
      data: repoInfo => repoInfo.language,
    }]
  }, [])

  return (
    <Section id='overview' ref={ref}>
      {
        comparingRepoName ? undefined : (
          <H1 sx={{ mt: 2 }}>
            <Box component='span' display='inline-flex' bgcolor='white' borderRadius='4px' padding='2px' alignItems='center' justifyContent='center' sx={{ verticalAlign: 'text-bottom'}} mr={1}>
              <img width="48" height="48" src={`https://github.com/${name.split('/')[0]}.png`} alt={name} />
            </Box>
            <a href={`https://github.com/${name}`} target="_blank">
              {name}
              &nbsp;
              <LinkExternalIcon size={28} verticalAlign="middle" />
            </a>
          </H1>
        )
      }
      <Grid container spacing={0} alignItems='center'>
        <Grid item xs={12} md={vs ? 7 : 6}>
          <Summary items={summaries} />
        </Grid>
        <Grid item xs={12} md={vs ? 5 : 6}>
          <Analyze query='stars-history'>
            <H2 id='stars-history' analyzeTitle display='none'>Stars History</H2>
            <P2 display='none'>The growth trend and the specific number of stars since the repository was established.</P2>
            <LineChart spec={{valueIndex: 'total', name: 'Stars', fromRecent: true}} aspectRatio={isSmall ? 16 / 9 : 4 / 3}/>
          </Analyze>
        </Grid>
      </Grid>
    </Section>
  )
})
