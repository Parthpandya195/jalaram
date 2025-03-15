import React, { useState } from 'react';
import axios from 'axios';

const AdminUTR = () => {
  const [utr, setUtr] = useState('');

  const addUTR = async () => {
    if (!utr) {
      alert("Enter a valid UTR number.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/add-utr', { utr });
      alert(res.data.message);
      setUtr('');
    } catch (error) {
      console.error("Error adding UTR:", error);
      alert("Error adding UTR.");
    }
  };

  return (
    <div>
      <h2>Add UTR for Payment</h2>
      <input
        type="text"
        placeholder="Enter UTR Number"
        value={utr}
        onChange={(e) => setUtr(e.target.value)}
      />
      <button onClick={addUTR}>Add UTR</button>
    </div>
  );
};

export default AdminUTR;
