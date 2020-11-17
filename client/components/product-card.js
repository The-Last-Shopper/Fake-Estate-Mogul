import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  let inCart = props.cart.some(
    product => product.productId === props.product.id
  )
  return (
    <div className="product-card">
      <img src={props.product.imageUrl} />
      <Link to={`/products/${props.product.id}`}>
        <h4>Name: {props.product.name}</h4>
      </Link>
      <p className="price">Price: {props.product.price}</p>
      <form>
        <label htmlFor="quantity">Quantity: </label>
        <input
          name="quantity"
          type="number"
          min="1"
          step="1"
          value={props.quantity}
          onChange={props.handleChange}
        />
        <button
          disabled={inCart}
          onClick={() => props.handleClick(props.order, props.product)}
          type="button"
        >
          Add To Cart
        </button>
      </form>
    </div>
  )
}

export default ProductCard
