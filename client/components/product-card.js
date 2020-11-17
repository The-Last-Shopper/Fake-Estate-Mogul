import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const ProductCard = props => {
  return (
    <div className="col-sm-4">
      <Card border="primary" style={{width: '18rem'}}>
        <div className="product-card">
          <img src={props.product.imageUrl} className="card-img-top" />
          <Link to={`/products/${props.product.id}`}>
            <h4 className="card-title">Name: {props.product.name}</h4>
          </Link>
          <p className="card-title">Price: {props.product.price}</p>
          <button
            className="btn btn-primary"
            onClick={() => props.handleClick(props.order, props.product)}
            type="button"
          >
            Add To Cart
          </button>
        </div>
      </Card>
    </div>
  )
}

export default ProductCard
