
import React from 'react'
import CustomnNavbar from './MyComponent/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router,Routes,Route } from 'react-router-dom';
import Login from './MyComponent/Auth/Login.jsx';
import Register from './MyComponent/Auth/Register.jsx';
import VerifyOtp from './MyComponent/Auth/VerifyOtp.jsx';
import UserDetails from './MyComponent/Auth/UserDetails.jsx';
import Role from './MyComponent/Auth/Role.jsx';
import ForgotPassword from './MyComponent/Auth/ForgotPassword.jsx';
import ResetPassword from './MyComponent/Auth/ResetPassword.jsx';
function App() {


  return (
   <>
   <CustomnNavbar />
    
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/role" element={<Role />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        {/* Add more routes as needed */}
      </Routes>
    
    </>
  )
}

export default App
