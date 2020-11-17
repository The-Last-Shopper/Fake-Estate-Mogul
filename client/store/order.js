import axios from 'axios'

const initialState = []

const ADD_NEW_ORDER = 'ADD_NEW_ORDER'
const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

const addNewOrder = order => ({
  type: ADD_NEW_ORDER,
  order
})

const checkOutOrder = order => ({
  type: CHECKOUT_ORDER,
  order
})

export const thunkAddNewOrder = user => {
  return async dispatch => {
    try {
      let userId = user.id
      if (!user.id) {
        userId = null
      }
      let randomNum = '',
        charset = '0123456789',
        i = 0
      while (i < 10) {
        if (i === 4) randomNum += '-'
        else
          randomNum += charset.charAt(
            Math.floor(Math.random() * charset.length)
          )
        i++
      }
      const newOrder = await axios.post('/api/order', {
        userId: userId,
        confirmationNum: randomNum
      })
      dispatch(addNewOrder(newOrder.data))
    } catch (error) {
      console.error('unable to post new Order')
    }
  }
}

export const thunkCheckOut = (orderId, totalPrice) => {
  return async dispatch => {
    try {
      const {data: checkedOutOrder} = await axios.put(`/api/order/${orderId}`, {
        totalPrice: totalPrice
      })
      dispatch(checkOutOrder(checkedOutOrder))
    } catch (error) {
      console.error(error)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ORDER:
      return action.order
    case CHECKOUT_ORDER:
      return action.order
    default:
      return state
  }
}
