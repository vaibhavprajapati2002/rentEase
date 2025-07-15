import React, { useEffect, useState } from "react";
import axios from "axios";

const TenantUtility = () => {
  const [utilities, setUtilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // assuming token stored after login
  

  useEffect(() => {
    fetchUtilities();
  }, []);

  const fetchUtilities = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/owner/utilities/tenant-utilities`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("API Response:", response.data);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.utilities || [];

      setUtilities(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching utilities:", error);
      setUtilities([]);
      setLoading(false);
    }
  };

  const handlePay = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/owner/utilities/update-utility/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Utility marked as paid!");
      fetchUtilities();
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  if (loading) return <p>Loading utilities...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Utility Bills</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Month</th>
            <th>Usage</th>
            <th>Unit Cost</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(utilities) && utilities.length > 0 ? (
            utilities.map((utility) => (
              <tr key={utility._id}>
                <td>{utility.utilityType}</td>
                <td>{utility.month}</td>
                <td>{utility.usage}</td>
                <td>₹{utility.unitCost}</td>
                <td><strong>₹{utility.totalAmount}</strong></td>
                <td>
                  {utility.isPaid ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Pending</span>
                  )}
                </td>
                <td>
                  {!utility.isPaid && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handlePay(utility._id)}
                    >
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No utility bills found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TenantUtility;
