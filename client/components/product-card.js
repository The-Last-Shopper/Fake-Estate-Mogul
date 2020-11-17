import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const ProductCard = props => {
  let inCart = props.cart.some(
    product => product.productId === props.product.id
  )
  return (
    <Card border="primary" style={{width: '18rem'}}>
      <div className="product-card">
        <img src={props.product.imageUrl} className="card-img-top" />
        <Link to={`/products/${props.product.id}`}>
          <h4 className="card-title">Name: {props.product.name}</h4>
        </Link>
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
          <p className="card-title">Price: {props.product.price}</p>
          <button
            className="btn btn-primary"
            disabled={inCart}
            onClick={() => props.handleClick(props.order, props.product)}
            type="button"
          >
            Add To Cart
          </button>
        </form>
      </div>
    </Card>
  )
}

export default ProductCard
