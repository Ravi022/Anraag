import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import classes from './Forgot.module.css'

const Forgot = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const[showBtn,setShowBtn]=useState(true)

  const handleSubmit = async (e) => {
    console.log(showBtn)
    setShowBtn(false)
    e.preventDefault()
    props.saveData(email);
    try {
      let headers = new Headers();
      headers.set('Content-type', 'application/json');
      
      console.log(email)
      // console.log(password)
      const response = await fetch('http://localhost:8080/forgotPassword', {
        method: 'POST',
        body: JSON.stringify( email),
        mode: 'cors',
        headers: headers
      });

      const res = await response.json()
      console.log(res);
      if (res.success) {
        setDone(true);
        console.log(res.user)
        const at = res.accessToken;
        const rt = res.refreshToken
        
        localStorage.setItem("accessToken", at);
        localStorage.setItem("refreshToken", rt);
        localStorage.setItem("anrag_user", JSON.stringify(res.user));


        if (res.user.type === 'student') {

          navigate('/stu');
        }
        else if (res.user.type === 'admin') {

          navigate('/admin');
        }
      } else {
        
      }
    } catch (error) {
      setError('Error connecting to the server');
    }

    // navigate("/otp")
  }

  return (
    <div>
     {!done? <form className={classes.frm}
        onSubmit={handleSubmit}
      >
        <h3 className={classes.h}>Forgot Password?</h3>
        <div>
          <label className={classes.lb} htmlFor="username">Enter Registered Email:</label>
          <input className={classes.ip}
            type="text"
            id="username"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <button className={classes.bt} disabled={!showBtn} type="submit" >Send Reset Password Link</button>
      </form> : <div className={classes.fr}>
        <h3 className={classes.hh}>We have successfully sent you the Password Reset Link.</h3>
          
      </div> }
      
        
      
    </div>
  )
}

export default Forgot