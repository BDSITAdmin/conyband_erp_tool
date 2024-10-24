import React from 'react';

const WelcomeMessage = () => {
    
  return (
    <div className="flex items-center justify-center h-screen text-white bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold">Welcome to Cony Band!</h1>
        <p className="mb-8 text-lg">
          Get ready to experience the rhythm of life with our electrifying performances!
        </p>
        
      </div>
    </div>
  );
};

export default WelcomeMessage;
