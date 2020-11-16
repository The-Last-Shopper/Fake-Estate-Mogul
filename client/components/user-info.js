import React from 'react'
import {thunkFetchAllUsers} from '../store/allusers'
import {connect} from 'react-redux'

class UsersInfo extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    console.log(users)
    return (
      <div>
        <h1>Users Information</h1>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(thunkFetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersInfo)
