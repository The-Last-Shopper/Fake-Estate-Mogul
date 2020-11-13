import React from 'react'
import {connect} from 'react-redux'
import OrderCard from './order-card'

class Order extends React.Component {
  render() {
    const order = this.props.order
    return (
      <div className="order">
        <h1>Your Orders</h1>
        {!order.length ? (
          <h3>Your Cart is empty!</h3>
        ) : (
          order.map(product => <OrderCard />)
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Order)
