import React from 'react';
import Lottie from 'react-lottie-player';
import checkmarkAnimation from '../../assets/animations/check.json';

const ValidationIcon = () => (
  <Lottie
    loop={false}
    animationData={checkmarkAnimation}
    play
    style={{ width: 60, height: 60 }}
  />
);

export default ValidationIcon;