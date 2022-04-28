import {createContext, MutableRefObject, RefCallback, useContext} from 'react';
import {AsyncData, RemoteData} from '../components/RemoteCharts/hook';
import EChartsReact from 'echarts-for-react';

export interface AnalyzeChartContextProps<T = unknown> {
  title?: string;
  description?: string;
  hash?: string; // url hash
  echartsRef?: MutableRefObject<EChartsReact>;
  data: AsyncData<RemoteData<unknown, T>>;
  compareData: AsyncData<RemoteData<unknown, T>>;
  headingRef?: RefCallback<HTMLHeadingElement>;
  descriptionRef?: RefCallback<HTMLParagraphElement>;
}

const DEFAULT_DATA = {data: undefined, loading: false, error: undefined};

export const AnalyzeChartContext = createContext<AnalyzeChartContextProps>({
  title: undefined,
  hash: undefined,
  description: undefined,
  data: DEFAULT_DATA,
  compareData: DEFAULT_DATA,
  headingRef: undefined,
  descriptionRef: undefined,
});

export function useAnalyzeChartContext<T>(): AnalyzeChartContextProps<T> {
  return useContext(AnalyzeChartContext) as AnalyzeChartContextProps<T>;
}

export interface AnalyzeContextProps {
  repoName: string;
  comparingRepoName?: string;
  repoId?: number;
  comparingRepoId?: number;
}

export const AnalyzeContext = createContext<AnalyzeContextProps>({
  repoName: '',
  comparingRepoName: undefined,
  repoId: undefined,
  comparingRepoId: undefined,
});

export function useAnalyzeContext() {
  return useContext(AnalyzeContext);
}
