import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import CustomersPage from "../pages/customers/CustomersPage";
import CustomerDetailPage from "../pages/customers/CustomerDetailPage";
import CustomerProfilePage from "../pages/customers/CustomerProfilePage";
import AppointmentsDashboard from "../pages/appointments/AppointmentsDashboard";
import BookAppointmentPage from "../pages/appointments/BookAppointmentPage";
import AllAppointmentsPage from "../pages/appointments/AllAppointmentsPage";
import StaffPageAppointments from "../pages/appointments/StaffPage";
import ServicesPage from "../pages/services/ServicesPage";
import StaffPage from "../pages/staff/StaffPage";
import StaffDetailPage from "../pages/staff/StaffDetailPage";

import InventoryPage from "../pages/inventory/InventoryPage";
import BillingPage from "../pages/billing/BillingPage";
import InquiryPage from "../pages/inquiries/InquiryPage";
import CreateInquiryPage from "../pages/inquiries/CreateInquiryPage";
import InquiryDetailPage from "../pages/inquiries/InquiryDetailPage";
import AcademyPage from "../pages/academy/AcademyPage";
import CourseDetailPage from "../pages/academy/CourseDetailPage";
import MarketingPage from "../pages/marketing/MarketingPage";
import StaffIncentivePage from "../pages/admin/StaffIncentivePage";
import LoginPage from "../pages/auth/LoginPage";
import RequireAuth from "./RequireAuth";
import RequireRole from "./RequireRole";
import RegisterPage from "../pages/auth/RegisterPage";
import RegisterCustomerPage from "../pages/customers/RegisterCustomerPage";
import ProfilePage from "../pages/auth/ProfilePage";
import CustomerInquiryPage from "../pages/inquiries/CustomerInquiryPage";
import CustomerProductsPage from "../pages/inventory/CustomerProductsPage";
import HomePage from "../pages/HomePage";
import { useCurrentUser } from "../services/auth/useAuthQuery";
import { Navigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import NotFoundPage from "../pages/NotFoundPage";

const IndexRoute = () => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  const role = data.user.role;

  if (["superadmin", "admin", "staff"].includes(role)) {
    return <DashboardPage />;
  }

  if (role === "customer") {
    return <HomePage />;
  }

  return <Navigate to="/login" replace />;
};

// RootLayout: if user not logged in AND path is '/', show HomePage
// otherwise render DashboardLayout (which will render Outlet)
import { useLocation } from "react-router-dom";

const RootLayout = () => {
  const { data, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) return <Loader fullScreen />;

  if (!data?.user && location.pathname === "/") {
    return <HomePage />;
  }

  return <DashboardLayout />;
};

const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-customer" element={<RegisterCustomerPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={<IndexRoute />}
          />

          <Route path="customers" element={
            <RequireRole roles={["superadmin","admin","staff"]}>
              <CustomersPage />
            </RequireRole>
          } />
          <Route path="customers/me" element={
            <RequireRole roles={["customer","superadmin","admin","staff"]}>
              <CustomerProfilePage />
            </RequireRole>
          } />
          <Route path="customers/:id" element={
            <RequireRole roles={["superadmin","admin","staff"]}>
              <CustomerDetailPage />
            </RequireRole>
          } />
          <Route path="profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          } />
          <Route path="appointments">
            <Route index element={<Navigate to="all" replace />} />
            <Route path="book" element={
              <RequireAuth>
                <BookAppointmentPage />
              </RequireAuth>
            } />
            <Route path="all" element={
              <RequireAuth>
                <AllAppointmentsPage />
              </RequireAuth>
            } />
            <Route path="staff" element={
              <RequireAuth>
                <StaffPageAppointments />
              </RequireAuth>
            } />
          </Route>
          {/* Public routes */}
          <Route path="services" element={<ServicesPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="staff/:id" element={<StaffDetailPage />} />
          
          <Route path="inventory" element={
            <RequireRole roles={["superadmin","admin"]}>
              <InventoryPage />
            </RequireRole>
          } />
          <Route path="billing" element={
            <RequireRole roles={["superadmin","admin"]}>
              <BillingPage />
            </RequireRole>
          } />
          
          <Route path="inquiries">
            <Route
              index
              element={
                <RequireRole roles={["superadmin", "admin", "staff"]}>
                  <InquiryPage />
                </RequireRole>
              }
            />
            <Route
              path="create"
              element={
                <RequireRole roles={["superadmin", "admin", "staff", "customer"]}>
                  <CreateInquiryPage />
                </RequireRole>
              }
            />
            <Route
              path=":id"
              element={
                <RequireRole roles={["superadmin", "admin", "staff"]}>
                  <InquiryDetailPage />
                </RequireRole>
              }
            />
          </Route>

          <Route
            path="inquiry"
            element={
              <RequireRole roles={["customer"]}>
                <CustomerInquiryPage />
              </RequireRole>
            }
          />
          {/* Public route */}
          <Route
            path="parlor-products"
            element={<CustomerProductsPage />}
          />
          <Route path="academy" element={<AcademyPage />} />
          <Route path="academy/:id" element={<CourseDetailPage />} />
          
          <Route path="marketing" element={
            <RequireRole roles={["superadmin","admin"]}>
              <MarketingPage />
            </RequireRole>
          } />
          <Route path="admin/incentive" element={
            <RequireRole roles={["superadmin","admin"]}>
              <StaffIncentivePage />
            </RequireRole>
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesProvider;