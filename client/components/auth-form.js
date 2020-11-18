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
    <div className="loginSignUp">
      <div className="center-container">
        <form onSubmit={e => handleSubmit(e, name)} name={name}>
          <div className="change-border">
            {name === 'signup' ? (
              <h4 className="center">Sign Up Here</h4>
            ) : (
              <h4 className="center">Login</h4>
            )}

            <FormGroup className="bordercolor" controlId="formBasicEmail">
              <label className="center" htmlFor="email">
                <p>Email</p>
              </label>
              <input className="center" name="email" type="email" />
            </FormGroup>
            {name === 'signup' && (
              <React.Fragment>
                <div>
                  <label htmlFor="name">
                    <p>Name</p>
                  </label>
                  <input name="name" type="text" />
                </div>
                <br />
                <div>
                  <label htmlFor="address">
                    <p>Address</p>
                  </label>
                  <input name="address" type="text" />
                </div>
                <div>
                  <label htmlFor="imageUrl">
                    <p>Image</p>
                  </label>
                  <input name="imageUrl" type="text" />
                </div>
              </React.Fragment>
            )}
            <br />
            <FormGroup controlId="formBasicPassword">
              <label htmlFor="password">
                <p>Password</p>
              </label>
              <input className="center" name="password" type="password" />
              <FormText className="bold">
                We'll never share your password with anyone else.
              </FormText>
            </FormGroup>
          </div>

          <br />
          <div className="center-container">
            <Button variant="primary" type="submit">
              {displayName}
            </Button>
          </div>
          {error &&
            error.response && (
              <div className="center-container">
                <div> {error.response.data} </div>{' '}
              </div>
            )}
        </form>
      </div>
      <div className="center-container">
        <a href="/auth/google">{displayName} with Google</a>
      </div>
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
