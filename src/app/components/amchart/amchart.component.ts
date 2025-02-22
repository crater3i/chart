import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { HttpClient } from '@angular/common/http';
import { StockChart } from '@amcharts/amcharts5/.internal/charts/stock/StockChart';
import { StockPanel } from '@amcharts/amcharts5/.internal/charts/stock/StockPanel';
import { StockLegend } from '@amcharts/amcharts5/.internal/charts/stock/StockLegend';
import { interval } from 'rxjs';

@Component({
  selector: 'app-amchart',
  templateUrl: './amchart.component.html',
  styleUrls: ['./amchart.component.scss'],
  standalone: true,
  imports: []
})
export class AmchartComponent implements OnInit {
  private BASE_URL: string = `https://min-api.cryptocompare.com/data`
  private API_KEY: string = 'e26ca12fcad2c55de5cd9620fb875261c509ead99ecfeb2cfd595f1340d39e48'
  chartData: any[] = [];
  chart: any;
  series: any;
  sbseries: any;
  dataSubscription: any;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  fetchOHLC(): void {
    const url = `${this.BASE_URL}/histohlc?fsym=BTC&tsym=USD&limit=1000&api_key=${this.API_KEY}`
    this.http.get(url).subscribe({
      next: (data: any) => {
        console.log('data', data)
      },
      error: err => {
        console.log(err)
      }
    })
  }

  // ngOnInit(): void {
  //   this.chartData = this.generateInitialChartData(); // Initialize chartData here

  //   const root = am5.Root.new('chartdiv');
  //   const myTheme = am5.Theme.new(root);
  //   myTheme.rule('Grid', ['minor', 'scrollbar']).setAll({
  //     visible: false
  //   });
  //   root.setThemes([
  //     am5themes_Animated.new(root),
  //     myTheme
  //   ]);

  //   let data = this.chartData;

  //   let chart = root.container.children.push(
  //     am5xy.XYChart.new(root, {
  //       focusable: true,
  //       panX: true,
  //       panY: true,
  //       wheelX: 'panX',
  //       wheelY: 'zoomX',
  //       paddingLeft: 0
  //     })
  //   );

  //   let xAxis = chart.xAxes.push(
  //     am5xy.DateAxis.new(root, {
  //       maxDeviation: 0.5,
  //       groupData: true,
  //       baseInterval: { timeUnit: 'day', count: 1 },
  //       renderer: am5xy.AxisRendererX.new(root, {
  //         pan: 'zoom',
  //         minorGridEnabled: true
  //       })
  //     })
  //   );

  //   let yAxis = chart.yAxes.push(
  //     am5xy.ValueAxis.new(root, {
  //       maxDeviation: 1,
  //       renderer: am5xy.AxisRendererY.new(root, { pan: 'zoom' })
  //     })
  //   );

  //   let color = root.interfaceColors.get('background');

  //   this.series = chart.series.push( // Assign value to this.series
  //     am5xy.CandlestickSeries.new(root, {
  //       fill: color,
  //       calculateAggregates: true,
  //       stroke: color,
  //       name: 'MDXI',
  //       xAxis: xAxis,
  //       yAxis: yAxis,
  //       valueYField: 'close',
  //       openValueYField: 'open',
  //       lowValueYField: 'low',
  //       highValueYField: 'high',
  //       valueXField: 'date',
  //       lowValueYGrouped: 'low',
  //       highValueYGrouped: 'high',
  //       openValueYGrouped: 'open',
  //       valueYGrouped: 'close',
  //       legendValueText: 'open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}',
  //       legendRangeValueText: '{valueYClose}'
  //     })
  //   );

  //   this.series.columns.template.get('themeTags').push('pro');

  //   let cursor = chart.set(
  //     'cursor',
  //     am5xy.XYCursor.new(root, {
  //       xAxis: xAxis
  //     })
  //   );
  //   cursor.lineY.set('visible', false);

  //   chart.leftAxesContainer.set('layout', root.verticalLayout);

  //   let scrollbar = am5xy.XYChartScrollbar.new(root, {
  //     orientation: 'horizontal',
  //     height: 50
  //   });
  //   chart.set('scrollbarX', scrollbar);

  //   let sbxAxis = scrollbar.chart.xAxes.push(
  //     am5xy.DateAxis.new(root, {
  //       groupData: true,
  //       groupIntervals: [{ timeUnit: 'week', count: 1 }],
  //       baseInterval: { timeUnit: 'day', count: 1 },
  //       renderer: am5xy.AxisRendererX.new(root, {
  //         opposite: false,
  //         strokeOpacity: 0,
  //         minorGridEnabled: true
  //       })
  //     })
  //   );

