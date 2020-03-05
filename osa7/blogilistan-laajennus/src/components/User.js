import React from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Box
} from '@material-ui/core'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  console.log(user)

  return (
    <Paper>
      <Box p={2}>
        <h2>{user.name}</h2>
        <h4>Added blogs</h4>
        <TableContainer component={Paper}>
          <Table size="small">
            {user.blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  )
}

export default User
