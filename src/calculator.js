/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var Calculator = React.createClass({
  // HELPER METHODS
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
    var Ip  = this.state.homePrice;
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

  priceChange: function(e) {
    this.setState({homePrice: Number(e.target.value)});
  },
  depositChange: function(e) {
    this.setState({depositAmount: Number(e.target.value)});
  },
  interestRate: function(e) {
    this.setState({interestRate: e.target.value});
    console.log({Pir: this.calcPir(), Pmp: this.calcPmp()});
  },
  amortizationPeriod: function(e) {
    this.setState({amortizationPeriod: Number(e.target.value)});
  },
  loanAmount: function() {
    return Number(this.state.homePrice) - Number(this.state.depositAmount);
  },

  render: function() {
    var loanAmount = this.loanAmount();
    return (
      <form role="form" className="form-horizontal">

        <div className="form-group">
          <label htmlFor="homePrice">Home Price</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">$</span>
            <input id="homePrice"
              className="form-control"
              onChange={this.priceChange}
              value={this.state.homePrice}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="depositAmount">Deposit Amount</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">$</span>
            <input id="depositAmount"
              className="form-control"
              onChange={this.depositChange}
              value={this.state.depositAmount}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount</label>
          <div className="input-group input-group-lg">
            <span className="input-group-addon">$</span>
            <input id="loanAmount"
              className="form-control"
              value={loanAmount} disabled />
          </div>
        </div>

        <div className="form-group">
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="interestRate">Interest Rate</label>
              <div className="input-group input-group-lg">
                <input id="interestRate"
                  className="form-control"
                  onChange={this.interestRate}
                  value={this.state.interestRate}/>
                <span className="input-group-addon">%</span>
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="amortizationPeriod">
                Amortization Period
              </label>
              <div className="input-group input-group-lg">

                <select id="amortizationPeriod"
                  className="form-control"
                  onChange={this.amortizationPeriod}
                  value={this.state.amortizationPeriod}
                >
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

              </div>
            </div>
          </div>
        </div>


      </form>
    );
  }
});


React.render(<Calculator />, document.getElementById('calculator'));
