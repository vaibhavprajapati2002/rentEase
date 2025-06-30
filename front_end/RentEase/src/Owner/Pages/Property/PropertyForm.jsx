import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyForm = ({ initialData = null, onClose, onSuccess }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    type: "Apartment",
    bhk: 1,
    rent: "",
    deposit: "",
    size: "",
    availableFrom: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        availableFrom: initialData.availableFrom?.slice(0, 10),
        image: null,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      if (initialData?._id) {
        const url = `${BASE_URL}/property/updateProperty/${initialData._id}`;
        console.log("Updating property at:", url);
        await axios.put(url, form, config);
        alert("Property updated successfully.");
      } else {
        await axios.post(`${BASE_URL}/property/createProperty`, form, config);
        alert("Property created successfully.");
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving property:", err?.response?.data || err.message);
      alert("Something went wrong. See console for details.");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5>{initialData ? "Edit Property" : "Add New Property"}</h5>
        <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>X</button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="row g-3" encType="multipart/form-data">
          {/* Form Fields */}
          {[
            { name: "name", label: "Property Name", col: 6 },
            { name: "address", label: "Address", col: 6 },
            { name: "city", label: "City", col: 4 },
            { name: "state", label: "State", col: 4 },
            { name: "pincode", label: "Pincode", col: 4 },
            { name: "bhk", label: "BHK", col: 2, type: "number" },
            { name: "rent", label: "Rent ₹", col: 3, type: "number" },
            { name: "deposit", label: "Deposit ₹", col: 3, type: "number" },
            { name: "size", label: "Size (sqft)", col: 2, type: "number" },
            { name: "availableFrom", label: "Available From", col: 3, type: "date" },
          ].map(({ name, label, col, type = "text" }) => (
            <div className={`col-md-${col}`} key={name}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                className="form-control"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="col-md-4">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              {["Apartment", "House", "Flat", "Villa", "PG", "Other"].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Property Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-success me-2">
              {initialData ? "Update" : "Add"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
