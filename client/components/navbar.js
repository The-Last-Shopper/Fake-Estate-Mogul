import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Navbar} from 'react-bootstrap'

const NavigationBar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <Navbar bg="dark" variant="dark" className="navbar">
      <h4>Fake Estate Mogul </h4>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}

            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Your Cart</Link>
            {isAdmin && <Link to="/users">Users Info</Link>}
            {isAdmin && <Link to="/adminDashboard">Dashboard</Link>}
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/products">All Products</Link>
            <Link to="/cart">Your Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </Navbar>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavigationBar)

/**
 * PROP TYPES
 */
NavigationBar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
}
