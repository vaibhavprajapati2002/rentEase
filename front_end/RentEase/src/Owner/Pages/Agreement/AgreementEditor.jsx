import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementEditor = ({ property, onBack }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [template, setTemplate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/rental-agreement/template/${property._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setTemplate(res.data.template || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [property._id]);

  const handleSave = async () => {
    try {
        console.log("property", property._id);
      await axios.post(
        `${BASE_URL}/rental-agreement/template`,
        {
          propertyId: property._id,
          template,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Agreement template saved successfully.");
    } catch (err) {
      console.error("Error saving template", err);
      alert("Error saving agreement.");
    }
  };

  if (loading) return <p>Loading agreement...</p>;

  return (
    <div className="container mt-4"style={{height: "100vh", overflowY: "auto"}}>
      <h4>Edit Agreement for {property.name}</h4>
      <textarea
      style={{ height: "70vh", width: "100%" }  }
        className="form-control mt-3"
        rows={10}
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      ></textarea>
      <div className="mt-3 d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={onBack}>Back</button>
        <button className="btn btn-success" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AgreementEditor;
