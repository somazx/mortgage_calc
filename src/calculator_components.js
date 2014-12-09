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
    var paymentRows = [];
    var principal = this.props.loanAmount;
    var pAM  = Number(this.props.paymentAmount).toFixed(2);
    var pIR  = Number(this.props.monthlyInterestRate);
    var key  = 0;

    var payment = null,
        pi = null,
        pp = null

    while(principal > 0)
    {
      key++;
      payment = pAM;
      pi      = (principal * pIR).toFixed(2);
      pp      = (payment - pi);
      principal = principal - pp;

      paymentRows.push(
        <PaymentRow
          key       ={key}
          number    ={'#' + String(key)}
          payment   ={'$' + String(payment)}
          interest  ={'$' + String(pi)}
          principal ={'$' + String(pp.toFixed(2))}
          balance   ={'$' + String(principal.toFixed(2))}
          />
      );
    }

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