  //   let sbyAxis = scrollbar.chart.yAxes.push(
  //     am5xy.ValueAxis.new(root, {
  //       renderer: am5xy.AxisRendererY.new(root, {})
  //     })
  //   );

  //   this.sbseries = scrollbar.chart.series.push( // Assign value to this.sbseries
  //     am5xy.LineSeries.new(root, {
  //       xAxis: sbxAxis,
  //       yAxis: sbyAxis,
  //       valueYField: 'close',
  //       valueXField: 'date'
  //     })
  //   );

  //   let legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));

  //   legend.data.push(this.series);

  //   legend.markers.template.setAll({
  //     width: 10
  //   });

  //   legend.markerRectangles.template.setAll({
  //     cornerRadiusTR: 0,
  //     cornerRadiusBR: 0,
  //     cornerRadiusTL: 0,
  //     cornerRadiusBL: 0
  //   });

  //   this.series.data.setAll(data);
  //   this.sbseries.data.setAll(data);

  //   this.series.appear(1000);
  //   chart.appear(1000, 100);

  //   setInterval(() => {
  //     this.addNewData();
  //     console.log(this.chartData);
  //   }, 5000);
  // }
  ngOnInit(): void {
    const root = am5.Root.new("chartdiv");
    const myTheme = am5.Theme.new(root);
    myTheme.rule("Grid", ["scrollbar", "minor"]).setAll({
      visible: false
    });
    root.setThemes([
      myTheme
    ]);

    this.chart = root.container.children.push(
      StockChart.new(root, {
        paddingRight: 0
      })
    );

    root.numberFormatter.set("numberFormat", "#,###.00");

    let mainPanel = this.chart.panels.push(
      StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true
      })
    );

    let valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          pan: "zoom"
        }),
        extraMin: 0.1,
        tooltip: am5.Tooltip.new(root, {}),
        numberFormat: "#,###.00",
        extraTooltipPrecision: 2
      })
    );

    let dateAxis = mainPanel.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        extraMax: 0.1,
        baseInterval: {
          timeUnit: "minute",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          pan: "zoom",
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    let currentValueDataItem = valueAxis.createAxisRange(valueAxis.makeDataItem({ value: 0 }));
    let currentLabel = currentValueDataItem.get("label");
    if (currentLabel) {
      currentLabel.setAll({
        fill: am5.color(0xffffff),
        background: am5.Rectangle.new(root, { fill: am5.color(0x000000) })
      })
    }

    let currentGrid = currentValueDataItem.get("grid");
    if (currentGrid) {
      currentGrid.setAll({ strokeOpacity: 0.5, strokeDasharray: [2, 5] });
    }

    let valueSeries = mainPanel.series.push(
      am5xy.CandlestickSeries.new(root, {
        name: "AMCH",
        clustered: false,
        valueXField: "Date",
        valueYField: "Close",
        highValueYField: "High",
        lowValueYField: "Low",
        openValueYField: "Open",
        calculateAggregates: true,
        xAxis: dateAxis,
        yAxis: valueAxis,
        legendValueText:
          "open: [bold]{openValueY}[/] high: [bold]{highValueY}[/] low: [bold]{lowValueY}[/] close: [bold]{valueY}[/]",
        legendRangeValueText: ""
      })
    );

    this.chart.set("stockSeries", valueSeries);

    let valueLegend = mainPanel.plotContainer.children.push(
      StockLegend.new(root, {
        stockChart: this.chart
      })
    );

    valueLegend.data.setAll([valueSeries]);

    mainPanel.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        yAxis: valueAxis,
        xAxis: dateAxis,
        snapToSeries: [valueSeries],
        snapToSeriesBy: "y!"
      })
    );

    let scrollbar = mainPanel.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50
      })
    );
    this.chart.toolsContainer.children.push(scrollbar);

    let sbDateAxis = scrollbar.chart.xAxes.push(
      am5xy.GaplessDateAxis.new(root, {
        extraMax: 0.1,
        baseInterval: {
          timeUnit: "minute",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true
        })
      })
    );

    let sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    let sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "Close",
        valueXField: "Date",
        xAxis: sbDateAxis,
        yAxis: sbValueAxis
      })
    );

    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3
    });

    let firstDate = new Date();
    let lastDate;
    let value = 1200;

    let data = this.generateChartData(firstDate, value);
    valueSeries.data.setAll(data);
    sbSeries.data.setAll(data);

    this.dataSubscription = interval(1000).subscribe(() => {
      let lastDataObject = valueSeries.data.getIndex(valueSeries.data.length - 1);
      if (lastDataObject) {
        let previousDate = lastDataObject.Date;
        let previousValue = lastDataObject.Close;

        value = am5.math.round(previousValue + (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2, 2);

        let high = lastDataObject.High;
        let low = lastDataObject.Low;
        let open = lastDataObject.Open;

        if (am5.time.checkChange(Date.now(), previousDate, "minute")) {
          open = value;
          high = value;
          low = value;

          let dObj1 = {
            Date: Date.now(),
            Close: value,
            Open: value,
            Low: value,
            High: value
          };

          valueSeries.data.push(dObj1);
          sbSeries.data.push(dObj1);
        } else {
          if (value > high) {
            high = value;
          }

          if (value < low) {
            low = value;
          }

          let dObj2 = {
            Date: Date.now(),
            Close: value,
            Open: open,
            Low: low,
            High: high
          };

          valueSeries.data.setIndex(valueSeries.data.length - 1, dObj2);
          sbSeries.data.setIndex(sbSeries.data.length - 1, dObj2);
        }
        if (currentLabel) {
          currentValueDataItem.animate({ key: "value", to: value, duration: 500, easing: am5.ease.out(am5.ease.cubic) });
          currentLabel.set("text", this.chart.getNumberFormatter().format(value));
          let bg = currentLabel.get("background");
          if (bg) {
            if (value < open) {
              bg.set("fill", root.interfaceColors.get("negative"));
            }
            else {
              bg.set("fill", root.interfaceColors.get("positive"));
            }
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  generateChartData(firstDate: Date, value: number) {
    let chartData = [];

    for (var i = 0; i < 50; i++) {
      let newDate = new Date(firstDate);
      newDate.setMinutes(newDate.getMinutes() - i);

      value += Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10);

      let open = value + Math.round(Math.random() * 16 - 8);
      let low = Math.min(value, open) - Math.round(Math.random() * 5);
      let high = Math.max(value, open) + Math.round(Math.random() * 5);

      chartData.unshift({
        Date: newDate.getTime(),
        Close: value,
        Open: open,
        Low: low,
        High: high
      });

      //lastDate = newDate;
    }
    return chartData;
  }
//   generateInitialChartData() {
//     let chartData = [];
//     let firstDate = new Date();
//     firstDate.setDate(firstDate.getDate() - 1000);
//     firstDate.setHours(0, 0, 0, 0);
//     let close = 12000;
//     for (let i = 0; i < 1000; i++) {
//       let newDate = new Date(firstDate);
//       newDate.setDate(newDate.getDate() + i);

//       close += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//       let open = close + Math.round(Math.random() * 16 - 7);
//       let low = Math.min(close, open) - Math.round(Math.random() * 5);
//       let high = Math.max(close, open) + Math.round(Math.random() * 5);

//       chartData.push({
//         date: newDate.getTime(),
//         close: close,
//         open: open,
//         low: low,
//         high: high
//       });
//     }
//     console.log('chartData', chartData);

//     return chartData;
//   }

//   addNewData() {
//     let lastDataPoint = this.chartData[this.chartData.length - 1];
//     let newDate = new Date(lastDataPoint.date);
//     newDate.setSeconds(newDate.getSeconds() + 5); // Tăng thời gian lên 5 giây

//     let close = lastDataPoint.close + Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//     let open = close + Math.round(Math.random() * 16 - 7);
//     let low = Math.min(close, open) - Math.round(Math.random() * 5);
//     let high = Math.max(close, open) + Math.round(Math.random() * 5);

//     // Tạo một đối tượng mới cho dữ liệu nến mới
//     let newDataPoint = {
//       date: newDate.getTime(),
//       close: close,
//       open: open,
//       low: low,
//       high: high
//     };

//     // Thêm dữ liệu mới vào cuối mảng chartData
//     this.chartData.push(newDataPoint);

//     // Cập nhật dữ liệu mới vào series và sbseries
//     this.series.data.setAll(this.chartData);
//     this.sbseries.data.setAll(this.chartData);

//     // Đảm bảo cập nhật UI
//     this.cdr.detectChanges();
// }


}
