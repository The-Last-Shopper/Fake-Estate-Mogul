import {expect} from 'chai'
import {me, logout} from '../store/user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe.only('All Products Page', () => {
  it('Displays all products in database', () => {})
  it('')
})
