import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import classes from './NewPassword.module.css'

const NewPassword = (props) => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [userobj, setUserobj] = useState({});
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let headers = new Headers();
      headers.set('Content-type', 'application/json');

      // console.log(email)
      console.log(password)
      if (password !== confPassword) {
        setError('Passwords do not match!!');
        return;
      }

      const payLoad = {
        ...userobj,
        newPassword: password
      }

      console.log(payLoad)
      console.log(userobj)
      const response = await fetch('http://localhost:8080/resetPassword', {
        method: 'POST',
        body: JSON.stringify(payLoad),
        mode: 'cors',
        headers: headers
      });

      const res = await response.json()
      console.log(res);
      if (res.success) {
        setMessage('Successfully updated the password')
      } else { setError("Error: "+res.message)

      }
    } catch (error) {
      setError('Error connecting to the server');
    }
  }

  const params = new URLSearchParams(location.search)
  useEffect(() => {
    const verifyLink = async () => {
      try {
        let headers = new Headers();
        headers.set('Content-type', 'application/json');

        const temp = {}
        temp.email = params.get("email");
        temp.validTill = new Date(Number(params.get("validTill")));

        const payLoad = {
          email: temp.email,
          validTill: temp.validTill,
          s: params.get("s"),
        }

        const response = await fetch('http://localhost:8080/verifyLink', {
          method: 'POST',
          body: JSON.stringify(payLoad),
          mode: 'cors',
          headers: headers
        });
        const res = await response.json()
        if (res.success) {
          setShow(true)
          console.log(res)
          temp.token = res.token
          setUserobj(temp)
        } else {
          console.log(res)
          setError("Error: "+res.message)
        }

      } catch (error) {
        console.log("m here", error)
        setError('Error connecting to the server');
      }
    };

    verifyLink();
  }, [])

  return (
    <div>{show ? <form className={classes.frm}
      onSubmit={handleSubmit}
    >
      <h3 className={classes.h}>Set New Password</h3>
      <div>
        <label className={classes.lb} htmlFor="password">New Password:</label>
        <input className={classes.ip}
          type="password"
          id="username"
          // value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label className={classes.lb} htmlFor="password">Confirm New Password:</label>
        <input className={classes.ip}
          type="text"
          id="username"
          // value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
      </div>
      {message && <div style={{ color: 'green' }}>{message}</div>}
      
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <button className={classes.bt} type="submit" >Update Password</button>
    </form> : <div className={classes.frm}><h4 className={classes.hh}>Loading...</h4></div>}</div>
  )
}

export default NewPassword