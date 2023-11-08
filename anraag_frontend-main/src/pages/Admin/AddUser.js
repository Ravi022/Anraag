import React, { useState, useEffect } from "react";
import classes from './AddUser.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { adminData } from '../../data/Data'
import { option } from '../../data/Data'
import Select from 'react-select'

const AddUser = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDd, setShowDd] = useState(false);
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [batch, setBatch] = useState(null)
    const [error, setError] = useState('')
    const [message,setMessage]=useState("")
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
            setError('Error connecting email the server');
        }
    }
    const toggleDd = () => {
        setShowDd((prevState) => !prevState)
    }
    const toggleSidebar = () => {
        setShowSidebar((prevState) => !prevState)
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let headers = new Headers();
            headers.set("Authorization", "Bearer " + localStorage.getItem("accessToken"))

            let res = await fetch("http://localhost:8080/addStudent", {
                method: "POST",
                mode: 'cors',
                headers: headers,
                body: JSON.stringify({
                    name: name,
                    email: email,
                    rollNo: rollNo,
                    batch: batch
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setName("");
                setEmail("");
                setRollNo("");
                setBatch(null);
                setMessage("User created successfully");
            } else {
                setError("Some error occured");
            }
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className={classes.page}>
            <div>
                <Toolbar openSidebar={toggleSidebar} openDd={toggleDd} />

                <div className={classes.mainTable}>
                    <h3 className={classes.h}>Add User</h3>
                    <div className={classes.frm}>

                        <form
                            onSubmit={onSubmitHandler}
                        >
                            <div className={classes.group}>
                                <label htmlFor="name" className={classes.label}>Name</label>
                                <input className={classes.date} onChange={(e) => setName(e.target.value)} name="name" type="text" />
                            </div>
                            <div className={classes.group}>
                                <label htmlFor="email" className={classes.label}>Email:</label>
                                <input className={classes.date} onChange={(e) => setEmail(e.target.value)} name="email" type="email" />
                            </div>
                            <div className={classes.group}>
                                <label htmlFor="roll" className={classes.label}>Roll No.:</label>
                                <input className={classes.date} onChange={(e) => setRollNo(e.target.value)} name="roll" />
                            </div>
                            <div className={classes.group}>
                                <label htmlFor="doc" className={classes.label}>Batch:</label>
                                <Select className={classes.date } defaultValue={batch} onChange={setBatch} options={option} />
                            </div>





                            <div className={classes.group}>
                                <button className={classes.btn} type="submit" >Add</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            {showDd &&

                <Dropdown dd={showDd} logout={logoutHandler} />
            }
            <Backdrop sidebar={showSidebar} openSidebar={toggleSidebar} />
            <SideMenu data={adminData} openSidebar={toggleSidebar} sidebar={showSidebar} />

        </div>

    )
}

export default AddUser








// const addStudent = {
//     name: string,
//     email: string,
//     rollNo: string,
//     // batch: string : options m se select krwayefga
// }

// const updateStudent = {
//     rollNo: string,
//     updatedParameters: {
//         // sirf whi jo change hue hain
//     }
// }

// const archiveStudent = {
//     rollNo: string
// }


// const addTransaction = {
//     rollNo: string,
//     mode: string,
//     txnRef: string,
//     remarks: string,
//     breakdown: {
//         tutionFee: Number,
//         hostelRent: Number,
//         messAdvance: Number,
//         messDues: Number,
//         others: Number,
//     },
// } 

// const updateTransaction = {
    // poora transaction object
// }


// const removeTransaction = {
    //  _id
// }
