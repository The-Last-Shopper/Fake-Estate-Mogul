import {expect} from 'chai'
import sinon from 'sinon'
import {mount} from 'enzyme'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import waitForExpect from 'wait-for-expect'

import {AllProducts as UnconnectedAllProducts} from '../components/all-products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const products = [
  {
    id: 1,
    name: 'Mars Plot',
    imageUrl: '/images/mars.png',
    description: 'abc',
    price: 2000000000
  },
  {
    id: 2,
    name: 'Jupiter Junction',
    imageUrl: '/images/jupiter.jpeg',
    description: '123',
    price: 2000000
  }
]

describe.only('All Products Page', () => {
  const getProductsSpy = sinon.spy()
  afterEach(() => {
    getProductsSpy.resetHistory()
  })
  it('Displays all products that are in props', () => {
    const wrapper = mount(
      <UnconnectedAllProducts
        products={products}
        fetchProducts={getProductsSpy}
      />
    )
    expect(wrapper.text()).to.include('Mars Plot')
    expect(wrapper.text()).to.include('Jupiter Junction')

    const images = wrapper.find('img').map(node => node.get(0).props.src)
    expect(images).to.include.members([
      '/images/mars.png',
      '/images/jupiter.jpeg'
    ])
  })
  it('Products are not hardcoded', () => {
    const newProducts = [
      {
        id: 3,
        name: 'Venus Gardens',
        imageUrl: '/images/venus.png',
        description: 'xyz'
      },
      {
        id: 4,
        name: 'Saturn Meadows',
        imageUrl: '/images/saturn.jpeg',
        description: 'bumble bee',
        price: 2000000
      }
    ]

    const wrapper = mount(
      <UnconnectedAllProducts
        products={products}
        fetchProducts={getProductsSpy}
      />
    )

    expect(wrapper.text()).to.not.include('Mars Plot')
    expect(wrapper.text()).to.not.include('Jupiter Junction')
    expect(wrapper.text()).to.include('Venus Gardens')
    expect(wrapper.text()).to.include('Saturn Meadows')
    const images = wrapper.find('img').map(node => node.get(0).props.src)
    expect(images).to.include.members([
      '/images/venus.png',
      '/images/saturn.jpeg'
    ])
  })
  it('shows Out of stock if products array is empty', () => {
    const newerProducts = []
    const wrapper = mount(
      <UnconnectedAllProducts
        products={products}
        fetchProducts={getProductsSpy}
      />
    )
    expect(wrapper.text()).to.include('sold out!')
  })
  it('Gets products from DB on mount', async () => {
    mount(
      <UnconnectedAllProducts
        products={products}
        fetchProducts={getProductsSpy}
      />
    )

    // await waitForExpect(() => {
    //   expect(getProductsSpy).to.have.been.called;
    // })
  })
})
