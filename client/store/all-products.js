import axios from 'axios'

//ACTION TYPES
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_NEW_PRODUCT = 'ADD_NEW_PRODUCT'

//ACTION CREATORS

const getProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const addProduct = newProduct => ({
  type: ADD_NEW_PRODUCT,
  newProduct
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

export const pushNewProduct = productInfo => {
  return async dispatch => {
    try {
      const newProduct = await axios.post('/api/products', productInfo)
      dispatch(addProduct(newProduct))
    } catch (err) {
      console.error('sum in done happen trying to add product', err)
    }
  }
}

const initialState = {products: [], loading: true}
//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, loading: false, products: action.products}
    case ADD_NEW_PRODUCT:
      return {...state, products: [...state.products, action.newProduct]}
    default:
      return state
  }
}
