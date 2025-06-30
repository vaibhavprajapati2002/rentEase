import React, { useEffect, useState } from "react";
import axios from "axios";

const TenantTermsAndConditions = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/tenant/terms-and-conditions/get-terms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPolicy(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading policies", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5"><h5>Loading terms and conditions...</h5></div>;
  if (!policy) return <div className="alert alert-danger">No policies found for your assigned property.</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Terms & Conditions</h3>

        <div className="mb-4">
          <h5>Owner Name:</h5>
          <p className="text-muted">{policy.ownerName || "N/A"}</p>
        </div>

        <div className="mb-4">
          <h5>Terms & Conditions:</h5>
          <div className="border p-3 rounded bg-light">
            {policy.termsAndConditions ? (
              <p style={{ whiteSpace: "pre-line" }}>{policy.termsAndConditions}</p>
            ) : (
              <p className="text-muted">No terms and conditions provided.</p>
            )}
          </div>
        </div>

        {policy.privacyPolicy && (
          <div className="mb-4">
            <h5>Privacy Policy:</h5>
            <div className="border p-3 rounded bg-light">
              <p style={{ whiteSpace: "pre-line" }}>{policy.privacyPolicy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantTermsAndConditions;
