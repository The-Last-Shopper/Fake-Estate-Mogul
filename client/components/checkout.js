import React from 'react'
import Checkout from './payment'

const CheckOut = props => {
  const {cart, order, total} = props.location.state

  return (
    <div>
      <h2>Order #{order.id}</h2>
      <h3>Confirmation #{order.confirmationNum}</h3>
      <h3>Total Price: ${total}</h3>
      <div>
        <Checkout amount={total} />
      </div>
      <p>
        You have successfully checked out! The following is a list of all items
        in your order
      </p>
      {cart.length &&
        cart.map((product, index) => {
          return (
            <div key={index}>
              <p>{product.name}</p>
              <p>Quantity: {product.quantity}</p>
              <img src={product.imageUrl} />
            </div>
          )
        })}
    </div>
  )
}

export default CheckOut
