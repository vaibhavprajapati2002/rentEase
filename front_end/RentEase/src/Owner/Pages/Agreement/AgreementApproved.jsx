import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementApproved = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApprovedAgreements();
  }, []);

  const fetchApprovedAgreements = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/rental-agreement/approved`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAgreements(res.data);
    } catch (err) {
      console.error("Error fetching approved agreements", err);
      alert("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading approved agreements...</p>;

  if (agreements.length === 0)
    return <p className="text-center mt-4">No approved agreements found.</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Approved Agreements</h3>
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Tenant Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Property</th>
              <th>City</th>
              <th>Agreement</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agr, index) => (
              <tr key={agr._id}>
                <td>{index + 1}</td>
                <td>{agr.tenant?.name || "N/A"}</td>
                <td>{agr.tenant?.email || "N/A"}</td>
                <td>{agr.tenant?.phone || "N/A"}</td>
                <td>{agr.property?.name || "N/A"}</td>
                <td>{agr.property?.city || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => alert(agr.template)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgreementApproved;
