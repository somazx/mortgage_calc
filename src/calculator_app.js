var CalculatorApp = React.createClass({
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
      <form role="form">
        <HomePrice
          onChange={this.onChange}
          homePrice={this.state.homePrice} />
        <DepositAmount
          onChange={this.onChange}
          depositAmount={this.state.depositAmount} />
        <LoanAmount loanAmount={loanAmount} />
        <InterestRate
          onChange={this.onChange}
          interestRate={this.state.interestRate} />
        <AmortizationPeriod
          onChange={this.onChange}
          amortizationPeriod={this.state.amortizationPeriod} />
      </form>
    );
  }
});

React.render(<CalculatorApp />,
  document.getElementById('calculator')
);
