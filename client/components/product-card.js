import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  inCart() {
    return this.props.cart.some(
      product => product.productId === this.props.product.id
    )
  }

  render() {
    let inCart = this.inCart()
    const props = this.props
    return (
      <div className="col-sm-4">
        <Card border="primary" style={{width: '18rem'}}>
          <div className="product-card">
            <img src={props.product.imageUrl} className="card-img-top" />
            <Link to={`/products/${props.product.id}`}>
              <h4 className="card-title">{props.product.name}</h4>
            </Link>
            <form>
              <label htmlFor="quantity">Quantity: </label>
              <input
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={this.state.quantity}
                onChange={e => this.handleChange(e)}
              />
              <p className="card-title">Price: {props.product.price}</p>
              <button
                className="btn btn-primary"
                disabled={inCart}
                onClick={() =>
                  props.handleClick(
                    props.order,
                    props.product,
                    this.state.quantity
                  )
                }
                type="button"
              >
                Add To Cart
              </button>
            </form>
          </div>
        </Card>
      </div>
    )
  }
}

export default ProductCard
