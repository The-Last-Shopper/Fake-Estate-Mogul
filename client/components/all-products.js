import React from 'react'
import ProductCard from './product-card'
import {connect} from 'react-redux'

// const mockUpProducts = [
//   {
//     id: 1,
//     name: 'House 1',
//     price: 2000,
//     description: "It's a house",
//     image:
//       'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg'
//   },
//   {
//     id: 2,
//     name: 'House 2',
//     price: 200,
//     description: 'Another house',
//     image:
//       'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg'
//   },
//   {
//     id: 3,
//     name: 'House 3',
//     price: 2,
//     description: 'Not a house, but we wont say anything',
//     image:
//       'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg'
//   }
// ]

export const AllProducts = function(props) {
  return (
    <div className="all-products">
      <h2>All Products</h2>
      {props.products.length ? (
        props.products.map(product => {
          return <ProductCard key={product.id} product={product} />
        })
      ) : (
        <h1>Sorry! All Properties are sold out!</h1>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, null)(AllProducts)
