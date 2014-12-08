var CalculatorApp = React.createClass({
  calcPir: function() {
    // formula for calculating periodic interest rate
    // ((1+(iR÷2))^2)^(1÷12)−1
    var iR = this.state.interestRate/100;
    var powerA = 1+(iR/2);
    var powerB = (1/12);
    return Math.pow(Math.pow(powerA,2),powerB)-1;
  },

  calcPmp: function() {
    /*
        formula for calculating monthly payments
        Ip: initial principal
        Pir: period interest rate
        m: ammortizaiton period in months
        (Ip*Pir)/(1-(1+Pir)^(-m))
    */
    var Ip  = this.state.homePrice - this.state.depositAmount;
    var Pir = this.calcPir();
    var m   = this.state.amortizationPeriod * 12;

    return (Ip*Pir)/(1-Math.pow(1+Pir, m*-1));
  },

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
            <LoanAmount className="form-control" loanAmount={loanAmount} />
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
      </form>
    );
  }
});

React.render(<CalculatorApp />,
  document.getElementById('calculator')
);
