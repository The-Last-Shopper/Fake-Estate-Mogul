import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchUserOrders} from '../store/order-history'
import {Table, Button} from 'react-bootstrap'
import {thunkEditUser} from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      address: '',
      userId: {},
      toggling: false
    }
    this.toggleInput = this.toggleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getUserOrders(this.props.user.id)
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      address: this.props.user.address,
      userId: this.props.user.id
    })
  }

  toggleInput() {
    if (!this.state.toggling) {
      this.setState({toggling: true})
    } else {
      this.setState({toggling: false})
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateUser(this.props.user.id, this.state)
    this.setState({toggling: false})
  }

  render() {
    const user = this.props.user
    const orders = this.props.userOrders
    return (
      <div className="user-home">
        <div>
          <h3 className="greeting">Welcome, {user.name}</h3>
          <div>
            <h4 className="user-info">User Info</h4>
          </div>
          <img src={user.imageUrl} />
          <br />
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Address: {user.address}</p>
            <Button type="button" onClick={this.toggleInput}>
              Edit User Info
            </Button>
          </div>
        </div>
        {this.state.toggling && (
          <form onSubmit={e => this.handleSubmit(e)}>
            <label className="thickfont" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label className="thickfont" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label className="thickfont" htmlFor="address">
              Address
            </label>
            <input
              name="address"
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
            />
            <Button type="submit">Submit </Button>
          </form>
        )}
        <div>
          <h4 className="center-color">Order History</h4>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Confirmation No.</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.length
                ? orders.map(order => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>#{order.confirmationNum}</td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
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
    getUserOrders: userId => dispatch(fetchUserOrders(userId)),
    updateUser: (userId, changedState) =>
      dispatch(thunkEditUser(userId, changedState))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
