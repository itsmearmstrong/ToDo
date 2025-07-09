'use client'
import React from 'react'
import SplitText from '@/components/SplitText';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

function Page() {
  return (
      
    <div className='flex-col place-items-center justify-center light p-36'>
        <SplitText text="Master Your Tasks, Own Your Day!" className="text-5xl tracking-tighter font-extrabold text-center p-2"
          delay={100} duration={0.6} ease="power3.out" splitType="chars" from={{ opacity: 0, y: 40 }} 
          to={{ opacity: 1, y: 0 }} threshold={0.1} rootMargin="-100px" textAlign="center" 
          onLetterAnimationComplete={handleAnimationComplete} />
      <h2 className='text-3xl font-semibold p-4'>Plan . Prioritize . Achieve</h2>
      <p className='text-lg font-normal mt-3'>Get started organizing your life with Todo. Your smart task companion.</p>
      <p className='text-lgfont-normal'>Designed to adapt, built to get things done.</p>
    </div>
  )
}

export default Page
