import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import classes from './UpdatePassword.module.css'

const UpdatePassword = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');

  return (
    
    <div><form className={classes.frm}
    //   onSubmit={handleSubmit}
    >
          <h3 className={classes.h}>Update Password</h3>
          <div>
  <label className={classes.lb} htmlFor="password">Enter Current Password:</label>
  <input className={classes.ip}
    type="password"
    id="username"
    value={oldPassword}
    onChange={(e) => setOldPassword(e.target.value)}
  />
</div>
<div>
  <label className={classes.lb} htmlFor="password">New Password:</label>
  <input className={classes.ip}
    type="password"
    id="username"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>
<div>
  <label className={classes.lb} htmlFor="password">Confirm New Password:</label>
  <input className={classes.ip}
    type="password"
    id="username"
    value={confPassword}
    onChange={(e) => setConfPassword(e.target.value)}
  />
</div>

{error && <div style={{ color: 'red' }}>{error}</div>}

<button className={classes.bt} type="submit" >Update Password</button>
</form></div>
  )
}

export default UpdatePassword