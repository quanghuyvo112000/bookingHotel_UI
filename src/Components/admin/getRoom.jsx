import React, { useState, useEffect } from "react";
import axios from "axios";

const GetRoom = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const token = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchRooms = async () => {
      debugger;
      try {
        const response = await axios.get(`https://localhost:7211/Room/getALL`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    fetchRooms();
  }, [hotelId, token]);

  return (
    <div>
      <h2>Rooms for Hotel ID {hotelId}</h2>
      <div className="row">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{room.bed}</h5>
                <p className="card-text">
                  {room.typeRoomId.name} - {room.price}$
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetRoom;
