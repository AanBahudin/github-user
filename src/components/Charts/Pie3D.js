// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import candy from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, candy);


// STEP 3 - Creating the JSON object to store the chart configurations


const ChartComponent = ({data}) => {

  const chartConfigs = {
    type: "pie3d", // The chart type
    width: "100%", // Width of the chart
    decimals: 0,
    pieRadius: '40%',
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: 'Languages',
        theme: 'candy'
      },
      // Chart Data
      data: data
    }
  };

  return (<ReactFC {...chartConfigs} />)
}

// STEP 4 - Creating the DOM element to pass the react-fusioncharts component


export default ChartComponent;