import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import image1 from './img/Contact1.webp';
import image2 from './img/Contact2.webp';
import image3 from './img/Contact3.webp';
import image4 from './img/Contact4.webp';

const ContentContact = () => {
  return (
    <div style={{marginBottom: 100}}>
    <hr style={{marginTop: 25}}/>
    <h4 style={{textAlign: 'center', fontSize: 18}} className="heading">Bạn muốn hợp tác với chúng tôi?</h4>
    <div className="row">
        <div className="col-md-3">
            <img style={{width: '100%', height: '50%'}} className="image" src={image1} alt="Slide 1" />
            <div>
                <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Nếu bạn quan tâm và muốn hợp tác với chúng tôi</h4>
                <p style={{textAlign: 'center'}}>Hãy liên hệ với chúng tôi thông qua một trong các PIC hợp tác của chúng tôi 
                hoặc gửi email đến <span style={{color: '#275fbe'}}>Partnership@gmail.com.</span> </p>
            </div>
        </div>
        <div className="col-md-3">
            <img  style={{width: '100%', height: '50%'}} className="image" src={image2} alt="Slide 1" />
            <div>
                <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Thảo luận </h4>
                <p style={{textAlign: 'center'}}>Bàn bạc và sau đó quyết định kế hoạch hợp tác phù hợp nhất với nhu cầu của bạn.</p>
            </div>
        </div>
        <div className="col-md-3">
            <img style={{width: '100%', height: '50%'}} className="image" src={image3} alt="Slide 1" />
            <div>
                <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Ký kết hợp đồng</h4>
                <p style={{textAlign: 'center'}}>Thống nhất và ký kết thỏa thuận hợp tác để chúng ta có thể bắt đầu thiết lập các chương trình.</p>
            </div>
        </div>
        <div className="col-md-3">
            <img  style={{width: '100%', height: '50%'}} className="image" src={image4} alt="Slide 1" />
            <div>
                <h4 style={{textAlign: 'center', fontSize: 20, marginTop: 10}}>Hoạt động</h4>
                <p style={{textAlign: 'center'}}>Đưa thông của bạn lên hệ thống của chúng tôi.</p>
            </div>
        </div>
    </div>
    <hr />
    <h4 style={{textAlign: 'center', fontSize: 18}} className="heading">Nếu bạn còn thắc mắc chúng tôi?</h4>
    <div className="col-12">
        <p style={{textAlign: 'justify'}} > Không thể tìm thấy doanh nghiệp của bạn trong các danh mục trên? Đơn giản chỉ muốn trò chuyện với nhóm
            của chúng tôi? Hay bạn muốn gửi đề xuất hợp tác ngay lập tức (đừng quên làm theo mẹo chuyên nghiệp này )? Gửi yêu cầu của bạn đến:</p>
        <p style={{fontSize: 30}}><FontAwesomeIcon icon={faEnvelope} style={{ color: "#275fbe" }} /><a href="mailto:Partnership@gmail.com">  Partnership@gmail.com </a></p>
    </div>
</div>
  )
}

export default ContentContact