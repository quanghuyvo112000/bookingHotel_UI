import React, { useState } from "react";
import axios from "axios";

import "./style/main.css";
const DeleteRoom = ({ onClose, roomId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const Token = sessionStorage.getItem("jwtToken");

  const handleDeleteRoom = () => {
    // Make API call to delete hotel information
    setIsDeleting(true);
    axios
      .delete("https://localhost:7211/Room/delete", {
        headers: {
          Authorization: `Bearer ${Token}`, // Replace with your actual access token
        },
        data: { id: roomId }, // Pass the hotel ID in the request body
      })
      .then((response) => {
        console.log("Hotel information deleted successfully:", response.data);
        setIsDeleting(false);
        onClose();
        window.location.reload();
        // Close the modal after successful delete
      })
      .catch((error) => {
        console.error("Error deleting hotel information:", error.message);
        setIsDeleting(false);
      });
  };

  return (
    <div className="deleteHotel-popup">
      <div className="popup-content  popup-content-deleteHotel">
        <h4 style={{ fontSize: 18 }}>Xác nhận xóa thông tin phòng</h4>
        <p>Bạn có chắc chắn muốn xóa thông tin của phòng?</p>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteRoom}
            disabled={isDeleting}
          >
            {isDeleting ? "Đang xóa..." : "Xóa thông tin"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRoom;
