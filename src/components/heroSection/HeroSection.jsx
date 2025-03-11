import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  const images = [
    "/images/carosel1.jpg",
    "/images/carosel2.jpg",
    "/images/carosel3.jpg",
    "/images/carosel4.jpg",
    "/images/handmade.jpg",
  ];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop images
    speed: 200, // Transition speed
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1,
    autoplay: true, // Auto slide
    autoplaySpeed: 2000, // 3 seconds per slide
    arrows: true, // Show prev/next buttons
    fade: true, // Smooth fade transition
  };

  return (
    <div className="w-full h-[75vh] px-4 lg:px-0">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="w-full h-[75vh]">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />

          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSection;
