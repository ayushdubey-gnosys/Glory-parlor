import { useCustomers } from "../../services/customers/useCustomerQuery";
import { renderValue } from "../../utils/helpers";

const CustomersPage = () => {
  const { data, isLoading } = useCustomers();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Customers
      </h1>

      <div className="bg-white p-5 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Category</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((customer) => (
              <tr
                key={customer._id}
                className="border-b"
              >
                <td className="p-3">{renderValue(customer.name)}</td>
                <td className="p-3">{renderValue(customer.phone)}</td>
                <td className="p-3">{renderValue(customer.category)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;