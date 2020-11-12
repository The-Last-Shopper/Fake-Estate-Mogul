import React from 'react'
import ProductCard from './product-card'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/all-products'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    return (
      <div className="all-products">
        <Link to="/products/add">
          <button type="button">Add Product</button>
        </Link>
        <h2>All Products</h2>
        {this.props.products.length ? (
          this.props.products.map(product => {
            return <ProductCard key={product.id} product={product} />
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
    fetchProducts: () => dispatch(fetchAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
