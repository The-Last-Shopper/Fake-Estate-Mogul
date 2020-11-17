import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {FormGroup, FormText, Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={e => handleSubmit(e, name)} name={name}>
        <div className="border">
          <FormGroup controlId="formBasicEmail">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="email" />
          </FormGroup>
          {name === 'signup' && (
            <React.Fragment>
              <div>
                <label htmlFor="name">
                  <small>Name</small>
                </label>
                <input name="name" type="text" />
              </div>
              <br />
              <div>
                <label htmlFor="address">
                  <small>Address</small>
                </label>
                <input name="address" type="text" />
              </div>
            </React.Fragment>
          )}
          <br />
          <FormGroup controlId="formBasicPassword">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
            <FormText className="text-muted">
              We'll never share your password with anyone else.
            </FormText>
          </FormGroup>
        </div>

        <br />
        <div>
          <Button variant="primary" type="submit">
            {displayName}
          </Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, type) {
      evt.preventDefault()
      const formName = type
      const formDataObj = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      if (type === 'signup') {
        formDataObj.name = evt.target.name.value
        formDataObj.address = evt.target.address.value
      }
      dispatch(auth(formDataObj, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
