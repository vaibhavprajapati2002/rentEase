
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
import TenantHome from './Tenant/components/TenantHome.jsx';
import OwnerHome from './Owner/OwnerHome.jsx';
import Home from './Home';
import Feature from './Feature';
import PropertyDetails from './Tenant/pages/PropertyDetails.jsx';
import ViewProperty from './tenant/pages/ViewProperty.jsx';
import TenantProfile from './Tenant/pages/TenantProfile.jsx';
import RentPayment from './Tenant/pages/RentPayment.jsx';
import TenantTermsAndCondition from './Tenant/pages/TenantTermsAndCondition.jsx';
import TenantPrivacyPolicy from './Tenant/pages/TenantPrivacyAndPolicy.jsx';
import TenantRentAgreement from './Tenant/pages/TenantRentAgreement.jsx';





import MyProperties from './Owner/Pages/Property/MyProperties.jsx';
import ViewTenant from './Owner/Pages/ViewTenant.jsx';
import OwnerUtilities from './Owner/Pages/Utility/OwnerUtilities.jsx';
import AddUtility from './Owner/Pages/Utility/AddUtility.jsx';
import BankDetails from './Owner/Pages/BankDetails/BankDetails.jsx';
import RentStatus from './Owner/Pages/RentStatus/RentStatus.jsx';
import TermsAndCondition from './Owner/Pages/TermsAndCondition/TermsAndCondition.jsx';
import PrivacyAndPolicy from './Owner/Pages/PrivacyAndPolicy/PrivacyAndPoicy.jsx';
import RentAgreement from './Owner/Pages/Agreement/OwnerRentAgreement.jsx'; // Assuming this is the correct path
import AgreementRequests from './Owner/Pages/Agreement/AgreementRequest.jsx';




import OwnerInfo from './Tenant/pages/OwnerInfo.jsx';
import Footer from './MyComponent/Footer.jsx';
import Property from './Property.jsx';
function App() {


  return (
   <>
   
   <CustomnNavbar />
    
      <Routes>
        {/* <Route path="/" element={<h1>Welcome to RentEase</h1>} /> */}
         <Route path="/" element={<Home />} />
         <Route path="/feature" element={<Feature />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/role" element={<Role />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="/PropertyDetails" element={<Property />} />
        
        


        {/* Add more releted to Owner  from vaibhav  side  */}
         <Route path="/owner/dashboard" element={<OwnerHome />} />
        <Route path="/owner/my-properties" element={<MyProperties />} />
        <Route path="/owner/view-tenant" element={<ViewTenant />} />
        <Route path="/owner/utilities" element={<OwnerUtilities />} />
        <Route path="/owner/add-utility" element={<AddUtility />} />
        <Route path="/owner/bank-details" element={<BankDetails />} />
        <Route path="/owner/rent-status" element={<RentStatus />} />
        <Route path="/owner/terms-and-conditions" element={<TermsAndCondition />} />
        <Route path="/owner/privacy-policy" element={<PrivacyAndPolicy />} />
        <Route path="/owner/view-agreement" element={<RentAgreement />} />
        <Route path="/owner/agreement-requests" element={<AgreementRequests />} />

         







        {/* Add more releted to tenant from vivek side  */}
        <Route path="/tenant/dashboard" element={<TenantHome />} />
        <Route path="/tenant/property" element={<PropertyDetails />} />
        <Route path="/tenant/view-property" element={<ViewProperty />} />
        <Route path="/tenant/owner-info" element={<OwnerInfo />} />
        <Route path="/tenant/profile" element={<TenantProfile />} />
        <Route path="/tenant/rent-payment" element={<RentPayment />} />
        <Route path="/tenant/terms-and-conditions" element={<TenantTermsAndCondition />} />
        <Route path="/tenant/privacy-policy" element={<TenantPrivacyPolicy />} />
        <Route path="/tenant/agreement" element={<TenantRentAgreement />} />


        {/* Add more routes as needed */}
      </Routes>

      <Footer />
   
    </>
  )
}

export default App
