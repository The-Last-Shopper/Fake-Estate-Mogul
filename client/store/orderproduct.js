import axios from 'axios'

// ACTION TYPE //
const GET_CART = 'GET_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

// ACTION CREATOR //
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  product
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
      const orderProduct = {
        price: product.price,
        quantity: 1, ////---->>>> TAKE VALUE FROM UI
        orderId: order.id,
        productId: product.id,
        image: product.imageUrl
      }
      await axios.post('/api/orderProducts/addingProduct', orderProduct)
      dispatch(addProductToCart(orderProduct))
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
    default:
      return state
  }
}
