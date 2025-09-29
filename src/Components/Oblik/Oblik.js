import React from 'react';
// import Oblik from './Oblik.css'
import './Oblik.css';
import axios from 'axios';

function Oblik() {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjYzZjI0YzE3Y2EyZWYxNWMxNjM4ZTJhMyIsInJvbGUiOiJVc2VyIiwianRpIjoiMTA3MWNmOGItMTAyMS00YmZiLTkwZTctYTU4YmJkYzJlYzU0IiwiaWQiOiI2M2YyNGMxN2NhMmVmMTVjMTYzOGUyYTMiLCJuYmYiOjE3NTkxNjM2NjUsImV4cCI6MTc1OTE2Mzk2NSwiaWF0IjoxNzU5MTYzNjY1fQ.S5JePvpav_qm9VrJUDq2FOlFmfAd0SZsD748T0MbXBE`;

  const getData = async () => {
    try {
      const res = await axios.post(
        'https://rhino-api-dyq7j.ondigitalocean.app/Reports/get-manager-by-month',
        { mounth: 8 }, // request body (empty here, add data if needed)
        {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 EXACT format
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return <button onClick={getData}>Oblik</button>;
}

export default Oblik;
