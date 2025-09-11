import React from "react";
import ReactApexChart from "react-apexcharts";

const SemiDonutChartApex: React.FC = () => {
  const isDarkTheme =
    document.documentElement.getAttribute("data-bs-theme") === "dark";

  const series = [20, 15, 15, 10, 20, 20]; // Your data values

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      height: 180
    },
    labels: [
      "Cardiology",
      "Neurology",
      "Neurology",
      "Dermatology",
      "Orthopedics",
      "Urology"
    ],
    colors: [
      "#3189A1",
      "#7736A4",
      "#EB642F",
      "#FEB746",
      "#3F51A9",
      "#3683D7"
    ],
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle:500,
        donut: {
          size: "80%",
          labels: {
            show: false
          }
        },
        expandOnClick: false
      }
    },
    tooltip: {
      enabled: false,
      theme: isDarkTheme ? "dark" : "light",
      y: {
        formatter: (value, opts) => {
          return `${opts.w.globals.labels[opts.seriesIndex]}: ${value}%`;
        }
      }
    },
    stroke: {
      colors: [isDarkTheme ? "transparent" : "#fff"],
      width: isDarkTheme ? 0 : 5
    },
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200
          }
        }
      }
    ]
  };

  return (
    <div
      style={{
        height: "180px",
        position: "relative"
      }}
      id="attendance"
      role="img"
      aria-label="Semi donut chart showing department distribution"
    >
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="180"
      />
    </div>
  );
};

export default SemiDonutChartApex;
