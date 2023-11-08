import React, { useState } from 'react'
import classes from './Dropdown.module.css'
import 'remixicon/fonts/remixicon.css'

const Dropdown = ({ dd,logout }) => {
    
  return (
      <div className={classes.Dropdown}>
          <ul className={classes.menu}>
              <li className={classes.element} >
                  <div className={classes.icon}>
                  <i class="ri-profile-line"></i>
                  </div>
                  <div  onClick={()=>{window.location.pathname='/profile';
      }}>Profile</div>
              </li>
              <li className={classes.element} >
                  <div className={classes.icon}>
                  <i class="ri-logout-box-line"></i>
                  </div>
                  <div onClick={logout}>LogOut</div>
              </li>
          </ul>
    </div>
  )
}

export default Dropdown