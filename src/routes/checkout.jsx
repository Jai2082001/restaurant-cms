import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/slices/cartSlices';
import { updateProfile } from '../store/slices/userSlices';

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you can handle the payment processing logic
    console.log('Address:', address);
    console.log('Payment Method:', paymentMethod);
    console.log('Cart Items:', cartItems);

    // Clear the cart after successful checkout
    dispatch(clearCart());
    alert('Checkout successful!');
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart before checking out.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="address">Shipping Address:</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Enter your shipping address"
            />
          </div>
          <div>
            <label htmlFor="payment">Payment Method:</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>
          <button type="submit">Complete Purchase</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;