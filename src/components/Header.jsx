import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  spendingCalc = () => {
    const { spending } = this.props;
    if (spending.length > 0) {
      const calc = spending.reduce((acc, actual) => {
        const cur = actual.currency;
        const currencyAsk = actual.exchangeRates[cur].ask;
        const value = Number(currencyAsk) * Number(actual.value);
        return acc + Number(value);
      }, 0);
      return Number(calc).toFixed(2);
    } return 0;
  };

  render() {
    const { email } = this.props;
    return (
      <>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{Number(this.spendingCalc()).toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  spending: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
  spending: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Header);
