import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    this.currenciesFetch();
  }

  currenciesFetch = async () => {
    const { dispatch } = this.props;
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    delete response.USDT;
    const arrayInAppi = Object.keys(response);
    dispatch(actionCurrencies(arrayInAppi));
  };

  render() {
    const { currencies } = this.props;
    return (
      <>
        <label htmlFor="value-input">
          <input
            type="number"
            id="value-input"
            data-testid="value-input"
            className="inputsWalletForm"
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            className="inputsWalletForm"
          />
        </label>
        <select
          id="currency-input"
          data-testid="currency-input"
        >
          {currencies.map((e) => <option key={ e }>{e}</option>)}
        </select>
        <select
          id="method-input"
          data-testid="method-input"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          id="tag-input"
          data-testid="tag-input"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button type="button">Adicionar despesa</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func,
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
