import React from 'react'
import {Link} from 'react-router-dom'

export default props => {
  return (
    <div className="product-card">
      <img src={props.product.image} />
      <Link to={`/products/${props.product.id}`}>
        <h4>{props.product.name}</h4>
      </Link>
      <p className="price">{props.product.price}</p>
      <button type="button">Add To Cart</button>
    </div>
  )
}
