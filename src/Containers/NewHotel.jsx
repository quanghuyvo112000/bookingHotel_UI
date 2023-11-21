import React, { useState, useEffect } from "react";
import axios from "axios";

const NewHotel = () => {
  const [hotelInfo, setHotelInfo] = useState({
    id: "",
    name: "",
    location: "HoChiMinh",
    typeId: "",
    payType: "Thanh toán khi nhận phòng",
    image: "",
    service: "",
  });

  const [types, setTypes] = useState([]);
  const Token = sessionStorage.getItem("jwtToken");
  const labels = {
    id: "ID khách sạn",
    name: "Tên khách sạn",
    location: "Địa điểm",
    typeId: "Loại khách sạn",
    payType: "Hình thức thanh toán",
    image: "Hình ảnh",
    service: "Dịch vụ",
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7211/Hotel/getType",
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error.message);
      }
    };

    fetchTypes();
  }, [Token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7211/Hotel/add",
        hotelInfo,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      if (response.data.state) {
        console.log("Hotel added successfully:", response.data.hotel);
        alert("Thêm khách sạn thành công!");
        setHotelInfo({
          id: "",
          name: "",
          location: "HoChiMinh",
          typeId: "",
          payType: "Thanh toán khi nhận phòng",
          image: "",
          service: "",
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        {Object.keys(hotelInfo).map((field) => (
          <div key={field} className="mb-3">
            <label htmlFor={field} className="form-label">
              {field === "typeId" ? "Loại ID" : labels[field]}
            </label>
            {field === "typeId" ? (
              <select
                id={field}
                name={field}
                value={hotelInfo[field]}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Chọn loại</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            ) : field === "location" ? (
              <select
                className="form-control"
                value={hotelInfo.location}
                onChange={(e) =>
                  handleInputChange({
                    target: { name: "location", value: e.target.value },
                  })
                }
              >
                <option value="HoChiMinh">Hồ Chí Minh</option>
                {/* ... (other options) */}
              </select>
            ) : (
              <input
                type="text"
                id={field}
                name={field}
                value={hotelInfo[field]}
                onChange={handleInputChange}
                className="form-control"
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Thêm khách sạn
        </button>
      </form>
    </div>
  );
};

export default NewHotel;
