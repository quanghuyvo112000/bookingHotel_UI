import React, { useState } from "react";
import axios from "axios";

const UpdateRoom = ({ onClose, roomId, hotelId, rooms }) => {
  const roomToUpdate = rooms.find((room) => room.id === roomId);

  const [roomInfo, setRoomInfo] = useState({
    bed: roomToUpdate?.bed || "",
    typeRoomId: roomToUpdate?.typeRoomId || "",
    amount: roomToUpdate?.amount || 0,
    image: roomToUpdate?.image || "",
    services: roomToUpdate?.services || "",
    price: roomToUpdate?.price || 0,
    priceDiscount: roomToUpdate?.priceDiscount || 0,
  });

  const Token = sessionStorage.getItem("jwtToken");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdateRoom = async () => {
    try {
      if (roomInfo.priceDiscount > roomInfo.price) {
        alert("Giảm giá không thể lớn hơn giá gốc.");
        return;
      }

      if (roomInfo.amount > 50) {
        alert("Số lượng phòng không thể lớn hơn 50.");
        return;
      }
      const updatedRoomData = {
        id: roomId,
        bed: roomInfo.bed,
        typeRoomId: roomInfo.typeRoomId,
        price: roomInfo.price,
        amount: roomInfo.amount,
        image: roomInfo.image,
        hotelId: hotelId,
        services: roomInfo.services,
        priceDiscount: roomInfo.priceDiscount,
      };

      await axios.put("https://localhost:7211/Room/update", updatedRoomData, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      alert("Cập nhật phòng thành công!");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error updating room:", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="form-group">
          <label htmlFor="bed">Loại giường</label>
          <input
            type="text"
            id="bed"
            name="bed"
            value={roomInfo.bed}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="typeRoomId">Loại phòng</label>
          <input
            type="text"
            id="typeRoomId"
            name="typeRoomId"
            value={roomInfo.typeRoomId}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Số lượng phòng</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={roomInfo.amount}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="services">Tiện ích trong phòng</label>
          <input
            type="text"
            id="services"
            name="services"
            value={roomInfo.services}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={roomInfo.image}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá phòng</label>
          <input
            type="number"
            id="price"
            name="price"
            value={roomInfo.price}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priceDiscount">Giá phòng giảm</label>
          <input
            type="number"
            id="priceDiscount"
            name="priceDiscount"
            value={roomInfo.priceDiscount}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleUpdateRoom}
          >
            Cập nhật
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoom;
