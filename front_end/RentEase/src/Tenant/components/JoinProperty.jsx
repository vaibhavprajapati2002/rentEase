import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinPropertyComponent = ({ user, setUser }) => {
  const [propertyCode, setPropertyCode] = useState("");

  const handleJoin = async () => {
    if (!propertyCode) {
      toast.error("Please enter a code");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tenant/join-property",
        {
          propertyCode,
          tenantId: user._id,
        }
      );

      toast.success(res.data.message || "Joined successfully");
      setUser((prev) => ({
        ...prev,
        linkedProperty: res.data.propertyId,
      }));
      setPropertyCode("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error joining property");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={propertyCode}
        placeholder="Enter Property Code"
        onChange={(e) => setPropertyCode(e.target.value)}
        style={{ padding: "8px", borderRadius: "5px", marginRight: "10px" }}
      />
      <button onClick={handleJoin}>Join Property</button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default JoinPropertyComponent;
