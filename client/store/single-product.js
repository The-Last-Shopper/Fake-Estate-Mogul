import axios from 'axios'

//ACTION TYPES //

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

//ACTION CREATORS//

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

//Thunk//

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${productId}`)
      dispatch(getSingleProduct(product))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER//

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
