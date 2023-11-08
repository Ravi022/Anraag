// import '../pages/page.css'
import React from 'react'
import {wardenData} from '../data/Data'

const Sidebar=()=>{
return(
<div className='sidebar'>
<h3>Anraag</h3>
    <ul className='sidebarlist'>
    {wardenData.map((val,key)=>{
    return(
     <li
      className='row'
      key={key} 
      id={window.location.pathname===val.link?"active":""}
      onClick={()=>{window.location.pathname=val.link;
      }}>
        {" "}
        <div id='name'>
            {val.name}
        </div>
     </li>
    );
})}
</ul> 
</div>);
}

export default Sidebar;