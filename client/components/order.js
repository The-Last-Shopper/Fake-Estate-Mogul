import React from 'react'
import {connect} from 'react-redux'
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
    this.removeProduct = this.removeProduct.bind(this)
    this.persistentData = this.persistentData.bind(this)
    this.checkOut = this.checkOut.bind(this)
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
    this.props
      .checkOutOrder(this.props.order.id)
      .then(() => this.props.getOrder(this.props.user))
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
        <button type="button" onClick={this.checkOut}>
          CheckOut
        </button>
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
