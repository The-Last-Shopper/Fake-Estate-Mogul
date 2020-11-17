import axios from 'axios'

const initialState = {}

const GET_ORDER = 'GET_ORDER'
const CHECKOUT_ORDER = 'CHECKOUT_ORDER'

const getOrder = order => ({
  type: GET_ORDER,
  order
})

const checkOutOrder = order => ({
  type: CHECKOUT_ORDER,
  order
})

export const fetchOrder = user => {
  return async dispatch => {
    try {
      let userId = user.id
      if (!user.id) {
        userId = null
      }

      //generate confirmation #
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

      dispatch(getOrder(newOrder.data))
    } catch (error) {
      console.error('unable to post new Order')
    }
  }
}

export const thunkCheckOut = (orderId, totalPrice, userId) => {
  return async dispatch => {
    try {
      const {data: checkedOutOrder} = await axios.put(`/api/order/${orderId}`, {
        totalPrice,
        userId
      })
      dispatch(checkOutOrder(checkedOutOrder))
    } catch (error) {
      console.error(error)
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case CHECKOUT_ORDER:
      return action.order
    default:
      return state
  }
}
