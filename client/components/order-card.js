import React from 'react'
import {connect} from 'react-redux'
import {Card, Button} from 'react-bootstrap'

class OrderCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({quantity: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const product = this.props.product

    this.props
      .editProduct(
        product.orderId,
        product.productId,
        this.state.quantity,
        this.props.user.id
      )
      .then(() => this.props.persistentData())
  }

  render() {
    const product = this.props.product
    return (
      <div className="col-sm-4">
        <Card border="primary" style={{width: '18rem'}}>
          <div className="cart-item">
            <h4 className="card-title">{product.name}</h4>
            <img src={product.imageUrl} />
            <p>{product.description}</p>

            <p>Price: ${product.price} </p>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="quantity">Quantity: {product.quantity}</label>
              <input
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
              <Button type="submit">Submit</Button>
            </form>
            <Button
              type="button"
              onClick={() => this.props.removeProduct(product)}
            >
              Remove from cart
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  user: state.user
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard)
