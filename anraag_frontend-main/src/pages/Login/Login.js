import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import classes from './Login.module.css'
import logo from '../../assets/logo.png'

const Login=()=>{
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
   
  

  const handleSubmit = async ( e ) => {
     e.preventDefault();
  
    try {
      let headers = new Headers();
      headers.set('Content-type', 'application/json');
      
      console.log(email)
      console.log(password)
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        mode: 'cors',
        headers: headers
      });

      const res = await response.json()
      console.log(res);
      if (res.success) {
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
  };

  return (
    <body>
        <img src={logo} className={classes.logo} alt="Institute's Logo loading..."/>
      <div className={classes.background}>
        <div class={classes.shape}></div>
        <div class={classes.shape}></div>
    </div>
    
    
   
    <form className={classes.frm} onSubmit={handleSubmit}>
        <h3 className={classes.h}>Anraag</h3>
      <div>
        <label className={classes.lb} htmlFor="username">Username:</label>
        <input className={classes.ip}
          type="text"
          id="username"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className={classes.lb} htmlFor="password">Password:</label>
          <input
            className={classes.ip}

          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a className={classes.link} href="updatePassword">Forgot Password?</a>
      </div>
   
      {error && <div style={{ color: 'red' }}>{error}</div>}
    
      <button className={classes.bt} type="submit" >Login</button>
    </form>
    </body>
  );
};


export default Login;