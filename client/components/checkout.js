import React from 'react'
import Checkout from './payment'
import {Card} from 'react-bootstrap'

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
    </div>
  )
}

export default CheckOut
