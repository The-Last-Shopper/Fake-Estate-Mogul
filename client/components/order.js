import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import OrderCard from './order-card'
import {
  fetchCart,
  thunkRemoveProductFromCart,
  thunkEditProductFromCart
} from '../store/orderproduct'
import {thunkCheckOut, thunkAddNewOrder} from '../store/order'

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
    sessionStorage.setItem('cart', JSON.stringify(cart))
    this.props.getCart(this.props.order.id)
  }

  removeProduct(product) {
    this.props
      .removeProductFromCart(product.orderId, product.productId)
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
      .checkOutOrder(this.props.order.id)
      .then(() => this.props.getOrder(this.props.user))
  }

  findTotal() {
    return this.props.cart.reduce((accum, product) => {
      const price = product.price * product.quantity
      return accum + price
    }, 0)
  }

  render() {
    const order = this.props.order
    let cart = JSON.parse(sessionStorage.getItem('cart')) || []
    return (
      <div className="order">
        <h1>Your Orders</h1>
        {!cart.length ? (
          <h3>Your Cart is empty!</h3>
        ) : (
          cart.map((product, index) => (
            <OrderCard
              product={product}
              key={index}
              removeProduct={this.removeProduct}
              editProduct={this.props.editProduct}
              persistentData={this.persistentData}
            />
          ))
        )}
        <h3>Total Amount: ${this.findTotal()}</h3>
        <button type="button" onClick={this.checkOut}>
          CheckOut
        </button>
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
  removeProductFromCart: (orderId, productId) =>
    dispatch(thunkRemoveProductFromCart(orderId, productId)),
  editProduct: (orderId, productId, quantity) =>
    dispatch(thunkEditProductFromCart(orderId, productId, quantity)),
  checkOutOrder: orderId => dispatch(thunkCheckOut(orderId)),
  getOrder: user => dispatch(thunkAddNewOrder(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
