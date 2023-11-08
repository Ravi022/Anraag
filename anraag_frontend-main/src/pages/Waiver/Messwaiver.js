import React,{useState,useEffect} from "react";
import classes from './Messwaiver.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { stMenu } from '../../data/Data'

const Messwaiver = () => {
  const [showSidebar, setShowSidebar] = useState(false);
    const [showDd, setShowDd] = useState(false);
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            let headers = new Headers();
            headers.set('Content-type', 'application/json');
            const response = await fetch('http://localhost:8080/logout', {
                method: 'POST',
                body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
                mode: 'cors',
                headers: headers
            });

            localStorage.removeItem("refreshToken")
            navigate('/login')

        } catch (error) {
            setError('Error connecting to the server');
        }
    }
    const toggleDd = () => {
        setShowDd((prevState) => !prevState)
    }
    const toggleSidebar = () => {
        setShowSidebar((prevState) => !prevState)
    }
    
    return (
        <div className={classes.page}>
             <div>
                <Toolbar openSidebar={toggleSidebar} openDd={toggleDd} />
          <div className={classes.mainTable}>
            <h3 className={classes.h}>Mess Rebate Form</h3>
            <div className={classes.frm}>

            <form
              // onSubmit={onSubmitHandler}
              >
        <div className={classes.group}>
          <label htmlFor="from" className={classes.label}>From:</label>
          <input className={classes.date} name="from" type="date"  />
                </div>
                <div className={classes.group}>
          <label htmlFor="to" className={classes.label}>To:</label>
          <input className={classes.date} name="to" type="date"  />
        </div>
        <div className={classes.group}>
          <label htmlFor="reason" className={classes.label}>Reason:</label>
          <textarea className={classes.rs} name="reason"   />
        </div>
        <div className={classes.group}>
          <label htmlFor="doc" className={classes.label}>Supporting Documents:</label>
                  <input type="file" className={classes.up} />
        </div>
       
        
          
          
    
        <div className={classes.group}>
          <button className={classes.btn} type="submit" >Submit</button>
        </div>
      </form>
              </div>

                </div>
            </div>
            {showDd &&

<Dropdown dd={showDd} logout={logoutHandler} />
}
<Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
<SideMenu  data={stMenu} openSidebar={toggleSidebar} sidebar={showSidebar} />
</div>
    )
}

export default Messwaiver