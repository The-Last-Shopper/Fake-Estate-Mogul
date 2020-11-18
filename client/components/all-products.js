import React from 'react'
import ProductCard from './product-card'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/all-products'
import {fetchCart, thunkAddProductToCart} from '../store/cart'
import {fetchOrder} from '../store/order'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import {toast} from 'react-toastify'
import Loader from 'react-loader-spinner'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    this.props
      .loadOrder(this.props.user)
      .then(() => this.props.getCart(this.props.order.id))
  }
  notify() {
    toast('Added to Cart!')
  }

  handleClick(order, product, quantity) {
    this.props
      .addProductToOrder(order, product, quantity, this.props.user.id)
      .then(() => this.persistentData())
    this.notify()
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  persistentData() {
    const cart = this.props.cart
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  render() {
    if (this.props.loading)
      return <Loader type="TailSpin" color="Cyan" height={500} width={500} />
    return (
      <div className="all-products">
        {this.props.isAdmin && (
          <Link to="/products/add">
            <Button variant="outline-primary" type="button">
              Add Product
            </Button>
          </Link>
        )}

        <h2>All Products</h2>
        <div className="container">
          {this.props.products.map(product => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                order={this.props.order}
                cart={this.props.cart}
                handleClick={this.handleClick}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAdmin: state.user.isAdmin,
    products: state.products.products,
    order: state.order,
    user: state.user,
    cart: state.cart,
    loading: state.products.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchAllProducts()),
    addProductToOrder: (order, product, quantity, userId) =>
      dispatch(thunkAddProductToCart(order, product, quantity, userId)),
    loadOrder: user => dispatch(fetchOrder(user)),
    getCart: orderId => dispatch(fetchCart(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
