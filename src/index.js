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
import AboutUs from './routes/aboutus';
import store from './store/store';
import Profile from './routes/profiles';
import ContactUs from './routes/contactus';
import Produts from './routes/products'
import Products from './routes/products';
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
        element:<ContactUs></ContactUs> 
      },
      {
        path: 'products',
        element: <Products></Products>
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
