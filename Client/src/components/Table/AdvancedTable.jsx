import React from "react";

const AdvancedTable = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="text-left p-3 text-sm text-gray-600">
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="p-6 text-center text-gray-500">
                No records
              </td>
            </tr>
          )}
          {data.map((row) => (
            <tr key={row._id} className="border-t">
              {columns.map((col) => (
                <td key={col.accessor} className="p-3 text-sm">
                  {col.Cell ? col.Cell(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvancedTable;
