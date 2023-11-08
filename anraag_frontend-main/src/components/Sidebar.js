import classes from './Sidebar.module.css'
import React from 'react'
import {studentData} from '../data/Data'

const Sidebar=({data})=>{
return(
<div className={classes.sidebar}>
    <ul className={classes.sidebarlist}>
    {studentData.map((val,key)=>{
    return(
     <li
      className={classes.row}
      key={key} 
      id={window.location.pathname===val.link?"active":""}
      onClick={()=>{window.location.pathname=val.link;
      }}>
        
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