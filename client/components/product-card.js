import React from 'react'
import {Link} from 'react-router-dom'

const ProductCard = props => {
  return (
    <div className="product-card">
      <img src={props.product.imageUrl} />
      <Link to={`/products/${props.product.id}`}>
        <h4>{props.product.name}</h4>
      </Link>
      <p className="price">{props.product.price}</p>
      <button
        onClick={() => props.handleClick(props.user.id, props.product.id)}
        type="button"
      >
        Add To Cart
      </button>
    </div>
  )
}

export default ProductCard
