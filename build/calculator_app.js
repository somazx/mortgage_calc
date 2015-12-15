var CalculatorApp = React.createClass({
  displayName: 'CalculatorApp',

  monthlyInterestRate: function (frequency) {
    if (frequency == undefined) {
      frequency = 'Monthly';
    }

    var powerB = null;
    switch (frequency) {
      case 'Monthly':
        powerB = 1 / 12;
        break;
      case 'Weekly':
        powerB = 7 / 365;
        break;
      case 'Bi-weekly':
        powerB = 14 / 365;
        break;
    }

    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    var iR = this.state.interestRate / 100;
    var powerA = 1 + iR / 2;
    return Math.pow(Math.pow(powerA, 2), powerB) - 1;
  },

  depositPercent: function () {
    return this.state.depositAmount / this.state.homePrice * 100;
  },

  periodPaymentAmount: function () {
    var amount = this.monthlyPaymentAmount();
    switch (this.state.paymentFrequency) {
      case 'Monthly':
        return amount;
      case 'Weekly':
        return amount / 4;
      case 'Bi-weekly':
        return amount / 2;
    }
  },

  calcPayments: function () {
    var payments = [];
    var frequency = this.state.paymentFrequency;
    var principal = this.loanAmount();
    var payment = Number(this.periodPaymentAmount().toFixed(2));
    var interestRate = Number(this.monthlyInterestRate(frequency));
    var key = 0,
        pi = null,
        pp = null;

    while (principal > 0) {
      key++;
      pi = Number((principal * interestRate).toFixed(2));
      payment = payment > principal + pi ? principal + pi : payment;
      pp = payment - pi;
      principal = principal - pp;

      payments.push({
        payment: payment,
        interest: pi,
        principal: pp,
        balance: principal
      });

      // fail safe
      if (key > 5000) {
        break;
      }
    }

    return payments;
  },

  monthlyPaymentAmount: function () {
    /*
        formula for calculating monthly payments
        Ip: initial principal
        Pir: period interest rate
        m: ammortizaiton period in months
        (Ip*Pir)/(1-(1+Pir)^(-m))
    */
    var Ip = this.state.homePrice - this.state.depositAmount;
    var Pir = this.monthlyInterestRate('Monthly');
    var m = this.state.amortizationPeriod * 12;

    return Ip * Pir / (1 - Math.pow(1 + Pir, m * -1));
  },

  getInitialState: function () {
    return {
      homePrice: 200000,
      depositAmount: 100000,
      amortizationPeriod: 25,
      interestRate: 6.0,
      paymentFrequency: "Monthly"
    };
  },

  loanAmount: function () {
    var loanAmount = this.state.homePrice - this.state.depositAmount;
    return loanAmount > 0 ? loanAmount : 0;
  },

  onChange: function (state, newValue) {
    var newState = {};
    newState[state] = newValue;
    this.setState(newState);
  },

  render: function () {
    var loanAmount = this.loanAmount();
    var paymentAmount = this.periodPaymentAmount();
    var monthlyInterestRate = this.monthlyInterestRate();
    var depositPercent = this.depositPercent().toFixed(1);

    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-md-12' },
        React.createElement(
          'form',
          { role: 'form', className: 'form-horizontal' },
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'label',
              { htmlFor: 'homePrice' },
              'Home Price'
            ),
            React.createElement(
              'div',
              { className: 'input-group input-group-sm' },
              React.createElement(
                'span',
                { className: 'input-group-addon' },
                '$'
              ),
              React.createElement(HomePrice, {
                className: 'form-control',
                onChange: this.onChange,
                homePrice: this.state.homePrice })
            ),
            React.createElement(HomePriceSlider, {
              onChange: this.onChange,
              homePrice: this.state.homePrice })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'label',
              { htmlFor: 'depositAmount' },
              'Deposit Amount'
            ),
            React.createElement(
              'div',
              { className: 'input-group input-group-sm' },
              React.createElement(
                'span',
                { className: 'input-group-addon' },
                '$'
              ),
              React.createElement(DepositAmount, {
                className: 'form-control',
                onChange: this.onChange,
                depositAmount: this.state.depositAmount }),
              React.createElement(
                'span',
                { className: 'input-group-addon' },
                depositPercent,
                '%'
              )
            ),
            React.createElement(DepositAmountSlider, {
              onChange: this.onChange,
              depositAmount: this.state.depositAmount })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'label',
              { htmlFor: 'loanAmount' },
              'Loan Amount'
            ),
            React.createElement(
              'div',
              { className: 'input-group input-group-sm' },
              React.createElement(
                'span',
                { className: 'input-group-addon' },
                '$'
              ),
              React.createElement(LoanAmount, { className: 'form-control',
                loanAmount: loanAmount })
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                  'label',
                  { htmlFor: 'interestRate' },
                  'Interest Rate'
                ),
                React.createElement(
                  'div',
                  { className: 'input-group input-group-sm' },
                  React.createElement(InterestRate, {
                    className: 'form-control',
                    onChange: this.onChange,
                    interestRate: this.state.interestRate }),
                  React.createElement(
                    'span',
                    { className: 'input-group-addon' },
                    '%'
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                  'label',
                  { htmlFor: 'amortizationPeriod' },
                  'Amortization Period'
                ),
                React.createElement(
                  'div',
                  { className: 'input-group input-group-sm' },
                  React.createElement(AmortizationPeriod, {
                    className: 'form-control',
                    onChange: this.onChange,
                    amortizationPeriod: this.state.amortizationPeriod })
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                  'label',
                  { htmlFor: 'paymentFrequency' },
                  'Payment Frequency'
                ),
                React.createElement(
                  'div',
                  { className: 'input-group input-group-sm' },
                  React.createElement(PaymentFrequency, { className: 'form-control',
                    onChange: this.onChange,
                    paymentFrequency: this.state.paymentFrequency })
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement(
              'div',
              { className: 'row' },
              React.createElement(
                'div',
                { className: 'col-sm-6' },
                React.createElement(
                  'label',
                  {
                    htmlFor: 'paymentAmount',
                    className: 'text-primary' },
                  this.state.paymentFrequency,
                  ' Payment Amount'
                ),
                React.createElement(
                  'div',
                  { className: 'input-group input-group-sm' },
                  React.createElement(
                    'span',
                    { className: 'input-group-addon' },
                    '$'
                  ),
                  React.createElement(PaymentAmount, { className: 'form-control',
                    paymentAmount: paymentAmount })
                )
              )
            )
          )
        )
      )
    );
  }
});

React.render(React.createElement(CalculatorApp, null), document.getElementById('calculator'));