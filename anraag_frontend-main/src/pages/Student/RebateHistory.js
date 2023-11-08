import React, { useState, useEffect } from "react";
import classes from './RebateHistory.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { stMenu } from '../../data/Data'
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import './rebate.css'
import paginationFactory from "react-bootstrap-table2-paginator";

const RebateHistory = () => {

    const dat = [
        {
            applied: '2011/04/25',
            from: '2011/04/25',
            to: '2011/04/25',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk356783948473620',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2011/07/25',
            from: '2011/07/25',
            to: '2011/07/25',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk156783948473670',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2009/01/12',
            from: '2009/01/12',
            to: '2009/01/12',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk85678394847366',

            file: 'dsh', status: 'approved'
        },
        {
            applied: '2012/03/29',
            from: '2012/03/29',
            to: '2012/03/29',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk456783948473633',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2008/11/28',
            from: '2008/11/28',
            to: '2008/11/28',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk156783948473662',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2012/12/02',
            from: '2012/12/02',
            to: '2012/12/02',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk356783948473672',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2012/08/06',
            from: '2012/08/06',
            to: '2012/08/06',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk156783948473637',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2010/10/14',
            from: '2010/10/14',
            to: '2010/10/14',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk356783948473627',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2009/09/15',
            from: '2009/09/15',
            to: '2009/09/15',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk256783948473605',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2008/12/13',
            from: '2008/12/13',
            to: '2008/12/13',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk156783948473603',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2008/12/19',
            from: '2008/12/19',
            to: '2008/12/19',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk95678394847360',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2013/03/03',
            from: '2013/03/03',
            to: '2013/03/03',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk356783948473642',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2008/10/16',
            from: '2008/10/16',
            to: '2008/10/16',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk456783948473670',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2012/12/18',
            from: '2012/12/18',
            to: '2012/12/18',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk356783948473613',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2010/03/17',
            from: '2010/03/17',
            to: '2010/03/17',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk356783948473685',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2012/11/27',
            from: '2012/11/27',
            to: '2012/11/27',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk156783948473698',
            file: 'dsh',
            status: 'approved'
        },
        {
            applied: '2010/06/09',
            from: '2010/06/09',
            to: '2010/06/09',
            reason: 'cghjkxlcnsadvcwghksxancadbvwudhqijsxanc,dvbjqwduhiljksandvhjgkqdhkjsxanbvhjdqk756783948473625',
            file: 'dsh',
            status: 'approved'
        }]

    const columns = [
        {
            text: 'Applied on',
            dataField: 'applied',
            // sort: true,

        },
        {
            text: 'From',
            dataField: 'from',

        },
        {
            text: 'To',
            dataField: 'to',

        },
        {
            text: 'Reason',
            dataField: 'reason',

        },
        {
            text: 'Supporting Docs',
            dataField: 'file',

        },
        {
            text: 'Status',
            dataField: 'status'
        }
    ]
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
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
                <div className={classes.mainTable}>
                    <div className={classes.tit}>REBATE HISTORY</div>
                    <div><button className={classes.bSM} onClick={() => { window.location.pathname = "/waivermess"; }}>Request Rebate</button></div>

                    <BootstrapTable keyField='applied' data={dat} columns={columns} hover striped pagination={pagination}></BootstrapTable>

                </div>
                <div className={classes.top}>
                    <Toolbar openSidebar={toggleSidebar} openDd={toggleDd} />
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

export default RebateHistory