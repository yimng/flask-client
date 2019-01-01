import React, { Component } from 'react';
import CanvasJSReact from './assets/js/canvasjs.react'
// var CanvasJSReact = require('./assets/js/canvasjs.react');
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints =[];
class App extends Component {
  /**
  constructor() {
    super();
    this.generateDataPoints = this.generateDataPoints.bind(this);
  }

  generateDataPoints(noOfDps) {
    var xVal = 1, yVal = 100;
    var dps = [];
    for(var i = 0; i < noOfDps; i++) {
      yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
      dps.push({x: xVal,y: yVal});
      xVal++;
    }
    return dps;
  }
  **/

  componentDidMount(){
    var chart = this.chart;
    fetch('http://192.168.75.128:5000/')
    .then(function(response) {
      console.log('')
      return response.json();
    })
    .then(function(data) {
      for (var i = 0; i < data.length; i++) {
        dataPoints.push({
          x: data[i].x,
          y: data[i].y
        });
      }
      chart.render();
    });
  }

  render() {
    const options = {
      theme: "light2", // "light1", "dark1", "dark2"
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: "Try flask"
      },
      axisY: {
        includeZero: false
      },
      data: [{
        type: "area",
        dataPoints: dataPoints
      }]
    }

    return (
    <div>
      <CanvasJSChart options = {options}
         onRef={ref => this.chart = ref}
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );
  }
}
export default App;
