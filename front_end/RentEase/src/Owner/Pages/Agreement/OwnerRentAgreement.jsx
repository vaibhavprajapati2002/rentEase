import React, { useEffect, useState } from "react";
import axios from "axios";
import AgreementEditor from "./AgreementEditor";

const OwnerRentAgreement = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/property/getProperty`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Error loading properties:", err));
  }, []);

  if (selectedProperty) {
    return (
      <AgreementEditor
        property={selectedProperty}
        onBack={() => setSelectedProperty(null)}
      />
    );
  }

  return (
    <div className="container mt-4">
      <h3>My Property Agreements</h3>
      <div className="row mt-3">
        {properties.map((prop) => (
          <div className="col-md-6 mb-3" key={prop._id}>
            <div className="card p-3">
              <h5>{prop.name}</h5>
              <p>{prop.address}</p>
              <button
                className="btn btn-outline-primary"
                onClick={() => setSelectedProperty(prop)}
              >
                View Agreement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerRentAgreement;
