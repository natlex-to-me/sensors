import { ResourceTypes } from '../../core/constants/resource-types';

type DataSetsForTableType = {
  [key in ResourceTypes]: number;
};

export interface DataSetsForTable extends DataSetsForTableType {
  date: string;
}
