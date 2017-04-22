var fillCalHeatMap = function() {

  console.log("fillCalHeatMap");
  console.log(moment().endOf('month'));
  endDateOfMonthYearHeatMap = moment().endOf('month');
    startDateOfMonthYearHeatMap = moment().startOf('month');

    startDateOfMonthYearHeatMap.subtract(3,'months').startOf('month');

    startDateOfDayWeekHeatMap = moment().startOf('week')
    endDateOfDayWeekHeatMap = moment().endOf('week')

  lastClick = 0;
  calcontextChanged = false;
  //var width = $('#main-container').outerWidth(true);

  calMonthYearHeatMap = new CalHeatMap();

  calMonthYearHeatMap.init({
    itemSelector: '#cal-month-year-heatmap',
    domain: "month",
    subDomain: "week",
    subDomainTextFormat: "%d-%W",
    domainLabelFormat: "%b %Y",
    cellSize: 40,
    domainMargin: 10,
    domainGutter: 10,
    weekStartOnMonday: true,
    data: serverUri + "/getweeklystatistics?startdate=%22" + startDateOfMonthYearHeatMap.format("YYYY-MM-DD") + "%22&enddate=%22" + endDateOfMonthYearHeatMap.format("YYYY-MM-DD") + "%22",
    afterLoadData: parser,
    //columnLimit: 2,
    //rowLimit: 6,
    range: 4,
    start: new Date(startDateOfMonthYearHeatMap),
    legend: [8000, 16000, 24000, 30000, 36000],
    displayLegend: false,
    onClick: function(date, nb) {
        if (lastClick == 1) {
          calcontextChanged = true;
          lastClick = 0;
        } else
          calcontextChanged = false;
        $scope.calMonthYearHeatMapClick(date, nb);
      }
      //,
      //afterLoadData: function(data) {
      //  console.log("afterload");
      //  console.log(data);
      //}
  });

  calDayWeekHeatMap = new CalHeatMap();
  calDayWeekHeatMap.init({
    itemSelector: "#cal-day-week-heatmap",
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
    start: new Date(startDateOfDayWeekHeatMap),
    legend: [200, 350, 500, 650, 800],
    data: serverUri + "/gethourlystatisticsall?startdate=%22" + startDateOfDayWeekHeatMap.format("YYYY-MM-DD") + "%22&enddate=%22" + endDateOfDayWeekHeatMap.format("YYYY-MM-DD") + "%22",
    afterLoadData: parser,
    displayLegend: true,
    legendVerticalPosition: "bottom",
    legendHorizontalPosition: "center",
    onClick: function(date, nb) {

      $scope.calDayWeekHeatMapClick(date, nb);
    }
  });

  calStart = new Date(calDayWeekHeatMap.options.start);
};

$scope.calheatMapNextWeek = function() {
  if (lastClick == 0
    //|| calcontextChanged
  ) {
    var beginning = new Date(new Date(new Date(calDayWeekHeatMap.getDomainKeys()[0])).getTime() + 86400000).toString();
    var end = new Date(new Date(calDayWeekHeatMap.getDomainKeys()[0]).getTime() + 691200000).toString(); // One week later.

    console.log(beginning);
    calDayWeekHeatMap.options.data = serverUri + "/gethourlystatisticsall?startdate=%22" + encodeURIComponent(beginning) + "%22&enddate=%22" + encodeURIComponent(end) + "%22";
    calDayWeekHeatMap.update(calDayWeekHeatMap.options.data);
    calDayWeekHeatMap.next(1);
  } else
    calDayWeekHeatMap.next(1);
}

$scope.calheatMapPreviousWeek = function () {
  if (lastClick == 0
    //|| calcontextChanged
  ) {
    var beginning = new Date(new Date(calDayWeekHeatMap.getDomainKeys()[0]).getTime() - 86400000).toString();
    var end = new Date(new Date(calDayWeekHeatMap.getDomainKeys()[0]).getTime() + 518400000).toString(); // One week later.

    calDayWeekHeatMap.options.data = serverUri + "/gethourlystatisticsall?startdate=%22" + encodeURIComponent(beginning) + "%22&enddate=%22" + encodeURIComponent(end) + "%22";
    calDayWeekHeatMap.update(calDayWeekHeatMap.options.data);
    calDayWeekHeatMap.previous(1);
  } else
    calDayWeekHeatMap.previous(1);
}
 $scope.calheatMapNextMonth = function () {
    console.log("Sonraki ay...");
    var beginning = startDateOfMonthYearHeatMap.add(1,'month').format("YYYY-MM-DD");
    var end = endDateOfMonthYearHeatMap.add(1,'month').format("YYYY-MM-DD");

    console.log(beginning);
    calMonthYearHeatMap.options.data = serverUri + "/getweeklystatistics?startdate=%22" + encodeURIComponent(beginning) + "%22&enddate=%22" + encodeURIComponent(end) + "%22";
    calMonthYearHeatMap.update(calMonthYearHeatMap.options.data);
    calMonthYearHeatMap.next(1);
}

