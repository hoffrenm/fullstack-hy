import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import {
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])

  const userStats = () => {
    return users.map(user => (
      <TableRow key={user.id}>
        <TableCell>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </TableCell>
        <TableCell>{user.blogs.length}</TableCell>
      </TableRow>
    ))
  }

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
            {userStats()}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
