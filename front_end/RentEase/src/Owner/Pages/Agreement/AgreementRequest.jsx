import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementRequests = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/rental-agreement/requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Error loading agreement requests", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/rental-agreement/respond/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(`Request ${status} successfully.`);
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error("Error responding to request", err);
      alert("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading requests...</p>;
  if (requests.length === 0) return <p>No agreement requests found.</p>;

  return (
    <div className="container mt-4">
      <h4>Agreement Requests</h4>
      {requests.map((req) => (
        <div className="card mb-3" key={req._id}>
          <div className="card-header">
            <strong>Tenant:</strong> {req.tenant?.name} <br />
            <strong>Property:</strong> {req.property?.name}
          </div>
          <div className="card-body">
            <p style={{ whiteSpace: "pre-wrap" }}>{req.content}</p>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-success me-2"
                onClick={() => handleRespond(req._id, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRespond(req._id, "rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgreementRequests;
