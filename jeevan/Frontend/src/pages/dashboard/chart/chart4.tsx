import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const ChartFour: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      width: '100%',
      height: 54,
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ['#CC25B0']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 90, 100],
        // colorStops removed for compatibility
        colorStops: [
          {
            offset: 0,
            color: "#CC25B0",
            opacity: 0.5
          },
          {
            offset: 100,
            color: "#ffffff",
            opacity: 0
          }
        ]
      }
    },
    dataLabels: { enabled: false },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: {
      enabled: true,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) => {
        const value = series[seriesIndex][dataPointIndex];
        return `<div style="padding:5px 10px; font-size:12px; background:#fff; border:1px solid #ccc; border-radius:4px;">
                  Total Transactions: ${value}
                </div>`;
      }
    }
  };

  const chartSeries = [
    {
      name: "Data",
      data: [12, 14, 2, 14, 18, 10, 20, 28, 5, 25]
    }
  ];

  return (
    <div id="chart-4" role="img" aria-label="Area chart showing transactions data over time">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={54}
        width="100%"
      />
    </div>
  );
};

export default ChartFour;
