/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var Calculator = React.createClass({
  getInitialState: function() {
      return {
        homePrice: 0,
        depositAmount: 0
      };
  },
  priceChange: function(e) {
    this.setState({homePrice: e.target.value});
  },
  depositChange: function(e) {
    this.setState({depositAmount: e.target.value});
  },
  loanAmount: function() {
    return Number(this.state.homePrice) - Number(this.state.depositAmount);
  },

  render: function() {
    var loanAmount = this.loanAmount();
    return (
      <div>
        <input onChange={this.priceChange} placeholder="Home Price" />
        <input onChange={this.depositChange} placeholder="Deposit Amount" />
        Loan Amount: $<input value={loanAmount} disabled />
      </div>
    );
  },
});


React.render(<Calculator />, document.getElementById('calculator'));
