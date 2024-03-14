import React from "react";
import image1 from "../../assets/Images/aaa-logo2.png";
import image2 from "../../assets/Images/fundserv_logo.png";

const HomeComponent = () => {
  return (
    <div className='flex flex-col items-center justify-center  pt-32'>
      <img className='w-199 h-112 mb-8' src={image1} alt='Logo 1' />
      <div className='text-center font-normal text-zinc-300 text-4xl leading-normal mb-4'>
        Advanced Asset Administration Inc.
      </div>
      <div className='text-center text-zinc-300 text-5xl leading-normal mb-8'>
        Welcome to EPIC and FUNDSERV portal
      </div>
      <img className='w-199 h-112' src={image2} alt='Logo 2' />
    </div>
  );
};

export default HomeComponent;
