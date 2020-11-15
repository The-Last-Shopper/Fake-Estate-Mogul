import React from 'react'
import {connect} from 'react-redux'
import {thunkRemoveProductFromCart} from '../store/orderproduct'

class OrderCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: ''
    }
    this.removeProduct = this.removeProduct.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  removeProduct() {
    const product = this.props.product
    this.props
      .removeProductFromCart(product.orderId, product.productId)
      .then(() => this)
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  handleSubmit() {
    e.preventDefault()
    // EDIT THUNK
  }

  render() {
    const product = this.props.product
    return (
      <div className="cart-item">
        <h4>Name: {product.name}</h4>
        <img src={product.imageUrl} />
        <p>{product.description}</p>
        <p>Price: ${product.price} </p>
        <button type="button" onClick={this.removeProduct}>
          Remove from cart
        </button>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="quantity">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="0"
            step="1"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  removeProductFromCart: (orderId, productId) =>
    dispatch(thunkRemoveProductFromCart(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard)
