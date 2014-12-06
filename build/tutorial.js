/*
  Andy's amazing first attempt at working with React.JS
  copyright 2014 to forever and infinity by Andy Koch
  developer ninja amassador to awesome.

  Now stand back, and let me work code maijck.
*/

var Calculator = React.createClass({displayName: 'Calculator',
  getInitialState: function() {
      return {
        homePrice: 400000,
        depositAmount: 80000,
        amortizationPeriod: 25,
        interestRate: 3.5,
        amortizationPeriod: 25
      };
  },
  priceChange: function(e) {
    this.setState({homePrice: e.target.value});
  },
  depositChange: function(e) {
    this.setState({depositAmount: e.target.value});
  },
  interestRate: function(e) {
    this.setState({interestRate: e.target.value});
  },
  amortizationPeriod: function(e) {
    this.setState({amortizationPeriod: e.target.value});
  },
  loanAmount: function() {
    return Number(this.state.homePrice) - Number(this.state.depositAmount);
  },

  render: function() {
    var loanAmount = this.loanAmount();
    return (
      React.createElement("form", {role: "form", className: "form-horizontal"}, 

        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {htmlFor: "homePrice"}, "Home Price"), 
          React.createElement("div", {className: "input-group input-group-lg"}, 
            React.createElement("span", {className: "input-group-addon"}, "$"), 
            React.createElement("input", {id: "homePrice", 
              className: "form-control", 
              onChange: this.priceChange, 
              value: this.state.homePrice}
            )
          )
        ), 

        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {htmlFor: "depositAmount"}, "Deposit Amount"), 
          React.createElement("div", {className: "input-group input-group-lg"}, 
            React.createElement("span", {className: "input-group-addon"}, "$"), 
            React.createElement("input", {id: "depositAmount", 
              className: "form-control", 
              onChange: this.depositChange, 
              value: this.state.depositAmount}
            )
          )
        ), 

        React.createElement("div", {className: "form-group"}, 
          React.createElement("label", {htmlFor: "loanAmount"}, "Loan Amount"), 
          React.createElement("div", {className: "input-group input-group-lg"}, 
            React.createElement("span", {className: "input-group-addon"}, "$"), 
            React.createElement("input", {id: "loanAmount", 
              className: "form-control", 
              value: loanAmount, disabled: true})
          )
        ), 

        React.createElement("div", {className: "form-group"}, 
          React.createElement("div", {className: "row"}, 
            React.createElement("div", {className: "col-lg-6"}, 
              React.createElement("label", {htmlFor: "interestRate"}, "Interest Rate"), 
              React.createElement("div", {className: "input-group input-group-lg"}, 
                React.createElement("input", {id: "interestRate", 
                  className: "form-control", 
                  onChange: this.interestRate, 
                  value: this.state.interestRate}), 
                React.createElement("span", {className: "input-group-addon"}, "%")
              )
            ), 
            React.createElement("div", {className: "col-lg-6"}, 
              React.createElement("label", {htmlFor: "amortizationPeriod"}, 
                "Amortization Period"
              ), 
              React.createElement("div", {className: "input-group input-group-lg"}, 

                React.createElement("select", {id: "amortizationPeriod", 
                  className: "form-control", 
                  onChange: this.amortizationPeriod, 
                  value: this.state.amortizationPeriod
                }, 
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

              )
            )
          )
        )

      )
    );
  }
});


React.render(React.createElement(Calculator, null), document.getElementById('calculator'));
