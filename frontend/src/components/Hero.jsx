import React from 'react'
import { Button } from './ui/button'

function Hero() {
  return (
    <section
      className='relative text-white py-16 overflow-hidden'
      style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #0d9488 40%, #84cc16 100%)',
      }}
    >
      {/* Soft color overlay blobs to echo the Hero.png background */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 20% 60%, rgba(124,58,237,0.45) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(234,179,8,0.35) 0%, transparent 50%), radial-gradient(ellipse at 55% 80%, rgba(13,148,136,0.4) 0%, transparent 50%)',
        }}
      />

      <div className='relative max-w-7xl mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div>
            <h1 className='text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg'>
              Latest Electronics at Best Prices
            </h1>
            <p className='text-xl mb-8 text-white/90'>
              Discover the latest trends in electronics and shop for the best
              products at the best prices
            </p>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Button
                className='bg-white text-violet-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg'
              >
                Shop Now
              </Button>
              <Button
                variant='outline'
                className='border-white text-violet-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow-lg'
              >
                View Deals
              </Button>
            </div>
          </div>

          <div className='relative'>
            {/* Subtle glow behind the phone image to blend with its own bg */}
            <div
              className='absolute inset-0 rounded-2xl blur-2xl opacity-50'
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(132,204,22,0.5) 0%, rgba(13,148,136,0.4) 50%, transparent 80%)',
              }}
            />
            <img
              src='/Hero.png'
              alt='hero'
             
              
               className='rounded-lg w-auto h-auto drop-shadow-2xl'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero