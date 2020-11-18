import React from 'react'
import {thunkFetchAllUsers} from '../store/allusers'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

class UsersInfo extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const users = this.props.users || []
    return (
      <div className="user-info">
        <h1>Users Information</h1>
        <Table striped bordered hover variant="dark">
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
        </Table>
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
