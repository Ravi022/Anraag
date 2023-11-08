import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = ({sidebar,openSidebar}) => {
  return (
      <div className={classes[sidebar?"bg":"nbg"]} onClick={openSidebar}></div>
  )
}

export default Backdrop