import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyForm from "./PropertyForm";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/property/getProperty", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProperties(res.data);
    } catch (err) {
      console.error("Failed to load properties", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/property/deleteProperty${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchProperties();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (property) => {
    setEditData(property);
    setShowForm(true);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Properties</h3>
      <button className="btn btn-primary mb-3" onClick={() => {
        setEditData(null);
        setShowForm(true);
      }}  style={{ marginTop: "10px" }}>
        + Add Property
      </button>

      {showForm && (
        <PropertyForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchProperties();
          }}
          initialData={editData}
        />
      )}

      <div className="row" style={{marginTop: "80px" }} >
        {properties.map((property) => (
          <div className="col-md-4 mb-3" key={property._id}>
            <div className="card">
              <img src={`http://localhost:5000/uploads/${property.image}`} alt="..." className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{property.name}</h5>
                <p>{property.city}, {property.state}</p>
                <p><strong>Rent:</strong> ₹{property.rent}</p>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(property)} >Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(property._id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
