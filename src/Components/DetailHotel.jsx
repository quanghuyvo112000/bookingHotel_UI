import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {faPiggyBank, faLocationDot, faJoint, faWaterLadder, faElevator, faSquareParking, faUtensils, faCalendar, faMugSaucer, faPerson, faFan, faRuler, faBed, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import ImageCarousel from '../Containers/ImageCarousel';

import '../css/DetailHotel.css';


const DetailHotel = () => {
  const navigate = useNavigate();
  // Lấy thông tin từ URL
  const { hotelId } = useParams();

  // State để lưu thông tin chi tiết của khách sạn
  const [hotelDetail, setHotelDetail] = useState(null);

  useEffect(() => {
    // Hàm để lấy thông tin chi tiết khách sạn từ API
    const fetchHotelDetail = async () => {
      try {
        // Gửi yêu cầu đến API để lấy thông tin chi tiết của khách sạn với hotelId
        const response = await axios.get(`http://localhost:4000/hotels/${hotelId}`);
        
        // Lưu thông tin chi tiết vào state
        setHotelDetail(response.data);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching hotel detail:', error);
      }
    };

    // Gọi hàm để lấy thông tin chi tiết khi component mount
    fetchHotelDetail();
  }, [hotelId]); // Chạy lại khi hotelId thay đổi

  // Kiểm tra nếu đang lấy dữ liệu
  if (!hotelDetail) {
    return <div>Loading...</div>;
  }

    // Hàm hiển thị tiện ích chính
    const renderMainNtilitys = (main_utility) => {
        if (!main_utility) {
          return null;
        }
      
        const icons = [faFan, faUtensils, faWaterLadder, faSquareParking, faElevator, faWifi]; // Thêm icon tương ứng với mỗi loại main utility
        const mainNtilitysArray = main_utility.split(',').map((item, index) => (
          <div key={index} className="col-md-6">
            <span
              style={{ margin: '5px 0', fontSize: '14px', padding: '0 45px', borderRadius: '100px' }}
              className="card-text"
            >
              <FontAwesomeIcon icon={icons[index]} style={{ marginRight: '5px', color: "#2f6eda" }} />
              {item.trim()}
            </span>
          </div>
        ));
      
        return <div className="row">{mainNtilitysArray}</div>;
      };

        // Hàm hiển thị tiện ích phòng
        const renderUtilitys = (main_utility) => {
            if (!main_utility) {
              return null;
            }
        
            const UtilitysArray = main_utility.split(',').map((item, index) => (
                <div key={index} className="col-md-4">
                <p
                  style={{ margin: '5px 0', fontWeight: 500, fontSize: "12px", color: 'rgb(0, 135, 90)', width:"100%", textAlign: "center", backgroundColor: "rgb(232, 254, 245)", borderRadius: '14px', padding: "5px" }}
                  className="card-text"
                >
                  {item.trim()}
                </p>
              </div>
            ));
        
            return <div className="row">{UtilitysArray}</div>;
        };

    // Hàm hiển thị trong khu vực
    const renderArea = (area) => {
        if (!area) {
          return null;
        }
      
        const areaArray = area.split(',').map((item, index) => (
          <div key={index} className="col-md-6">
            <span
              style={{margin: '5px 0', fontSize: "14px", padding: '0 50px', borderRadius: '100px' }}
              className="card-text"
            >
              <FontAwesomeIcon icon={faLocationDot} style={{color: "#1f59bd",}} /> {item.trim()}
            </span>
          </div>
        ));
      
        return <div className="row">{areaArray}</div>;
      };
      
    // Hàm hiển thị trong service
    const renderServices = (service) => {
        if (!service) {
          return null;
        }
      
        const icons = [faMugSaucer, faWifi, faJoint, faCalendar]; // Thêm icon tương ứng với mỗi loại service
        const serviceArray = service.split(',').map((item, index) => (
          <div key={index} className="col-md-6">
            <p
              style={{ margin: '5px 0', color: 'rgb(0, 135, 90)', fontSize: '14px', padding: '15px 5px' }}
              className="card-text"
            >
              <FontAwesomeIcon icon={icons[index]} style={{ marginRight: '5px' }} />
              {item.trim()}
            </p>
          </div>
        ));
      
        return <div className="row">{serviceArray}</div>;
      };
    const renderPrice = (room) => {
        const price = parseInt(room.price.replace(/\D/g, ''), 10);
        const reducedPrice = room.reduced_price ? parseInt(room.reduced_price.replace(/\D/g, ''), 10) : null;
      
        if (reducedPrice) {
          const savingsPercentage = price !== 0 ? ((price - reducedPrice) / price) * 100 : 0;
      
          return (
            <div>
              <p className="card-text" style={{ textDecoration: 'line-through', color: 'gray', fontSize: 14 }}>
                {room.price} phòng/đêm
              </p>
              <p className="card-text" style={{ color: 'green', fontSize: 14 }}>
                <FontAwesomeIcon icon={faPiggyBank}/> Tiết kiệm {savingsPercentage.toFixed(0)}%
              </p>
              <p className="card-text" style={{ color: 'red' }}>
                {room.reduced_price} <span style={{ color: '#687176', fontSize: 14 }}>phòng/đêm</span>
              </p>
            </div>
          );
        }
        return (
            <p className="card-text" style={{ color: 'red' }}>
              {room.price} <span style={{ color: '#687176', fontSize: 14 }}>phòng/đêm</span>
            </p>
          );
        };

        const handleBooking = (roomId) => {
          // Lưu thông tin vào session
          sessionStorage.setItem('hotelId', hotelDetail.id);
          sessionStorage.setItem('hotelName', hotelDetail.nameHotel);
          sessionStorage.setItem('roomId', roomId);
        
          // Chuyển trang đến trang BookingConfirmation (hoặc nơi bạn muốn điều hướng)
          navigate('/xac-nhan-dat-phong');
        };

  // Hiển thị thông tin chi tiết của khách sạn
  return (
    <div style={{marginBottom: 100}}>
        <div className="container">
            <div className='col-sm-12 col-md-12 col-lg-12'>
                <h2 style={{fontSize: "32px"}}>{hotelDetail.nameHotel}</h2>
                <span style={{fontSize: "12px", marginBottom: 5, padding:"5px", backgroundColor: 'rgba(236,248,255,1.00)', borderRadius: 14, color: 'rgba(2,100,200,1.00)'}}>Mô hình {hotelDetail.type}</span>
                <p style={{marginTop: '15px'}}><FontAwesomeIcon icon={faLocationDot} style={{color: "#1f59bd",}} /> {hotelDetail.address} -
                    <a  href="https://maps.app.goo.gl/iusd2RHpGBBa5kV29" target="_blank" rel="noreferrer"> Xem bản đồ</a>
                </p>
            </div>
            <div className='col-sm-12 col-md-12 col-lg-12'>
                <ImageCarousel />
            </div>
            <div className="row hotel-area" style={{margin: "15px 0"}}>
                <div className="col-sm-12 col-md-4 utilities-hotel" style={{marginBottom: "15px", marginRight: "15px", border: "1px solid #dee2e6", borderRadius: "0.375rem", padding: "15px"}}>
                    <h4 style={{padding: '0 50px', fontSize: 16, fontWeight: 700}}>Tiện ích chính</h4>
                    {renderMainNtilitys(hotelDetail.main_utility)}
                </div>
                <div className="col-sm-12 col-md-7 area-hotel" style={{ marginBottom: "15px", border: "1px solid #dee2e6", borderRadius: "0.375rem", padding: "15px"}}>
                    <h4 style={{padding: '0 50px', fontSize: 16, fontWeight: 700}}>Trong khu vực</h4>
                    {renderArea(hotelDetail.area)}
                </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
                <div className='col-sm-12 col-md-12' style={{border: "1px solid #dee2e6", borderRadius: "0.375rem", padding: "15px"}}>
                    <div>
                        {hotelDetail.rooms && hotelDetail.rooms.length > 0 && (
                            <div>
                            <h4>Thông tin về giường trong từng phòng:</h4>
                            {hotelDetail.rooms.map((room, index) => (
                                <div key={index} style={{border: "1px solid #dee2e6", borderRadius: "0.375rem", padding: "15px", margin: "0 5px 15px 5px "}}>
                                    <div className="row">

                                        <div className="col-12 col-sm-12 col-md-5 col-lg-5 hotel-room" style={{height: 300, marginLeft: 45, marginRight: 5, borderRadius: "0.375rem", border: "1px solid #dee2e6", boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
                                            <h4 style={{marginTop: 10, fontSize: 16,}}>{room.nameRoom}</h4>
                                            <img style={{width: "100%", paddingTop: 10, height: "50%", borderRadius: "0.375rem"}} src="https://ik.imagekit.io/tvlk/generic-asset/Ixf4aptF5N2Qdfmh4fGGYhTN274kJXuNMkUAzpL5HuD9jzSxIGG5kZNhhHY-p7nw/hotel/asset/67782898-e13ce86c4806d306fe1633a78e9803cf.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-550" alt="" />
                                            <div style={{marginTop: 5}}>
                                                <span><FontAwesomeIcon icon={faRuler} style={{color: "#225fc9",}} /> {room.acreage}</span>
                                                {renderUtilitys(room.utilities)}
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-12 col-md-5 col-lg-4 hotel-room" id="infor-hotel-room" style={{height: 300, marginRight: 5, padding: "20px 40px", borderRadius: "0.375rem", border: "1px solid #dee2e6", boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
                                            <p style={{fontSize: 16, fontWeight: 700}}>{room.nameRoom}</p>
                                            <p style={{fontSize: 14, fontWeight: 500}}><span style={{marginRight: "20px"}}><FontAwesomeIcon icon={faBed} style={{color: "#225fc9",}} /> {room.bed}</span> <span><FontAwesomeIcon icon={faPerson} style={{color: "#225fc9",}} /> {room.quantity}</span></p>
                                            <hr />
                                            <p style={{fontSize: 14, fontWeight: 500}}>{renderServices(room.serviceRoom)}</p>
                                        </div>
                                        <div className=" col-12 col-sm-12 col-md-12 col-lg-2 hotel-room" id="price-hotel-room"  style={{height: 300, padding: "20px 40px", borderRadius: "0.375rem", border: "1px solid #dee2e6", boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>
                                            {renderPrice(room)}
                                            <br />
                                            <button className="btn btn-primary" onClick={() => handleBooking(room.idRom)}>
                                                Đặt phòng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>


        </div>
    </div>
  );
};

export default DetailHotel;
