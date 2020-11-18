import axios from 'axios'

//ACTION TYPES //

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT'

//ACTION CREATORS//

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const updateSingleProduct = product => ({
  type: UPDATE_SINGLE_PRODUCT,
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

export const putSingleProduct = (productId, data) => {
  return async dispatch => {
    try {
      const updatedProduct = await axios.put(`/api/products/${productId}`, data)
      dispatch(updateSingleProduct(updatedProduct.data))
    } catch (err) {
      console.error('Something done happened trying to update', error)
    }
  }
}

export const deleteProduct = (productId, history, redirectTo) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      history.push(redirectTo)
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCER//

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return action.product
    case UPDATE_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
