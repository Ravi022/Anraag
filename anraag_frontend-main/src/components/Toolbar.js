import React from 'react'
import classes from './Toolbar.module.css'
import 'remixicon/fonts/remixicon.css'


const Toolbar = ({ openSidebar, openDd }) => {
  console.log(JSON.parse(localStorage.getItem("anrag_user")))
  return (
      <div className={classes.toolbar}>
          <div className={classes.left}>
          <div className={classes.side} onClick={openSidebar}>
          <i class="ri-menu-line"></i>
          </div>
          <div className={classes.title}>Anraag</div>
          </div>
          <div className={classes.right}>
        <div className={classes.username}>{JSON.parse(localStorage.getItem("anrag_user")).name}</div>
              <div className={classes.ic} onClick={openDd}>
          <i class="ri-user-fill"></i>
              </div>
          </div>
    </div>
  )
}

export default Toolbar