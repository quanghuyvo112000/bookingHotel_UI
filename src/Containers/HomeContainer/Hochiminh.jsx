// Hochiminh.js
import React from "react";
import image1 from "./img/hochiminh1.jpg";
import image2 from "./img/hochiminh2.jpg";
import image3 from "./img/hochiminh3.jpg";

import "./mainLocal.css";

const Hochiminh = () => {
  return (
    <div>
      <hr />
      <h4 className="heading">Các Địa Điểm Ở Hồ Chí Minh</h4>
      <div className="row">
        <div className="col-md-6 position-relative">
          <img className="image" src={image1} alt="Slide 1" />
          <div className="image-text">Nhà hát lớn Sài Gòn</div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12 position-relative">
              <img className="image" src={image2} alt="Slide 2" />
              <div className="image-text">Nhà thờ Đức Bà</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 position-relative">
              <img className="image" src={image3} alt="Slide 3" />
              <div className="image-text">Dinh Độc Lập</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hochiminh;
