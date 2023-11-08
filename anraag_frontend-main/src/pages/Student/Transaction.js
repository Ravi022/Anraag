import React, { useState, useEffect } from "react";
import classes from './Transaction.module.css'
import Toolbar from '../../components/Toolbar'
import SideMenu from '../../components/SideMenu'
import Backdrop from '../../components/Backdrop'
import Dropdown from '../../components/Dropdown'
import { useNavigate } from 'react-router-dom'
import { stMenu } from '../../data/Data'
import BootstrapTable from "react-bootstrap-table-next";
import 'bootstrap/dist/css/bootstrap.min.css';
import './transaction.css'
import paginationFactory from "react-bootstrap-table2-paginator";
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


const Transaction = () => {
  // const { SearchBar } = Search;
  const dat = [
    {
      date: '2011/04/25',
      utr: '356783948473620',
      amt: '5367222'
    },
    {
      date: '2011/07/25',
      utr: '156783948473670',
      amt: '5367222'
    },
    {
      date: '2009/01/12',
      utr: '85678394847366',
      amt: '5367222'
    },
    {
      date: '2012/03/29',
      utr: '456783948473633',
      amt: '5367222'
    },
    {
      date: '2008/11/28',
      utr: '156783948473662',
      amt: '5367222'
    },
    {
      date: '2012/12/02',
      utr: '356783948473672',
      amt: '5367222'
    },
    {
      date: '2012/08/06',
      utr: '156783948473637',
      amt: '5367222'
    },
    {
      date: '2010/10/14',
      utr: '356783948473627',
      amt: '5367222'
    },
    {
      date: '2009/09/15',
      utr: '256783948473605',
      amt: '5367222'
    },
    {
      date: '2008/12/13',
      utr: '156783948473603',
      amt: '5367222'
    },
    {
      date: '2008/12/19',
      utr: '95678394847360'
      , amt: '5367222'
    },
    {
      date: '2013/03/03',
      utr: '356783948473642',
      amt: '5367222'
    },
    {
      date: '2008/10/16',
      utr: '456783948473670',
      amt: '5367222'
    },
    {
      date: '2012/12/18',
      utr: '356783948473613',
      amt: '5367222'
    },
    {
      date: '2010/03/17',
      utr: '356783948473685',
      amt: '5367222'
    },
    {
      date: '2012/11/27',
      utr: '156783948473698',
      amt: '5367222'
    },
    {
      date: '2010/06/09',
      utr: '756783948473625',
      amt: '5367222'
    },
    {
      date: '2009/04/10',
      utr: '256783948473637',
      amt: '5367222'
    },
    {
      date: '2012/10/13',
      utr: '156783948473632',
      amt: '5367222'
    },
    {
      date: '2012/09/26',
      utr: '256783948473617',
      amt: '5367222'
    },
    {
      date: '2011/09/03',
      utr: '356783948473645',
      amt: '5367222'
    },
    {
      date: '2009/06/25',
      utr: '656783948473675',
      amt: '5367222'
    },
    {
      date: '2011/12/12',
      utr: '156783948473606',
      amt: '5367222'
    },
    {
      date: '2010/09/20',
      utr: '85678394847365'
      , amt: '5367222'
    },
    {
      date: '2009/10/09',
      utr: '1567839484736'
      , amt: '5367222'
    },
    {
      date: '2010/12/22',
      utr: '95678394847362'
      , amt: '5367222'
    },
    {
      date: '2010/11/14',
      utr: '356783948473657',
      amt: '5367222'
    },
    {
      date: '2011/06/07',
      utr: '256783948473606',
      amt: '5367222'
    },
    {
      date: '2010/03/11',
      utr: '856783948473650',
      amt: '5367222'
    },
    {
      date: '2011/08/14',
      utr: '156783948473663',
      amt: '5367222'
    },
    {
      date: '2011/06/02',
      utr: '95678394847365'
      , amt: '5367222'
    },
    {
      date: '2009/10/22',
      utr: '156783948473614',
      amt: '5367222'
    },
    {
      date: '2011/05/07',
      utr: '156783948473645',
      amt: '5367222'
    },
    {
      date: '2008/10/26',
      utr: '256783948473635',
      amt: '5367222'
    },
    {
      date: '2011/03/09',
      utr: '356783948473624',
      amt: '5367222'
    },
    {
      date: '2009/12/09',
      utr: '85678394847365'
      , amt: '5367222'
    },
    {
      date: '2008/12/16',
      utr: '156783948473664',
      amt: '5367222'
    },
    {
      date: '2010/02/12',
      utr: '156783948473609',
      amt: '5367222'
    },
    {
      date: '2009/02/14',
      utr: '456783948473652',
      amt: '5367222'
    },
    {
      date: '2008/12/11',
      utr: '156783948473636',
      amt: '5367222'
    },
    {
      date: '2008/09/26',
      utr: '656783948473645',
      amt: '5367222'
    },
    {
      date: '2011/02/03',
      utr: '256783948473634',
      amt: '5367222'
    },
    {
      date: '2011/05/03',
      utr: '156783948473663',
      amt: '5367222'
    },
    {
      date: '2009/08/19',
      utr: '156783948473639',
      amt: '5367222'
    },
    {
      date: '2013/08/11',
      utr: '95678394847368'
      , amt: '5367222'
    },
    {
      date: '2009/07/07',
      utr: '85678394847367'
      , amt: '5367222'
    },
    {
      date: '2012/04/09',
      utr: '156783948473638',
      amt: '5367222'
    },
    {
      date: '2010/01/04',
      utr: '156783948473625',
      amt: '5367222'
    },
    {
      date: '2012/06/01',
      utr: '156783948473615',
      amt: '5367222'
    },
    {
      date: '2013/02/01',
      utr: '75678394847365'
      , amt: '5367222'
    },
    {
      date: '2011/12/06',
      utr: '156783948473645',
      amt: '5367222'
    },
    {
      date: '2011/03/21',
      utr: '356783948473656',
      amt: '5367222'
    },
    {
      date: '2009/02/27',
      utr: '156783948473603',
      amt: '5367222'
    },
    {
      date: '2010/07/14',
      utr: '85678394847366'
      , amt: '5367222'
    },
    {
      date: '2008/11/13',
      utr: '156783948473683',
      amt: '5367222'
    },
    {
      date: '2011/06/27',
      utr: '156783948473683',
      amt: '5367222'
    },
    {
      date: '2011/01/25',
      utr: '156783948473612',
      amt: '5367222'
    }
  ]
const columns= [
  {
      text: 'Date',
      dataField: 'date',
      // sort: true,

},
{
  text: 'UTR Number',
  dataField: 'utr',

  },
  {
    text: 'Transaction Type',
    dataField: 'type',
  
  },
{
  text: 'Amount',
  dataField: 'amt',

}
]
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
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
      <Toolbar openSidebar={toggleSidebar} openDd={toggleDd} />
      <div className={classes.mainTable}>
        
      <BootstrapTable keyField='utr' data={dat} columns={columns}  hover striped pagination={pagination}></BootstrapTable>
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

export default Transaction