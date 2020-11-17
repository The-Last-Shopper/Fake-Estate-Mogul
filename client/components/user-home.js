import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserOrders} from '../store/order-history'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.user.id)
  }

  render() {
    const user = this.props.user
    const orders = this.props.userOrders
    return (
      <div>
        <div>
          <h3>Welcome, {user.name}</h3>
          <img src={user.imageUrl} />
          <h4>User Info:</h4>
          <p>{user.email}</p>
          <p>{user.address}</p>
        </div>
        <div>
          <h4>Order History</h4>
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Confirmation #</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length
                ? orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.confirmationNum}</td>
                      <td>Total Price</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    userOrders: state.userOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrders: userId => dispatch(fetchUserOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
