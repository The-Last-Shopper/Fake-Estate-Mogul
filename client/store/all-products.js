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

const initialState = [
  {
    id: 1,
    name: 'House 1',
    price: 2000,
    description: "It's a house",
    image:
      'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg'
  },
  {
    id: 2,
    name: 'House 2',
    price: 200,
    description: 'Another house',
    image:
      'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg'
  },
  {
    id: 3,
    name: 'House 3',
    price: 2,
    description: 'Not a house, but we wont say anything',
    image:
      'https://i.pinimg.com/736x/b3/cc/d5/b3ccd57b054a73af1a0d281265b54ec8.jpg'
  }
]

//REDUCER

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
