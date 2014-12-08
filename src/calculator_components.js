/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var HomePrice = React.createClass({
  updateHomePrice: function(e) {
    this.props.onChange('homePrice', e.target.value);
  },

  render: function() {
    return (
      <input type="number" className={this.props.className}
        value={this.props.homePrice}
        onChange={this.updateHomePrice} />
    );
  }
});

var DepositAmount = React.createClass({
  updateDepositAmount: function(e) {
    this.props.onChange('depositAmount', e.target.value);
  },

  render: function() {
    return (
      <input type="number" className={this.props.className}
        value={this.props.depositAmount}
        onChange={this.updateDepositAmount} />
    );
  }
});

var LoanAmount = React.createClass({
  render: function() {
    return (
      <input type="number" className={this.props.className}
       value={this.props.loanAmount} disabled />
    );
  }
});

var PaymentAmount = React.createClass({
  render: function() {
    return (
      <input type="number" className={this.props.className}
       value={this.props.paymentAmount.toFixed(2)} disabled />
    );
  }
});

var InterestRate = React.createClass({
  updateInterestRate: function(e) {
    this.props.onChange('interestRate', e.target.value);
  },

  render: function() {
    return (
      <input type="number" className={this.props.className}
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
      <select className={this.props.className}
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
