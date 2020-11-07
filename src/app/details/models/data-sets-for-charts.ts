import { ResourceTypes } from '../../core/constants/resource-types';

export type DataSetsForCharts = {
  [key in ResourceTypes]: number[];
};
