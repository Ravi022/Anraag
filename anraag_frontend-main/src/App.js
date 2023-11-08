import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
import Student from './pages/Student/Student'
import StuTuition from './pages/Student/StuTuition'
import StuFine from './pages/Student/StuFine'
import StuHostel from './pages/Student/StuHostel'
import StuMess from './pages/Student/StuMess'
import Warden from './pages/Warden/Warden'
import WarFines from './pages/Warden/WarFines'
import ProfilePage from './pages/Profile/Profile'
import React from 'react'
import Messwaiver from './pages/Waiver/Messwaiver'
import { Route, Routes } from 'react-router-dom'
import Transaction from './pages/Student/Transaction'
import RebateHistory from './pages/Student/RebateHistory'
import Forgot from './pages/Login/Forgot'
// import Otp from './pages/Login/Otp'
import NewPassword from './pages/Login/NewPassword'
import UpdatePassword from './pages/Login/UpdatePassword'
import ManageTransactions from './pages/Admin/ManageTransactions'
import ManageUsers from './pages/Admin/ManageUsers'
import PaymentRequest from './pages/Admin/PaymentRequest'
import AdminLogs from './pages/Admin/AdminLogs'
import AddTransaction from './pages/Admin/AddTransaction'
import AddUser from './pages/Admin/AddUser'
import UpdateTransaction from './pages/Admin/UpdateTransaction'
import UpdateUser from './pages/Admin/UpdateUser'
import DeleteTransaction from './pages/Admin/DeleteTransaction'
import ArchiveUser from './pages/Admin/ArchiveUser'



const App = () => {
  const forgotPasswordData = {
  }
  const storeEmail = (data) => {
    forgotPasswordData.email = data
  }
  const storeToken = (data) => {
    forgotPasswordData.token = data
    console.log(forgotPasswordData)
  }

  return (
    <div className='App'>
    <Routes>
        <Route path='/login' element={<Login  />} />
        <Route path='/forgot' element={<Forgot saveData={storeEmail} />} />
        {/* <Route path='/otp' element={<Otp saveData={storeToken} email={ forgotPasswordData.email} />} /> */}
        <Route path='/new' element={<NewPassword token={forgotPasswordData.token} />} />
        <Route path='/update' element={<UpdatePassword />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/stu' element={<Student/>}/>
        <Route path='/transaction' element={<Transaction />} />
        <Route path='/rebatehistory' element={<RebateHistory />} />
        <Route path="/waivermess" element={<Messwaiver />} />
        <Route path='/studentTuition' element={<StuTuition/>}/>
        <Route path='/studentMess' element={<StuMess/>}/>
        <Route path='/studentHostel' element={<StuHostel/>}/>
        <Route path='/studentFines' element={<StuFine/>}/>
        <Route path='/admin' element={<Admin />} />
        <Route path='/managetransactions' element={<ManageTransactions />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/addtrans' element={<AddTransaction />} />
        <Route path='/updateuser' element={<UpdateUser />} />
        <Route path='/updatetrans' element={<UpdateTransaction />} />
        <Route path='/archiveuser' element={<ArchiveUser />} />
        <Route path='/deltrans' element={<DeleteTransaction />} />
        <Route path='/manageusers' element={<ManageUsers />} />
        <Route path='/paymentrequest' element={<PaymentRequest />} />
        <Route path='/adminlogs' element={<AdminLogs />} />
        <Route path='/warden' element={<Warden/>}/>
        <Route path='/wardenFines' element={<WarFines/>}/>
      </Routes>
      
    </div>
  )
}

export default App;
