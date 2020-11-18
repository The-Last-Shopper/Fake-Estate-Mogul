import React from 'react'
import Checkout from './payment'
import {Card} from 'react-bootstrap'

//Stripe setup
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

import STRIPE_PUBLISHABLE from './constants/stripe'
import PAYMENT_SERVER_URL from './constants/server'

const CURRENCY = 'USD'

const fromDollarToCent = amount => amount * 100 //<-- we might not need this isf we are never converting our prices to cents

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Alert Error')
}

const onToken = (amount, description) => async token => {
  try {
    await axios.post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount) //<-- again, we might just be able to put in amount without the conversion
    })
    successPayment()
  } catch (err) {
    errorPayment()
  }
}

//Stripe setup end

const CheckOut = props => {
  const {cart, order, total} = props.location.state

  return (
    <div className="bg">
      <div className="order-header">
        <h2>Order #{order.id}</h2>
        <h3>Confirmation #{order.confirmationNum}</h3>
        <h3>Total Price: ${total}</h3>
        <div>
          <Checkout amount={total} />
        </div>
        <p>
          You have successfully checked out! The following is a list of all
          items in your order
        </p>
      </div>
      <div className="container">
        {cart.length &&
          cart.map((product, index) => (
            <div className="col-sm-3" key={index}>
              <Card border="primary" style={{width: '18rem'}}>
                <p>{product.name}</p>
                <p>Quantity: {product.quantity}</p>
                <img src={product.imageUrl} />
              </Card>
            </div>
          ))}
      </div>
      {/* Strip stuff */}
      <StripeCheckout
        name="Test Name"
        description="Test Description"
        amount={fromDollarToCent(1000)}
        token={onToken(1000, 'Test Description')}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    </div>
  )
}

export default CheckOut
