import axios from 'axios'

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//ACTION CREATORS

const getProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

//THUNK

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const products = await axios.get('/api/products')
      dispatch(getProducts(products.data))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
