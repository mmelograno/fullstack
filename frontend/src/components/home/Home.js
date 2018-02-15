import React from 'react';
import Carousel from '../carousel/Carousel';
import News from '../news/News';

const Home = () => {
  return (
    <div className="container" style={{ backgroundColor: '#efefef' }}>
      <Carousel />
      <br />
      <News />
      <br />
  </div>
  );
};

export default Home;
