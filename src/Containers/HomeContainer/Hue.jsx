import React from "react";
import "./mainLocal.css";

import image1 from "./img/hue1.jpg";
import image2 from "./img/hue2.jpg";
import image3 from "./img/hue3.jpg";

const Hue = () => {
  return (
    <div>
      <hr />
      <h4 className="heading">Các Địa Điểm Ở Huế</h4>
      <div className="row">
        <div className="col-md-6 position-relative">
          <img className="image" src={image1} alt="Slide 1" />
          <div className="image-text">Cầu Trường Tiền</div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12 position-relative">
              <img className="image" src={image2} alt="Slide 2" />
              <div className="image-text">Vườn quốc gia Bạch Mã</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 position-relative">
              <img className="image" src={image3} alt="Slide 3" />
              <div className="image-text">Biển Lăng Cô</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hue;
