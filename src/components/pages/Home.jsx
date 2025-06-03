import React from 'react'
import HeroSection from '../sections/HeroSection'
import About from '../sections/About'

const Home = () => {
  return (
    <>

      <main className='h-full w-full'>
        
        {/* hero section */}
        <HeroSection/>
        <About/>


      </main>

    </>
  )
}

export default Home