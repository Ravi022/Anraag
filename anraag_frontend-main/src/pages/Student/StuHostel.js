import React,{useState,useEffect} from 'react'
import classes from './StuHostel.module.css' 
import Sidebar from '../../components/Sidebar'
import SideMenu from '../../components/SideMenu'
import Toolbar from "../../components/Toolbar";
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { stMenu } from '../../data/Data'
import {studentData} from '../../data/Data'
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';


const semwiseRent=[
  {sem:1,fee:12500,paid:12500,balance:0},
  {sem:2,fee:12500,paid:12500,balance:0},
  {sem:3,fee:12500,paid:12500,balance:0},
  {sem:4,fee:12500,paid:12500,balance:0},
  {sem:5,fee:12500,paid:12500,balance:0},
  {sem:6,fee:12500,paid:12500,balance:0},
  {sem:7,fee:12500,paid:12500,balance:0},
  {sem:8,fee:12500,paid:12500,balance:0}

]


function StuHostel() {
  const columns= [
    {
        text: 'Semester',
        dataField: 'sem',
      
  
  },
  {
    text: 'Rent',
    dataField: 'fee',
  
    },
    {
      text: 'Amount Paid',
      dataField: 'paid',
    
    },
  {
    text: 'Dues',
    dataField: 'balance',
  
  }
  ]

  const [semRent,newSemRent]= useState(semwiseRent);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDd, setShowDd] = useState(false);
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

  const toggleSidebar = () => {
      setShowSidebar((prevState) => !prevState)
  }
  
  const toggleDd = () => {
      setShowDd((prevState) => !prevState)
  }

  const getData = async() => {
      try {
          let headers = new Headers();
          headers.set('Content-type', 'application/json');
          headers.set('Authorization', "Bearer " + localStorage.getItem("accessToken"));
  
          const response = await fetch('http://localhost:8080/getPortfolio', {
              method: 'GET',
              mode: 'cors',
              headers: headers
          });
  
          const res = await response.json()
          console.log(res);
  
      } catch (error) {
          setError('Error connecting to the server');
      }
  }
  useEffect(() => {
    getData()
  }, []);
  
    // try {
    //   const response = await fetch('', {
    //     method: 'POST',
    //     headers: {
    //       
    //     },
    //     body: JSON.stringify({ username, password }),
    //   });

    //   if (response.ok) {
    //     const { token } = await response.json();
    //       if(response.type==='admin')
    //        {navigate{'/admin'};}
    //       else if(response.type==='student')
    //        {navigate{'/student'};}
    //       else {navigate{'/warden'};}  
    //   } else {
    //     setError('Incorrect username or password');
    //   }
    // } catch (error) {
    //   setError('Error connecting to the server');
    // }
  return (
    <div>
         <Toolbar openSidebar={toggleSidebar} openDd={toggleDd}/>   
    
    <div className={classes.adSH}>
      <Sidebar data={studentData} />
      <div className={classes.mainTable}>
        
        <BootstrapTable keyField='sem' data={semwiseRent} columns={columns}  hover striped ></BootstrapTable>
        </div>
      </div>
      {showDd &&

<Dropdown dd={showDd} logout={logoutHandler} />
}
<Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
<SideMenu data={stMenu} openSidebar={toggleSidebar} sidebar={showSidebar} />
    </div>
  )
}

export default StuHostel