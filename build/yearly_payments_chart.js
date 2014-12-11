"use strict";

var Chart = React.createClass({displayName: 'Chart',
  render: function() {
    return (
      React.createElement("svg", {width: this.props.width, height: this.props.height}, this.props.children)
    );
  }
});

var Bar = React.createClass({displayName: 'Bar',
  render: function() {
    return (
      React.createElement("rect", {fill: this.props.color, 
        width: this.props.width, 
        height: this.props.height, 
        x: this.props.offset, 
        y: this.props.availableHeight - this.props.height})
    );
  }
});

var DataSeries = React.createClass({displayName: 'DataSeries',
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var bars = this.props.data.map(function(point, i) {
      return (
        React.createElement(Bar, {height: yScale(point), width: xScale.rangeBand(), 
          offset: xScale(i), availableHeight: props.height, 
          color: props.color, key: i})
      )
    });

    return (
      React.createElement("g", null, bars)
    );
  }
});

var YearlyPaymentsChart = React.createClass({displayName: 'YearlyPaymentsChart',
  render: function() {
    var data = [];

    var loanAmount    = this.props.loanAmount;
    var paymentAmount = this.props.paymentAmount;

    data.push(loanAmount);
    while(loanAmount > 0) {
      loanAmount -= (paymentAmount * 12);
      loanAmount = (loanAmount < 0) ? 0 : loanAmount;
      data.push(Math.round(loanAmount));
    }

    return (
      React.createElement(Chart, {width: this.props.width, height: this.props.height}, 
        React.createElement(DataSeries, {data: data, 
          width: this.props.width, height: this.props.height, 
          color: "#0f87cc"})
      )
    );
  }
});

var StackedBarChart = React.createClass({displayName: 'StackedBarChart',
  getDefaultProps: function() {
    return {
      width: 500,
      height: 300
    }
  },

  render: function() {
    var data = this.props.data,
        size = { width: this.props.width, height: this.props.height };

    var zipped = _.zip(data.series1, data.series2, data.series3);

    var totals = _.map(zipped, function(values) {
      return _.reduce(values, function(memo, value) { return memo + value; }, 0);
    });

    var yScale = d3.scale.linear()
      .domain([0, d3.max(totals)])
      .range([0, this.props.height]);

    return (
      React.createElement(Chart, {width: this.props.width, height: this.props.height}, 
        React.createElement(DataSeries, {data: data.series1, size: size, yScale: yScale, ref: "series1", color: "cornflowerblue"}), 
        React.createElement(DataSeries, {data: data.series2, size: size, yScale: yScale, ref: "series2", color: "red"}), 
        React.createElement(DataSeries, {data: data.series3, size: size, yScale: yScale, ref: "series3", color: "green"})
      )
    );
  }
});
