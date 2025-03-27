import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  const images = [
    "/images/PIC 1.jpg",
    "/images/PIC 2.jpg",
    "/images/PIC 6.jpg",
    "/images/PIC 3.jpg",
    "/images/PIC 4.jpg",
    "/images/PIC 5.jpg",
    
    
  ];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop images
    speed: 200, // Transition speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1,
    autoplay: true, // Auto slide
    autoplaySpeed: 3000, // 3 seconds per slide
    arrows: true, // Show prev/next buttons
    fade: true, // Smooth fade transition
  };

  return (
    <div className="w-full h-full px-4 lg:px-0">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="w-full h-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-fill"
            />

          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSection;
