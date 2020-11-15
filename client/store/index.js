import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allProductsReducer from './all-products'
import singleProductReducer from './single-product'
import orderReducer from './order'
import cartReducer from './orderproduct'

const reducer = combineReducers({
  user,
  products: allProductsReducer,
  product: singleProductReducer,
  order: orderReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
