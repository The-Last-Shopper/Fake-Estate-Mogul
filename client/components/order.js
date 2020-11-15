import React from 'react'
import {connect} from 'react-redux'
import OrderCard from './order-card'
import {fetchCart, thunkRemoveProductFromCart} from '../store/orderproduct'

class Order extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoaded: true
    }
    this.removeProduct = this.removeProduct.bind(this)
    this.persistentData = this.persistentData.bind(this)
  }
  componentDidMount() {
    this.props.getCart(this.props.order.id).then(() => this.persistentData())
  }

  persistentData() {
    // await this.props.getCart(this.props.order.id)
    const cart = this.props.cart
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }

  async removeProduct(product) {
    // this.setState({isLoaded: false})
    console.log('This is before Removing')
    await this.props.removeProductFromCart(product.orderId, product.productId)
    console.log('We waited to remove it from state')
    // await this.props.getCart(this.props.order.id)
    // console.log('After removing, we get the new cart back ')
    this.persistentData()
  }

  render() {
    const order = this.props.order
    let cart = JSON.parse(sessionStorage.getItem('cart')) || []
    return (
      <React.Fragment>
        {this.state.isLoaded ? (
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
                />
              ))
            )}
          </div>
        ) : (
          <div />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: orderId => dispatch(fetchCart(orderId)),
  removeProductFromCart: (orderId, productId) =>
    dispatch(thunkRemoveProductFromCart(orderId, productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
