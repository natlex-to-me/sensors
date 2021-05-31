import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import {
  ChartDataSets,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { Label } from 'ng2-charts';

import { ChartTypeToggleOrder } from '../../../../../core/constants/chart-type-toggle-order';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() readonly dataSets: ChartDataSets[] = [];
  @Input() readonly filterByLabel = '';
  @Input() readonly labels: Label[] = [];
  @Input() readonly options = this._setChartOptions();

  readonly chartTypeToggleOrder = ChartTypeToggleOrder;
  dataSetsToShow = this.dataSets;
  nextChartTypeIndex = 1;
  currentChartType = <ChartType>ChartTypeToggleOrder[this.nextChartTypeIndex - 1];

  get nextChartType(): ChartType {
    return <ChartType>ChartTypeToggleOrder[this.nextChartTypeIndex];
  }

  ngOnChanges() {
    this._filterDataSetsByLabel();
  }

  toggleChartsType(index: number) {
    const enumMemberCountDivider = 2;
    const chartTypesNumber = Object.keys(ChartTypeToggleOrder).length / enumMemberCountDivider;

    this.currentChartType = <ChartType>ChartTypeToggleOrder[index];

    this.nextChartTypeIndex = index + 1;

    if (this.nextChartTypeIndex == chartTypesNumber) {
      this.nextChartTypeIndex = 0;
    }
  }

  private _filterDataSetsByLabel() {
    if (this.filterByLabel) {
      this.dataSetsToShow = this.dataSets.filter((i) => i.label == this.filterByLabel);
    } else {
      this.dataSetsToShow = this.dataSets;
    }
  }

  private _setChartOptions(): ChartOptions {
    return <ChartOptions>{
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'hour',
              tooltipFormat: 'HH:mm DD.MM',
              displayFormats: {
                hour: 'HH:mm DD.MM',
              },
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  }
}
