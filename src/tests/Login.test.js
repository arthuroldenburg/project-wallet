import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Test login page', () => {
  test('test if have email input', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByRole('textbox');
    expect(emailInput).toBeInTheDocument();
  });
  test('test if have password input', () => {
    renderWithRouterAndRedux(<App />);
    const password = screen.getByRole('textbox');
    expect(password).toBeInTheDocument();
  });
  test('test if have a button whith text "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();
  });
  test('test if after interact whith the button it change the route', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(emailInput, 'trybe@betrybe.com');
    userEvent.type(password, '123456');
    expect(emailInput).toHaveValue('trybe@betrybe.com');
    expect(password).toHaveValue('123456');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
