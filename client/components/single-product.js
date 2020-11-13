import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'
import {thunkAddProductToOrder} from '../store/order'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  handleClick(userId, productId) {
    this.props.addProductToOrder(userId, productId)
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
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProductToOrder: (userId, productId) =>
      dispatch(thunkAddProductToOrder(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
