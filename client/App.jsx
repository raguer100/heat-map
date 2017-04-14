import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
CalHeatMap = require("cal-heatmap");

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var cal = new CalHeatMap();
    /*cal.init({
    legendColors: {
    min: "#efefef",
    max: "steelblue",
    empty: "white"
    // Will use the CSS for the missing keys
    },
    itemSelector: document.getElementsByClassName("cal")[0],
    domain: "month",
    subDomain: "day",
    cellSize: 20,
    subDomainTextFormat: "%d",
    range: 1,
    displayLegend: false,
    onsiderMissingDataAsZero: true
    }); */
    cal.init({
      itemSelector: document.getElementsByClassName("cal")[0],
      legendColors: {
        min: "#efefef",
        max: "steelblue",
        empty: "white"
        // Will use the CSS for the missing keys
      },
      domain: "day",
      subDomain: "hour",
      cellSize: 40,
      subDomainTextFormat: "%H:00",
      domainGutter: 10,
      domainMargin: 10,
      columnLimit: 21,
      rowLimit: 8,
      range: 7,
      displayLegend: true,
      label: {
        position: "bottom",
        width: 46,
        rotate: "null"
      },
      previousSelector: document.getElementsByClassName("fa fa-angle-left fa-3x")[0],
      nextSelector: document.getElementsByClassName("fa fa-angle-right fa-3x")[0],
      start: new Date(),
      legend: [200, 350, 500, 650, 800],
      displayLegend: true,
      legendVerticalPosition: "bottom",
      legendHorizontalPosition: "center",
    });

    /*cal.init({
    itemSelector: document.getElementsByClassName("cal")[0],
    legendColors: {
    min: "#efefef",
    max: "steelblue",
    empty: "white"
    // Will use the CSS for the missing keys
    },
    domain: "day",
    data: "datas-years.json",
    start: new Date(2000, 0),
    cellSize: 9,
    range: 15,
    legend: [2, 4, 6, 8]
    }); */
  }

  render() {
    return(
      <div>
        <div className="cal"></div>

        <i className="fa fa-angle-left fa-3x" aria-hidden="true"></i>
        <i className="fa fa-angle-right fa-3x" aria-hidden="true"></i>
      </div>
    );
  }
}
