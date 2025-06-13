import React, { useState, useEffect } from "react";
import axios from "axios";

const PropertyForm = ({ initialData = null, onClose, onSuccess }) => {
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
    image: null, // image as file
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        image: null, // don't prefill file input
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
        await axios.put(`http://localhost:5000/property/updateProperty/${initialData._id}`, form, config);
      } else {
        await axios.post("http://localhost:5000/property/createProperty", form, config);
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Something went wrong.");
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
          <div className="col-md-6">
            <label className="form-label">Property Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">State</label>
            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Pincode</label>
            <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label className="form-label">Type</label>
            <select className="form-select" name="type" value={formData.type} onChange={handleChange} required>
              <option>Apartment</option>
              <option>House</option>
              <option>Flat</option>
              <option>Villa</option>
              <option>PG</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">BHK</label>
            <input type="number" className="form-control" name="bhk" value={formData.bhk} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Rent ₹</label>
            <input type="number" className="form-control" name="rent" value={formData.rent} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Deposit ₹</label>
            <input type="number" className="form-control" name="deposit" value={formData.deposit} onChange={handleChange} required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Size (sqft)</label>
            <input type="number" className="form-control" name="size" value={formData.size} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label className="form-label">Available From</label>
            <input type="date" className="form-control" name="availableFrom" value={formData.availableFrom?.slice(0, 10)} onChange={handleChange} required />
          </div>
          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="2"></textarea>
          </div>
          <div className="col-md-6">
            <label className="form-label">Property Image</label>
            <input type="file" className="form-control" name="image" accept="image/*" onChange={handleChange} />
          </div>
          <div className="col-md-12 d-flex justify-content-end">
            <button type="submit" className="btn btn-success me-2">{initialData ? "Update" : "Add"}</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
