import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {putSingleProduct, fetchSingleProduct} from '../store/single-product'

class EditProduct extends React.Component {
  constructor() {
    super()
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  handleUpdate(e, data) {
    e.preventDefault()
    this.props.updateProduct(this.props.product.id, data)
  }

  render() {
    const product = this.props.product
    return (
      <div>
        <form onSubmit={(e, data) => this.handleUpdate(e, data)}>
          <input />
          <input />
          <input />
          <input />
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
    getSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    updateProduct: (productId, data) =>
      dispatch(putSingleProduct(productId, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
