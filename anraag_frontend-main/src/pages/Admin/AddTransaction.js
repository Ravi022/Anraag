import React, { useState, useEffect } from "react";
import classes from './AddTransaction.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { adminData } from '../../data/Data'
import { option } from '../../data/Data'
import Select from 'react-select'

const AddTransaction = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDd, setShowDd] = useState(false);
    const [rollNo, setRollNo] = useState("")
    const [mode, setMode] = useState(null);
    const [txnRef, setTxnRef] = useState("")
    const [tuitionFee, setTuitionFee] = useState("")
    const [hostelRent, setHostelRent] = useState("")
    const [messAdvance, setMessAdance] = useState("")
    const [messDues, setMessDues] = useState("")
    const [others, setOthers] = useState("")
    const [remarks, setRemarks] = useState("")
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

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
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            let headers = new Headers();
            headers.set("Authorization", "Bearer " + localStorage.getItem("accessToken"))

            let res = await fetch("http://localhost:8080/addTransaction", {
                method: "POST",
                mode: 'cors',
                headers: headers,
                body: JSON.stringify({
                    rollNo: rollNo,
                    mode: mode,
                    txnRef: txnRef,
                    remarks: remarks,
                    breakdown: {
                        tuitionFee: tuitionFee,
                        hostelRent: hostelRent,
                        messAdvance: messAdvance,
                        messDues: messDues,
                        others:others
                    }
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setRollNo("");
                setMode(null);
                setTxnRef("");
                setRemarks("");
                setTuitionFee("");
                setHostelRent("");
                setMessAdance("");
                setMessDues("");
                setOthers("")
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
                    <h3 className={classes.h}>Add Transaction</h3>
                    <div className={classes.frm}>

                        <form
                        onSubmit={onSubmitHandler}
                        >
                            <div className={classes.group}>
                                <label htmlFor="roll" className={classes.label}>Roll No.:</label>
                                <input className={classes.date} onChange={(e) => setRollNo(e.target.value)}  name="roll" />
                            </div>
                            <div className={classes.group}>
                                <label htmlFor="doc" className={classes.label}>Mode:</label>
                                <Select defaultValue={mode} onChange={setMode} options={option} />
                            </div>
                            <div className={classes.group}>
                                <label htmlFor="txid" className={classes.label}>Transaction Id.:</label>
                                <input className={classes.date} onChange={(e) => setTxnRef(e.target.value)} name="txid" type="text" />
                            </div>
                            <div className={classes.group}>
                                <h3>BreakDown:</h3>
                                <div className={classes.grp}>
                                <label htmlFor="txid" className={classes.lb}>Tuition Fee:</label>
                                <input className={classes.dte} onChange={(e) => setTuitionFee(e.target.value)} name="txid" type="text" />
                                </div>
                                <div className={classes.grp}>
                                <label htmlFor="txid" className={classes.lb}>Hostel Rent:</label>
                                <input className={classes.dte} onChange={(e) => setHostelRent(e.target.value)} name="txid" type="text" />
                                </div>
                                <div className={classes.grp}>
                                <label htmlFor="txid" className={classes.lb}>Mess Advance:</label>
                                <input className={classes.dte} onChange={(e) => setMessAdance(e.target.value)} name="txid" type="text" />
                                </div>
                                <div className={classes.grp}>
                                <label htmlFor="txid" className={classes.lb}>Mess Dues:</label>
                                <input className={classes.dte} onChange={(e) => setMessDues(e.target.value)} name="txid" type="text" />
                                </div>
                                <div className={classes.grp}>
                                <label htmlFor="txid" className={classes.lb}>Fines:</label>
                                <input className={classes.dte} onChange={(e) => setOthers(e.target.value)} name="txid" type="text" />
                            </div>
                            </div>
                            <div className={classes.group}>
                                <label htmlFor="remarks" className={classes.label}>Remarks:</label>
                                <textarea className={classes.rs} onChange={(e) => setRemarks(e.target.value)} name="remarks" type="text" />
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

export default AddTransaction 