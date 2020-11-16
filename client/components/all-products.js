import React from 'react'
import ProductCard from './product-card'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/all-products'
import {fetchCart, thunkAddProductToCart} from '../store/orderproduct'
import {thunkAddNewOrder} from '../store/order'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props
      .loadOrder(this.props.user)
      .then(() => this.props.getCart(this.props.order.id))
  }

  handleClick(order, product) {
    this.props
      .addProductToOrder(order, product)
      .then(() => this.persistentData())
  }

  persistentData() {
    const cart = this.props.cart
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  render() {
    return (
      <div className="all-products">
        {this.props.isAdmin && (
          <Link to="/products/add">
            <button type="button">Add Product</button>
          </Link>
        )}
        <h2>All Products</h2>
        {this.props.products.length ? (
          this.props.products.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                order={this.props.order}
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
    isAdmin: state.user.isAdmin,
    products: state.products,
    order: state.order,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchAllProducts()),
    addProductToOrder: (order, product) =>
      dispatch(thunkAddProductToCart(order, product)),
    loadOrder: user => dispatch(thunkAddNewOrder(user)),
    getCart: orderId => dispatch(fetchCart(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
