import React from 'react'
import {connect} from 'react-redux'
import {thunkAddProductToOrder} from '../store/order'
import {Link} from 'react-router-dom'
import {deleteProduct, fetchSingleProduct} from '../store/single-product'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  handleClick(userId, productId) {
    this.props.addProductToOrder(userId, productId)
  }
  handleDelete() {
    console.log('button was clicked')
    this.props.deleteProduct(this.props.product.id, this.props.history)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <h1>Name: {product.name}</h1>
        <img src={product.imageUrl} />
        <p>Price: {product.price} </p>
        <p>Description: {product.description}</p>
        <button
          onClick={() => this.handleClick(null, product.id)}
          type="button"
        >
          Add To Cart
        </button>
        {this.props.isAdmin && (
          <div className="admin-buttons">
            <Link to={`/products/${product.id}/edit`}>
              <button type="button">Edit</button>
            </Link>
            <button type="button" onClick={this.handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAdmin: state.user.isAdmin,
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToOrder: (userId, productId) =>
      dispatch(thunkAddProductToOrder(userId, productId)),
    deleteProduct: (productId, history) =>
      dispatch(deleteProduct(productId, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
