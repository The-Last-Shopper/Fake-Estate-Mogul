import React from 'react'
import {connect} from 'react-redux'

class OrderCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const product = this.props.product

    this.props
      .editProduct(product.orderId, product.productId, this.state.quantity)
      .then(() => this.props.persistentData())
  }

  render() {
    const product = this.props.product
    return (
      <div className="cart-item">
        <h4>Name: {product.name}</h4>
        <img src={product.imageUrl} />
        <p>{product.description}</p>

        <p>Price: ${product.price} </p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="quantity">Quantity: {product.quantity}</label>
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
        <button type="button" onClick={() => this.props.removeProduct(product)}>
          Remove from cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard)
