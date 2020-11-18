import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/all-products'
import {thunkFetchAllUsers, thunkDeleteUser} from '../store/allusers'
import {deleteProduct} from '../store/single-product'
import {Table, Button} from 'react-bootstrap'

class AdminDashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      showProducts: false,
      showUsers: false,
      toggleUserEdit: false
    }
    this.toggleState = this.toggleState.bind(this)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
    this.props.getUsers()
  }

  toggleState(e) {
    const name = e.target.name
    this.setState({
      [name]: !this.state[name]
    })
  }

  handleDeleteProduct(productId) {
    this.props
      .deleteProduct(productId, this.props.history, '/adminDashboard')
      .then(() => this.props.getProducts())
  }

  handleDeleteUser(userId) {
    this.props.deleteUser(userId)
  }

  render() {
    return (
      <div className="admin-dashboard">
        <h2>Welcome, Admin!</h2>
        <div>
          <Button name="showProducts" onClick={this.toggleState}>
            Edit Products
          </Button>
          {this.state.showProducts && (
            <React.Fragment>
              <h3>Product Information</h3>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <td>Product ID</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
                  </tr>
                </thead>
                <tbody>
                  {this.props.products.map(product => (
                    <React.Fragment key={product.id}>
                      <tr>
                        <td>#{product.id}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.quantity}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="admin-buttons">
                          <Link to={`/products/${product.id}/edit`}>
                            <Button type="button">Edit</Button>
                          </Link>
                        </td>
                        <td colSpan="2">
                          <Button
                            type="button"
                            onClick={() => this.handleDeleteProduct(product.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </React.Fragment>
          )}
        </div>
        <div>
          <Button name="showUsers" onClick={this.toggleState}>
            Edit Users
          </Button>
          {this.state.showUsers && (
            <React.Fragment>
              <h3>User Information</h3>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.users.map(user => (
                    <React.Fragment key={user.id}>
                      <tr>
                        <td>#{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <Button
                            name="toggleUserEdit"
                            onClick={this.toggleState}
                          >
                            Edit
                          </Button>
                        </td>
                        <td colSpan="2">
                          <Button
                            onClick={() => this.handleDeleteUser(user.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                      {this.state.toggleUserEdit && (
                        <tr>
                          <td colSpan="3">
                            <form onSubmit={e => this.handleSubmit(e)}>
                              <label htmlFor="name">Name</label>
                              <input
                                name="name"
                                type="text"
                                // value={this.state.name}
                                // onChange={this.handleChange}
                              />
                              <label htmlFor="email">Email</label>
                              <input
                                name="email"
                                type="text"
                                // value={this.state.email}
                                // onChange={this.handleChange}
                              />
                              <label htmlFor="address">Address</label>
                              <input
                                name="address"
                                type="text"
                                // value={this.state.address}
                                // onChange={this.handleChange}
                              />
                              <Button type="submit">Submit </Button>
                            </form>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts()),
  getUsers: () => dispatch(thunkFetchAllUsers()),
  deleteProduct: (productId, history, redirectTo) =>
    dispatch(deleteProduct(productId, history, redirectTo)),
  deleteUser: userId => dispatch(thunkDeleteUser(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
