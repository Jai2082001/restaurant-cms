import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './error-page.jsx';
import Route from './routes/root.jsx'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Contact from './routes/contacts.jsx';
import HomePage from './routes/homepage.jsx';
import Orders from './routes/orders.jsx';
import Checkout from './routes/checkout.jsx';
import { Provider } from 'react-redux';
import AboutUs from './routes/aboutus.jsx';
import store from './store/store.js';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Profile from './routes/profiles.jsx';
import ContactUs from './routes/contactus.jsx';
import Products from './routes/products.jsx';
import Cart from './routes/cart.jsx';
import Account from './routes/account.jsx'
import SingleProductRoutePage from './routes/SingleProductRoute.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
const initialOptions = {
  "client-id": "AV0X98BIlO_j12JEaefAuq_NPzggVj5mCFUMagBNQKXtTvTM_YgsMzwd5_HGZajg_thbZMcf5LKar2G-",
  currency: "USD",
  intent: "capture",
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Route></Route>,
    errorElement: <ErrorPage></ErrorPage>,

    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },

      {
        path: "orders",
        element: <Orders></Orders>
      },
      {
        path: "checkout",
        element: <ProtectedRoutes Component={<Checkout></Checkout>}></ProtectedRoutes>
      },
      {
        path: "profile",
        element: <Profile></Profile>
      },
      {
        path: 'aboutus',
        element: <AboutUs></AboutUs>
      },
      {
        path: 'contactus',
        element: <ContactUs></ContactUs>
      },
      {
        path: 'products',
        element: <Products></Products>
      },
      {
        path: 'cart',
        element: <ProtectedRoutes Component={<Cart></Cart>}></ProtectedRoutes>
      },
      {
        path: 'account',
        element: <Account></Account>
      },
      {
        path: 'product/:details',
        element: <SingleProductRoutePage></SingleProductRoutePage>
      }
    ]
  },

]);
root.render(
  <PayPalScriptProvider options={initialOptions}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

