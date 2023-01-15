import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { spendingDelete } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={ e.id }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method}</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>Real</td>
                <td>{ (+e.value).toFixed(2) }</td>
                <td>{(+e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>{(+e.value * e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>
                  <button data-testid="edit-btn" type="button">Editar</button>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => dispatch(spendingDelete(e)) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func,
  expense: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