$scope.calheatMapPreviousMonth = function () {
    console.log("Önceki ay...");
    var beginning = startDateOfMonthYearHeatMap.subtract(1,'month').format("YYYY-MM-DD");
    var end = endDateOfMonthYearHeatMap.subtract(1,'month').format("YYYY-MM-DD");

    console.log(beginning);
    calMonthYearHeatMap.options.data = serverUri + "/getweeklystatistics?startdate=%22" + encodeURIComponent(beginning) + "%22&enddate=%22" + encodeURIComponent(end) + "%22";
    calMonthYearHeatMap.update(calMonthYearHeatMap.options.data);
    calMonthYearHeatMap.previous(1);
}

$scope.calMonthYearHeatMapClick = function (date, nb) {
  //cal.highlight(new Date(date));
  // var start = calStart;
  // var end = new Date(date);

  // //var yearDiff = end.getYear()-start.getYear();
  // var monthDiff = end.getMonth()-start.getMonth();
  // var dateDiff = end.getDate()-start.getDate();

  // var diff = (end.getTime()-start.getTime()) / (86400000);

  //calStart = new Date(date);
  // //cal.update(serverUri+"/gethourlystatisticsall?startdate=%222014-11-11%22&enddate=%222014-11-18%22");
  // if (diff < 0)
  //   cal.previous(diff*-1);
  // else
  //   cal.next(diff);

  // Bir hafta sonrasının değerini hesaplamak için kullanıldı : new Date(new Date(date).getTime()+604800000).toString()
  var beginning = new Date(date).toString();
  var end = new Date(new Date(date).getTime() + 604800000).toString(); // One week later.

  calDayWeekHeatMap.options.data = serverUri + "/gethourlystatisticsall?startdate=%22" + encodeURIComponent(beginning) + "%22&enddate=%22" + encodeURIComponent(end) + "%22";
  calDayWeekHeatMap.jumpTo(new Date(date), true);
  calDayWeekHeatMap.update(calDayWeekHeatMap.options.data);



  calDayWeekHeatMap.options.highlight = [];
  calDayWeekHeatMap.highlight(calDayWeekHeatMap.options.highlight);

  //console.log("Toplam degisim: " + diff);
}

$scope.calDayWeekHeatMapClick = function (date, nb) {
  var arrayChanged = false;
  var maxHighlightDateOld = _.max(calDayWeekHeatMap.options.highlight);
  var minHighlightDateOld = _.min(calDayWeekHeatMap.options.highlight);
  //cal.highlight(new Date(date));
  calDayWeekHeatMap.options.highlight = _.uniq(calDayWeekHeatMap.options.highlight);
  var indexInArray = _.indexOf(calDayWeekHeatMap.options.highlight, _.find(calDayWeekHeatMap.options.highlight, function(num) {
    return (num.toString() == new Date(date).toString());
  }));
  console.log(indexInArray);

  if (indexInArray > -1)
    calDayWeekHeatMap.options.highlight.splice(indexInArray, 1);
  else
    calDayWeekHeatMap.options.highlight.push(new Date(date));

  var maxHighlightDate = _.max(calDayWeekHeatMap.options.highlight);
  var minHighlightDate = _.min(calDayWeekHeatMap.options.highlight);
  calDayWeekHeatMap.options.highlight = [];
  calDayWeekHeatMap.options.highlight.push(minHighlightDate);
  calDayWeekHeatMap.options.highlight.push(maxHighlightDate);

  calDayWeekHeatMap.highlight(calDayWeekHeatMap.options.highlight);
  console.log(maxHighlightDate);
  console.log(minHighlightDate);

  changeMinDate(moment(_.min(calDayWeekHeatMap.options.highlight)));
  changeMaxDate(moment(_.max(calDayWeekHeatMap.options.highlight)).add(1, 'hour'));
  console.log("Array degisti");
  if (!((maxHighlightDate === maxHighlightDateOld) && (minHighlightDate === minHighlightDateOld)))
  {
    executeQuery();
    drawDygraphsFromMongo2();
  }
}
