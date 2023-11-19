import React from 'react';
import FormBooking from '../Containers/FormBooking';
import Hochiminh from '../Containers/HomeContainer/Hochiminh';
import Hue from '../Containers/HomeContainer/Hue';
import Partner from '../Containers/HomeContainer/Partner';
import Infor from '../Containers/HomeContainer/Infor';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube'; // Import CSS cho effect cube

import '../css/slider.css';

import image1 from '../image/slide1.jpg';
import image2 from '../image/slide2.jpg';
import image3 from '../image/slide3.jpg';
import image4 from '../image/slide4.jpg';
import image5 from '../image/slide5.jpg';
import image6 from '../image/slide6.jpg';


// import required modules
import { Pagination, Autoplay, EffectCube } from 'swiper/modules';

const Home = () => {
  return (
    <div>
      <div>
        <Swiper
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay, EffectCube]} // Thêm Autoplay và EffectCube vào modules
          className="mySwiper"
          autoplay={{ delay: 3000 }} // Thiết lập thời gian chuyển đổi tự động (ở đây là 3 giây)
          effect={'fade'} // Chọn hiệu ứng cube transition
          cubeEffect={{
            slideShadows: true,
            shadow: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
        >
          <SwiperSlide>
            <img style={{ width: '100%', height: '100%', borderRadius: 20 }} src={image1} alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: '100%', borderRadius: 20 }} src={image2} alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: '100%', borderRadius: 20 }} src={image3} alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: '100%', borderRadius: 20 }} src={image4} alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: '100%', borderRadius: 20 }} src={image5} alt="Slide 5" />
          </SwiperSlide>
          <SwiperSlide>
            <img style={{ width: '100%', height: '100%', borderRadius: 20 }} src={image6} alt="Slide 6" />
          </SwiperSlide>
        </Swiper>

      </div>
      <div>
        <FormBooking />
      </div>
      <div>
          <Hochiminh />
          <Hue />
          <Partner />
          <Infor />
      </div>

    </div>
  );
}

export default Home;
