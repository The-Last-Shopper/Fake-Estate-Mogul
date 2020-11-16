import React from 'react'

const CheckOut = props => {
  console.log(props)
  const {cart, order, total} = props.location.state
  return (
    <div>
      <h2>Your confirmation #{order.id}</h2>
      <h3>Total Price: ${total}</h3>
      <p>
        You have successfully checked out! The following is a list of all items
        in your order
      </p>
      {cart.length &&
        cart.map(product => {
          return (
            <div>
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
