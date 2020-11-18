import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = amount => token =>
  axios
    .post('/checkout', {
      amount,
      token
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = ({amount}) => (
  <StripeCheckout
    amount={amount * 100}
    token={onToken(amount)}
    stripeKey="pk_test_51HoNjtFn0Vhxuh8U8TZvAQWpZHZUFKajg8WcD7uKYyzsc6MqeKWRGg5S7M7wJ6IY0inzw46lx7KlhbGmXTeFc03R00YfF510Xo"
  />
)

export default Checkout
