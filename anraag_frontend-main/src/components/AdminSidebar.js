import classes from './Sidebar.module.css'
import React from 'react'
import {adminData} from '../data/Data'

const Sidebar=()=>{
return(
<div className={classes.sidebar}>
    <h3>Anraag</h3>
    <ul className={classes.sidebarlist}>
    {adminData.map((val,key)=>{
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
</div>);
}

export default Sidebar;