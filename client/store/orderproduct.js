import axios from 'axios'

// ACTION TYPE //
const GET_CART = 'GET_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'

// ACTION CREATOR //
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
})

const removeProductFromCart = productId => ({
  type: REMOVE_PRODUCT_FROM_CART,
  productId
})

// THUNK //
export const fetchCart = orderId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get(`/api/orderProducts/${orderId}`)
      dispatch(getCart(cart))
    } catch (error) {
      console.error('Couldnt get cart', error)
    }
  }
}
export const thunkAddProductToCart = (order, product) => {
  return async dispatch => {
    try {
      console.log(typeof product.price)
      const orderProduct = {
        price: product.price,
        quantity: 1, ////---->>>> TAKE VALUE FROM UI
        orderId: order.id,
        productId: product.id,
        imageUrl: product.imageUrl,
        description: product.description
      }
      await axios.post('/api/orderProducts/', orderProduct)
      dispatch(addProductToCart(orderProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

export const thunkRemoveProductFromCart = (orderId, productId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orderProducts/${orderId}/${productId}`)
      const {data: cart} = await axios.get(`/api/orderProducts/${orderId}`)
      dispatch(getCart(cart))
      // dispatch(removeProductFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_PRODUCT_TO_CART:
      return [...state, action.product]
    case REMOVE_PRODUCT_FROM_CART:
      return action.cart
    default:
      return state
  }
}
