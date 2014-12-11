var CalculatorApp = React.createClass({
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
      <div className="row">
        <div className="col-md-6">
          <form role="form" className="form-horizontal">
            <div className="form-group">
              <label htmlFor="homePrice">Home Price</label>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">$</span>
                <HomePrice
                  className="form-control"
                  onChange={this.onChange}
                  homePrice={this.state.homePrice} />
              </div>
              <HomePriceSlider
                onChange={this.onChange}
                homePrice={this.state.homePrice} />
            </div>
            <div className="form-group">
              <label htmlFor="depositAmount">Deposit Amount</label>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">$</span>
                <DepositAmount
                  className="form-control"
                  onChange={this.onChange}
                  depositAmount={this.state.depositAmount} />
                <span className="input-group-addon">
                  {depositPercent}%
                </span>
              </div>
              <DepositAmountSlider
                onChange={this.onChange}
                depositAmount={this.state.depositAmount} />
            </div>
            <div className="form-group">
              <label htmlFor="loanAmount">Loan Amount</label>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">$</span>
                <LoanAmount className="form-control"
                  loanAmount={loanAmount} />
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="interestRate">Interest Rate</label>
                  <div className="input-group input-group-lg">
                    <InterestRate
                      className="form-control"
                      onChange={this.onChange}
                      interestRate={this.state.interestRate} />
                    <span className="input-group-addon">%</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="amortizationPeriod">
                    Amortization Period
                  </label>
                  <div className="input-group input-group-lg">
                    <AmortizationPeriod
                      className="form-control"
                      onChange={this.onChange}
                      amortizationPeriod={this.state.amortizationPeriod} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-6">
                  <label htmlFor="paymentFrequency">
                    Payment Frequency
                  </label>
                  <div className="input-group input-group-lg">
                    <PaymentFrequency className="form-control"
                      onChange={this.onChange}
                      paymentFrequency={this.state.paymentFrequency}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-lg-6">
                  <label
                    htmlFor="paymentAmount"
                    className="text-primary">{this.state.paymentFrequency} Payment Amount</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-addon">$</span>
                    <PaymentAmount className="form-control"
                      paymentAmount={paymentAmount} />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <YearlyPaymentsChart width={400} height={300}
            loanAmount={loanAmount}
            paymentAmount={paymentAmount} />
          <PaymentTable
            loanAmount={loanAmount}
            getPayments={this.calcPayments}/>
        </div>
      </div>
    );
  }
});

React.render(<CalculatorApp />,
  document.getElementById('calculator')
);
