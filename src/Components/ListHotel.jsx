import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { faLocationDot, faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/listHotel.css";

const ListHotel = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const token = sessionStorage.getItem("jwtToken");
  const { location: locationHotel, numRooms: numRoomsHotel } =
    location.state || {};

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [typeFilters, setTypeFilters] = useState({});
  const [priceFilter, setPriceFilter] = useState(10000000);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = useCallback(async () => {
    try {
      if (!token) {
        console.error("Token không có sẵn.");
        return;
      }

      const response = await axios.get(`https://localhost:7211/Room/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          location: locationHotel,
          amountRoom: numRoomsHotel,
        },
      });

      const data = response.data.data || [];
      setHotels(data);
      setFilteredHotels(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  }, [token, locationHotel, numRoomsHotel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cityOptions = {
    HoChiMinh: "Hồ Chí Minh",
    HaNoi: "Hà Nội",
    BinhThuan: "Bình Thuận",
    CaoBang: "Cao Bằng",
    QuocPhuc: "Quốc Phúc",
    HaLong: "Hạ Long",
    HaiPhong: "Hải Phòng",
    Hue: "Huế",
    DaNang: "Đà Nẵng",
    NhaTrang: "Nha Trang",
    HoiAn: "Hội An",
  };

  const typeIdOptions = {
    TH01: "Hotel",
    TH02: "Homestay",
    TH03: "Villa",
    TH04: "Resort",
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleSelectRoom = (hotelId) => {
    navigate(`/chi-tiet-khach-san/${hotelId}`);
  };

  const handleTypeFilterChange = (typeId) => {
    setTypeFilters((prevFilters) => ({
      ...prevFilters,
      [typeId]: !prevFilters[typeId],
    }));
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  useEffect(() => {
    // Lọc theo typeId
    const filteredByType = hotels.filter(
      (hotel) =>
        !Object.values(typeFilters).some((value) => value) ||
        typeFilters[hotel.typeId]
    );

    // Lọc theo giá
    const filteredByPrice = filteredByType.filter(
      (hotel) =>
        !priceFilter ||
        (hotel.rooms.length > 0 &&
          hotel.rooms[0].price &&
          hotel.rooms[0].price <= priceFilter &&
          (!hotel.rooms[0].priceDiscount ||
            hotel.rooms[0].priceDiscount <= priceFilter))
    );

    setFilteredHotels(filteredByPrice);
  }, [hotels, typeFilters, priceFilter]);

  // Kiểm tra nếu không có loại nào được chọn, hiển thị tất cả khách sạn
  useEffect(() => {
    if (
      !Object.values(typeFilters).some((value) => value) &&
      priceFilter === 0
    ) {
      setFilteredHotels(hotels);
    }
  }, [typeFilters, priceFilter, hotels]);

  // search hotel

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Lọc theo giá trị tìm kiếm
    const filteredByName = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        hotel.rooms &&
        hotel.rooms.length > 0
    );

    setFilteredHotels(filteredByName);
  }, [hotels, searchTerm]);

  // % được giảm
  const calculateDiscountPercentage = (originalPrice, discountedPrice) => {
    if (originalPrice <= 0) {
      return 0;
    }

    const percentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    return percentage.toFixed(2);
  };

  return (
    <div style={{ marginBottom: 100 }} className="container">
      <div className="row">
        <div
          className="col-xl-2 filter-list_hotel"
          style={{
            border: "1px solid #d2d2d2",
            borderRadius: "0.375rem",
            padding: 15,
            height: "auto",
            marginRight: 15,
            marginBottom: 15,
          }}
        >
          {/* Filter theo typeId */}
          <div className="filter">
            <h4 style={{ fontSize: 14 }}>Loại</h4>
            {Object.keys(typeIdOptions).map((typeId) => (
              <div key={typeId}>
                <input
                  type="checkbox"
                  id={typeId}
                  checked={typeFilters[typeId] || false}
                  onChange={() => handleTypeFilterChange(typeId)}
                />
                <label htmlFor={typeId}>{typeIdOptions[typeId]}</label>
              </div>
            ))}
          </div>
          <div className="filter">
            <h4 style={{ fontSize: 14 }}>Giá</h4>
            <input
              type="range"
              min={0}
              max={10000000} // Giả sử giá tối đa là 10,000,000 VND
              value={priceFilter}
              onChange={handlePriceFilterChange}
            />
            <span>{formatCurrency(priceFilter)}</span>
          </div>
        </div>
        <div className="col-xl-8">
          <div className="filter" style={{ marginBottom: 15 }}>
            <h4 style={{ fontSize: 16 }}>Tìm kiếm theo tên khách sạn</h4>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Nhập tên khách sạn"
            />
          </div>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div key={hotel.id} className="row row-list_hotel mb-4">
                <div className="col-xl-3" style={{ marginBottom: 10 }}>
                  <img
                    style={{
                      borderRadius: "0.375rem",
                      height: "100%",
                      width: "100%",
                    }}
                    src={hotel.image}
                    alt={hotel.name}
                    className="img-fluid img-list_hotel"
                  />
                </div>
                <div
                  className="col-xl-6"
                  style={{
                    border: "1px solid #d2d2d2",
                    borderRadius: "0.375rem",
                    padding: 15,
                  }}
                >
                  <h4 style={{ fontSize: 16 }}>{hotel.name}</h4>
                  <span
                    style={{
                      color: "#0264c8",
                      backgroundColor: "#ecf8ff",
                      padding: "5px 15px",
                      borderRadius: "9999px",
                      marginBottom: 15,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {typeIdOptions[hotel.typeId]}
                  </span>
                  <p
                    style={{ marginTop: 15, fontWeight: 500 }}
                    className="text-list_hotel"
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "#0264c8" }}
                    />{" "}
                    {hotel.address}, {cityOptions[hotel.location]}
                  </p>
                  {hotel.services && (
                    <div>
                      <span>
                        {hotel.services.split(",").map((service, index) => (
                          <span
                            className="text-list_hotel__service"
                            key={index}
                          >
                            {service.trim()}
                            {index < hotel.services.split(",").length - 1}
                          </span>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="col-xl-3"
                  style={{
                    textAlign: "-webkit-center",
                    bottom: 0,
                    border: "1px solid #d2d2d2",
                    borderRadius: "0.375rem",
                    padding: 15,
                  }}
                >
                  {hotel.rooms.length > 0 && (
                    <div className="col-md-4">
                      <p
                        style={{
                          fontSize: 14,
                          textDecoration:
                            hotel.rooms[0].priceDiscount > 0
                              ? "line-through"
                              : "none",
                          color:
                            hotel.rooms[0].priceDiscount > 0
                              ? "#687176"
                              : "red",
                          fontWeight:
                            hotel.rooms[0].priceDiscount > 0 ? "" : "500",
                        }}
                      >
                        {formatCurrency(hotel.rooms[0].price)} phòng/đêm
                      </p>
                      {hotel.rooms[0].priceDiscount > 0 && (
                        <div>
                          <p style={{ color: "green", fontSize: 12 }}>
                            <FontAwesomeIcon icon={faPiggyBank} />{" "}
                            {calculateDiscountPercentage(
                              hotel.rooms[0].price,
                              hotel.rooms[0].priceDiscount
                            )}{" "}
                            %
                          </p>
                          <p
                            style={{
                              color: "red",
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          >
                            {formatCurrency(hotel.rooms[0].priceDiscount)}{" "}
                            phòng/đêm
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary mt-3"
                      onClick={() => handleSelectRoom(hotel.id)}
                    >
                      Chọn phòng
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có khách sạn nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListHotel;
