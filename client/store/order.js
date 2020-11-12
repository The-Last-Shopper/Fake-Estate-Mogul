import axios from 'axios'

const initialState = []

const GET_ORDERS = 'GET_ORDERS' // Come back to this when on sessions to do
const ADD_PRODUCT_TO_ORDER = 'ADD_PRODUCT_TO_ORDER'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

// GetOrdersThunk - Fetch existing cart from user session store
// takes in a userId, uses its cookie to grab cart

const addProductToOrder = product => ({
  type: ADD_PRODUCT_TO_ORDER,
  product
})

const thunkAddProductToOrder = (userId, productId) => {
  return async dispatch => {
    try {
      const order = await axios.post('/api/order', {userId: userId})
      const product = await axios.get(`/api/products/${productId}`)
      await axios.post('/api/orderProducts/addingProduct', {
        price: product.data.price,
        quantity: 1, ////---->>>> TAKE VALUE FROM UI
        orderId: order.data.id,
        productId: productId
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_PRODUCT_TO_ORDER:
      return [...state, action.product]
    default:
      return state
  }
}
