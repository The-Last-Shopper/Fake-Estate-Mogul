import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/single-product'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <h1>Name: {product.name}</h1>
        <img src={product.imageUrl} />
        <p>Price: {product.price} </p>
        <p>Description: {product.description}</p>
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
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
