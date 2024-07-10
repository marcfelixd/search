import React from 'react';
import Lottie from 'react-lottie-player';
import searchingAnimation from '../../assets/animations/loading.json';


const SkeletonLoader = ({ colors }) => (
    <div
      className="p-4 rounded-lg"
      style={{ backgroundColor: colors.secondaryLight, borderRadius: '16px' }}
    >
      <div className="flex items-center mb-2">
        <Lottie
          loop
          animationData={searchingAnimation}
          play
          style={{ width: 60, height: 60 }}
        />
        <div
          className="h-6 rounded w-1/4 ml-2"
          style={{ backgroundColor: colors.primary, opacity: 0.5 }}
        />
      </div>
      
      <div className="space-y-2 mb-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`h-4 rounded ${index % 2 === 0 ? 'w-full' : 'w-5/6'}`}
            style={{ backgroundColor: colors.primary, opacity: 0.5 }}
          />
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-8 rounded-full w-1/4"
            style={{ backgroundColor: colors.primary, opacity: 0.5 }}
          />
        ))}
      </div>
      
      <div className="flex items-center">
        <div
          className="w-5 h-5 rounded-full mr-2"
          style={{ backgroundColor: colors.primary, opacity: 0.5 }}
        />
        <div
          className="h-4 rounded w-1/5"
          style={{ backgroundColor: colors.primary, opacity: 0.5 }}
        />
      </div>
    </div>
  );

export default SkeletonLoader;