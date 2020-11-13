import React from 'react'
import ProductCard from './product-card'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/all-products'
import {thunkAddProductToOrder} from '../store/order'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleClick(userId, productId) {
    console.log('This is clicked')
    this.props.addProductToOrder(userId, productId)
  }
  render() {
    return (
      <div className="all-products">
        <h2>All Products</h2>
        {this.props.products.length ? (
          this.props.products.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                handleClick={this.handleClick}
              />
            )
          })
        ) : (
          <h1>Sorry! All Properties are sold out!</h1>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchAllProducts()),
    addProductToOrder: (userId, productId) =>
      dispatch(thunkAddProductToOrder(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
