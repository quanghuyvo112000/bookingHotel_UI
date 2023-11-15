import React, { useState } from 'react';
 // Import custom CSS file if needed

const NewRoom = ({ hotelId }) => {
  const [roomInfo, setRoomInfo] = useState({
    idRom: '',
    nameRoom: '',
    bed: '',
    quantity: '',
    price: '',
    serviceRoom: '',
    acreage: '',
    utilities: '',
    reduced_price: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomInfo({ ...roomInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/hotels/${hotelId}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomInfo),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Room added successfully:', data.room);
        // Redirect or perform additional actions as needed
      } else {
        console.error('Error adding room:', data.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-5"> {/* Sử dụng container từ Bootstrap */}
      <form onSubmit={handleSubmit}>
        {/* Render input fields for each property in roomInfo */}
        {Object.keys(roomInfo).map((field) => (
          <div key={field} className="mb-3">
            <label htmlFor={field} className="form-label">{field}</label>
            <input
              type="text"
              id={field}
              name={field}
              value={roomInfo[field]}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Add Room</button> {/* Sử dụng btn và btn-primary từ Bootstrap */}
      </form>
    </div>
  );
};

export default NewRoom;
