import React, { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <center>
        <div className="col-md-3 py-5 pr-3 pl-1">
          <h2> Movies</h2>
          <Slider {...settings}>
            <div>
              <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157422945871583_287x421.jpg" />
            </div>
            <div>
              <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157250534676979_287x421.jpg" />
            </div>
            <div>
              <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157018191975549_287x421.jpg" />
            </div>
            <div>
              <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157416306567553_287x421.jpg" />
            </div>
            <div>
              <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157492651970791_287x421.jpg" />
            </div>
          </Slider>
        </div>
      </center>
    );
  }
}
