import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementAll = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgreement, setSelectedAgreement] = useState(null); // <-- New state

  useEffect(() => {
    fetchAllAgreements();
  }, []);

  const fetchAllAgreements = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/rental-agreement/all/agreements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAgreements(res.data);
    } catch (err) {
      console.error("Error fetching agreements", err);
      alert("Error fetching agreements");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading agreements...</p>;
  if (agreements.length === 0) return <p className="text-center mt-4">No agreements found.</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Agreements</h3>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Tenant</th>
              <th>Property</th>
              <th>City</th>
              <th>Agreement</th>
            </tr>
          </thead>
          <tbody>
            {agreements.map((agr, index) => (
              <tr key={agr._id}>
                <td>{index + 1}</td>
                <td>
                  <span className={`badge bg-${agr.status === "approved" ? "success" : agr.status === "rejected" ? "danger" : "secondary"}`}>
                    {agr.status}
                  </span>
                </td>
                <td>{agr.tenant?.name || "N/A"}</td>
                <td>{agr.property?.name || "N/A"}</td>
                <td>{agr.property?.city || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => setSelectedAgreement(agr)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal to show selected agreement */}
      {selectedAgreement && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agreement Details</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedAgreement(null)}></button>
              </div>
              <div className="modal-body">
                <p style={{ whiteSpace: "pre-wrap" }}>{selectedAgreement.template}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedAgreement(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgreementAll;
