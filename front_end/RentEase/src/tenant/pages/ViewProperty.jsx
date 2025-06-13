import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AssignProperty = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;;
    const navigate = useNavigate();
    useEffect(() => {
        // console.log("Fetching properties from API:", `${API_URL}/property/allProperty`);
        
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${API_URL}/property/allProperty`);
                setProperties(response.data);
            } catch (err) {
                console.error("Failed to fetch properties", err);
            }
        };

        fetchProperties();
    }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first.");
      return navigate("/login");
    }

    // Check if tenant already has a property
    const res = await axios.get("http://localhost:5000/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const propertyId = res.data.property;

    if (propertyId) {
      alert("You already have a property assigned.");
      return navigate("/tenant/dashboard");
    }

    // Assign property if not already assigned
    if (!selectedProperty) {
      alert("Please select a property before submitting.");
      return;
    }

    await axios.post(
      `${API_URL}/tenant/assign-property`,
      { propertyId: selectedProperty },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Property assigned successfully!");
    navigate("/tenant/dashboard");
  } catch (err) {
    console.error("Error during property assignment:", err);
    alert("Something went wrong. Please try again.");
    navigate("/login");
  }
};


    return (
        <div className="container mt-4">
            <h4>Select a Property</h4>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {properties.map((property) => (
                        <div className="col-md-4 mb-4" key={property._id}>
                            <div
                                className={`card h-100 ${selectedProperty === property._id ? "border-primary" : ""
                                    }`}
                                onClick={() => setSelectedProperty(property._id)}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={`http://localhost:5000/uploads/${property.image}`}
                                    className="card-img-top"
                                    alt={property.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{property.name}</h5>
                                    <p className="card-text">
                                        {property.city}, {property.state}
                                    </p>
                                    <p className="card-text">
                                        ₹{property.rent} / month
                                        • {property.bhk} BHK
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedProperty && (
                    <div className="text-end">
                        <button className="btn btn-primary mt-3" type="submit">
                            Assign Property
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default AssignProperty;
