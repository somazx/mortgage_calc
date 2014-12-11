/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/
"use strict";

var HomePrice = React.createClass({
  updateHomePrice: function(e) {
    this.props.onChange('homePrice', e.target.value);
  },

  getDefaultProps: function() {
    inputType: "number"
  },

  render: function() {
    return (
      <input type={this.props.inputType} className={this.props.className}
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

var PaymentFrequency = React.createClass({
  updatePaymentFrequency: function(e) {
    this.props.onChange('paymentFrequency', e.target.value);
  },

  render: function() {
    return (
      <select className={this.props.className}
        onChange={this.updatePaymentFrequency}
        value={this.props.paymentFrequency}>
        <option>Monthly</option>
        <option>Bi-weekly</option>
        <option>Weekly</option>
      </select>
    );
  }
});

var PaymentRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.number}</td>
        <td className="amount">{this.props.payment}</td>
        <td className="amount">{this.props.interest}</td>
        <td className="amount">{this.props.principal}</td>
        <td className="amount">{this.props.balance}</td>
      </tr>
    );
  }
});

var PaymentTable = React.createClass({
  render: function() {
    var paymentRows = this.props.getPayments().map(function(data, i) {
      return (
        <PaymentRow
          key       ={i+1}
          number    ={'#' + String(i+1)}
          payment   ={'$' + String(data['payment'].toFixed(2))}
          interest  ={'$' + String(data['interest'].toFixed(2))}
          principal ={'$' + String(data['principal'].toFixed(2))}
          balance   ={'$' + String(data['balance'].toFixed(2))}
        />
      );
    });


    return (
      <table className="table table-hover table-condensed table-payments">
        <thead>
          <tr>
            <th>Payment #</th>
            <th className="amount">Payment</th>
            <th className="amount">Interest</th>
            <th className="amount">Principal</th>
            <th className="amount">Balance</th>
          </tr>
        </thead>

        <tbody>
          <PaymentRow balance={'$' + String(this.props.loanAmount.toFixed(2))} />

          {paymentRows}
        </tbody>
      </table>
    );
  }
});
