var CalculatorApp = React.createClass({displayName: 'CalculatorApp',
  monthlyInterestRate: function() {
    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    var iR = this.state.interestRate/100;
    var powerA = 1+(iR/2);
    var powerB = (1/12);
    return Math.pow(Math.pow(powerA,2),powerB)-1;
  },

  monthlyPaymentAmount: function() {
    /*
        formula for calculating monthly payments
        Ip: initial principal
        Pir: period interest rate
        m: ammortizaiton period in months
        (Ip*Pir)/(1-(1+Pir)^(-m))
    */
    var Ip  = this.state.homePrice - this.state.depositAmount;
    var Pir = this.monthlyInterestRate();
    var m   = this.state.amortizationPeriod * 12;

    return (Ip*Pir)/(1-Math.pow(1+Pir, m*-1));
  },

  getInitialState: function() {
    return {
      homePrice: 200000,
      depositAmount: 100000,
      amortizationPeriod: 25,
      interestRate: 6.0
    };
  },

  loanAmount: function() {
    var loanAmount = this.state.homePrice - this.state.depositAmount;
    return (loanAmount > 0) ? loanAmount : 0;
  },

  onChange: function(state, newValue) {
    var newState = {};
    newState[state] = newValue;
    this.setState(newState);
  },

  render: function() {
    var loanAmount          = this.loanAmount();
    var paymentAmount       = this.monthlyPaymentAmount();
    var monthlyInterestRate = this.monthlyInterestRate();
    console.log(this.state);

    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-6"}, 
          React.createElement("form", {role: "form", className: "form-horizontal"}, 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("label", {htmlFor: "homePrice"}, "Home Price"), 
              React.createElement("div", {className: "input-group input-group-lg"}, 
                React.createElement("span", {className: "input-group-addon"}, "$"), 
                React.createElement(HomePrice, {
                  className: "form-control", 
                  onChange: this.onChange, 
                  homePrice: this.state.homePrice})
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("label", {htmlFor: "depositAmount"}, "Deposit Amount"), 
              React.createElement("div", {className: "input-group input-group-lg"}, 
                React.createElement("span", {className: "input-group-addon"}, "$"), 
                React.createElement(DepositAmount, {
                  className: "form-control", 
                  onChange: this.onChange, 
                  depositAmount: this.state.depositAmount})
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("label", {htmlFor: "loanAmount"}, "Loan Amount"), 
              React.createElement("div", {className: "input-group input-group-lg"}, 
                React.createElement("span", {className: "input-group-addon"}, "$"), 
                React.createElement(LoanAmount, {className: "form-control", 
                  loanAmount: loanAmount})
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-lg-6"}, 
                  React.createElement("label", {htmlFor: "interestRate"}, "Interest Rate"), 
                  React.createElement("div", {className: "input-group input-group-lg"}, 
                    React.createElement(InterestRate, {
                      className: "form-control", 
                      onChange: this.onChange, 
                      interestRate: this.state.interestRate}), 
                    React.createElement("span", {className: "input-group-addon"}, "%")
                  )
                ), 
                React.createElement("div", {className: "col-lg-6"}, 
                  React.createElement("label", {htmlFor: "amortizationPeriod"}, 
                    "Amortization Period"
                  ), 
                  React.createElement("div", {className: "input-group input-group-lg"}, 
                    React.createElement(AmortizationPeriod, {
                      className: "form-control", 
                      onChange: this.onChange, 
                      amortizationPeriod: this.state.amortizationPeriod})
                  )
                )
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-lg-6"}, 
                  React.createElement("label", {
                    htmlFor: "paymentAmount", 
                    className: "text-primary"}, "Monthly Payment Amount"), 
                  React.createElement("div", {className: "input-group input-group-lg"}, 
                    React.createElement("span", {className: "input-group-addon"}, "$"), 
                    React.createElement(PaymentAmount, {className: "form-control", 
                      paymentAmount: paymentAmount})
                  )
                )
              )
            )
          )
        ), 

        React.createElement("div", {className: "col-md-6"}, 
          React.createElement(YearlyPaymentsChart, {width: 400, height: 300, 
            loanAmount: loanAmount, 
            paymentAmount: paymentAmount}), 
          React.createElement(PaymentTable, {
            loanAmount: loanAmount, 
            paymentAmount: paymentAmount, 
            monthlyInterestRate: monthlyInterestRate})
        )
      )
    );
  }
});

React.render(React.createElement(CalculatorApp, null),
  document.getElementById('calculator')
);
