/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/


var Calculator = React.createClass({
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

var HomePrice = React.createClass({
  updateHomePrice: function(e) {
    this.props.onChange('homePrice', e.target.value);
  },

  render: function() {
    return (
      <input type="number"
        value={this.props.homePrice}
        onChange={this.updateHomePrice} />
    );
  }
});

var DepositAmount = React.createClass({
  updateDepositAmount: function(e) {
    console.log(e.target.value);
    this.props.onChange('depositAmount', e.target.value);
  },

  render: function() {
    return (
      <input type="number"
        value={this.props.depositAmount}
        onChange={this.updateDepositAmount} />
    );
  }
});

var LoanAmount = React.createClass({
  render: function() {
    return (
      <input type="number" value={this.props.loanAmount} disabled />
    );
  }
});

var InterestRate = React.createClass({
  updateInterestRate: function(e) {
    this.props.onChange('interestRate', e.target.value);
  },

  render: function() {
    return (
      <input type="number"
        onChange={this.updateInterestRate}
        value={this.props.interestRate} />
    );
  }
});

var AmortizationPeriod = React.createClass({
  updateAmortizationPeriod: function(e) {
      this.props.onChange('amortizationPeriod', e.target.value);
  },

  render: function() {
    return (
      <select
        onChange={this.updateAmortizationPeriod}
        value={this.props.amortizationPeriod}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>25</option>
        <option>30</option>
      </select>
    );
  }
});

React.render(<Calculator />,
  document.getElementById('calculator')
);
