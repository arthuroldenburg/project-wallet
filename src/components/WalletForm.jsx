import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionCurrencies, spendingsSave } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    tag: 'Alimentação',
    method: 'Dinheiro',
  };

  componentDidMount() {
    this.saveCurrencies();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const api = await this.currenciesFetch();
    this.setState((prevState) => ({
      ...prevState,
      id: prevState.id + 1,
    }));
    const objApi = {
      id,
      value,
      description,
      currency,
      tag,
      method,
      exchangeRates: api,
    };
    dispatch(spendingsSave(objApi));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      tag: 'Alimentação',
      method: 'Dinheiro',
    });
  };

  currenciesFetch = async () => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await request.json();
    return response;
  };

  saveCurrencies = async () => {
    const { dispatch } = this.props;
    const response = await this.currenciesFetch();
    delete response.USDT;
    const arrayInAppi = Object.keys(response);
    dispatch(actionCurrencies(arrayInAppi));
  };

  render() {
    const { value, description, currency, tag, method } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <label htmlFor="value-input">
          <input
            type="text"
            id="value-input"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            className="inputsWalletForm"
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="text"
            id="description-input"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
            name="description"
            className="inputsWalletForm"
          />
        </label>
        <select
          id="currency-input"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
          name="currency"
        >
          {currencies.map((e) => <option key={ e }>{e}</option>)}
        </select>
        <select
          id="method-input"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
          name="method"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          id="tag-input"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
          name="tag"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
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
