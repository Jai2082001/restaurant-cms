import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './error-page';
import Route from './routes/root'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './routes/contacts';
import HomePage from './routes/homepage';
import Orders from './routes/orders';
import Checkout from './routes/checkout';
import { Provider } from 'react-redux';
import store from './store/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Route></Route>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        index: true,
        element:<HomePage></HomePage>
      },
      {
        path: "contacts/:contactId",
        element: <Contact></Contact>
      },
      {
        path: "orders",
        element: <Orders></Orders>
      },
      {
        path: "checkout",
        element: <Checkout></Checkout>
      }
    ]
  },

]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
