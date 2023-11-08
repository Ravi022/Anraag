import React,{useState,useEffect} from 'react'
import classes from './StuMess.module.css' 
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
import paginationFactory from "react-bootstrap-table2-paginator";


const monthMessBill=[
  {month:"January",days:31,rebate:2,fee:(31*139),paid:4000,balance:0},
  {month:"February",days:28,rebate:2,fee:28*139,paid:4000,balance:0},
  {month:"March",days:31,rebate:2,fee:31*139,paid:4000,balance:0},
  {month:"April",days:30,rebate:2,fee:30*139,paid:4000,balance:0},
  {month:"May",days:31,rebate:2,fee:31*139,paid:4000,balance:0},
  {month:"June",days:30,rebate:2,fee:30*139,paid:4000,balance:0},
  {month:"July",days:31,rebate:2,fee:31*139,paid:4000,balance:0},
  {month:"August",days:31,rebate:2,fee:31*139,paid:4000,balance:0},
  {month:"September",days:30,rebate:2,fee:30*139,paid:4000,balance:0},
  {month:"October",days:31,rebate:2,fee:31*139,paid:4000,balance:0},
  {month:"November",days:30,rebate:2,fee:30*139,paid:4000,balance:0},
  {month:"December",days:31,rebate:2,fee:31*139,paid:4000,balance:0}

]
function StuMess() {
  const columns= [
    {
        text: 'Month',
        dataField: 'month',
      
  
    },
    {
      text: 'No. Of Days',
      dataField: 'days',
    
    },
    {
      text: 'Rebate Granted',
      dataField: 'rebate',
    
      },
  {
    text: 'Bill',
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
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 9,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });
  const [monthMess,newMess]= useState(monthMessBill);
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

    <div className={classes.adSM}>
      <Sidebar data={studentData} />
      <div><button className={classes.bSM} onClick={() => { window.location.pathname = "/waivermess"; }}>Request Rebate</button></div>
      <div className={classes.mainTable}>
        
        <BootstrapTable keyField='month' data={monthMessBill} columns={columns} pagination={pagination} hover striped ></BootstrapTable>
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

export default StuMess