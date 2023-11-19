import React from 'react'
import './mainLocal.css';

import image1 from './img/doitac1.png';
import image2 from './img/doitac2.png';
// import image1 from './img/dotac1.webp';


const Partner = () => {
  return (
    <div>
        <hr />
        <h4 className="heading">Đối tác khách sạn</h4>
        <div className="row">
          <div className="col-md-6">
            <span>
              Chúng tôi hợp tác với các chuỗi khách sạn trên toàn quốc để bảo đảm mang lại kỳ nghỉ tuyệt vời nhất tại mọi điểm đến trong mơ của bạn!
            </span>
          </div>
          <div className="col-md-6">
              <div className="row">
                  <div className="col-md-6">
                    <img className="image" src={image1} alt="Slide 2" />
                  </div>
                  <div className="col-md-6">
                    <img className="image" src={image2} alt="Slide 2" />
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Partner