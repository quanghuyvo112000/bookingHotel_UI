import React, { useState } from "react";
import axios from "axios";

import "./style/main.css";

const UpdateHotel = ({ onClose, hotelId, hotelDetail }) => {
  const [updatedHotelInfo, setUpdatedHotelInfo] = useState({
    name: hotelDetail.name,
    location: hotelDetail.location,
    address: hotelDetail.address,
    typeId: hotelDetail.typeId,
    payType: hotelDetail.payType,
    image: hotelDetail.image,
    service: hotelDetail.services, // Adding an empty field for service, modify as needed
  });

  const Token = sessionStorage.getItem("jwtToken");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedHotelInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdateHotel = () => {
    // Make API call to update hotel information
    axios
      .put(
        "https://localhost:7211/Hotel/update",
        { ...updatedHotelInfo, id: hotelId },
        {
          headers: {
            Authorization: `Bearer ${Token}`, // Replace with your actual access token
          },
        }
      )
      .then((response) => {
        console.log("Hotel information updated successfully:", response.data);
        onClose();
        alert("Thông tin đã được thay đổi!");
        window.location.reload(); // Close the popup after successful update
      })
      .catch((error) => {
        console.error("Error updating hotel information:", error.message);
      });
  };

  return (
    <div
      className="popup-updateHotel"
      style={{
        marginTop: 15,
        border: "1px solid #d2d2d2",
        borderRadius: "0.375rem",
        padding: 15,
      }}
    >
      <div className="popup-content popup-content-updateHotel">
        <h4 style={{ fontSize: 18 }}>Thông tin cập nhật</h4>
        {/* Form for updating hotel information */}
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Tên khách sạn
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={updatedHotelInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Khu vực
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={updatedHotelInfo.location}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={updatedHotelInfo.address}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="typeId" className="form-label">
              Loại khách sạn
            </label>
            <input
              type="text"
              className="form-control"
              id="typeId"
              name="typeId"
              value={updatedHotelInfo.typeId}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="payType" className="form-label">
              Phương thức thanh toán
            </label>
            <input
              type="text"
              className="form-control"
              id="payType"
              name="payType"
              value={updatedHotelInfo.payType}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              URL hình ảnh
            </label>
            <input
              type="text"
              className="form-control"
              id="image"
              name="image"
              value={updatedHotelInfo.image}
              onChange={handleInputChange}
            />
          </div>
          {/* Additional field for service, modify as needed */}
          <div className="mb-3">
            <label htmlFor="service" className="form-label">
              Dịch vụ
            </label>
            <input
              type="text"
              className="form-control"
              id="service"
              name="service"
              value={updatedHotelInfo.service}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateHotel}
            >
              Cập nhật
            </button>
            <button
              type="button"
              className="btn btn-secondary close-btn-updateHotel"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHotel;
