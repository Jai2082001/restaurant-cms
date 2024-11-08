// src/components/__tests__/Account.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Account from '../Account';

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Account Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        status: 'idle',
        error: null,
        isAuthenticated: false,
      },
    });
  });

  test('renders login form by default', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('toggles to registration form when "Need an account? Register" is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    const toggleButton = screen.getByText(/need an account\? register/i);
    fireEvent.click(toggleButton);

    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('displays error message when error is present in Redux state', () => {
    store = mockStore({
      auth: {
        status: 'idle',
        error: 'Invalid credentials',
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test('shows loading message when status is "loading"', () => {
    store = mockStore({
      auth: {
        status: 'loading',
        error: null,
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });

  test('dispatches loginUser action when login form is submitted', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'auth/loginUser/pending',
      meta: {
        arg: { email: 'user@example.com', password: 'password123' },
        requestId: expect.any(String),
      },
    });
  });

  test('dispatches registerUser action when registration form is submitted', () => {
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    // Toggle to registration form
    fireEvent.click(screen.getByText(/need an account\? register/i));
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'auth/registerUser/pending',
      meta: {
        arg: { email: 'user@example.com', password: 'password123' },
        requestId: expect.any(String),
      },
    });
  });

  test('navigates to Google login when Google login button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Account />
        </BrowserRouter>
      </Provider>
    );

    delete window.location;
    window.location = { href: jest.fn() };

    fireEvent.click(screen.getByRole('button', { name: /login with google/i }));
    expect(window.location.href).toBe(`${process.env.REACT_APP_FETCH_LINK}/auth/google`);
  });
});
