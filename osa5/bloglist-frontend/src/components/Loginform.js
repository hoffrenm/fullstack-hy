import React from 'react'
import PropTypes from 'prop-types'

const Loginform = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => {
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            name="Username"
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
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
