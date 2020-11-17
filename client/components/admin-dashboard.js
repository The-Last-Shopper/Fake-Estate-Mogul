import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/all-products'
import {thunkFetchAllUsers} from '../store/allusers'
import {deleteProduct} from '../store/single-product'
import {Table} from 'react-bootstrap'

class AdminDashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      showProducts: false,
      showUsers: false
    }
    this.toggleState = this.toggleState.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleDelete(productId) {
    this.props
      .deleteProduct(productId, this.props.history, '/adminDashboard')
      .then(() => this.props.getProducts())
  }

  render() {
    return (
      <div>
        <div>
          <button name="showProducts" onClick={this.toggleState}>
            Edit Products
          </button>
          {this.state.showProducts && (
            <Table>
              <thead>
                <tr>
                  <td>ID #</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map(product => (
                  <React.Fragment>
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                    </tr>
                    <tr>
                      <td colSpan="2" className="admin-buttons">
                        <Link to={`/products/${product.id}/edit`}>
                          <button type="button">Edit</button>
                        </Link>
                      </td>
                      <td colSpan="2">
                        <button
                          type="button"
                          onClick={() => this.handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div>
          <button name="showUsers" onClick={this.toggleState}>
            Edit Users
          </button>
          {this.state.showUsers && (
            <Table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users.map(user => (
                  <React.Fragment>
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button>Edit</button>
                      </td>
                      <td colSpan="2">
                        <button>Delete</button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
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
    dispatch(deleteProduct(productId, history, redirectTo))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
