import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import OrderCard from './order-card'
import {
  fetchCart,
  thunkRemoveProductFromCart,
  thunkEditProductFromCart,
  clearCart
} from '../store/cart'
import {thunkCheckOut, fetchOrder} from '../store/order'
import Button from 'react-bootstrap/Button'

class Order extends React.Component {
  constructor() {
    super()
    this.state = {
      isCheckedOut: false,
      cart: [],
      order: {},
      total: 0
    }
    this.removeProduct = this.removeProduct.bind(this)
    this.persistentData = this.persistentData.bind(this)
    this.checkOut = this.checkOut.bind(this)
    this.findTotal = this.findTotal.bind(this)
  }
  componentDidMount() {
    this.props.getCart(this.props.order.id).then(() => this.persistentData())
  }

  persistentData() {
    const cart = this.props.cart
    localStorage.setItem('cart', JSON.stringify(cart))
    this.props.getCart(this.props.order.id)
  }

  removeProduct(product) {
    this.props
      .removeProductFromCart(
        product.orderId,
        product.productId,
        this.props.user.id
      )
      .then(() => this.persistentData())
  }

  checkOut() {
    this.setState({
      isCheckedOut: true,
      cart: this.props.cart,
      order: this.props.order,
      total: this.findTotal()
    })
    this.props
      .checkOutOrder(this.props.order.id, this.findTotal(), this.props.user.id)
      .then(() => this.props.getOrder(this.props.user))
      .then(() => this.props.clearCart())
      .then(() => this.persistentData())
  }

  findTotal() {
    return this.props.cart.reduce((accum, product) => {
      const price = product.price * product.quantity
      return accum + price
    }, 0)
  }

  render() {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    return (
      <div className="order">
        <h1>Your Cart</h1>
        <h3>Total Amount: ${this.findTotal()}</h3>
        {!cart.length && <h3 className="center">Your Cart is empty!</h3>}
        <Button variant="success" type="button" onClick={this.checkOut}>
          Check Out
        </Button>
        <div className="container">
          {cart.length &&
            cart.map((product, index) => (
              <OrderCard
                product={product}
                key={index}
                removeProduct={this.removeProduct}
                editProduct={this.props.editProduct}
                persistentData={this.persistentData}
              />
            ))}
        </div>
        {this.state.isCheckedOut && (
          <Redirect
            to={{
              pathname: '/checkout',
              state: this.state
            }}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getCart: orderId => dispatch(fetchCart(orderId)),
  removeProductFromCart: (orderId, productId, userId) =>
    dispatch(thunkRemoveProductFromCart(orderId, productId, userId)),
  editProduct: (orderId, productId, quantity, userId) =>
    dispatch(thunkEditProductFromCart(orderId, productId, quantity, userId)),
  checkOutOrder: (orderId, totalPrice, userId) =>
    dispatch(thunkCheckOut(orderId, totalPrice, userId)),
  getOrder: user => dispatch(fetchOrder(user)),
  clearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
