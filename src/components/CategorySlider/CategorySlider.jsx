import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "sonner";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // Fetch categories data using Axios
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/categories"
        );

        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
    // Cleanup function
    return () => {
      setCategories(null);
    };
  }, []);
  return (
    <div className="mt-10">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category["_id"]} className="p-3 text-center">
            <img
              src={category.image}
              className="w-full h-[200px] object-cover rounded-lg"
              alt={category.name}
            />
            <span className="block mt-5 font-bold text-xl text-slate-900">
              {category.name}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
}
