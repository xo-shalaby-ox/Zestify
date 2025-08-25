import Slider from "react-slick";

import One from "../../assets/one.png";
import Two from "../../assets/two.jpg";
import Three from "../../assets/three.jpg";
import Four from "../../assets/four.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div className="main-slider">
      <Slider {...settings}>
        <img
          src={One}
          className="h-[700px] object-cover rounded-lg"
          alt="Slide 1"
        />
        <img
          src={Two}
          className="h-[700px]  object-cover rounded-lg"
          alt="Slide 1"
        />
        <img
          src={Three}
          className="h-[700px] object-cover rounded-lg"
          alt="Slide 1"
        />
        <img
          src={Four}
          className="h-[700px] object-cover rounded-lg"
          alt="Slide 1"
        />
      </Slider>
    </div>
  );
}
