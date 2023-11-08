import React from 'react'
import classes from './SideMenu.module.css'
import 'remixicon/fonts/remixicon.css'

const SideMenu = ({data,sidebar, openSidebar}) => {
    return (
        <div className={classes[ sidebar  ? "sideMenuOpen" : "sideMenu"]}>
          <div className={classes.ic} onClick={openSidebar}>
                <i class="ri-menu-line"></i> 
                <div className={classes.title}>Anraag</div>        
          </div>
      <ul className={classes.sidebarlist}>
    {data.map((val,key)=>{
    return(
     <li
      className={classes.row}
      key={key} 
      id={window.location.pathname===val.link?"active":""}
      onClick={()=>{window.location.pathname=val.link;
      }}>
        {" "}
        <div className={classes.name}>
            {val.name}
        </div>
     </li>
    );
})}
</ul> 
    </div>
  )
}

export default SideMenu