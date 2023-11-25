import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const Token = sessionStorage.getItem("jwtToken");

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

  useEffect(() => {
    // Fetch danh sách khách sạn từ API
    axios
      .get("https://localhost:7211/Hotel", {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((response) => {
        setHotels(response.data); // Giả sử phản hồi là một mảng các khách sạn
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách khách sạn:", error.message);
      });
  }, [Token]);

  const handleAddRoomClick = (hotelId) => {
    navigate(`/dashboard/detail-hotel/${hotelId}`);
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setPageNumber(0); // Reset page number when the search query changes
  };

  // Filter hotels based on the search query
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tính toán số trang dựa trên tổng số khách sạn và số khách sạn trên mỗi trang
  const pageCount = Math.ceil(filteredHotels.length / itemsPerPage);

  // Tính toán khách sạn cần hiển thị trên trang hiện tại
  const displayHotels = filteredHotels.slice(
    pageNumber * itemsPerPage,
    (pageNumber + 1) * itemsPerPage
  );

  // Xử lý khi chuyển trang
  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <h4 style={{ fontSize: 18, marginTop: 15 }}>Danh sách khách sạn:</h4>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Tìm kiếm theo tên khách sạn"
        className="form-control"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />

      <div style={{ marginTop: 15 }} className="card-columns">
        <div className="row">
          {displayHotels.map((hotel) => (
            <div key={hotel.id} className="card col-12 col-xl-6">
              <img
                style={{ width: "100%", marginTop: 5 }}
                src={hotel.image}
                className="card-img-top"
                alt={hotel.name}
              />
              <div className="card-body">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text">
                  Khu vực: {cityOptions[hotel.location]}
                </p>
                <p className="card-text">{hotel.address}</p>
                <p className="card-text">
                  {" "}
                  Mô hình: {typeIdOptions[hotel.typeId]}
                </p>
                <p className="card-text">{hotel.payType}</p>
                <p className="card-text">Tiện ích: {hotel.services}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAddRoomClick(hotel.id)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default NewRoom;
