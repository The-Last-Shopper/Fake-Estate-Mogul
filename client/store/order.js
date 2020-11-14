import axios from 'axios'

const initialState = []

const ADD_NEW_ORDER = 'ADD_NEW_ORDERS'
const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER'

const addNewOrder = () => ({
  type: ADD_NEW_ORDER
})
// GetOrdersThunk - Fetch existing cart from user session store
// takes in a userId, uses its cookie to grab cart

const addProductToOrder = product => ({
  type: ADD_PRODUCT_TO_ORDER,
  product
})

export const thunkAddNewOrder = userId => {
  return async dispatch => {
    try {
      await axios.post('/api/order', {userId: userId})
      dispatch(addNewOrder())
    } catch (error) {
      console.error('unable to post new Order')
    }
  }
}

export const thunkAddProductToOrder = (userId, productId) => {
  return async dispatch => {
    try {
      const product = await axios.get(`/api/products/${productId}`)
      const orderProduct = {
        price: product.data.price,
        quantity: 1, ////---->>>> TAKE VALUE FROM UI
        orderId: order.data[0].id,
        productId: productId,
        image: product.data.imageUrl
      }
      await axios.post('/api/orderProducts/addingProduct', orderProduct)
      dispatch(addProductToOrder(orderProduct))
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_ORDER:
      return state
    case ADD_PRODUCT_TO_ORDER:
      return [...state, action.product]
    default:
      return state
  }
}
