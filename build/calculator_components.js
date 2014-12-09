/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var HomePrice = React.createClass({displayName: 'HomePrice',
  updateHomePrice: function(e) {
    this.props.onChange('homePrice', e.target.value);
  },

  render: function() {
    return (
      React.createElement("input", {type: "number", className: this.props.className, 
        value: this.props.homePrice, 
        onChange: this.updateHomePrice})
    );
  }
});

var DepositAmount = React.createClass({displayName: 'DepositAmount',
  updateDepositAmount: function(e) {
    this.props.onChange('depositAmount', e.target.value);
  },

  render: function() {
    return (
      React.createElement("input", {type: "number", className: this.props.className, 
        value: this.props.depositAmount, 
        onChange: this.updateDepositAmount})
    );
  }
});

var LoanAmount = React.createClass({displayName: 'LoanAmount',
  render: function() {
    return (
      React.createElement("input", {type: "number", className: this.props.className, 
       value: this.props.loanAmount, disabled: true})
    );
  }
});

var PaymentAmount = React.createClass({displayName: 'PaymentAmount',
  render: function() {
    return (
      React.createElement("input", {type: "number", className: this.props.className, 
       value: this.props.paymentAmount.toFixed(2), disabled: true})
    );
  }
});

var InterestRate = React.createClass({displayName: 'InterestRate',
  updateInterestRate: function(e) {
    this.props.onChange('interestRate', e.target.value);
  },

  render: function() {
    return (
      React.createElement("input", {type: "number", className: this.props.className, 
        onChange: this.updateInterestRate, 
        value: this.props.interestRate})
    );
  }
});

var AmortizationPeriod = React.createClass({displayName: 'AmortizationPeriod',
  updateAmortizationPeriod: function(e) {
      this.props.onChange('amortizationPeriod', e.target.value);
  },

  render: function() {
    return (
      React.createElement("select", {className: this.props.className, 
        onChange: this.updateAmortizationPeriod, 
        value: this.props.amortizationPeriod}, 
        React.createElement("option", null, "1"), 
        React.createElement("option", null, "2"), 
        React.createElement("option", null, "3"), 
        React.createElement("option", null, "4"), 
        React.createElement("option", null, "5"), 
        React.createElement("option", null, "10"), 
        React.createElement("option", null, "15"), 
        React.createElement("option", null, "20"), 
        React.createElement("option", null, "25"), 
        React.createElement("option", null, "30")
      )
    );
  }
});

var PaymentRow = React.createClass({displayName: 'PaymentRow',
  render: function() {
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, this.props.number), 
        React.createElement("td", {className: "amount"}, this.props.payment), 
        React.createElement("td", {className: "amount"}, this.props.interest), 
        React.createElement("td", {className: "amount"}, this.props.principal), 
        React.createElement("td", {className: "amount"}, this.props.balance)
      )
    );
  }
});

var PaymentTable = React.createClass({displayName: 'PaymentTable',
  render: function() {
    var paymentRows = [];
    var principal = this.props.loanAmount;
    var pAM  = Number(this.props.paymentAmount).toFixed(2);
    var pIR  = Number(this.props.monthlyInterestRate);
    var key  = 0;

    while(principal > 0)
    {
      key++;
      payment = pAM;
      pi      = (principal * pIR).toFixed(2);
      pp      = (payment - pi);
      principal = principal - pp;

      // TODO fix bug when final payment nears zero:
      //      can recrate with loan amount ie 299991
      if (principal < 0) {
        payment = (Number(payment) + Number(principal)).toFixed(2);
        pp      = (payment - pi);
        principal = 0;
      }

      paymentRows.push(
        React.createElement(PaymentRow, {
          key: key, 
          number: '#' + String(key), 
          payment: '$' + String(payment), 
          interest: '$' + String(pi), 
          principal: '$' + String(pp.toFixed(2)), 
          balance: '$' + String(principal.toFixed(2))}
          )
      );
    }

    return (
      React.createElement("table", {className: "table table-hover table-condensed table-payments"}, 
        React.createElement("thead", null, 
          React.createElement("tr", null, 
            React.createElement("th", null, "Payment #"), 
            React.createElement("th", {className: "amount"}, "Payment"), 
            React.createElement("th", {className: "amount"}, "Interest"), 
            React.createElement("th", {className: "amount"}, "Principal"), 
            React.createElement("th", {className: "amount"}, "Balance")
          )
        ), 

        React.createElement("tbody", null, 
          React.createElement(PaymentRow, {balance: '$' + String(this.props.loanAmount.toFixed(2))}), 

          paymentRows
        )
      )
    );
  }
});
