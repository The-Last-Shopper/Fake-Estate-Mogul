import React from 'react'
import {connect} from 'react-redux'
import OrderCard from './order-card'
import {fetchCart} from '../store/orderproduct'

class Order extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.order.id).then(() => this.persistentData())
  }

  persistentData() {
    const cart = this.props.cart
    sessionStorage.setItem('cart', JSON.stringify(cart))
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
            <OrderCard product={product} key={index} />
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: orderId => dispatch(fetchCart(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
