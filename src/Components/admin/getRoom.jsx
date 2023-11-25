import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateRoom from "./UpdateRoom";
import DeleteRoom from "./DeleteRoom";

import "./style/main.css";

const GetRoom = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showUpdateRoom, setShowUpdateRoom] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const token = sessionStorage.getItem("jwtToken");

  const typeIdOptions = {
    TR01: "Standard",
    TR02: "Superior",
    TR03: "Deluxe",
    TR04: "Suite",
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7211/Room/getByHotelId?id=${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    };

    fetchRooms();
  }, [hotelId, token]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleUpdateClick = (room) => {
    setShowUpdateRoom(true);
    setSelectedRoom(room);
  };

  const handleCloseUpdateRoom = () => {
    setShowUpdateRoom(false);
  };

  const handleShowDeleteModal = (room) => {
    setShowDeleteModal(true);
    setShowUpdateRoom(false);
    setSelectedRoom(room);
  };

  return (
    <div>
      <div className="row">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.id}
              className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <div style={{ marginTop: 10 }} className="card">
                <div className="card-body">
                  <div className="row">
                    <div
                      style={{ padding: 10 }}
                      className="col-12 col-sm-12 col-md-12 col-lg-3"
                    >
                      <img
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 10,
                        }}
                        src={room.image}
                        className="card-img-top img-getRoom"
                        alt={room.name}
                      />
                    </div>
                    <div
                      style={{
                        border: "1px solid #d2d2d2",
                        borderRadius: "0.375rem",
                        padding: 15,
                      }}
                      className="col-12 col-sm-12 col-md-12 col-lg-9"
                    >
                      <h4 style={{ fontSize: 16 }}>
                        Kiểu phòng {typeIdOptions[room.typeRoomId]}
                      </h4>
                      <p className="card-text">
                        Phòng còn trống: {room.amount} phòng
                      </p>
                      <p className="card-text">Loại giường: {room.bed}</p>
                      <p className="card-text">
                        Tiện ích phòng: {room.services}
                      </p>
                      <p
                        style={{
                          color: room.priceDiscount !== 0 ? "" : "red",
                          fontWeight: room.priceDiscount !== 0 ? "" : "500",
                        }}
                        className="card-text"
                      >
                        Giá phòng: {formatCurrency(room.price)}
                      </p>
                      {room.priceDiscount !== 0 && (
                        <p
                          style={{ color: "red", fontWeight: 500 }}
                          className="card-text"
                        >
                          Giá phòng được giảm:{" "}
                          {formatCurrency(room.priceDiscount)}
                        </p>
                      )}

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleUpdateClick(room)}
                      >
                        Cập nhật phòng
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleShowDeleteModal(room)}
                      >
                        Xóa thông tin
                      </button>

                      {showUpdateRoom && (
                        <UpdateRoom
                          onClose={handleCloseUpdateRoom}
                          roomId={selectedRoom.id}
                          hotelId={hotelId}
                          rooms={rooms}
                        />
                      )}

                      {showDeleteModal && (
                        <DeleteRoom
                          onClose={() => setShowDeleteModal(false)}
                          roomId={selectedRoom.id}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No rooms available for this hotel.</p>
        )}
      </div>
    </div>
  );
};

export default GetRoom;
