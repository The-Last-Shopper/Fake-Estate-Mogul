import React from 'react'
import {connect} from 'react-redux'
import {pushNewProduct} from '../store/all-products'
import {putSingleProduct, fetchSingleProduct} from '../store/single-product'

class ProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      imageUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if (this.props.name === 'update') {
      this.props.getSingleProduct(this.props.match.params.productId)
      this.setState({
        name: this.props.product.name,
        description: this.props.product.description,
        price: this.props.product.price,
        imageUrl: this.props.product.imageUrl
      })
    }
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.name === 'add') {
      this.props.addProduct(this.state)
    } else {
      this.props.updateProduct(this.props.product.id, this.state)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="name">Name</label>

          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          {this.state.name ? null : <span className="warning">Required!</span>}

          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
          />
          {this.state.description ? null : (
            <span className="warning">Required!</span>
          )}

          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={this.state.price}
            onChange={this.handleChange}
          />
          {this.state.price ? null : <span className="warning">Required!</span>}

          <label htmlFor="imageUrl">Image URL</label>
          <input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          {this.state.imageUrl ? null : (
            <span className="warning">Required!</span>
          )}
          <br />
          <div>
            <button type="button" onClick={this.props.history.goBack}>
              Back
            </button>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
const mapUpdate = state => {
  return {
    name: 'update',
    product: state.product
  }
}
const mapAdd = state => {
  return {
    name: 'add'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: productId => {
      dispatch(fetchSingleProduct(productId))
    },
    updateProduct: (productId, data) =>
      dispatch(putSingleProduct(productId, data)),
    addProduct: product => {
      dispatch(pushNewProduct(product))
    }
  }
}

export const AddProduct = connect(mapAdd, mapDispatchToProps)(ProductForm)

export const EditProduct = connect(mapUpdate, mapDispatchToProps)(ProductForm)
