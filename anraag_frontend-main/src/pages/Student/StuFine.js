import React,{useState,useEffect} from 'react'
import classes from './StuFine.module.css'
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





const semwiseFine=[
  {id:'1',date:'5/06/2022',desc:'Late Fee',fine:2500,paid:2500},
  {id:'2',date:'5/06/2022',desc:'NA',fine:0,paid:0},
  {id:'3',date:'5/06/2022',desc:'NA',fine:0,paid:0},
  {id:'4',date:'5/06/2022',desc:'NA',fine:0,paid:0},
  {id:'5',date:'5/06/2022',desc:'NA',fine:0,paid:0},
  {id:'6',date:'5/06/2022',desc:'Others',fine:2000,paid:2000},
  {id:'7',date:'5/06/2022',desc:'Library',fine:530,paid:530},
  {id:'8',date:'5/06/2022',desc:'Other',fine:1500,paid:1500}
]
function StuFine() {
  const columns= [
    {
        text: 'Date',
        dataField: 'date',
      
  
  },
  {
    text: 'Description',
    dataField: 'desc',
  
    },
    {
      text: 'Fine',
      dataField: 'fine',
    
    },
  {
    text: 'Amount Paid',
    dataField: 'paid',
  
  }
  ]
  const [semFine,newSemFine]= useState(semwiseFine);
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
  
  return (

    <div>
         <Toolbar openSidebar={toggleSidebar} openDd={toggleDd}/>   

    <div className={classes.adSF}>
              <Sidebar data={studentData } />
              <div className={classes.mainTable}>
        
        <BootstrapTable keyField='id' data={semwiseFine} columns={columns}  hover striped ></BootstrapTable>
        </div>
       
      </div>
      {showDd &&

<Dropdown dd={showDd} logout={logoutHandler} />
}
<Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
          <SideMenu data={stMenu } openSidebar={toggleSidebar} sidebar={showSidebar} />
      </div>
    
    

  )
}

export default StuFine