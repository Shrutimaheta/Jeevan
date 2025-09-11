import React from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const PatientsVisitsChart: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      height: 200,
      type: "radialBar"
    },
    plotOptions: {
      radialBar: {
        offsetY: -20,
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 15,
          size: "60%",
          background: "#fff"
        },
        track: {
          background: "#fff",
          strokeWidth: "0",
          margin: 6
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "20px",
            color: "#0F172A",
            offsetY: -5
          },
          value: {
            show: true,
            fontSize: "22px",
            color: "#0F172A",
            offsetY: 5,
            fontWeight: 700,
            formatter: (val: number) => `${val}`
          },
          total: {
            show: true,
            label: "Total Patients",
            fontSize: "14px",
            fontWeight: 400,
            color: "#334155"
          }
        }
      }
    },
    stroke: {
      dashArray: 4,
      width: 5
    },
    colors: ["#1F6DB2", "#6A1B9A"],
    labels: ["Male", "Female"]
  };

  const chartSeries = [100, 80];

  return (
    <div 
      id="patients-visits" 
      className="mb-3" 
      role="img" 
      aria-label="Radial bar chart showing male and female patient visits"
    >
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radialBar"
        height={200}
      />
    </div>
  );
};

export default PatientsVisitsChart;
