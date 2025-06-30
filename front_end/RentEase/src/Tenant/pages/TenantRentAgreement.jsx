import React, { useEffect, useState } from "react";
import axios from "axios";

const TenantAgreementForm = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [template, setTemplate] = useState("");
  const [filledAgreement, setFilledAgreement] = useState("");
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    tenantName: "",
    aadhar: "",
    startDate: "",
    duration: "",
  });

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/rental-agreement/tenant/view-template`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTemplate(res.data.template || "");
        setLoading(false);
      } catch (err) {
        console.error("Error fetching template", err);
        setLoading(false);
      }
    };

    fetchTemplate();
  }, []);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    let finalAgreement = template;
    Object.keys(formValues).forEach((key) => {
      const placeholder = `{{${key}}}`;
      finalAgreement = finalAgreement.replaceAll(placeholder, formValues[key]);
    });

    setFilledAgreement(finalAgreement);

    try {
      await axios.post(
        `${BASE_URL}/rental-agreement/tenant/request-agreement`,
        {
          content: finalAgreement,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Agreement submitted for review.");
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit agreement.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h4>Submit Your Rental Agreement</h4>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Your Name</label>
          <input
            name="tenantName"
            value={formValues.tenantName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Aadhar Number</label>
          <input
            name="aadhar"
            value={formValues.aadhar}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formValues.startDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Rental Duration (Months)</label>
          <input
            type="number"
            name="duration"
            value={formValues.duration}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
      </div>

      <button className="btn btn-success mt-4" onClick={handleSubmit}>
        Submit Agreement Request
      </button>

      {filledAgreement && (
        <div className="mt-4">
          <h5>Agreement Preview</h5>
          <div className="border p-3" style={{ whiteSpace: "pre-wrap" }}>
            {filledAgreement}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantAgreementForm;
