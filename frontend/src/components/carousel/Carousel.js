import React from 'react';
import { Carousel as CarouselComponent } from 'react-responsive-carousel';

import './styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Carousel = () => {
  return (
    <CarouselComponent autoPlay showArrows infiniteLoop>
      <div>
        <img src="" alt="First slide"/>
      </div>
      <div>
        <img src="" alt="First slide"/>
      </div>
      <div>
        <img src="" alt="First slide"/>
      </div>
    </CarouselComponent>
  );
};

export default Carousel;
