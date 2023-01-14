import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnDisabled: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.handleBtnDisabled);
  };

  handleBtnDisabled = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const SIX = 6;
    const emailValid = regex.test(email);
    const passwordValid = password.length >= SIX;
    this.setState({ btnDisabled: emailValid && passwordValid });
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(actionLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, btnDisabled } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            id="email"
            value={ email }
            onChange={ this.handleChange }
            className="inputLogin"
          />
        </label>
        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            value={ password }
            onChange={ this.handleChange }
            className="inputLogin"
          />
        </label>
        <button
          type="button"
          disabled={ !btnDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
