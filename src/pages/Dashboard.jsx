import React from 'react';
import homeimage from '../assets/home01.jpg';

const WelcomeMessage = () => {
    
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700">
  {/* Full-width Image */}
  <div className="w-full h-full opacity-100">
    <img
      src={homeimage} 
      alt="Cony Band" 
      className="object-cover w-full h-full"
    />
  </div>
  
  {/* Text Content */}
  {/* <div className="text-center">
    <h1 className="mb-4 text-5xl font-extrabold">Welcome to Cony Band!</h1>
    
  </div> */}
</div>

  );
};

export default WelcomeMessage;