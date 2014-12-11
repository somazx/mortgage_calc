var CalculatorApp = React.createClass({displayName: 'CalculatorApp',
  monthlyInterestRate: function() {
    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    var iR = this.state.interestRate/100;
    var powerA = 1+(iR/2);
    var powerB = (1/12);
    return Math.pow(Math.pow(powerA,2),powerB)-1;
  },

  weeklyInterestRate: function() {
    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    var iR = this.state.interestRate/100;
    var powerA = 1+(iR/2);
    var powerB = (7/365);
    return Math.pow(Math.pow(powerA,2),powerB)-1;
  },

  depositPercent: function() {
    return this.state.depositAmount / this.state.homePrice * 100;
  },

  periodPaymentAmount: function() {
    var amount = this.monthlyPaymentAmount();
    switch (this.state.paymentFrequency) {
    case 'Monthly':
      return amount;
    case 'Weekly':
      return amount/4;
    case 'Bi-weekly':
      return amount/2;
    }
  },

  calcPayments: function() {
    var payments = [];
    var principal = this.loanAmount();
    var pAM  = Number(this.monthlyPaymentAmount()).toFixed(2);
    var pIR  = Number(this.monthlyInterestRate());
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

      payments.push({
        payment:   Number(payment),
        interest:  Number(pi),
        principal: pp,
        balance:   principal
      });
    }

    return payments;
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
      interestRate: 6.0,
      paymentFrequency: "Weekly"
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
    var paymentAmount       = this.periodPaymentAmount();
    var monthlyInterestRate = this.monthlyInterestRate();
    var depositPercent = this.depositPercent().toFixed(1);

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
              ), 
              React.createElement(HomePriceSlider, {
                onChange: this.onChange, 
                homePrice: this.state.homePrice})
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("label", {htmlFor: "depositAmount"}, "Deposit Amount"), 
              React.createElement("div", {className: "input-group input-group-lg"}, 
                React.createElement("span", {className: "input-group-addon"}, "$"), 
                React.createElement(DepositAmount, {
                  className: "form-control", 
                  onChange: this.onChange, 
                  depositAmount: this.state.depositAmount}), 
                React.createElement("span", {className: "input-group-addon"}, 
                  depositPercent, "%"
                )
              ), 
              React.createElement(DepositAmountSlider, {
                onChange: this.onChange, 
                depositAmount: this.state.depositAmount})
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
                  React.createElement("label", {htmlFor: "paymentFrequency"}, 
                    "Payment Frequency"
                  ), 
                  React.createElement("div", {className: "input-group input-group-lg"}, 
                    React.createElement(PaymentFrequency, {className: "form-control", 
                      onChange: this.onChange, 
                      paymentFrequency: this.state.paymentFrequency})
                  )
                )
              )
            ), 
            React.createElement("div", {className: "form-group"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-lg-6"}, 
                  React.createElement("label", {
                    htmlFor: "paymentAmount", 
                    className: "text-primary"}, this.state.paymentFrequency, " Payment Amount"), 
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
            getPayments: this.calcPayments})
        )
      )
    );
  }
});

React.render(React.createElement(CalculatorApp, null),
  document.getElementById('calculator')
);
