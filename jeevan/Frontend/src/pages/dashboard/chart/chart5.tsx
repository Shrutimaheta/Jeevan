import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const ChartFive: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      height: 290,
      stacked: true,
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      }
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    colors: ['#1F6DB2', '#BCD3E8'],
    xaxis: {
      categories: ['25 May', '26 May', '27 May', '28 May', '29 May', '30 May', '31 May'],
      labels: {
        style: {
          fontSize: '14px'
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickPlacement: 'between'
    },
    yaxis: {
      max: 100,
      labels: {
        align: 'left',
        offsetX: -15,
        style: {
          fontSize: '14px'
        },
        formatter: function (val: number) {
          return val.toString();
        }
      }
    },
    legend: { show: false },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 0,
        right: -20
      }
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false
    }
  };

  const chartSeries = [
    {
      name: 'New Patients',
      data: [25, 30, 70, 25, 20, 40, 35]
    },
    {
      name: 'Old Patients',
      data: [20, 25, 15, 75, 50, 25, 10]
    }
  ];

  return (
    <div id="chart-5" role="img" aria-label="Bar chart showing new and old patients data from May 25 to May 31">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={290}
      />
    </div>
  );
};

export default ChartFive;
