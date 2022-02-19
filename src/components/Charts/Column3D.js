// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column3D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import candy from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column3D, candy);


// STEP 3 - Creating the JSON object to store the chart configurations
const Doughnut2d = ({data}) => {
  const chartConfigs = {
    type: "column3d", // The chart type
    width: "100%", // Width of the chart
    decimals: 0,
    pieRadius: '40%',
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Most Popular',
        yAxisName: 'Stars ',
        xAxisName: 'Repos',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        theme: 'candy',
        doughnutRadius: '45%',
        showPercentValues: 0
      },
      // Chart Data
      data: data
    }
  };

  return (<ReactFC {...chartConfigs} />)
};

export default Doughnut2d;
