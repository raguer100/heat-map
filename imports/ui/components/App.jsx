import React, { Component, constructor } from 'react';
import Flexbox from 'flexbox-react';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
CalHeatMap = require("cal-heatmap");
Moment = require('moment');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calMonthHours: new CalHeatMap(),
      calMonthWeeks: new CalHeatMap()
    }

    this.addToDatabase = this.addToDatabase.bind(this);
    this.subtractFromDatabase = this.subtractFromDatabase.bind(this);
    this.parser = this.parser.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  parser(data) {
    var stats = {};
    for(i=0;i<data.length;i++) {
      stats[new Date(data[i].baslangic).getTime() / 1000] = data[i].toplamilerleme;
    }
    return stats;
  }

  subtractFromDatabase() {
    Meteor.call("taskUpdate", 1);
  }

  addToDatabase() {
    Meteor.call("taskUpdate", 400);
  }

  componentWillReceiveProps(nextProps) {
    var node = document.getElementsByClassName("calMonthHours")[0];

    if(node.hasChildNodes()) {
      this.state.calMonthHours.update(nextProps.tasks, this.parser);
    } else {
      this.state.calMonthHours.init({
        itemSelector: document.getElementsByClassName("calMonthHours")[0],
        legendColors: {
          min: "#efefef",
          max: "steelblue",
          empty: "white"
          // Will use the CSS for the missing keys
        },
        domain: "day",
        subDomain: "hour",
        data: nextProps.tasks,
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
        previousSelector: document.getElementsByClassName("fa fa-angle-left fa-2x calMonthHoursButton")[0],
        nextSelector: document.getElementsByClassName("fa fa-angle-right fa-2x calMonthHoursButton")[0],
        start: new Date(),
        afterLoadData: this.parser,
        legend: [2, 4, 6, 8],
        displayLegend: true,
        legendVerticalPosition: "bottom",
        legendHorizontalPosition: "center",
        onClick: (date, nb) => { // if nb is empty, nb is null
          var array = [];
          var found = false;
          array = this.state.calMonthHours.options.highlight;
          var maxHighlightDateOld = _.max(this.state.calMonthHours.options.highlight);
          var minHighlightDateOld = _.min(this.state.calMonthHours.options.highlight);

          for(i=0; i<array.length; i++) {
            /*if(date.toString() == array[i].toString()) {
              found = true;
              array.splice(i, 1);
            }*/

            if(Moment(date).isSame(array[i])) {
              found = true;
              array.splice(i, 1);
            }
          }

          if(array.length < 2 && !found) {
            array.push(new Date(date));
          }

          if(array.length == 0) {
            this.state.calMonthHours.highlight([]);
            this.state.calMonthHours.update(nextProps.tasks, this.parser); //array i temizlemek için
          } else {
            this.state.calMonthHours.highlight(array);
          }



          var maxHighlightDate = _.max(this.state.calMonthHours.options.highlight);
          var minHighlightDate = _.min(this.state.calMonthHours.options.highlight);
          console.log("min: " + minHighlightDate + "max : " + maxHighlightDate);
          console.log("oldmin: " + minHighlightDateOld + "oldmax : " + maxHighlightDateOld);

          if (!((maxHighlightDate === maxHighlightDateOld) && (minHighlightDate === minHighlightDateOld))) {
            console.log("ESIT DEGIL!"); //executeQuery()
          }
	      }
      });

      this.state.calMonthWeeks.init({
        itemSelector: document.getElementsByClassName("calMonthWeeks")[0],
        domain: "month",
        subDomain: "week",
        subDomainTextFormat: "%d-%W",
        domainLabelFormat: "%b %Y",
        cellSize: 40,
        domainMargin: 10,
        domainGutter: 10,
        weekStartOnMonday: true,
        afterLoadData: this.parser,
        range: 4,
        displayLegend: false,
        previousSelector: document.getElementsByClassName("fa fa-angle-left fa-2x calMonthWeeksButton")[0],
        nextSelector: document.getElementsByClassName("fa fa-angle-right fa-2x calMonthWeeksButton")[0],
        start: new Date(),
        onClick: (date, nb) => { // if nb is empty, nb is null
          this.state.calMonthHours.highlight([]);
          this.state.calMonthHours.update(nextProps.tasks, this.parser); //array i temizlemek için
          this.state.calMonthHours.jumpTo(new Date(date), true);
	      }
      });
    }
  }

  render() {
    if (this.props.tasks) {
      return(
        <div>
          <FlatButton label="Subtract" onTouchTap={this.subtractFromDatabase} />
          <FlatButton label="Add" onTouchTap={this.addToDatabase} /> <br />
          <i className="fa fa-angle-left fa-2x calMonthWeeksButton" aria-hidden="true"></i>
          <i className="fa fa-angle-right fa-2x calMonthWeeksButton" aria-hidden="true"></i>
          <div className="calMonthWeeks"></div> <br />
          <i className="fa fa-angle-left fa-2x 1 calMonthHoursButton" aria-hidden="true"></i>
          <i className="fa fa-angle-right fa-2x calMonthHoursButton" aria-hidden="true"></i>
          <div className="calMonthHours"></div>
        </div>
      );
    }
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
