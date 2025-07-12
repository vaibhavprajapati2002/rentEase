import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TenantAgreementForm = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [template, setTemplate] = useState("");
  const [filledAgreement, setFilledAgreement] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

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
      } catch (err) {
        console.error("Error fetching template", err);
        toast.error("Failed to load agreement template");
      } finally {
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

  const validateForm = () => {
    const { tenantName, aadhar, startDate, duration } = formValues;
    if (!tenantName || !aadhar || !startDate || !duration) {
      toast.warning("Please fill in all required fields");
      return false;
    }
    if (!/^\d{12}$/.test(aadhar)) {
      toast.warning("Aadhar must be a 12-digit number");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let finalAgreement = template;
    Object.keys(formValues).forEach((key) => {
      finalAgreement = finalAgreement.replaceAll(`{{${key}}}`, formValues[key]);
    });

    setFilledAgreement(finalAgreement);
    setShowPreview(true);

    try {
      await axios.post(
        `${BASE_URL}/rental-agreement/tenant/request-agreement`,
        { content: finalAgreement },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Agreement submitted successfully for review.");
    } catch (err) {
      console.error("Submission failed", err);
      toast.error("Failed to submit agreement.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([filledAgreement], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "RentalAgreement.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearForm = () => {
    setFormValues({
      tenantName: "",
      aadhar: "",
      startDate: "",
      duration: "",
    });
    setFilledAgreement("");
    setShowPreview(false);
  };

  if (loading) return <p className="text-center mt-5">Loading template...</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📄 Submit Your Rental Agreement</h4>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Your Full Name</label>
          <input
            name="tenantName"
            value={formValues.tenantName}
            onChange={handleChange}
            className="form-control"
            placeholder="John Doe"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Aadhar Number</label>
          <input
            name="aadhar"
            value={formValues.aadhar}
            onChange={handleChange}
            className="form-control"
            placeholder="12-digit Aadhar"
            maxLength={12}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formValues.startDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Rental Duration (Months)</label>
          <input
            type="number"
            name="duration"
            value={formValues.duration}
            onChange={handleChange}
            className="form-control"
            min={1}
          />
        </div>
      </div>

      <div className="mt-4 d-flex flex-wrap gap-2">
        <button className="btn btn-success" onClick={handleSubmit}>
          Submit Agreement
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
        {filledAgreement && (
          <>
            <button className="btn btn-outline-secondary" onClick={handleDownload}>
              Download Agreement
            </button>
            <button className="btn btn-outline-danger" onClick={clearForm}>
              Clear Form
            </button>
          </>
        )}
      </div>

      {showPreview && filledAgreement && (
        <div className="mt-4">
          <h5>📝 Agreement Preview</h5>
          <div
            className="border p-3 rounded bg-light"
            style={{ whiteSpace: "pre-wrap", minHeight: "150px" }}
          >
            {filledAgreement}
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantAgreementForm;
