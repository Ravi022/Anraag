import React,{useState,useEffect} from "react";
import classes from './UpdateUser.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { adminData } from '../../data/Data'


const UpdateUser = () => {
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                let headers = new Headers();
                headers.set("Authorization", "Bearer " + localStorage.getItem("accessToken"))

                const response = await fetch('http://localhost:8080/api/landingData', {
                    method: 'GET',
                    mode: 'cors',
                    headers: headers
                });
                const tab = await response.json()

                if (tab.success) {
                    const displayD = {
                        tution: tab.fee.tutionFee - tab.fee2.tutionFee,
                        hostel: tab.fee.hostelRent - tab.fee2.hostelRent,
                        mess: tab.fee.messAdvance + tab.fee.messDues - tab.fee2.messDues,
                        fines: tab.fee.fines - tab.fee2.fines,
                    }

                    const dt = [
                        { type: 'Tuition Fee', amt: displayD.tution },
                        { type: 'Hostel Dues', amt: displayD.hostel },
                        { type: 'Mess Dues', amt: displayD.mess },
                        { type: 'Library and Other Dues', amt: displayD.fines },
                        { type: 'Total Dues', amt: displayD.tution + displayD.hostel + displayD.mess + displayD.fines },]
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
                <Toolbar openSidebar={toggleSidebar} openDd={toggleDd} />
                
                <div className={classes.mainTable}></div>
            </div>
            {showDd &&

<Dropdown dd={showDd} logout={logoutHandler} />
}
<Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
<SideMenu  data={adminData} openSidebar={toggleSidebar} sidebar={showSidebar} />

    </div>
    
    )
}

export default UpdateUser