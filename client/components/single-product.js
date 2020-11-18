import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, thunkAddProductToCart} from '../store/cart'
import {Link} from 'react-router-dom'
import {deleteProduct, fetchSingleProduct} from '../store/single-product'
import {toast} from 'react-toastify'
import {Button, Card} from 'react-bootstrap'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      inCart: false,
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getCart(this.props.order.id)
  }

  notify() {
    toast('Added to Cart!')
  }

  handleClick(order, product) {
    this.props
      .addProductToCart(
        order,
        product,
        this.state.quantity,
        this.this.props.userId
      )
      .then(() => this.persistentData())
      .then(
        this.setState({
          inCart: true
        })
      )
    this.notify()
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  handleDelete() {
    this.props.deleteProduct(this.props.product.id, this.props.history, '/')
  }

  persistentData() {
    const cart = this.props.cart
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  render() {
    const product = this.props.product
    return (
      <div className="single-product">
        <h1>Name: {product.name}</h1>
        <div className="single-container">
          <img src={product.imageUrl} />
          <p>Price: {product.price} </p>
          <p>Description: {product.description}</p>
          <form>
            <label htmlFor="quantity">Quantity: </label>
            <input
              name="quantity"
              type="number"
              min="1"
              step="1"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
            <Button
              onClick={() => this.handleClick(this.props.order, product)}
              type="button"
              disabled={this.state.inCart}
            >
              Add To Cart
            </Button>
          </form>
          {this.props.isAdmin && (
            <div className="admin-buttons">
              <Link to={`/products/${product.id}/edit`}>
                <Button type="button">Edit</Button>
              </Link>
              <Button type="button" onClick={this.handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAdmin: state.user.isAdmin,
    userId: state.user.id,
    product: state.product,
    order: state.order,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToCart: (order, product, quantity, userId) =>
      dispatch(thunkAddProductToCart(order, product, quantity, userId)),
    deleteProduct: (productId, history, redirectTo) =>
      dispatch(deleteProduct(productId, history, redirectTo)),
    getCart: orderId => dispatch(fetchCart(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
