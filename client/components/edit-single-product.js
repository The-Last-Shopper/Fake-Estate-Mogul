import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {putSingleProduct, fetchSingleProduct} from '../store/single-product'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      imageUrl: ''
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const product = this.props

    this.props.getSingleProduct(
      this.props.match.params.productId,
      this.setState
    )
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  handleUpdate(e) {
    e.preventDefault()
    this.props.updateProduct(this.props.product.id, this.state)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <form onSubmit={e => this.handleUpdate(e)}>
          <label htmlFor="name">Name</label>
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="description">Description</label>
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="imageUrl">Image URL</label>
          <input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />
          <Link to={`/products/${product.id}`}>
            <button type="button">Cancel</button>
          </Link>
          <button type="submit">Submit</button>
        </form>
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
    getSingleProduct: async productId => {
      dispatch(fetchSingleProduct(productId))
    },
    updateProduct: (productId, data) =>
      dispatch(putSingleProduct(productId, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
