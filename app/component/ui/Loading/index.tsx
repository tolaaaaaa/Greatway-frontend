'use client'
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/animations/loading.json';

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full bg-transparent">
      <div className="w-40 h-40">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
