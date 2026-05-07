import Card from "../../components/ui/Card";
import { useCustomers } from "../../services/customers/useCustomerQuery";
import { useAuth } from "../../context/AuthProvider";

const DashboardPage = () => {
  const { data: customers } = useCustomers();
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <Card title="Revenue" value="₹2,40,000" />
        <Card title="Customers" value={customers?.length || 0} />
        <Card title="Appointments" value={120} />
        <Card title="Staff" value={18} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">Staff performance chart placeholder</div>
        <div className="bg-white p-4 rounded shadow">Top services/products chart placeholder</div>
      </div>

      {user?.role === "superadmin" && (
        <div className="bg-white p-4 rounded shadow mt-6">Super Admin: Global controls and analytics placeholder</div>
      )}

      {user?.role === "admin" && (
        <div className="bg-white p-4 rounded shadow mt-6">Admin: Parlor-specific stats and controls placeholder</div>
      )}

      {user?.role === "staff" && (
        <div className="bg-white p-4 rounded shadow mt-6">Staff: Assigned appointments and quick actions placeholder</div>
      )}
    </div>
  );
};

export default DashboardPage;