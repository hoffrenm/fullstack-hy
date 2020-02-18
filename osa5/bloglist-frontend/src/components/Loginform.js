import React from 'react'

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

export default Loginform
