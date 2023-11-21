import React from 'react'
import './mainLocal.css';

import image1 from './img/icon1.webp';
import image2 from './img/icon2.webp';
import image3 from './img/icon3.webp';
import image4 from './img/icon4.webp';

const Infor = () => {
  return (
    <div>
        <hr style={{marginTop: 25}}/>
        <h4 style={{textAlign: 'center', fontSize: 18}} className="heading">Tại sao nên đặt chỗ ở chúng tôi?</h4>
        <div className="row">
            <div className="col-md-3">
                <img style={{width: '100%', height: '50%'}} className="image" src={image1} alt="Slide 1" />
                <div>
                    <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Giá rẻ mỗi ngày với ưu đãi đặc biệt dành riêng cho ứng dụng</h4>
                    <p style={{textAlign: 'justify'}}>Đặt phòng qua ứng dụng để nhận giá tốt nhất với các khuyến mãi tuyệt vời!</p>
                </div>
            </div>
            <div className="col-md-3">
                <img  style={{width: '100%', height: '50%'}} className="image" src={image2} alt="Slide 1" />
                <div>
                    <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Phương thức thanh toán an toàn và linh hoạt</h4>
                    <p style={{textAlign: 'justify'}}>Giao dịch trực tuyến an toàn với nhiều lựa chọn như thanh toán tại cửa hàng tiện lợi, 
                        chuyển khoản ngân hàng, thẻ tín dụng đến Internet Banking. Không tính phí giao dịch</p>
                </div>
            </div>
            <div className="col-md-3">
                <img style={{width: '100%', height: '50%'}} className="image" src={image3} alt="Slide 1" />
                <div>
                    <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Hỗ trợ khách hàng 24/7</h4>
                    <p style={{textAlign: 'justify'}}>Đội ngũ nhân viên hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn trong từng bước của quá trình đặt vé</p>
                </div>
            </div>
            <div className="col-md-3">
                <img  style={{width: '100%', height: '50%'}} className="image" src={image4} alt="Slide 1" />
                <div>
                    <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Khách thực, đánh giá thực</h4>
                    <p style={{textAlign: 'justify'}}>Hơn 10.000.000 đánh giá, bình chọn đã được xác thực từ du khách sẽ giúp bạn đưa ra lựa chọn đúng đắn.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Infor