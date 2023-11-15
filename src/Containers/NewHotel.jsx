import React, { useState } from 'react';
import axios from 'axios';

const NewHotel = () => {
  const [hotelInfo, setHotelInfo] = useState({
    nameHotel: '',
    location: '',
    area: '',
    value: '',
    type: '',
    pay: '',
    main_utility: '',
    service: '',
    available: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
  };
  debugger
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/hotels', hotelInfo);

      if (response.data.success) {
        console.log('Hotel added successfully:', response.data.hotel);
        // Redirect or perform additional actions as needed
      } else {
        console.error('Error adding hotel:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-5"> {/* Sử dụng container từ Bootstrap */}
      <form onSubmit={handleSubmit}>
        {/* Render input fields for each property in hotelInfo */}
        {Object.keys(hotelInfo).map((field) => (
          <div key={field} className="mb-3">
            <label htmlFor={field} className="form-label">{field}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={hotelInfo[field]}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Add Hotel</button> {/* Sử dụng btn và btn-primary từ Bootstrap */}
      </form>
    </div>
  );
};

export default NewHotel;
