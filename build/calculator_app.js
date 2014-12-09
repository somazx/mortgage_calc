var CalculatorApp = React.createClass({displayName: 'CalculatorApp',
  getInitialState: function() {
    return {
      homePrice: 400000,
      depositAmount: 80000,
      amortizationPeriod: 25,
      interestRate: 3.5
    };
  },

  loanAmount: function() {
    var loanAmount = this.state.homePrice - this.state.depositAmount;
    return (loanAmount > 0) ? loanAmount : 0;
  },

  onChange: function(state, newValue) {
    var newState = {};
    newState[state] = Number(newValue);
    this.setState(newState);
  },

  render: function() {
    var loanAmount = this.loanAmount();
    console.log(this.state);
    return (
      React.createElement("form", {role: "form"}, 
        React.createElement(HomePrice, {
          onChange: this.onChange, 
          homePrice: this.state.homePrice}), 
        React.createElement(DepositAmount, {
          onChange: this.onChange, 
          depositAmount: this.state.depositAmount}), 
        React.createElement(LoanAmount, {loanAmount: loanAmount}), 
        React.createElement(InterestRate, {
          onChange: this.onChange, 
          interestRate: this.state.interestRate}), 
        React.createElement(AmortizationPeriod, {
          onChange: this.onChange, 
          amortizationPeriod: this.state.amortizationPeriod})
      )
    );
  }
});

React.render(React.createElement(CalculatorApp, null),
  document.getElementById('calculator')
);
