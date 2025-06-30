import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementEditor = ({ property, onBack }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/rental-agreement/template/${property._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const temp = res.data.template || "";
        if (!temp) {
          alert("No agreement template found. You can create one now.");
        }
        setTemplate(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch agreement", err);
        setLoading(false);
        alert("Failed to load agreement.");
      });
  }, [property._id]);

  const handleSave = async () => {
    try {
      console.log("Saving for property:", property._id);
      await axios.post(
        `${BASE_URL}/rental-agreement/template`,
        {
          propertyId: property._id,
          template,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Agreement template saved successfully.");
    } catch (err) {
      console.error("Error saving template", err);
      alert("Error saving agreement. Check console for more info.");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading agreement...</p>;

  return (
    <div className="container mt-4" style={{ height: "100vh", overflowY: "auto" }}>
      <h4 className="mb-3">Edit Agreement Template for <span className="text-primary">{property.name}</span></h4>
      <textarea
        style={{ height: "70vh", width: "100%" }}
        className="form-control"
        placeholder="Enter agreement template here..."
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      ></textarea>

      <div className="mt-3 d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button
          className="btn btn-success"
          onClick={handleSave}
          disabled={!template.trim()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AgreementEditor;
