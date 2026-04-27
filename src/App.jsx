import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import PropertyDetails from './pages/PropertyDetails'
import MapSearchPage from './pages/MapSearchPage'
import MyPropertiesPage from './pages/MyPropertiesPage'
import SavedPropertiesPage from './pages/SavedPropertiesPage'
import ContractsPage from './pages/ContractsPage'
import ContractDetailsPage from './pages/ContractDetailsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage' 
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AccountSettingsPage from './pages/AccountSettingsPage'
import EditEmailPage from './pages/EditEmailPage'
import EditPhonePage from './pages/EditPhonePage'
import AddPropertyPage from './pages/AddPropertyPage'
import NotificationPage from './pages/NotificationPage'
import BlogPage from './pages/BlogPage'
import ErrorPage from './pages/ErrorPage'
import RoleGuard from './dashboard/RoleGuard'
import LawyerDashboardLayout from './pages/lawyer/LawyerDashboardLayout'
import LawyerHomePage from './pages/lawyer/LawyerHomePage'
import LawyerContractDetailsPage from './pages/lawyer/LawyerContractDetailsPage'
import MyContractsPage from './pages/lawyer/MyContractsPage'
import AdminDashboardLayout from './pages/admin/AdminDashboardLayout'
import AdminDashboardHomePage from './pages/admin/AdminDashboardHomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/map-search" element={<MapSearchPage />} />
        <Route path="/my-properties" element={<MyPropertiesPage />} />
        <Route path="/saved-properties" element={<SavedPropertiesPage />} />
        <Route path="/contracts" element={<ContractsPage />} />
        <Route path="/contracts/:id" element={<ContractDetailsPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route path="/edit-email" element={<EditEmailPage />} />
        <Route path="/edit-phone" element={<EditPhonePage />} />
        <Route path="/add-property" element={<AddPropertyPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/error" element={<ErrorPage />} />

        {/* Lawyer dashboard */}
        <Route
          path="/lawyer"
          element={
            // <RoleGuard allowedRoles={['lawyer']}>
              <LawyerDashboardLayout />
            // </RoleGuard>
          }
        >
          <Route index element={<LawyerHomePage />} />
          <Route path="contracts/:id" element={<LawyerContractDetailsPage />} />
          <Route path="my-contracts" element={<MyContractsPage />} />
        </Route>

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            // <RoleGuard allowedRoles={['admin']}>
              <AdminDashboardLayout />
            // </RoleGuard>
          }
        >
          <Route index element={<AdminDashboardHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
