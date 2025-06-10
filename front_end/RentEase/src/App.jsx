
import React from 'react'
import CustomnNavbar from './MyComponent/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './MyComponent/Auth/Login.jsx';
import Register from './MyComponent/Auth/Register.jsx';
import VerifyOtp from './MyComponent/Auth/VerifyOtp.jsx';
import UserDetails from './MyComponent/Auth/UserDetails.jsx';
import Role from './MyComponent/Auth/Role.jsx';
import ForgotPassword from './MyComponent/Auth/ForgotPassword.jsx';
import ResetPassword from './MyComponent/Auth/ResetPassword.jsx';
import TenantHome from './tenant/TenantHome.jsx';
import OwnerHome from './Owner/OwnerHome.jsx';
import Home from './Home';
function App() {


  return (
   <>
   
   <CustomnNavbar />
    
      <Routes>
        {/* <Route path="/" element={<h1>Welcome to RentEase</h1>} /> */}
         <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/role" element={<Role />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/tenant/dashboard" element={<TenantHome />} />
        <Route path="/owner/dashboard" element={<OwnerHome />} />

        {/* Add more routes as needed */}
      </Routes>
   
    </>
  )
}

export default App
