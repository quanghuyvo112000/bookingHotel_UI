import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRoom = ({ onClose, hotelId }) => {
  const [roomInfo, setRoomInfo] = useState({
    id: "R",
    bed: "",
    typeRoomId: "TR01", // Thay đổi giá trị typeRoomId thành đối tượng chứa thông tin loại phòng
    price: 0,
    amount: 0,
    image: "",
    hotelId: hotelId,
    services: "",
    priceDiscount: 0,
  });

  const [roomTypes, setRoomTypes] = useState([]); // Danh sách loại phòng

  const Token = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    // Gọi API để lấy danh sách loại phòng
    axios
      .get("https://localhost:7211/Room/getAllType", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setRoomTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching room types:", error.message);
      });
  }, [Token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "amount" || name === "priceDiscount") {
      if (!isNaN(value) || value === "") {
        setRoomInfo((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
      }
    } else {
      setRoomInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleAddRoom = () => {
    try {
      // Kiểm tra điều kiện
      if (parseFloat(roomInfo.price) < parseFloat(roomInfo.priceDiscount)) {
        alert("Giảm giá không thể lớn hơn giá gốc.");
        return;
      }

      if (roomInfo.amount > 50) {
        alert("Số lượng phòng không thể lớn hơn 50.");
        return;
      }

      // Tiếp tục với quá trình thêm phòng nếu điều kiện là đúng
      axios
        .post("https://localhost:7211/Room/add", roomInfo, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        })
        .then((response) => {
          console.log("Room added successfully:", response.data);
          onClose();
          alert("Phòng đã được thêm!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error adding room:", error.message);
        });
    } catch (error) {
      console.error("Validation error:", error.message);
    }
  };

  return (
    <div
      style={{
        marginTop: 15,
        border: "1px solid #d2d2d2",
        borderRadius: "0.375rem",
        padding: 15,
      }}
      className="popups"
    >
      <div className="popup-content">
        <h4 style={{ fontSize: 18 }}>Thêm phòng mới</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="bed" className="form-label">
              Loại giường
            </label>
            <select
              className="form-control"
              id="bed"
              name="bed"
              value={roomInfo.bed}
              onChange={handleInputChange}
            >
              <option value="">Chọn loại giường</option>
              <option value="Giường đơn">Giường đơn</option>
              <option value="Giường đôi">Giường đôi</option>
              <option value="Giường Cỡ King">Giường Cỡ King</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="typeRoomId" className="form-label">
              Loại phòng
            </label>
            <select
              className="form-control"
              id="typeRoomId"
              name="typeRoomId"
              value={roomInfo.typeRoomId.id}
              onChange={handleInputChange}
            >
              <option value="">Chọn loại phòng</option>
              {roomTypes.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>
                  {roomType.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Số lượng phòng
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              value={roomInfo.amount}
              onChange={handleInputChange}
            />
            <div className="mb-3">
              <label htmlFor="services" className="form-label">
                Tiện ích trong phòng
              </label>
              <input
                type="text"
                className="form-control"
                id="services"
                name="services"
                value={roomInfo.services}
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
                value={roomInfo.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Giá phòng
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={roomInfo.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Giá phòng giảm
              </label>
              <input
                type="text"
                className="form-control"
                id="priceDiscount"
                name="priceDiscount"
                value={roomInfo.priceDiscount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddRoom}
        >
          Thêm phòng
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default AddRoom;
