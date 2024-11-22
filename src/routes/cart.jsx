import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
// import { addToCart, removeFromCart } from "../store/actions/cartActions"; // Replace with actual import path
import { addToCart, updateTCart, removeFromCart, singleItemRemoveFromCart, updateCart } from "../store/slices/cartSlices";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleQuantityChange = (item, newQuantity) => {
    const difference = newQuantity - item.quantity;
    console.log(newQuantity)
    if (difference > 0) {
      dispatch(updateTCart({ item, quantity: difference }));
        dispatch(updateCart());
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        dispatch(removeFromCart(item.id));
        dispatch(updateCart())
        }
    }
  };

  const handleRemoveItem = (itemId) => {
    console.log('wo')
    console.log("Deleting item id", itemId);
    dispatch(singleItemRemoveFromCart(itemId.id));
    dispatch(updateCart())
  };

  const navigateToCheckout = () => {
    navigate('/checkout')
  }

  return (
    <div className="container my-5">
      <Row className="py-3">
        <Col md="8">
          <Card className="rounded-0 border-0">
            <Card.Body>
              <h4 className="fw-bold mb-4">Your Cart</h4>
              {cartItems.length ? (
                cartItems.map((item) => (
                  <Row key={item.id} className="align-items-center mb-3 border-bottom pb-3">
                    <Col md="4">
                      <h5>{item.product.productName}</h5>
                    </Col>
                    <Col md="2" className="text-end">
                      <span>${item.product.price.toFixed(2)}</span>
                    </Col>
                    <Col md="3" className="text-center">
                      <Form.Control
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                        min="1"
                      />
                    </Col>
                    <Col md="2" className="text-end">
                      <Button variant="danger" onClick={()=>{handleRemoveItem(item)}}>
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))
              ) : (
                <h5>Your cart is empty.</h5>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card className="rounded-0 border-0 bg-light">
            <Card.Body>
              <h4 className="fw-bold">Order Summary</h4>
              <Row className="mb-2">
                <Col>Subtotal:</Col>
                <Col className="text-end">
                  ${cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                </Col>
              </Row>
              {/* <Row className="mb-2">
                <Col>Shipping:</Col>
                <Col className="text-end">$100.00</Col>
              </Row> */}
              <Row className="fw-bold">
                <Col>Total:</Col>
                <Col className="text-end">
                  $
                  {(
                    cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
                  ).toFixed(2)}
                </Col>
              </Row>
              <Button variant="danger" className="w-100 mt-4" onClick={navigateToCheckout}>
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
