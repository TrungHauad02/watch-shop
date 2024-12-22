import { Box, Stack } from "@mui/material";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "./ArrowButton";
import useColor from "theme/useColor";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductImages({ images }: { images: string[] }) {
  const [indexImage, setIndexImage] = useState(0);
  const color = useColor();
  // Settings cho slider thumbnail
  const thumbnailSliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Stack sx={{ width: { xs: "100%", sm: "50%" } }} direction={"column"}>
      {/*  Hinh anh chinh */}
      <Box sx={{ px: { xs: 0, sm: 2 }, py: 2, m: 0 }}>
        <img
          src={images[indexImage]}
          alt={`${indexImage}`}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
        />
      </Box>

      {/* Thumbnail Slider */}
      <Slider {...thumbnailSliderSettings} focusOnSelect={true}>
        {images.map((image, index) => (
          <div>
            <Box
              component={"button"}
              onClick={() => setIndexImage(index)}
              key={index}
              sx={{
                marginX: "0.5rem",
                height: "100px",
                borderRadius: "0.5rem",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s ease",
                p: 0,
                border: "none",
                "&:hover": {
                  boxShadow: `1px 4px 5px ${color.slate500}`,
                },
              }}
            >
              <img
                src={image}
                alt={`${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </div>
        ))}
      </Slider>
    </Stack>
  );
}
