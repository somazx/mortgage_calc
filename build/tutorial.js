/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var Calculator = React.createClass({displayName: 'Calculator',
  getInitialState: function() {
      return {
        homePrice: 0,
        depositAmount: 0
      };
  },
  priceChange: function(e) {
    this.setState({homePrice: e.target.value});
  },
  depositChange: function(e) {
    this.setState({depositAmount: e.target.value});
  },
  loanAmount: function() {
    var homePrice     = Number(this.state.homePrice);
    var depositAmount = Number(this.state.depositAmount);

    return homePrice - depositAmount;
  },

  render: function() {
    var loanAmount = this.loanAmount();
    return (
      React.createElement("div", null, 
        React.createElement("input", {onChange: this.priceChange, placeholder: "Home Price"}), 
        React.createElement("input", {onChange: this.depositChange, placeholder: "Deposit Amount"}), 
        "Loan Amount: $", React.createElement("input", {value: loanAmount, disabled: true})
      )
    );
  },
});


React.render(React.createElement(Calculator, null), document.getElementById('calculator'));
