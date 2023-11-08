import React, { useState,useEffect } from "react";
import classes from './StuTuition.module.css'
import Sidebar from '../../components/Sidebar'
import SideMenu from '../../components/SideMenu'
import Toolbar from "../../components/Toolbar";
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { stMenu } from '../../data/Data'
import { studentData } from '../../data/Data'
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import paginationFactory from "react-bootstrap-table2-paginator";


const semwiseFee = [
    { sem: 1, fee: 112500, paid: 112500, balance: 0},
    { sem: 2, fee: 112500, paid: 112500, balance: 0},
    { sem: 3, fee: 112500, paid: 112500, balance: 0},
    { sem: 4, fee: 112500, paid: 112500, balance: 0},
    { sem: 5, fee: 112500, paid: 112500, balance: 0},
    { sem: 6, fee: 112500, paid: 112500, balance: 0}, 
    { sem: 7, fee: 112500, paid: 112500, balance: 0},
    { sem: 8, fee: 112500, paid: 112500, balance: 0}

]


const Student = () => {
    const columns= [
        {
            text: 'Semester',
            dataField: 'sem',
          
      
      },
      {
        text: 'Fee',
        dataField: 'fee',
      
        },
        {
          text: 'Amount Paid',
          dataField: 'paid',
        
        },
      {
        text: 'Amount Left',
        dataField: 'balance',
      
      }
      ]
      
    const [semFee, newSemFee] = useState(semwiseFee);
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
        <div className={classes.adST}>
        <Sidebar data={studentData} />
        <div className={classes.mainTable}>
        
      <BootstrapTable keyField='sem' data={semwiseFee} columns={columns}  hover striped ></BootstrapTable>
      </div>
            </div>
            {showDd &&

<Dropdown dd={showDd} logout={logoutHandler} />
}
<Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
<SideMenu data={stMenu } openSidebar={toggleSidebar} sidebar={showSidebar} />
    </div>

    );
}

export default Student;