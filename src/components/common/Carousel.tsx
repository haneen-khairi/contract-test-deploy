"use client";

import React, { useRef } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
    // dotsClass: "carousel-dots",
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previousSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <Box
      position="relative"
      m={{
        lg: "auto 80px",
        md: "auto 24px",
        sm: "auto 14px",
      }}
      p={"28px 0"}
    >
      <Slider {...settings} ref={sliderRef}>
        {React.Children?.map(children, (child, index) => (
          <Box mb={"34px"} key={index}>
            {child}
          </Box>
        ))}
      </Slider>
      <Box
        position="absolute"
        right="0"
        bottom="0"
        display="flex"
      >
        <IconButton
          aria-label="Previous Slide"
          icon={<IoChevronBack />}
          onClick={previousSlide}
          mr={2}
          variant={"none"}
          color={"white"}
        />
        <IconButton
          aria-label="Next Slide"
          icon={<IoChevronForward />}
          onClick={nextSlide}
          variant={"none"}
          color={"white"}
        />
      </Box>
    </Box>
  );
};

export default Carousel;
