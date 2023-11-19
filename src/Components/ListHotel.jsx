import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {faPiggyBank} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../css/listHotel.css';

const ListHotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem('jwtToken') !== null;
  const { hotels } = location.state || {};
  const [filterTypes, setFilterTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  // Hàm kiểm tra nếu không có khách sạn hoặc danh sách trống, hiển thị thông báo
  if (!hotels || hotels.length === 0) {
    return <div>Không có khách sạn để hiển thị.</div>;
  }

  // Hàm hiển thị dịch vụ
  const renderServices = (service) => {
    if (!service) {
      return null;
    }

    const servicesArray = service.split(',').map((item, index) => (
      <span
        style={{ fontSize: 12, display: 'inline-block', marginRight: '5px', backgroundColor: '#f2f3f3', padding: '5px', borderRadius: '100px' }}
        key={index}
        className="card-text"
      >
        {item.trim()}
      </span>
    ));

    return <div>{servicesArray}</div>;
  };

  // Hàm lọc khách sạn theo loại
  const filterHotelsByType = (hotel) => {
    if (filterTypes.length === 0) {
      return true;
    }
    return filterTypes.includes(hotel.type);
  };

  // Hàm lọc khách sạn theo giá tiền
  const filterHotelsByPrice = (hotel) => {
    const price = parseInt(hotel.rooms[0].price.replace(/\D/g, ''), 10);
    const reducedPrice = hotel.rooms[0].reduced_price ? parseInt(hotel.rooms[0].reduced_price.replace(/\D/g, ''), 10) : null;
  
    if (reducedPrice) {
      return reducedPrice >= priceRange[0] && reducedPrice <= priceRange[1];
    }
  
    return price >= priceRange[0] && price <= priceRange[1];
  };

  // Hàm hiển thị giá và phần trăm giảm giá
  const renderPrice = (hotel) => {
    const price = parseInt(hotel.rooms[0].price.replace(/\D/g, ''), 10);
    const reducedPrice = hotel.rooms[0].reduced_price ? parseInt(hotel.rooms[0].reduced_price.replace(/\D/g, ''), 10) : null;

    if (reducedPrice) {
      const savingsPercentage = ((price - reducedPrice) / price) * 100;

      return (
        <div className='list_booking'>
          <p className="card-text" style={{ textDecoration: 'line-through', color: 'gray', fontSize: 14 }}>
            {hotel.rooms[0].price} phòng/đêm
          </p>
          <p className="card-text" style={{ color: 'green', fontSize: 14 }}>
            <FontAwesomeIcon icon={faPiggyBank}/> Tiết kiệm {savingsPercentage.toFixed(0)}%
          </p>
          <p className="card-text" style={{ color: 'red' }}>
            {hotel.rooms[0].reduced_price} <span style={{ color: '#687176', fontSize: 14 }}>phòng/đêm</span>
          </p>
        </div>
      );
    }

    return (
      <p className="card-text list_booking" style={{ color: 'red' }}>
        {hotel.rooms[0].price} <span style={{ color: '#687176', fontSize: 14 }}>phòng/đêm</span>
      </p>
    );
  };

  // Hàm xử lý khi checkbox thay đổi
  const handleCheckboxChange = (type) => {
    if (filterTypes.includes(type)) {
      setFilterTypes(filterTypes.filter((t) => t !== type));
    } else {
      setFilterTypes([...filterTypes, type]);
    }
  };

  // Hàm xử lý khi giá tiền thay đổi
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Hàm xử lý khi người dùng muốn đặt phòng
  const handleBookRoom = (hotelId) => {
    if (isLoggedIn) {
      navigate(`/chi-tiet-khach-san/${hotelId}`);
    } else {
      navigate('/dang-nhap');
    }
  };

  // Hiển thị danh sách khách sạn
  return (
    <div style={{marginBottom: 50}}>
      <h4>Danh sách các chỗ ở</h4>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3 col-lg-3 filter-hotel">
            <label>Loại hình cư trú:</label>
            {['Hotel', 'Resort', 'Homestay'].map((type) => (
              <div key={type} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={type}
                  checked={filterTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                />
                <label className="form-check-label" htmlFor={type}>
                  {type}
                </label>
              </div>
            ))}
            <label>Giá tiền:</label>
            <input
              type="range"
              min={0}
              max={1000000}
              step={100000}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, [priceRange[0], parseInt(e.target.value, 10)])}
            />
            <div>
              {priceRange[0].toLocaleString()} đến {priceRange[1].toLocaleString()} đ
            </div>
          </div>
          <div className=" list-hotel col-12 col-sm-6 col-md-9 col-lg-9">
            <div className="row">
              {hotels
                .filter(filterHotelsByType)
                .filter(filterHotelsByPrice)
                .map((hotel) => (
                  <div key={hotel.id}>
                    <div className="card card-hotel">
                      <div className="row">
                        <div className=" col-12 col-md-3">
                          <img
                            style={{ width: '100%', height: '100%', borderRadius: ' 0.375rem 0 0  0.375rem' }}
                            src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040646-c96751ff1e72044131a05d93dd937839.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640"
                            alt=""
                          />
                        </div>
                        <div style={{ paddingLeft: '60px' }} className="card-body card-body-hotel col-12 col-md-7 ">
                          <h4 style={{fontSize: 16}} className="card-title">{hotel.nameHotel}</h4>
                          <p style={{fontSize: 12}} className="card-text"> Loại hình: {hotel.type}.</p>
                          <p style={{fontSize: 12}} className="card-text">Khu vực {hotel.location}.</p>
                          <p style={{fontSize: 12}} className="card-text">Địa chỉ {hotel.address}.</p>
                          {renderServices(hotel.service)}
                          <p
                            style={{
                              fontSize: 12,
                              display: 'inline-block',
                              marginTop: '5px',
                              marginRight: '5px',
                              backgroundColor: '#f2f3f3',
                              padding: '5px',
                              borderRadius: '100px',
                            }}
                            className="card-text"
                          >
                            {hotel.pay}
                          </p>
                        </div>
                        <div style={{ borderLeft: '1px solid #d2d2d2', borderRadius: '0.375rem', padding: 15 }} className="col-md-2 list-hotel-booking">
                          {renderPrice(hotel)}
                          <br />
                          <button className="btn btn-primary btn-booking" onClick={() => handleBookRoom(hotel.id)}>
                            Chọn phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ListHotel;
