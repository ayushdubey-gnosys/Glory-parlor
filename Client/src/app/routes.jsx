import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import CustomersPage from "../pages/customers/CustomersPage";
import AppointmentsPage from "../pages/appointments/AppointmentsPage";
import ServicesPage from "../pages/services/ServicesPage";
import StaffPage from "../pages/staff/StaffPage";

import InventoryPage from "../pages/inventory/InventoryPage";
import BillingPage from "../pages/billing/BillingPage";
import InquiryPage from "../pages/inquiries/InquiryPage";
import AcademyPage from "../pages/academy/AcademyPage";
import MarketingPage from "../pages/marketing/MarketingPage";
import LoginPage from "../pages/auth/LoginPage";
import RequireAuth from "./RequireAuth";
import RegisterPage from "../pages/auth/RegisterPage";
import RegisterCustomerPage from "../pages/customers/RegisterCustomerPage";


const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-customer" element={<RegisterCustomerPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          <Route index element={<DashboardPage />} />

          <Route path="customers" element={<CustomersPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="inquiries" element={<InquiryPage />} />
          <Route path="academy" element={<AcademyPage />} />
          <Route path="marketing" element={<MarketingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesProvider;