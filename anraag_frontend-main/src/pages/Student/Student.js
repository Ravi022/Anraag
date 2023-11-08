import React, { useState, useEffect } from 'react'
import classes from './Student.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { stMenu } from '../../data/Data'


const Student = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDd, setShowDd] = useState(false);
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const dt = [
        { type: 'Tuition Fee', amt: "4563" },
        { type: 'Hostel Dues', amt: "-3454" },
        { type: 'Mess Dues', amt: "4835" },
        { type: 'Library and Other Dues', amt: "-234" },
        { type: 'Total Dues', amt: "-3424" },]
    

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
    // console.log(showSidebar)
    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = new Headers();
                headers.set("Authorization", "Bearer " + localStorage.getItem("accessToken"))

                const response = await fetch('http://localhost:8080/getPortfolio', {
                    method: 'GET',
                    mode: 'cors',
                    headers: headers
                });
                const tab = await response.json()

                if (tab.success) {
                    
                    const displayD = {}
                    let iii = 0;
                    tab.dues.tutionFee.forEach((e) => iii -= e.amount)
                    displayD.tution = iii;
                    iii = 0;
                    tab.dues.hostelRent.forEach((e) => iii -= e.amount)
                    displayD.hostel = iii;
                    iii = 0;
                    tab.dues.messBill.forEach((e) => iii -= e.totalAmount)
                    displayD.mess = iii;
                    iii = 0;
                    tab.dues.libraryFine.forEach((e)=>iii-=e.amount)
                    tab.dues.libraryFine.forEach((e)=>iii-=e.amount)
                    tab.dues.electricityBill.forEach((e) => iii -= e.amount)
                    displayD.fines = iii;
                   
                    // const dt = [
                    //     { type: 'Tuition Fee', amt: displayD.tution },
                    //     { type: 'Hostel Dues', amt: displayD.hostel },
                    //     { type: 'Mess Dues', amt: displayD.mess },
                    //     { type: 'Library and Other Dues', amt: displayD.fines },
                    //     { type: 'Total Dues', amt: displayD.tution + displayD.hostel + displayD.mess + displayD.fines },]
                    setData(dt);
                    console.log(dt);
                }
                
            } catch (error) {
                setError('Error connecting to the server');
            }
        };

        fetchData();
    }, [])

    return (
        <div className={classes.page}>
            <div>

                <Toolbar  openSidebar={toggleSidebar} openDd={toggleDd} />
                <div className={classes.mainTable}>
                <div className={classes.dot}></div>
                    <div className={classes.list}>

                        {dt.map((val, key) => {
                            return (
                                <div className={classes[val.type==="Total Dues"?"bl":"block"]}>
                                    <div className={classes.headers}>
                                        {val.type}
                                    </div>
                                    <div className={classes[val.amt < 0 ? "Red" : "Green"]}>
                                        {val.amt < 0 ? val.amt * -1 : val.amt}
                                    </div>
                                </div>
                            );
                        })}
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
export default Student