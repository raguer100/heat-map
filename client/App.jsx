import React, { Component, constructor, State } from 'react';
import Flexbox from 'flexbox-react';
CalHeatMap = require("cal-heatmap");

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    var parser = function(data) {
    	var stats = {};
    	for (var d in data) {
    		stats[new Date(data[d].baslangic).getTime() / 1000] = data[d].toplamilerleme;
    	}

	return stats;
};

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
      previousSelector: document.getElementsByClassName("fa fa-angle-left fa-3x 1")[0],
      nextSelector: document.getElementsByClassName("fa fa-angle-right fa-3x 2")[0],
      start: new Date(),
      legend: [200, 350, 500, 650, 800],
      displayLegend: true,
      legendVerticalPosition: "bottom",
      legendHorizontalPosition: "center",
    });

    var cal1 = new CalHeatMap();
    cal1.init({
      itemSelector: document.getElementsByClassName("cal1")[0],
      domain: "month",
      subDomain: "week",
      subDomainTextFormat: "%d-%W",
      domainLabelFormat: "%b %Y",
      cellSize: 40,
      domainMargin: 10,
      domainGutter: 10,
      weekStartOnMonday: true,
      afterLoadData: parser,
      range: 4,
      displayLegend: false,
      previousSelector: document.getElementsByClassName("fa fa-angle-left fa-3x")[0],
      nextSelector: document.getElementsByClassName("fa fa-angle-right fa-3x")[0],
      start: new Date(),
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
        <div className="cal1"></div>
        <i className="fa fa-angle-left fa-3x" aria-hidden="true"></i>
        <i className="fa fa-angle-right fa-3x" aria-hidden="true"></i>
        <div className="cal"></div>
        <i className="fa fa-angle-left fa-3x 1" aria-hidden="true"></i>
        <i className="fa fa-angle-right fa-3x 2" aria-hidden="true"></i>
      </div>
    );
  }
}
