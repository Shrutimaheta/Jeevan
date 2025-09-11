import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import AutoBreadcrumb from "../../../components/breadcrumb/AutoBreadcrumb";
import CommonFooter from "../../../components/common-footer/commonFooter";

const ChartApex = () => {
  const [sline] = useState<any>({
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#1F6DB2"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f1f2f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  });
  const [sLineArea] = useState<any>({
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    colors: ["#1F6DB2", "#0D7858"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      align: "left",
    },
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],

    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00",
        "2018-09-19T01:30:00",
        "2018-09-19T02:30:00",
        "2018-09-19T03:30:00",
        "2018-09-19T04:30:00",
        "2018-09-19T05:30:00",
        "2018-09-19T06:30:00",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  });
  const [sCol] = useState<any>({
    chart: {
      height: 290,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "80%",
        borderRadius: 5,
        endingShape: "rounded", // This rounds the top edges of the bars
      },
    },
    colors: ["#1F6DB2", "#0D7858", "#09800F"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    series: [
      {
        name: "Inprogress",
        data: [19, 65, 19, 19, 19, 19, 19],
      },
      {
        name: "Active",
        data: [89, 45, 89, 46, 61, 25, 79],
      },
      {
        name: "Completed",
        data: [39, 39, 39, 80, 48, 48, 48],
      },
    ],
    xaxis: {
      categories: [
        "15 Jan",
        "16 Jan",
        "17 Jan",
        "18 Jan",
        "19 Jan",
        "20 Jan",
        "21 Jan",
      ],
      labels: {
        style: {
          colors: "#0C1C29",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: "#6D777F",
          fontSize: "14px",
        },
      },
    },
    grid: {
      borderColor: "#CED2D4",
      strokeDashArray: 5,
      padding: {
        left: -8,
        right: -15,
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: string) {
          return "" + val + "%";
        },
      },
    },
  });
  const [sColStacked] = useState<any>({
    chart: {
      height: 290,
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    colors: ["#1F6DB2", "#0D7858", "#FDAF22", "#B71C1C"],
    series: [
      {
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14],
      },
      {
        name: "PRODUCT D",
        data: [21, 7, 25, 13, 22, 8],
      },
    ],
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2011 GMT",
        "01/02/2011 GMT",
        "01/03/2011 GMT",
        "01/04/2011 GMT",
        "01/05/2011 GMT",
        "01/06/2011 GMT",
      ],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });
  const [sBar] = useState<any>({
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#1F6DB2"],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    xaxis: {
      categories: [
        "South Korea",
        "Canada",
        "United Kingdom",
        "Netherlands",
        "Italy",
        "France",
        "Japan",
        "United States",
        "China",
        "Germany",
      ],
    },
  });
  const [options] = useState<any>({
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    colors: ["#1F6DB2", "#0D7858"],
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    stroke: {
      width: [0, 4],
    },
    title: {
      text: "Traffic Sources",
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Website Blog",
        },
      },
      {
        opposite: true,
        title: {
          text: "Social Media",
        },
      },
    ],
  });
  const [donutChart] = useState<any>({
    chart: {
      height: 350,
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: ["#1F6DB2", "#0D7858", "#FDAF22", "#B71C1C"],
    series: [44, 55, 41, 17],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [radialChart] = useState<any>({
    chart: {
      height: 350,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#1F6DB2", "#0D7858", "#FDAF22", "#B71C1C"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: function () {
              return 249;
            },
          },
        },
      },
    },
    series: [44, 55, 67, 83],
    labels: ["Apples", "Oranges", "Bananas", "Berries"],
  });

  return (
    <div className="page-wrapper">
      <div className="content pb-0">
        {/* Page Header */}
        <AutoBreadcrumb title="Apex Charts" />

        {/* /Page Header */}

        {/* start row */}
        <div className="row">
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Apex Simple</h5>
              </div>
              <div className="card-body">
                <div id="s-line" className="chart-set">
                  <ReactApexChart
                    options={sline}
                    series={sline.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Area Chart</h5>
              </div>
              <div className="card-body">
                <div id="s-line-area" className="chart-set">
                  <ReactApexChart
                    options={sLineArea}
                    series={sLineArea.series}
                    type="area"
                    height={350}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Column Chart</h5>
              </div>
              <div className="card-body">
                <div id="s-col" className="chart-set">
                  <ReactApexChart
                    options={sCol}
                    series={sCol.series}
                    type="bar"
                    height={290}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Column Stacked Chart</h5>
              </div>
              <div className="card-body">
                <div id="s-col-stacked" className="chart-set">
                  <ReactApexChart
                    options={sColStacked}
                    series={sColStacked.series}
                    type="bar"
                    height={290}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Bar Chart</h5>
              </div>
              <div className="card-body">
                <div id="s-bar" className="chart-set">
                  <ReactApexChart
                    options={sBar}
                    series={sBar.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Mixed Chart</h5>
              </div>
              <div className="card-body">
                <div id="mixed-chart" className="chart-set">
                  <ReactApexChart
                    options={options}
                    series={options.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Donut Chart</h5>
              </div>
              <div className="card-body">
                <div id="donut-chart" className="chart-set">
                  <ReactApexChart
                    options={donutChart}
                    series={donutChart.series}
                    type="donut"
                    height={350}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
          <div className="col-md-6">
            <div className="card card-h-100">
              <div className="card-header">
                <h5 className="card-title">Radial Chart</h5>
              </div>
              <div className="card-body">
                <div id="radial-chart" className="chart-set">
                  <ReactApexChart
                    options={radialChart}
                    series={radialChart.series}
                    type="radialBar"
                    height={350}
                  />
                </div>
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>{" "}
          {/* end col */}
        </div>
        {/* end row */}
      </div>
      <CommonFooter />
    </div>
  );
};

export default ChartApex;
