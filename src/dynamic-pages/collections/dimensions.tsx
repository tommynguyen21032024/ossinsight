import Box from '@mui/material/Box';
import { GitMergeIcon, IssueOpenedIcon, PersonIcon, StarIcon } from '@primer/octicons-react';
import React from 'react';
import styles from '../analyze/styles.module.css';

export type Dimension = {
  icon?: JSX.Element
  title: string
  key: 'stars' | 'pull-requests' | 'pull-request-creators' | 'issues'
  prefix?: string
}

const PrCreatorIcon = ({ size }: { size: number }) => (
  <Box display='inline-block' position='relative'>
    <PersonIcon size={size} />
    <GitMergeIcon size={size / 3} className={styles.subIcon} />
  </Box>
)

const dimensions: Dimension[] = [
  { title: 'Stars', key: 'stars', prefix: 'stars', icon: <StarIcon size={18} /> },
  { title: 'Pull Requests', key: 'pull-requests', prefix: 'prs', icon: <GitMergeIcon size={18}/>},
  { title: 'Pull Request Creators', key: 'pull-request-creators', icon: <PrCreatorIcon size={18}/> },
  { title: 'Issues', key: 'issues', prefix: 'issues', icon: <IssueOpenedIcon size={18}/>},
]

export default dimensions
