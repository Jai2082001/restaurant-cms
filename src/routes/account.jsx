import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Account from './Login'; // Adjust path if necessary
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../store'; // Import your root reducer

// Create a mock Redux store
const store = createStore(rootReducer);

describe('Account Component', () => {
  test('renders the login form', () => {
    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    // Check if the email, password, and login button are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  test('should handle form input and submit for login', () => {
    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    // Fill in the login form
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    // Check if the login action is dispatched (you can mock redux dispatch or check for certain effects)
    // This test just ensures the submit button works for login.
    expect(screen.getByRole('button', { name: /log in/i })).toBeDisabled();
  });

  test('should toggle between login and register', () => {
    render(
      <Provider store={store}>
        <Account />
      </Provider>
    );

    // Click to toggle from login to register
    fireEvent.click(screen.getByRole('button', { name: /need an account\? register/i }));

    // Check if the confirm password input appears for registration
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    // Toggle back to login
    fireEvent.click(screen.getByRole('button', { name: /already have an account\? log in/i }));

    // Ensure the confirm password input is removed and we're back to the login form
    expect(screen.queryByLabelText(/confirm password/i)).not.toBeInTheDocument();
  });
});
