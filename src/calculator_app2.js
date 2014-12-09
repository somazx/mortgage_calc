var CalculatorApp = React.createClass({
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
            </div>
            <div className="form-group">
              <label htmlFor="depositAmount">Deposit Amount</label>
              <div className="input-group input-group-lg">
                <span className="input-group-addon">$</span>
                <DepositAmount
                  className="form-control"
                  onChange={this.onChange}
                  depositAmount={this.state.depositAmount} />
              </div>
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
                  <label
                    htmlFor="paymentAmount"
                    className="text-primary">Monthly Payment Amount</label>
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
            paymentAmount={paymentAmount}
            monthlyInterestRate={monthlyInterestRate} />
        </div>
      </div>
    );
  }
});

React.render(<CalculatorApp />,
  document.getElementById('calculator')
);
