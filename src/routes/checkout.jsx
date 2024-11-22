
import BaseContainer from "../components/common/container/BaseContainer";
import axios from "axios";
import DeliveryForm from "../components/deliveryform/DeliveryForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import { Row, Col, Form, Card, Button } from "react-bootstrap";

import { BsCartX } from "react-icons/bs";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import SavedAddresses from "../components/SavedAddresses/SavedAddresses";

const Checkout = () => {

  const cartItems = useSelector(state => state.cart.items)
  const navigate = useNavigate();
  const [pickup, changePickup] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState(false);
  const [status, changeStatus] = useState(false);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_FETCH_LINK}/api/addresses`, { withCredentials: true }).then((response) => {
      setAddresses(response.data);
      if (addresses && addresses.length > 0) {
        setAddress(addresses[0].id);
      }
    });

  }, [])



  const addressChange = (e) => {
    setAddress(e.target.id)
  }
  const navigateToCart = () => {
    navigate('/cart')
  }

  const checkOutForm = () => { }

  const onCreateOrder = (data, actions) => {

    const total = Number(
      cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 100
    ).toFixed(2)

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total,
          },
        },
      ],
    });
  };

  const checkoutHandler = async () => {
    const response = axios.post(`${process.env.REACT_APP_FETCH_LINK}/checkout`, {
      body: cartItems,

    }, {
      withCredentials: true, // Ensures cookies are sent and received
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate('/account')

  }
  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      changeStatus(true)
    });
  };


  return (
    <BaseContainer>

      {!cartItems.length && (
        <Row className="py-5 mt-5 mb-5 border-bottom">
          <Col md="12" xs="12">
            <div className="mt-3 mb-3">
              <span>
                <BsCartX size={50} className="mx-auto d-block" />
              </span>
            </div>
            <div className="mt-3 mb-3">
              <h2 className="ft-14 fw-normal text-center">
                No products in the cart.
              </h2>
            </div>
            <div className="mt-3 mb-3 px-5">
              <Row>
                <Col md={{ span: 4, offset: 4 }}>
                  <Button
                    variant="danger"
                    className="text-center w-100"
                    onClick={() => {
                      // router.push("/products/all-items");
                    }}
                  >
                    <span className="ft-13 fw-bold text-uppercase">
                      Return to shop
                    </span>
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      )}
      {cartItems.length > 0 && (
        // <FormProvider {...methods}>
        <Form onSubmit={checkOutForm} className="py-3" >
          <button onClick={navigateToCart} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-md">
            Edit Cart
          </button>
          <div className="flex items-center space-x-4 mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="orderType"
                value="pickup"
                className="hidden peer"
                defaultChecked
              />
              <span onClick={() => { changePickup(true) }} className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-gray-700 peer-checked:bg-blue-600 peer-checked:text-white transition">
                Pickup
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="orderType"
                value="delivery"
                className="hidden peer"
              />
              <span onClick={() => { changePickup(false) }} className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer text-gray-700 peer-checked:bg-blue-600 peer-checked:text-white transition">
                Delivery
              </span>
            </label>
          </div>

          <Row className="py-3 border-bottom">
            {
              !pickup &&
              <>
                {!addresses && <DeliveryForm></DeliveryForm>}
                {addresses && addresses.length == 0 &&
                  <DeliveryForm></DeliveryForm>
                }
                {addresses && addresses.length > 0 &&
                  <SavedAddresses
                    addresses={addresses}
                    selectedAddressId={addresses[0].id}
                    onSelectAddress={addressChange}
                  >
                  </SavedAddresses>}

              </>

            }
            {
              pickup &&
              <Col md="7">
                <div className="flex items-center bg-blue-100 p-4 rounded-md mb-4 shadow-lg">
                  <span className="text-blue-500 animate-spin mr-3">
                    <i className="fas fa-clock fa-2x"></i> {/* Font Awesome clock icon */}
                  </span>
                  <h3 className="text-xl font-bold text-blue-700">
                    Your order will be ready within 30 minutes of placement!
                  </h3>
                </div>
              </Col>

            }
            <Col md="5">
              <Row>
                <Col md="12" className="bg-gray-200 py-3">
                  <h4 className="ft-20 fw-bold text-center mt-2 mb-3">
                    YOUR ORDER
                  </h4>
                  <Row>
                    <Col md="12">
                      <Card className="rounded-0 border-0 bg-white">
                        <Card.Body>
                          <Row className="mt-2 mb-2 border-bottom">
                            <Col md="6" className="text-start">
                              <h4 className="text-uppercase fw-bold ft-16">
                                PRODUCT
                              </h4>
                            </Col>
                            <Col md="6" className="text-end">
                              <h4 className="text-uppercase fw-bold ft-16">
                                Sub Total
                              </h4>
                            </Col>
                          </Row>

                          {cartItems.length > 0 &&
                            cartItems.map((cart) => {
                              return (
                                <Row
                                  key={cart.id}
                                  className="py-2 mt-2 mb-2 border-bottom"
                                >
                                  <Col md="6" className="text-start">
                                    <h4 className="font-bold text-lg text-color-b94 flex-1">
                                      {cart.product.productName}
                                      <span className="ml-2 text-gray-500">{cart.quantity}</span>
                                    </h4>
                                    <button className="mx-4 text-red-500 hover:text-red-700 focus:outline-none">
                                      &times; {/* This represents the 'x' symbol */}
                                    </button>

                                  </Col>
                                  <Col md="6" className="text-end">
                                    <h4 className="text-uppercase fw-bold ft-14">
                                      <span className="font-semibold text-lg">${cart.product.price}</span>
                                    </h4>
                                  </Col>
                                </Row>
                              );
                            })}

                          <Row className="py-2 mt-2 mb-2 border-bottom">
                            <Col md="6" className="text-start">
                              <h4 className="fw-bold ft-14 text-dark">
                                Subtotal
                              </h4>
                            </Col>
                            <Col md="6" className="text-end">
                              <h4 className="text-uppercase fw-bold ft-14 text-color-d12">

                                {Number(
                                  cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                                ).toFixed(2)}
                              </h4>
                            </Col>
                          </Row>
                          <Row className="py-2 mt-2 mb-2 border-bottom">
                            <Col md="6" className="text-start">
                              <h4 className="fw-bold ft-14 text-dark">
                                Shipping
                              </h4>
                            </Col>
                            <Col md="6" className="text-end">
                              <h4 className="fw-bold ft-14 text-color-d12">
                                <span className="text-dark fw-normal">
                                  Flat rate:
                                </span>{" "}
                                <span className="text-color-d12 fw-bold">
                                  100.00
                                </span>
                              </h4>
                            </Col>
                          </Row>
                          <Row className="py-2 mt-2 mb-2 border-bottom">
                            <Col md="6" className="text-start">
                              <h4 className="fw-bold ft-16 text-dark">
                                Total
                              </h4>
                            </Col>
                            <Col md="6" className="text-end">
                              <h4 className="fw-bold ft-16 text-color-d12">
                                <span className="text-color-d12 fw-bold">

                                  {Number(
                                    cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 100
                                  ).toFixed(2)}
                                </span>
                              </h4>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="py-3 px-3">
                    <Col md="12">
                      <Row className="mb-2">
                        <Col md="12">

                          <PayPalButtons createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)} />

                        </Col>
                      </Row>


                      <Row className="py-2 mb-2 px-3">
                        <Col md="12">
                          <Button
                            disabled={!status}
                            variant="danger"
                            type="submit"
                            className="text-center w-100 rounded-0"
                            onClick={checkoutHandler}
                          >
                            <span className="ft-13 fw-bold text-uppercase">
                              {!status && 'Complete the Payment to place order'}
                              {status && 'Proceed to Checkout'}
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        // </FormProvider>
      )}
    </BaseContainer>
  );
};

export default Checkout;
