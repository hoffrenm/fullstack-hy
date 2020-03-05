import React from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Grid } from '@material-ui/core'

const Loginform = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <Grid container justify="center">
      <Grid item>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="username"
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              name="Username"
            />
          </div>
          <div>
            <TextField
              label="password"
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              name="Password"
            />
          </div>
          <br />
          <Button
            color="primary"
            variant="contained"
            id="loginButton"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  )
}

Loginform.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default Loginform
