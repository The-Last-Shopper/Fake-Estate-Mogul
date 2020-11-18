import axios from 'axios'

// ACTION TYPE //
const GET_CART = 'GET_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
const EDIT_PRODUCT_FROM_CART = 'EDIT_PRODUCT_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'

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

const editProductFromCart = (product, productId) => ({
  type: EDIT_PRODUCT_FROM_CART,
  product,
  productId
})

export const clearCart = () => ({
  type: CLEAR_CART
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

export const thunkAddProductToCart = (order, product, quantity, userId) => {
  return async dispatch => {
    try {
      const orderProduct = {
        name: product.name,
        price: product.price,
        quantity: quantity,
        orderId: order.id,
        productId: product.id,
        imageUrl: product.imageUrl,
        description: product.description
      }
      await axios.post('/api/orderProducts/', {...orderProduct, userId})
      dispatch(addProductToCart(orderProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

export const thunkRemoveProductFromCart = (orderId, productId, userId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orderProducts/${orderId}/${productId}`, {userId})
      dispatch(removeProductFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const thunkEditProductFromCart = (
  orderId,
  productId,
  quantity,
  userId
) => {
  return async dispatch => {
    try {
      const updatedProduct = await axios.put(
        `/api/orderProducts/${orderId}/${productId}`,
        {quantity: Number(quantity), userId}
      )
      dispatch(editProductFromCart(updatedProduct.data, productId))
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
      return state.filter(product => product.productId !== action.productId)
    case EDIT_PRODUCT_FROM_CART:
      return state.map(product => {
        if (product.productId === action.productId) {
          return action.product
        } else {
          return product
        }
      })
    case CLEAR_CART:
      return []
    default:
      return state
  }
}
