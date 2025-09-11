import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const ChartTwo: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      width: "100%",
      height: 54,
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#E65100"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        stops: [0, 90, 100],
        // colorStops removed for compatibility
        colorStops: [
          {
            offset: 0,
            color: "#E65100",
            opacity: 0.5
          },
          {
            offset: 100,
            color: "#ffffff",
            opacity: 0
          }
        ]
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { show: false },
    grid: { show: false },
    tooltip: {
      enabled: true,
      custom: ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) => {
        const value = series[seriesIndex][dataPointIndex];
        return `<div style="padding:5px 10px; font-size:12px; background:#fff; border:1px solid #ccc; border-radius:4px;">
                  Appointments: ${value}
                </div>`;
      },
    },
  };

  const chartSeries = [
    {
      name: "Data",
      data: [12, 14, 15, 20, 18, 20, 20, 10, 23, 20],
    },
  ];

  return (
    <div
      id="chart-2"
      role="img"
      aria-label="Area chart showing appointments data over time"
    >
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

export default ChartTwo;
