import React from 'react'

import {NavigationBar} from './components'
import Routes from './routes'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
