import React, { useState, useEffect } from 'react';
import '../css/ImageCarousel.css';


const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Danh sách các URL ảnh
  const imageUrls = [
    'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040646-c96751ff1e72044131a05d93dd937839.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640',
    'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040646-238f2a832c76bd7e909d5b0c26e35707.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640',
    'https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20040646-b453c3c351ab3b4b95a9c40391be39e9.jpeg?_src=imagekit&tr=c-at_max,h-360,q-40,w-640',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % imageUrls.length);
    }, 5000); // Đổi ảnh sau mỗi 5 giây (điều chỉnh theo ý muốn)

    return () => clearInterval(interval);
  },);

  return (
    <div className="image-container">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Slide ${index + 1}`}
          style={{
            transform: `translateX(${-currentImage * 100}%)`,
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
